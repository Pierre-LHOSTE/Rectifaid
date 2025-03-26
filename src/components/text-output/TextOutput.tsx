"use client";
import { theme, Typography } from "antd";
import "./text-output.css";
import TextDetails from "../text-details/TextDetails";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { diffChars } from "diff";
import {} from "react";
import { IconCopy } from "@tabler/icons-react";
import { useI18nContext } from "@/i18n/i18n-react";

const { useToken } = theme;

export default function TextOutput({
	originalText,
	correctedText,
	startTime,
	endTime,
}: {
	originalText: string;
	correctedText: string;
	startTime: number;
	endTime: number;
}) {
	const { token } = useToken();
	const diff = diffChars(originalText ?? "", correctedText ?? "");
	const { LL } = useI18nContext();

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

			const color = part.added ? token.colorInfoText : token.colorTextBase;
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
				details={[
					LL.textDetails.stats.characters(correctedText.length),
					LL.textDetails.stats.words(
						correctedText
							.split("\n")
							.join(" ")
							.split(" ")
							.filter((l) => l).length
					),
					LL.textDetails.stats.lines(correctedText.split("\n").length),
					startTime > 0 && endTime > 0 ? `${((endTime - startTime) / 1000).toFixed(1)}s` : "",
				]}
				actions={[
					{
						action: () => navigator.clipboard.writeText(correctedText),
						label: "Copy",
						type: "default",
						icon: IconCopy,
					},
				]}
			/>
		</div>
	);
}
