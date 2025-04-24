import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./layout.css";
import { Analytics } from "@vercel/analytics/react";
import type { ReactNode } from "react";
import AntdLayout from "./antd";
import Locale from "./i18n";
import "overlayscrollbars/overlayscrollbars.css";
import ClientLayout from "./clientLayout";

export const metadata: Metadata = {
	title: "Rectifaid",
	description: "A tiny tool to correct your text with AI",
};

// biome-ignore lint/nursery/useComponentExportOnlyModules: <explanation>
export const viewport: Viewport = {
	initialScale: 1,
	userScalable: false,
	width: "device-width",
	height: "device-height",
	viewportFit: "cover",
	themeColor: [
		{ media: "(prefers-color-scheme: dark)", color: "#1a1d23" },
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Analytics />
				<AntdLayout>
					<Locale>
						<ClientLayout>{children}</ClientLayout>
					</Locale>
				</AntdLayout>
			</body>
		</html>
	);
}
