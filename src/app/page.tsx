"use client";
import Header from "@/components/header/Header";
import Selector from "@/components/selector/Selector";
import TextInput from "@/components/text-input/TextInput";
import { theme } from "antd";
import "./root.scss";

const { useToken } = theme;

export default function Home() {
	const { token } = useToken();
	return (
		<div id="root" style={{ backgroundColor: token.colorBgContainer }}>
			<Header />
			<div id="app">
				<Selector />
				<div id="content">
					<section id="top">
						<TextInput />
						<p>result</p>
					</section>
					<section id="bottom">
						<p>explanation</p>
					</section>
				</div>
			</div>
		</div>
	);
}
