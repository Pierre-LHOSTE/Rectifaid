"use client";
import { Button, Dropdown, type MenuProps, theme, Typography } from "antd";
import "./header.css";
import type { getUser } from "@/lib/auth-session";
import { useSettingsStore } from "@/stores/settings.store";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { IconLogout, IconRocket, IconSettings, IconUser } from "@tabler/icons-react";
import { useI18nContext } from "@/i18n/i18n-react";

const { useToken } = theme;

export default function Header({
	user,
}: {
	user: Awaited<ReturnType<typeof getUser>>;
}) {
	const { token } = useToken();
	const { setShowLoginModal, setShowPlansModal } = useSettingsStore();
	const { LL } = useI18nContext();

	function handleLogin() {
		setShowLoginModal(true);
	}

	async function handleLogout() {
		await authClient.signOut({});
		window.location.reload();
	}

	const items: MenuProps["items"] = [
		{
			key: "plans",
			label: user?.tier !== "free" ? LL.plan.managePlanButton() : LL.plan.upgradeButton(),
			icon: user?.tier !== "free" ? <IconSettings size={18} /> : <IconRocket size={18} />,
			onClick: () => {
				setShowPlansModal(true);
			},
		},
		// {
		// 	key: "settings",
		// 	label: "Settings",
		// 	icon: <IconSettings size={18} />,
		// },
		// {
		// 	type: "divider",
		// },
		// {
		// 	key: "plan",
		// 	label: (
		// 		<div id="user-plan">
		// 			<Typography.Text>{LL.plan.free()}</Typography.Text>
		// 			<Typography.Text type="secondary" style={{ marginLeft: 8 }}>
		// 				{LL.plan.upgradeDescription()}
		// 			</Typography.Text>
		// 		</div>
		// 	),
		// },
		// {
		// 	type: "divider",
		// },
		{
			key: "logout",
			danger: true,
			label: LL.profile.logout(),
			onClick: handleLogout,
			icon: <IconLogout size={18} />,
		},
	];

	return (
		<header id="header" style={{ borderColor: token.colorBorder }}>
			<Typography.Title>
				<Image src="/icon.svg" alt="Logo" width={42} height={42} />
				Rectifaid
			</Typography.Title>
			<div id="user-profile">
				{user ? (
					<Dropdown
						menu={{ items, id: "header-dropdown" }}
						trigger={["click"]}
						placement="bottomRight"
					>
						<Button size="large">
							{user.image ? (
								<Image src={user.image || ""} alt="User Image" width={32} height={32} />
							) : (
								<div id="no-image">
									<IconUser size={24} />
								</div>
							)}
							<Typography.Text>{user.name}</Typography.Text>
						</Button>
					</Dropdown>
				) : (
					<Button type="primary" onClick={handleLogin}>
						Sign in
					</Button>
				)}
			</div>
		</header>
	);
}
