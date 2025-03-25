"use client";
import { theme, Typography } from "antd";
import "./text-output.css";
import TextDetails from "../text-details/TextDetails";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { diffChars } from "diff";
import {} from "react";

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

	const renderDiffText = () => {
		return diff.map((part, index) => {
			if (part.removed) {
				return (
					<span
						key={index}
						className="removed-indicator"
						style={{
							height: token.fontSize,
							backgroundColor: token.colorError,
						}}
					>
						{/* biome-ignore lint/nursery/useConsistentCurlyBraces: Zero width space */}
						{"\u2060"}
					</span>
				);
			}

			const color = part.added ? token.colorSuccess : token.colorTextBase;
			return (
				<span key={index} style={{ color }}>
					{part.value}
				</span>
			);
		});
	};

	return (
		<div id="text-output">
			<OverlayScrollbarsComponent defer id="output" style={{ borderColor: token.colorBorder }}>
				<div id="text-output-group">
					<Typography.Paragraph style={{ whiteSpace: "pre-wrap" }} id="visual-output">
						{renderDiffText()}
					</Typography.Paragraph>
					<Typography.Paragraph style={{ whiteSpace: "pre-wrap" }} id="original-output">
						{correctedText}
					</Typography.Paragraph>
				</div>
			</OverlayScrollbarsComponent>
			<TextDetails
				details={[]}
				actions={[
					{
						action: () => navigator.clipboard.writeText(correctedText),
						label: "Copy",
						type: "default",
					},
				]}
			/>
		</div>
	);
}
