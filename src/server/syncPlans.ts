// src/app/actions.ts
"use server";
import { configureLemonSqueezy } from "@/lib/lemonsqueezy";
import { listProducts } from "@lemonsqueezy/lemonsqueezy.js";

export async function syncPlans() {
	configureLemonSqueezy();
	const products = await listProducts({
		/* parameters */
	});
	return products.data;
}
