import { Button, Typography } from "antd";
import "./text-details.css";
import type { TablerIconType } from "@/types/icon";
import { Fragment } from "react";

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
		loading?: boolean;
	}[];
}) {
	return (
		<div className="text-details">
			<div>
				<Typography.Text type="secondary" ellipsis>
					{details.map((detail, index) => (
						<Fragment key={index}>
							{detail}
							{index < details.length - 1 && " • "}
						</Fragment>
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
						loading={action.loading}
					>
						{action.label}
					</Button>
				))}
			</div>
		</div>
	);
}
