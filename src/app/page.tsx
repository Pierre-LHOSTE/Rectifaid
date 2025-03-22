"use client";
import Header from "@/components/header/Header";
import Selector from "@/components/selector/Selector";
import TextInput from "@/components/text-input/TextInput";
import { Splitter, theme } from "antd";
import ExplanationsList from "@/components/explanation-list/ExplanationsList";
import TextOutput from "@/components/text-output/TextOutput";
import { useResultStore } from "@/stores/result.store";

const { useToken } = theme;

export default function Home() {
	const { token } = useToken();

	const { result } = useResultStore();

	return (
		<div id="root" style={{ backgroundColor: token.colorBgContainer }}>
			<Header />
			<div id="app">
				<Splitter>
					<Splitter.Panel style={{ minWidth: "380px" }} defaultSize={400}>
						<Selector />
					</Splitter.Panel>
					<Splitter.Panel>
						<div id="content">
							<Splitter layout="vertical">
								<Splitter.Panel defaultSize="60%">
									<section id="top">
										<TextInput />
										<TextOutput correctedText={result.correctedText} />
									</section>
								</Splitter.Panel>
								<Splitter.Panel>
									<section id="bottom">
										<ExplanationsList explanations={result.explanations} />
									</section>
								</Splitter.Panel>
							</Splitter>
						</div>
					</Splitter.Panel>
				</Splitter>
			</div>
		</div>
	);
}
