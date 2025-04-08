"use server";
import { configureLemonSqueezy } from "@/lib/lemonsqueezy";
import { getCustomer } from "@lemonsqueezy/lemonsqueezy.js";

export default async function getCustomerPortal(customerId: number) {
	try {
		configureLemonSqueezy();

		const customer = await getCustomer(customerId);

		const customerPortal = customer.data?.data.attributes?.urls?.customer_portal;

		if (!customerPortal) {
			return { error: "No customer portal URL available" };
		}

		return { url: customerPortal };
	} catch (error) {
		console.error("Error fetching customer portal URL:", error);
		return { error: "Something went wrong" };
	}
}
