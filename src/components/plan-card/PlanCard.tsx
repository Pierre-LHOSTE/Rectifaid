import { Button, Card, List, Typography } from "antd";
import "./plan-card.css";
import { useI18nContext } from "@/i18n/i18n-react";
import { getCheckoutUrl } from "@/server/getCheckoutURL";
import { useEffect, useState } from "react";

export default function PlanCard({
	title,
	tier,
	description,
	price,
	features,
	featureTitle,
	id,
	userTier,
}: {
	title: string;
	tier: string;
	description: string;
	price: string;
	features: string[];
	featureTitle: string;
	id: string;
	userTier?: "free" | "basic" | "premium";
}) {
	const { LL } = useI18nContext();
	const [url, setUrl] = useState<string | null>(null);

	useEffect(() => {
		async function fetchUrl() {
			const url = id === "free" ? "" : ((await getCheckoutUrl(id)) ?? "");
			setUrl(url);
		}
		fetchUrl();
	}, []);

	const isActivePlan = userTier === tier;

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

			{id !== "free" ? (
				<Button
					type="primary"
					style={{ marginTop: "10px" }}
					href={`${url}`}
					loading={isActivePlan ? false : !url}
					disabled={!url || isActivePlan}
					target="_blank"
				>
					{isActivePlan ? LL.plan.activePlanButton() : LL.plan.getPlanButton()}
				</Button>
			) : null}
		</Card>
	);
}
