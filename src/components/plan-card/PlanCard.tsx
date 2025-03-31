import { Button, Card, List, Typography } from "antd";
import "./plan-card.css";
import { useI18nContext } from "@/i18n/i18n-react";
import { useSession } from "@/lib/auth-client";

export default function PlanCard({
	title,
	description,
	price,
	features,
	url,
	featureTitle,
}: {
	title: string;
	description: string;
	price: string;
	features: string[];
	url?: string;
	featureTitle: string;
}) {
	const { LL } = useI18nContext();
	const { data } = useSession();
	const user = data?.user;

	if (!user) {
		return null;
	}

	// const tier = user.tier;

	return (
		<Card
			className="plan-card"
			title={
				<>
					<span>{title}</span>
					<span>{price}</span>
				</>
			}
			style={{ width: 300, margin: "10px" }}
		>
			<Typography.Paragraph type="secondary">{description}</Typography.Paragraph>

			<List header={featureTitle}>
				{features.map((feature, index) => (
					<List.Item key={index}>
						<Typography.Text>{feature}</Typography.Text>
					</List.Item>
				))}
			</List>

			<Button
				type="primary"
				style={{ marginTop: "10px" }}
				href={`${url}

			`}
				target="_blank"
			>
				{LL.plan.getPlanButton()}
			</Button>
		</Card>
	);
}
