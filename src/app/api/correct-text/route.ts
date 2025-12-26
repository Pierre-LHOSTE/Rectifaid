import { limits } from "@/config/limits";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { SelectedOptionsType } from "@/types/options";
import generatePrompt from "@/utils/generatePrompt";
import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { headers } from "next/headers";
import { z } from "zod";

// Increase timeout to 60s (Vercel Hobby max) to prevent timeouts
export const maxDuration = 60;

// Request body validation schema
const requestSchema = z.object({
	text: z.string().min(1).max(50000), // Max 50k characters
	options: z.object({
		minimal: z.array(z.string()),
		moderate: z.array(z.string()),
		heavy: z.array(z.string()),
	}),
});

export async function POST(req: Request) {
	try {
		// 1. Parse and validate request body
		const body = await req.json();
		const validation = requestSchema.safeParse(body);

		if (!validation.success) {
			return Response.json(
				{ error: "Invalid request body" },
				{ status: 400 }
			);
		}

		const { text, options } = validation.data;

		// 2. Authentication
		const session = await auth.api.getSession({ headers: await headers() });
		if (!session) {
			return Response.json(
				{ error: "Please login to use this feature." },
				{ status: 401 }
			);
		}

		// 3. Get user + checks
		let user = await prisma.user.findUnique({ where: { id: session.user.id } });
		if (!user) {
			return Response.json({ error: "User not found." }, { status: 404 });
		}

		// 4. Monthly reset
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

		// 5. Check limits
		const userPlan =
			user.tier && ["free", "basic", "premium"].includes(user.tier)
				? (user.tier as "free" | "basic" | "premium")
				: "free";
		const userLimit = limits[userPlan];

		if (user.tokensUsed >= userLimit) {
			const nextReset = new Date(user.lastReset);
			nextReset.setMonth(nextReset.getMonth() + 1);
			return Response.json(
				{
					error: `You have reached your usage limit this month. Your limit will reset on ${nextReset.toLocaleDateString()}.`,
				},
				{ status: 429 }
			);
		}

		// 6. Generate prompt
		const prompt = generatePrompt(text, options);

		// 7. Stream OpenAI
		const result = streamObject({
			model: openai("gpt-4o-mini"),
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
			onFinish: async ({ usage }) => {
				// 8. Update tokens after stream finishes
				await prisma.user.update({
					where: { id: session.user.id },
					data: { tokensUsed: { increment: usage?.totalTokens || 0 } },
				});
			},
		});

		// 9. Return a custom stream that sends partial objects as JSON
		const encoder = new TextEncoder();
		const stream = new ReadableStream({
			async start(controller) {
				try {
					for await (const partialObject of result.partialObjectStream) {
						const json = JSON.stringify(partialObject) + "\n";
						controller.enqueue(encoder.encode(json));
					}
					controller.close();
				} catch (streamError) {
					// Send error message if stream fails
					console.error("Stream error:", streamError);
					const errorMsg =
						JSON.stringify({
							error: "Stream interrupted. Please try again.",
						}) + "\n";
					controller.enqueue(encoder.encode(errorMsg));
					controller.close();
				}
			},
		});

		return new Response(stream, {
			headers: {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				Connection: "keep-alive",
			},
		});
	} catch (error) {
		console.error("Error in /api/correct-text:", error);
		return Response.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
