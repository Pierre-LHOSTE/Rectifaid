"use server";
import type { SelectedOptionsType } from "@/types/options";
import { generateObject } from "ai";
import { z } from "zod";
import generatePrompt from "@/utils/generatePrompt";
import { openai } from "@ai-sdk/openai";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
// import { mistral } from "@ai-sdk/mistral";

export default async function correctText(text: string, options: SelectedOptionsType) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		return {
			error: "Please login to use this feature.",
		};
	}

	const prompt = generatePrompt(text, options);

	const result = await generateObject({
		model: openai("gpt-4o"),
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
