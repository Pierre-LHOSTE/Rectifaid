import { useI18nContext } from "@/i18n/i18n-react";
import { Button, Input, Typography } from "antd";
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
			<div id="input-details">
				<div id="input-details-stats">
					<Typography.Text type="secondary">
						{/* biome-ignore lint/nursery/useConsistentCurlyBraces: Need space between words */}
						{LL.inputDetails.stats.characters(text.length)} •{" "}
						{/* biome-ignore lint/nursery/useConsistentCurlyBraces: Need space between words */}
						{LL.inputDetails.stats.words(text.split(" ").filter((l) => l).length)} •{" "}
						{LL.inputDetails.stats.lines(text.split("\n").length)}
					</Typography.Text>
				</div>

				<Button
					onClick={() => {
						correctText(text, selectedOptions);
					}}
					type="primary"
				>
					{LL.correctTextButton()}
				</Button>
			</div>
		</div>
	);
}
