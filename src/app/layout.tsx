import type { Metadata } from "next";
import "./globals.css";
import "./layout.css";
import type { ReactNode } from "react";
import AntdLayout from "./antd";
import Locale from "./i18n";
import "overlayscrollbars/overlayscrollbars.css";

export const metadata: Metadata = {
	title: "Rectifaid",
	description: "A tiny tool to correct your text with AI",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<AntdLayout>
					<Locale>{children}</Locale>
				</AntdLayout>
			</body>
		</html>
	);
}
