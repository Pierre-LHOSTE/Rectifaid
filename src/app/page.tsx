"use client";
import Header from "@/components/header/Header";
import Selector from "@/components/selector/Selector";
import TextInput from "@/components/text-input/TextInput";
import { theme } from "antd";
import "./root.scss";
import TextOutput from "@/components/text-output/TextOutput";
import ExplanationsList from "@/components/explanation-list/ExplanationsList";
import { useResultStore } from "@/stores/result.store";

const { useToken } = theme;

export default function Home() {
	const { token } = useToken();

	const { result } = useResultStore();

	return (
		<div id="root" style={{ backgroundColor: token.colorBgContainer }}>
			<Header />
			<div id="app">
				<Selector />
				<div id="content">
					<section id="top">
						<TextInput />
						<TextOutput correctedText={result.correctedText} />
					</section>
					<section
						id="bottom"
						style={{
							borderColor: token.colorBorder,
						}}
					>
						<ExplanationsList explanations={result.explanations} />
					</section>
				</div>
			</div>
		</div>
	);
}
