"use server";
import { getUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";

export default async function checkUserTier() {
	const userSession = await getUser();
	const userId = userSession?.id;

	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			email: true,
		},
	});

	const isPendingSubscription = await prisma.pendingSubscription.findFirst({
		where: {
			userEmail: user?.email,
		},
	});

	if (isPendingSubscription) {
		await prisma.user.update({
			where: { id: userId },
			data: {
				tier: isPendingSubscription.productName.toLowerCase(),
				customerId: isPendingSubscription.customerId,
			},
		});
		await prisma.pendingSubscription.delete({
			where: { id: isPendingSubscription.id },
		});
	}
}
