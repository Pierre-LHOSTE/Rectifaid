"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getUser() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	return session?.user;
}
