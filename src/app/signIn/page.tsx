"use client";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { Button, Card } from "antd";

export default function SignIn() {
	const [loading, setLoading] = useState(false);

	return (
		<Card title="Sign In">
			<div>
				<div>
					<Button
						disabled={loading}
						onClick={async () => {
							await signIn.social(
								{
									provider: "google",
									callbackURL: "/",
								},
								{
									onRequest: (ctx) => {
										setLoading(true);
									},
									onResponse: (ctx) => {
										setLoading(false);
									},
								}
							);
						}}
					>
						Sign in with Google
					</Button>
					<Button
						disabled={loading}
						onClick={async () => {
							await signIn.social(
								{
									provider: "github",
									callbackURL: "/",
								},
								{
									onRequest: (ctx) => {
										setLoading(true);
									},
									onResponse: (ctx) => {
										setLoading(false);
									},
								}
							);
						}}
					>
						Sign in with Github
					</Button>
					<Button
						disabled={loading}
						onClick={async () => {
							await signIn.social(
								{
									provider: "discord",
									callbackURL: "/",
								},
								{
									onRequest: (ctx) => {
										setLoading(true);
									},
									onResponse: (ctx) => {
										setLoading(false);
									},
								}
							);
						}}
					>
						Sign in with Discord
					</Button>
				</div>
			</div>
		</Card>
	);
}
