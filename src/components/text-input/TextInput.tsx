"use client";
import { useI18nContext } from "@/i18n/i18n-react";
import { Input } from "antd";
import "./text-input.scss";
import correctText from "@/server/correctText.action";
import { useState } from "react";
import { useOptionsStore } from "@/stores/options.store";
import { useResultStore } from "@/stores/result.store";
import TextDetails from "../text-details/TextDetails";

export default function TextInput() {
	const { LL, locale } = useI18nContext();
	const [text, setText] = useState("");
	const { selectedOptions } = useOptionsStore();
	const { setCorrectedText } = useResultStore();

	async function correct() {
		const res = await correctText(text, selectedOptions);
		setCorrectedText(res.correctedText);
	}

	return (
		<div id="text-input">
			<Input.TextArea
				lang={locale}
				placeholder={LL.textInputPlaceholder()}
				style={{
					resize: "none",
				}}
				value={text}
				onChange={(e) => {
					setText(e.target.value);
				}}
			/>
			<TextDetails
				details={[
					LL.textDetails.stats.characters(text.length),
					LL.textDetails.stats.words(
						text
							.split("\n")
							.join(" ")
							.split(" ")
							.filter((l) => l).length
					),
					LL.textDetails.stats.lines(text.split("\n").length),
				]}
				actions={[
					{
						action: correct,
						label: LL.textDetails.actions.correct(),
						type: "primary",
					},
				]}
			/>
		</div>
	);
}
