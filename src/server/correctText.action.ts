"use server";
import { limits } from "@/config/limits";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { SelectedOptionsType } from "@/types/options";
import generatePrompt from "@/utils/generatePrompt";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { headers } from "next/headers";
import { z } from "zod";
// import { mistral } from "@ai-sdk/mistral";

export default async function correctText(text: string, options: SelectedOptionsType) {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) return { error: "Please login to use this feature." };

	let user = await prisma.user.findUnique({ where: { id: session.user.id } });
	if (!user) return { error: "User not found." };

	const now = new Date();
	const lastReset = new Date(user.lastReset);
	const oneMonthAgo = new Date(now);
	oneMonthAgo.setMonth(now.getMonth() - 1);

	if (lastReset < oneMonthAgo) {
		user = await prisma.user.update({
			where: { id: user.id },
			data: { tokensUsed: 0, lastReset: now },
		});
	}

	const userPlan =
		user.tier && ["free", "basic", "premium"].includes(user.tier)
			? (user.tier as "free" | "basic" | "premium")
			: "free";
	const userLimit = limits[userPlan];

	if (user.tokensUsed >= userLimit) {
		const nextReset = new Date(user.lastReset);
		nextReset.setMonth(nextReset.getMonth() + 1);
		return {
			error: `You have reached your usage limit this month. Your limit will reset on ${nextReset.toLocaleDateString()}.`,
		};
	}

	const prompt = generatePrompt(text, options);

	const result = await generateObject({
		model: openai("gpt-5-mini"),
		prompt,
		schema: z.object({
			correctedText: z.string(),
			explanations: z.array(
				z.object({ from: z.string(), to: z.string(), why: z.string(), tip: z.string() })
			),
		}),
	});

	await prisma.user.update({
		where: { id: session.user.id },
		data: { tokensUsed: { increment: result.usage?.totalTokens || 0 } },
	});

	return result.object;
}
