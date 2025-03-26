import { Button, Typography } from "antd";
import "./text-details.css";
import type { TablerIconType } from "@/types/icon";

export default function TextDetails({
	details,
	actions,
}: {
	details: string[];
	actions: {
		action: () => void;
		label: string;
		type: "primary" | "default";
		icon?: TablerIconType;
	}[];
}) {
	return (
		<div className="text-details">
			<div>
				<Typography.Text type="secondary">
					{details.map((detail, index) => (
						<span key={index}>
							<Typography.Text type="secondary">{detail}</Typography.Text>
							{index < details.length - 1 && " • "}
						</span>
					))}
				</Typography.Text>
			</div>

			<div>
				{actions.map((action, index) => (
					<Button
						key={index}
						type={action.type}
						onClick={action.action}
						icon={action.icon ? <action.icon size={16} /> : undefined}
					>
						{action.label}
					</Button>
				))}
			</div>
		</div>
	);
}
