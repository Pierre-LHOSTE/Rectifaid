"use client";
import { theme, Typography } from "antd";
import "./text-output.css";
import TextDetails from "../text-details/TextDetails";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const { useToken } = theme;

export default function TextOutput({
	correctedText,
}: {
	correctedText: string;
}) {
	console.log("🚀 ~ correctedText:", correctedText);
	const { token } = useToken();

	return (
		<div id="text-output">
			<OverlayScrollbarsComponent
				defer
				id="output"
				style={{
					borderColor: token.colorBorder,
				}}
			>
				<Typography.Paragraph style={{ whiteSpace: "preserve" }}>
					{correctedText}
				</Typography.Paragraph>
			</OverlayScrollbarsComponent>
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
