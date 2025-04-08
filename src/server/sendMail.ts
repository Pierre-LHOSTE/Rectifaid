"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendMail({
	to,
	subject,
	content,
}: {
	to: string[];
	subject: string;
	content: string;
}) {
	const res = await resend.emails.send({
		from: "rectifaid@212.lol",
		to,
		subject,
		html: content,
	});
	return res;
}
