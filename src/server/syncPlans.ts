"use server";

import { configureLemonSqueezy } from "@/lib/lemonsqueezy";
import { listProducts, type Variant } from "@lemonsqueezy/lemonsqueezy.js";

export async function syncPlans() {
	configureLemonSqueezy();

	const products = await listProducts({
		filter: { storeId: process.env.LEMONSQUEEZY_STORE_ID },
		include: ["variants"],
	});

	// Return empty array if products data is not available
	if (!products.data?.data) {
		console.warn("No products data available from LemonSqueezy");
		return [];
	}

	const allVariants = products.data?.included as Variant["data"][] | undefined;

	const data = products.data.data.map((product) => {
		const variantIds = product.relationships.variants.data as Variant["data"][];
		const variants = allVariants?.filter((variant) => variantIds.some((v) => v.id === variant.id));
		const defaultVariant = (variants ?? []).find(
			(variant) => (variant.attributes.name.toLowerCase() ?? "") === "default"
		);

		return {
			id: product.id,
			name: product.attributes.name,
			price: defaultVariant?.attributes.price,
			variantId: defaultVariant?.id,
		};
	});

	return data;
}
