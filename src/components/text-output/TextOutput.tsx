"use client";
import { theme, Typography } from "antd";
import { useResultStore } from "@/stores/result.store";
import "./text-output.scss";
import TextDetails from "../text-details/TextDetails";

const { useToken } = theme;

export default function TextOutput() {
	const { correctedText } = useResultStore();
	const { token } = useToken();

	return (
		<div id="text-output">
			<div
				id="output"
				style={{
					borderColor: token.colorBorder,
				}}
			>
				<Typography.Paragraph>{correctedText}</Typography.Paragraph>
			</div>
			<TextDetails
				details={[]}
				actions={[
					{
						action: () => {
							navigator.clipboard.writeText(correctedText);
						},
						label: "Copy",
						type: "default",
					},
				]}
			/>
		</div>
	);
}
