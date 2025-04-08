import crypto from "node:crypto";
import { prisma } from "@/lib/prisma";
import sendMail from "@/server/sendMail";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

	if (!secret) {
		return NextResponse.json("Required env secrets not set!", { status: 400 });
	}

	const rawBody = await request.text();
	const signature = Buffer.from(request.headers.get("X-Signature") ?? "", "hex");

	if (signature.length === 0 || rawBody.length === 0) {
		return NextResponse.json("Invalid request", { status: 400 });
	}

	const hmac = Buffer.from(
		crypto.createHmac("sha256", secret).update(rawBody).digest("hex"),
		"hex"
	);

	if (!crypto.timingSafeEqual(hmac, signature)) {
		return NextResponse.json("Invalid request", { status: 400 });
	}

	const payload = JSON.parse(rawBody);
	const { meta, data } = payload;
	const { event_name: eventName, custom_data } = meta;
	const attributes = data.attributes;

	if (!eventName || !attributes) {
		throw new Error("No event name or attributes found");
	}

	const userId = custom_data?.user_id;
	const status = attributes.status;
	const tier = attributes.product_name.toLowerCase();
	const customerId = attributes.customer_id;
	const userEmail = attributes.user_email;
	const userName = attributes.user_name;

	try {
		const isExistingEmail = await prisma.user.findFirst({
			where: { email: userEmail },
		});

		if (!userId && !isExistingEmail) {
			await handlePendingSubscription({
				id: data.id,
				orderId: attributes.order_id,
				userEmail,
				productName: attributes.product_name,
				userName,
				customerId: attributes.customer_id,
			});

			await sendPendingEmail({ userEmail, userName, productName: attributes.product_name });

			return NextResponse.json("OK", { status: 200 });
		}

		const newTier = getNewTierFromEvent({ eventName, status, tier });

		if (newTier !== null) {
			await updateUserTier({ userId, userEmail, newTier, customerId, isExistingEmail });
		}

		return NextResponse.json("OK", { status: 200 });
	} catch (error) {
		console.error("❌ Error updating user:", error);
		return NextResponse.json("Internal server error", { status: 500 });
	}
}

function getNewTierFromEvent({
	eventName,
	status,
	tier,
}: {
	eventName: string;
	status: string;
	tier: string;
}): string | null {
	const activeEvents = [
		"subscription_created",
		"subscription_unpaused",
		"subscription_payment_recovered",
		"subscription_updated",
	];

	const inactiveEvents = ["subscription_expired", "subscription_paused"];

	if (activeEvents.includes(eventName) && status === "active") {
		return tier;
	}

	if (inactiveEvents.includes(eventName)) {
		return "free";
	}

	return null;
}

async function updateUserTier({
	userId,
	userEmail,
	newTier,
	customerId,
	isExistingEmail,
}: {
	userId?: string;
	userEmail: string;
	newTier: string;
	customerId: number;
	isExistingEmail: { email: string } | null;
}) {
	if (userId) {
		await prisma.user.update({
			where: { id: userId },
			data: { tier: newTier, customerId },
		});
	} else if (isExistingEmail) {
		await prisma.user.update({
			where: { email: userEmail },
			data: { tier: newTier, customerId },
		});
	}
}

async function handlePendingSubscription({
	id,
	orderId,
	userEmail,
	productName,
	userName,
	customerId,
}: {
	id: string;
	orderId: number;
	userEmail: string;
	productName: string;
	userName: string;
	customerId: number;
}) {
	const res = await prisma.pendingSubscription.create({
		data: {
			id,
			orderId,
			userEmail,
			productName,
			userName,
			customerId,
		},
	});
}

async function sendPendingEmail({
	userEmail,
	userName,
	productName,
}: {
	userEmail: string;
	userName: string;
	productName: string;
}) {
	const res = await sendMail({
		to: [userEmail],
		subject: "Pending subscription",
		content: `<div>
			<h1>Welcome, ${userName}!</h1>
			<p>
				You have subscribed to the ${productName} plan without an existing account using the email ${userEmail}. Please <a href="https://rectifaid.vercel.app" target="_blank">create an account</a> with this email to access your subscription.
			</p>
			<p>Thank you for your trust!</p>
			<p>
				Rectifaid (<a href="https://rectifaid.vercel.app" target="_blank">https://rectifaid.vercel.app</a>)
			</p>
		</div>`,
	});
}
