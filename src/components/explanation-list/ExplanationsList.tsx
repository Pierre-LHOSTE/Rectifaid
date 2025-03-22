import type { ExplanationType } from "@/types/explanations";
import "./explanations-list.scss";
import ExplanationItem from "../explanation-item/ExplanationItem";
import { Divider } from "antd";

export default function ExplanationsList({
	explanations,
}: {
	explanations: ExplanationType[];
}) {
	return (
		<div id="explanations-list">
			{explanations.map((explanation, index) => (
				<>
					{/* biome-ignore lint/suspicious/noArrayIndexKey: The order doesn't change */}
					<ExplanationItem key={index} explanation={explanation} />
					{index < explanations.length - 1 && <Divider />}
				</>
			))}
		</div>
	);
}
