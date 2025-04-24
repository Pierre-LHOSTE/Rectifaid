"use client";
import Header from "@/components/header/Header";
import LoginModal from "@/components/login-modal/LoginModal";
import PlansModal from "@/components/plans-modal/PlansModal";
import { getUser } from "@/lib/auth-session";
import checkUserTier from "@/server/checkUserTier";
import { useSettingsStore } from "@/stores/settings.store";
import { theme } from "antd";
import { type ReactNode, useEffect, useState } from "react";

const { useToken } = theme;

export default function Layout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const { token } = useToken();
	const { isMobile, setIsMobile, setShowLoginModal, showLoginModal } = useSettingsStore();
	const [user, setUser] = useState<Awaited<ReturnType<typeof getUser>>>(undefined);

	useEffect(() => {
		const fetchUser = async () => {
			const userData = await getUser();
			if (userData) {
				setShowLoginModal(false);
			} else {
				setShowLoginModal(true);
			}
			setUser(userData);
		};
		fetchUser();
		checkUserTier();
	}, [showLoginModal]);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div
			id="root"
			style={{ backgroundColor: token.colorBgContainer }}
			className={isMobile ? "mobile" : ""}
		>
			<Header user={user} />
			<LoginModal />
			<PlansModal />
			<div id="app" style={{ display: "flex", flexDirection: isMobile ? "column-reverse" : "row" }}>
				{children}
			</div>
		</div>
	);
}
