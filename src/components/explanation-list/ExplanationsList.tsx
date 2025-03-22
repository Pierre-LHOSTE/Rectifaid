import type { ExplanationType } from "@/types/explanations";
import "./explanations-list.scss";
import { Divider } from "antd";
import ExplanationItem from "../explanation-item/ExplanationItem";

export default function ExplanationsList({
	explanations,
}: {
	explanations: ExplanationType[];
}) {
	return (
		<div id="explanations-list">
			{explanations.map((explanation, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: The order doesn't change
				<div key={index}>
					<ExplanationItem explanation={explanation} />
					{index < explanations.length - 1 && <Divider />}
				</div>
			))}
		</div>
	);
}
