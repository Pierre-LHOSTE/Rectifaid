"use client";
import { theme } from "antd";
import CardSelect from "../card/CardSelect";
import "./selector.scss";
import { optionDefinitions } from "@/config/options";
import { useI18nContext } from "@/i18n/i18n-react";

const { useToken } = theme;

export default function Selector() {
	const { token } = useToken();
	const { LL } = useI18nContext();

	return (
		<div id="selector" style={{ borderColor: token.colorBorder }}>
			<CardSelect
				title={LL.card.minimal.title()}
				description={LL.card.minimal.description()}
				options={[...optionDefinitions.minimal]}
				id="minimal"
			/>
			<CardSelect
				title={LL.card.moderate.title()}
				description={LL.card.moderate.description()}
				options={[...optionDefinitions.moderate]}
				id="moderate"
			/>
			<CardSelect
				title={LL.card.heavy.title()}
				description={LL.card.heavy.description()}
				options={[...optionDefinitions.heavy]}
				id="heavy"
			/>
		</div>
	);
}
