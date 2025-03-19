"use client";
import darkTheme from "@/themes/dark";
import lightTheme from "@/themes/light";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { type ReactNode, useEffect, useState } from "react";
import "@ant-design/v5-patch-for-react-19";

const AntdLayout = ({ children }: { children: ReactNode }) => {
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	useEffect(() => {
		const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
		setIsDarkTheme(matchMedia.matches);

		const handler = (e: MediaQueryListEvent) => setIsDarkTheme(e.matches);
		matchMedia.addEventListener("change", handler);

		return () => matchMedia.removeEventListener("change", handler);
	}, []);

	return (
		<AntdRegistry>
			<ConfigProvider theme={isDarkTheme ? darkTheme : lightTheme}>{children}</ConfigProvider>
		</AntdRegistry>
	);
};

export default AntdLayout;
