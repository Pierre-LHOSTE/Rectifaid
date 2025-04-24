"use client";
import ExplanationsList from "@/components/explanation-list/ExplanationsList";
import Selector from "@/components/selector/Selector";
import TextInput from "@/components/text-input/TextInput";
import TextOutput from "@/components/text-output/TextOutput";
import { useResultStore } from "@/stores/result.store";
import { useSettingsStore } from "@/stores/settings.store";
import { Splitter } from "antd";

export default function TextPage() {
	const { result, oldInput, startTime, endTime } = useResultStore();
	const { isMobile } = useSettingsStore();

	return (
		<>
			{isMobile ? (
				<>
					<Selector />
					<div id="content">
						<section id="top" style={{ flexDirection: "column" }}>
							<TextInput />
							<TextOutput
								originalText={oldInput}
								correctedText={result.correctedText}
								startTime={startTime}
								endTime={endTime}
							/>
						</section>
						<section id="bottom">
							<ExplanationsList explanations={result.explanations} />
						</section>
					</div>
				</>
			) : (
				<Splitter>
					<Splitter.Panel style={{ minWidth: "380px" }} defaultSize={400}>
						<Selector />
					</Splitter.Panel>
					<Splitter.Panel>
						<div id="content">
							<Splitter layout="vertical">
								<Splitter.Panel defaultSize="60%">
									<section id="top" style={{ flexDirection: "row" }}>
										<TextInput />
										<TextOutput
											originalText={oldInput}
											correctedText={result.correctedText}
											startTime={startTime}
											endTime={endTime}
										/>
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
			)}
		</>
	);
}
