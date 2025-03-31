import { syncPlans } from "@/server/syncPlans";
import { useSettingsStore } from "@/stores/settings.store";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import PlanCard from "../plan-card/PlanCard";
import "./plans-modal.css";
import { useI18nContext } from "@/i18n/i18n-react";

export default function PlansModal() {
	const { showPlansModal, setShowPlansModal } = useSettingsStore();
	const { LL } = useI18nContext();
	const [basicUrl, setBasicUrl] = useState<string>();
	const [premiumUrl, setPremiumUrl] = useState<string>();

	useEffect(() => {
		const fetchPlans = async () => {
			const plans = await syncPlans();
			if (plans) {
				const basicPlan = plans.data.find(
					(plan: {
						attributes: { name: string; buy_now_url: string };
					}) => plan?.attributes?.name === "Basic"
				);
				const premiumPlan = plans.data.find(
					(plan: {
						attributes: { name: string; buy_now_url: string };
					}) => plan?.attributes?.name === "Premium"
				);
				if (basicPlan) {
					setBasicUrl(basicPlan.attributes.buy_now_url);
				}
				if (premiumPlan) {
					setPremiumUrl(premiumPlan.attributes.buy_now_url);
				}
			}
		};
		fetchPlans();
	}, []);

	return (
		<Modal
			open={showPlansModal}
			onCancel={() => setShowPlansModal(false)}
			wrapProps={{
				id: "plans-modal",
			}}
		>
			<div id="plans-container">
				<PlanCard
					title={LL.plans.free.title()}
					description={LL.plans.free.description()}
					price="$0/month"
					features={LL.plans.free.features().split(", ")}
					featureTitle={LL.plans.free.featureTitle()}
				/>
				<PlanCard
					title={LL.plans.basic.title()}
					description={LL.plans.basic.description()}
					price="$10/month"
					features={LL.plans.basic.features().split(", ")}
					featureTitle={LL.plans.basic.featureTitle()}
					url={basicUrl}
				/>
				<PlanCard
					title={LL.plans.premium.title()}
					description={LL.plans.premium.description()}
					price="$20/month"
					features={LL.plans.premium.features().split(", ")}
					featureTitle={LL.plans.premium.featureTitle()}
					url={premiumUrl}
				/>
			</div>
		</Modal>
	);
}
