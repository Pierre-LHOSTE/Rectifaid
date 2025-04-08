"use server";
import { getUser } from "@/lib/auth-session";
import { configureLemonSqueezy } from "@/lib/lemonsqueezy";
import { createCheckout, getVariant } from "@lemonsqueezy/lemonsqueezy.js";

export async function getCheckoutUrl(id: string, embed = false) {
	await configureLemonSqueezy();

	const user = await getUser();

	if (!user) {
		throw new Error("User not found");
	}

	const variant = await getVariant(id);

	if (!variant.data) {
		throw new Error("Variant not found");
	}

	const checkout = await createCheckout(
		process.env.LEMONSQUEEZY_STORE_ID ?? "",
		variant.data?.data.id,
		{
			checkoutOptions: {
				embed,
				media: false,
				logo: !embed,
			},
			checkoutData: {
				email: user.email ?? undefined,
				custom: {
					user_id: user.id,
				},
			},
		}
	);

	if (!checkout.data) {
		throw new Error("Checkout data not found");
	}

	return checkout.data?.data.attributes.url;
}
