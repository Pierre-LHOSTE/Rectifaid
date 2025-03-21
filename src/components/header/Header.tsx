"use client";
import { theme, Typography } from "antd";
import "./header.scss";

const { useToken } = theme;

export default function Header() {
	const { token } = useToken();

	return (
		<header id="header" style={{ borderColor: token.colorBorder }}>
			<Typography.Title>AI-REWRITE</Typography.Title>
		</header>
	);
}
