"use client";

import { useState, useRef, useCallback } from "react";
import type { SelectedOptionsType } from "@/types/options";
import type { ExplanationType } from "@/types/explanations";

type StreamResult = {
	correctedText: string;
	explanations: ExplanationType[];
};

export function useStreamCorrection() {
	const [isStreaming, setIsStreaming] = useState(false);
	const [result, setResult] = useState<StreamResult | null>(null);
	const [error, setError] = useState<string | null>(null);
	const abortControllerRef = useRef<AbortController | null>(null);

	const streamCorrection = useCallback(
		async (text: string, options: SelectedOptionsType) => {
			// Cancel previous request if exists
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}

			// Create new abort controller
			abortControllerRef.current = new AbortController();

			// Reset state to prevent race conditions
			setIsStreaming(true);
			setError(null);
			setResult({ correctedText: "", explanations: [] }); // Reset to empty instead of null

			try {
				// Convert Sets to Arrays for JSON serialization
				const serializedOptions = {
					minimal: Array.from(options.minimal),
					moderate: Array.from(options.moderate),
					heavy: Array.from(options.heavy),
				};

				const response = await fetch("/api/correct-text", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ text, options: serializedOptions }),
					signal: abortControllerRef.current.signal,
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.error || "Failed to correct text");
				}

				if (!response.body) {
					throw new Error("No response body");
				}

				const reader = response.body.getReader();
				const decoder = new TextDecoder();
				let buffer = "";

				while (true) {
					const { done, value } = await reader.read();

					if (done) {
						// Flush any remaining bytes from the decoder
						buffer += decoder.decode();
						break;
					}

					buffer += decoder.decode(value, { stream: true });
					const lines = buffer.split("\n");
					buffer = lines.pop() || "";

					for (const line of lines) {
						if (line.trim()) {
							try {
								// Parse JSON line
								const part = JSON.parse(line);

								// Check if it's an error message from the server
								if (part.error) {
									throw new Error(part.error);
								}

								// Update result progressively
								setResult((prev) => ({
									correctedText: part.correctedText || prev?.correctedText || "",
									explanations: part.explanations || prev?.explanations || [],
								}));
							} catch (e) {
								// Only log JSON parse errors, re-throw server errors
								if (e instanceof SyntaxError) {
									console.error("JSON parse error:", line, e);
								} else {
									throw e; // Re-throw server errors
								}
							}
						}
					}
				}

				// Process remaining buffer after stream ends
				if (buffer.trim()) {
					try {
						const part = JSON.parse(buffer);

						// Check if it's an error message from the server
						if (part.error) {
							throw new Error(part.error);
						}

						setResult((prev) => ({
							correctedText: part.correctedText || prev?.correctedText || "",
							explanations: part.explanations || prev?.explanations || [],
						}));
					} catch (e) {
						// Only log JSON parse errors, re-throw server errors
						if (e instanceof SyntaxError) {
							console.error("JSON parse error (final buffer):", buffer, e);
						} else {
							throw e; // Re-throw server errors
						}
					}
				}

				setIsStreaming(false);
			} catch (err) {
				if (err instanceof Error && err.name === "AbortError") {
					// Request cancelled, don't show error
					setIsStreaming(false);
					return;
				}
				setError(err instanceof Error ? err.message : "Unknown error");
				setIsStreaming(false);
			}
		},
		[]
	);

	const cancelCorrection = useCallback(() => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
			setIsStreaming(false);
		}
	}, []);

	return {
		result,
		streamCorrection,
		isStreaming,
		error,
		cancelCorrection,
	};
}
