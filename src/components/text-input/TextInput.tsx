"use client";
import { useI18nContext } from "@/i18n/i18n-react";
import { Input, message } from "antd";
import "./text-input.css";
import { useStreamCorrection } from "@/hooks/useStreamCorrection";
import { useOptionsStore } from "@/stores/options.store";
import { useResultStore } from "@/stores/result.store";
import { useSettingsStore } from "@/stores/settings.store";
import { useEffect, useState } from "react";
import TextDetails from "../text-details/TextDetails";

const { useMessage } = message;

export default function TextInput() {
	const { LL, locale } = useI18nContext();
	const { selectedOptions } = useOptionsStore();
	const { setResult, setIsStreaming: setIsStreamingStore } = useResultStore();
	const { input, setInput, setOldInput, setStartTime, setEndTime } = useResultStore();
	const { isMobile } = useSettingsStore();
	const { result, streamCorrection, isStreaming, error, cancelCorrection } = useStreamCorrection();
	const [messageApi, contextHolder] = useMessage();
	const [isButtonHovered, setIsButtonHovered] = useState(false);

	// Sync streaming state with store
	useEffect(() => {
		setIsStreamingStore(isStreaming);
		// Reset hover state when streaming stops
		if (!isStreaming) {
			setIsButtonHovered(false);
		}
	}, [isStreaming, setIsStreamingStore]);

	// Update result store when streaming result changes
	useEffect(() => {
		if (result && (result.correctedText || result.explanations?.length)) {
			setResult({
				correctedText: result.correctedText || "",
				explanations: result.explanations || [],
			});
		}
	}, [result, setResult]);

	// Show error message if streaming fails
	useEffect(() => {
		if (error) {
			messageApi.open({
				type: "error",
				content: error,
				duration: 2,
			});
		}
	}, [error, messageApi]);

	// Set end time when streaming completes
	useEffect(() => {
		if (!isStreaming && result?.correctedText) {
			setEndTime(Date.now().valueOf());
		}
	}, [isStreaming, result, setEndTime]);

	async function correct() {
		setStartTime(Date.now().valueOf());
		setEndTime(-1);
		setOldInput(input); // Set oldInput at the START of streaming
		await streamCorrection(input, selectedOptions);
	}

	return (
		<div id="text-input">
			{contextHolder}
			<Input.TextArea
				lang={locale}
				placeholder={LL.textInputPlaceholder()}
				style={{
					resize: "none",
				}}
				value={input}
				onChange={(e) => {
					setInput(e.target.value);
				}}
				disabled={isStreaming}
			/>
			<TextDetails
				details={[
					LL.textDetails.stats.characters(input.length),
					LL.textDetails.stats.words(
						input
							.split("\n")
							.join(" ")
							.split(" ")
							.filter((l) => l).length
					),
					LL.textDetails.stats.lines(input.split("\n").length),
				]}
				actions={
					isStreaming
						? isMobile
							? // Mobile + Streaming: show both buttons
								[
									{
										action: () => {},
										label: LL.textDetails.actions.correct(),
										type: "primary" as const,
										loading: true,
										disabled: true,
									},
									{
										action: cancelCorrection,
										label: LL.basic.cancel(),
										type: "default" as const,
										danger: true,
									},
								]
							: // Desktop + Streaming: hover to cancel
								[
									{
										action: isButtonHovered ? cancelCorrection : () => {},
										label: isButtonHovered ? LL.basic.cancel() : LL.textDetails.actions.correct(),
										type: "primary" as const,
										danger: isButtonHovered,
										loading: !isButtonHovered,
										onMouseEnter: () => setIsButtonHovered(true),
										onMouseLeave: () => setIsButtonHovered(false),
									},
								]
						: // Not streaming: normal button
							[
								{
									action: correct,
									label: LL.textDetails.actions.correct(),
									type: "primary" as const,
									loading: false,
									disabled: !input.trim(),
								},
							]
				}
			/>
		</div>
	);
}
