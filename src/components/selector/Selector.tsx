"use client";
import { theme } from "antd";
import CardSelect from "../card/CardSelect";
import "./selector.scss";
import { optionDefinitions } from "@/config/options";

const { useToken } = theme;

export default function Selector() {
	const { token } = useToken();

	return (
		<div id="selector" style={{ backgroundColor: token.colorBgContainer }}>
			<CardSelect
				title="Modifications minimes"
				description="Ces changements corrigent des erreurs sans affecter le style ni la structure."
				options={[...optionDefinitions.minimal]}
				id="minimal"
			/>
			<CardSelect
				title="Modifications légères"
				description="On commence à toucher à la structure, mais le texte reste très fidèle à l’original."
				options={[...optionDefinitions.moderate]}
				id="moderate"
			/>
			<CardSelect
				title="Modifications majeures"
				description="Ici, on transforme le texte de manière plus significative."
				options={[...optionDefinitions.heavy]}
				id="heavy"
			/>
		</div>
	);
}
