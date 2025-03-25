"use server";
import type { SelectedOptionsType } from "@/types/options";
import { generateObject } from "ai";
// import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import generatePrompt from "@/utils/generatePrompt";
import { mistral } from "@ai-sdk/mistral";

export default async function correctText(text: string, options: SelectedOptionsType) {
	const prompt = generatePrompt(text, options);

	const result = await generateObject({
		model: mistral("mistral-large-latest"),
		prompt,
		schema: z.object({
			correctedText: z.string(),
			explanations: z.array(
				z.object({
					from: z.string(),
					to: z.string(),
					why: z.string(),
					tip: z.string(),
				})
			),
		}),
	});

	return result.object;
}
