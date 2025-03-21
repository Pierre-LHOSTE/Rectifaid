"use client";
import Header from "@/components/header/Header";
import Selector from "@/components/selector/Selector";
import TextInput from "@/components/text-input/TextInput";
import { theme } from "antd";
import "./root.scss";
import TextOutput from "@/components/text-output/TextOutput";

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
						<TextOutput />
					</section>
					<section id="bottom">
						<p>explanation</p>
					</section>
				</div>
			</div>
		</div>
	);
}
