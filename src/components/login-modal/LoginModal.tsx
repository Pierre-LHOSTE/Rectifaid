import { useI18nContext } from "@/i18n/i18n-react";
import { signIn } from "@/lib/auth-client";
import { useSettingsStore } from "@/stores/settings.store";
import { Button, message, Modal, theme, Typography } from "antd";
import { useState } from "react";
import "./login-modal.css";
import {} from "@tabler/icons-react";
import { DiscordLogo, GithubLogo, GoogleLogo } from "./brandLogoList";

const PROVIDERS = [
	{ id: "github", name: "GitHub", icon: <GithubLogo /> },
	{ id: "google", name: "Google", icon: <GoogleLogo /> },
	{ id: "discord", name: "Discord", icon: <DiscordLogo /> },
] as const;

const { useToken } = theme;

const { useMessage } = message;

type ProviderType = (typeof PROVIDERS)[number]["id"];

export default function LoginModal() {
	const [loading, setLoading] = useState(false);
	const { showLoginModal } = useSettingsStore();
	const { LL } = useI18nContext();
	const { token } = useToken();
	const [messageApi, contextHolder] = useMessage();

	async function handleLogin(provider: ProviderType) {
		try {
			const result = await signIn.social(
				{
					provider,
					// biome-ignore lint/style/useNamingConvention: <explanation>
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
			if (result.data) {
				localStorage.setItem("lastLoginProvider", provider);
			} else {
				throw new Error("Login failed");
			}
		} catch (error) {
			console.error("Login error:", error);
			messageApi.open({
				type: "error",
				content: "Error logging in.",
				duration: 3,
			});
			setLoading(false);
		}
	}

	const lastLoginProvider = localStorage.getItem("lastLoginProvider");

	return (
		<Modal open={showLoginModal} title={LL.profile.loginTitle()} footer={null} closable={false}>
			{contextHolder}
			<Typography.Paragraph>{LL.profile.loginDescription()}</Typography.Paragraph>
			<div id="login-modal">
				{PROVIDERS.map(({ id, name, icon }) => (
					<Button key={id} icon={icon} disabled={loading} onClick={() => handleLogin(id)}>
						{LL.profile.oauth({ provider: name })}
						{lastLoginProvider === id ? (
							<span
								id="last-used"
								style={{
									backgroundColor: token.colorBgBase,
									borderColor: token.colorBorder,
								}}
							>
								{LL.profile.lastUsed()}
							</span>
						) : null}
					</Button>
				))}
			</div>
		</Modal>
	);
}
