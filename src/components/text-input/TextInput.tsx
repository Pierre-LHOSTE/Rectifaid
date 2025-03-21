import { useI18nContext } from "@/i18n/i18n-react";
import { Button, Input } from "antd";
import "./text-input.scss";
import correctText from "@/server/correctText";
import { useState } from "react";
import { useOptionsStore } from "@/stores/options.store";

export default function TextInput() {
	const { LL, locale } = useI18nContext();
	const [text, setText] = useState("");
	const { selectedOptions } = useOptionsStore();

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
			<Button
				onClick={() => {
					correctText(text, selectedOptions);
				}}
			>
				{LL.correctTextButton()}
			</Button>
		</div>
	);
}
