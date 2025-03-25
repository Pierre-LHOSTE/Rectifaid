"use client";
import { theme, Typography } from "antd";
import "./text-output.css";
import TextDetails from "../text-details/TextDetails";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { diffChars } from "diff";

const { useToken } = theme;

export default function TextOutput({
	originalText,
	correctedText,
}: {
	originalText: string;
	correctedText: string;
}) {
	const { token } = useToken();

	const diff = diffChars(originalText ?? "", correctedText ?? "");

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
					{diff.map((part, index) => {
						const color = part.added
							? token.colorSuccess
							: part.removed
								? token.colorError
								: token.colorTextBase;

						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: Order doesn't change here
							<span key={index} style={{ color }}>
								{part.value}
							</span>
						);
					})}
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
