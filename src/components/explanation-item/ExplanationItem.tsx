import type { ExplanationType } from "@/types/explanations";
import { IconArrowRight, IconBulbFilled } from "@tabler/icons-react";
import { theme, Typography } from "antd";
import "./explanation-item.scss";

const { useToken } = theme;

export default function ExplanationItem({
	explanation,
}: {
	explanation: ExplanationType;
}) {
	const { token } = useToken();

	return (
		<div className="explanation-item">
			<div className="explanation-comparaison">
				<Typography.Text>
					<span
						style={{
							backgroundColor: token.colorBgLayout,
						}}
					>
						{explanation.from}
					</span>
					<IconArrowRight />
					<span
						style={{
							backgroundColor: token.colorBgLayout,
						}}
					>
						{explanation.to}
					</span>
				</Typography.Text>
			</div>
			<Typography.Paragraph className="explanation" type="secondary">
				{explanation.why}
			</Typography.Paragraph>
			<Typography.Paragraph className="tip">
				<IconBulbFilled />
				{explanation.tip}
			</Typography.Paragraph>
		</div>
	);
}
