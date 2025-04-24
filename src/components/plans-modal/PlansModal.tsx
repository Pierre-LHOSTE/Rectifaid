"use client";
import { syncPlans } from "@/server/syncPlans";
import { useSettingsStore } from "@/stores/settings.store";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import PlanCard from "../plan-card/PlanCard";
import "./plans-modal.css";
import { useI18nContext } from "@/i18n/i18n-react";
import { useSession } from "@/lib/auth-client";
import getCustomerPortal from "@/server/getCustomerPortal";

export default function PlansModal() {
	const { showPlansModal, setShowPlansModal } = useSettingsStore();
	const { LL } = useI18nContext();
	const [basicPlanId, setBasicPlanId] = useState<string>();
	const [premiumPlanId, setPremiumPlanId] = useState<string>();
	const [customerPortalUrl, setCustomerPortalUrl] = useState<string | null>(null);

	const { data } = useSession();
	const user = data?.user;

	const tier = (user?.tier as "free" | "basic" | "premium") || "free";

	useEffect(() => {
		const fetchPlans = async () => {
			const plans = await syncPlans();
			const portalUrl = user?.customerId ? await getCustomerPortal(user.customerId) : null;

			if (portalUrl?.url) setCustomerPortalUrl(portalUrl.url);

			if (plans) {
				const basicPlan = plans.find(
					(plan: {
						id: string;
						name: string;
						price: number | undefined;
						variantId: string | undefined;
					}) => plan.name === "Basic"
				);
				const premiumPlan = plans.find(
					(plan: {
						id: string;
						name: string;
						price: number | undefined;
						variantId: string | undefined;
					}) => plan.name === "Premium"
				);
				if (basicPlan) {
					setBasicPlanId(basicPlan.variantId);
				}
				if (premiumPlan) {
					setPremiumPlanId(premiumPlan.variantId);
				}
			}
		};
		fetchPlans();
	}, [user]);

	return (
		<Modal
			open={showPlansModal}
			onCancel={() => setShowPlansModal(false)}
			wrapProps={{
				id: "plans-modal",
			}}
		>
			<div id="plans-container">
				{basicPlanId && premiumPlanId ? (
					<>
						<PlanCard
							title={LL.plans.free.title()}
							tier="free"
							description={LL.plans.free.description()}
							price="$0/month"
							features={LL.plans.free.features().split(", ")}
							featureTitle={LL.plans.free.featureTitle()}
							id="free"
							userTier={tier}
						/>
						<PlanCard
							title={LL.plans.basic.title()}
							tier="basic"
							description={LL.plans.basic.description()}
							price="$10/month"
							features={LL.plans.basic.features().split(", ")}
							featureTitle={LL.plans.basic.featureTitle()}
							id={basicPlanId}
							userTier={tier}
						/>
						<PlanCard
							title={LL.plans.premium.title()}
							tier="premium"
							description={LL.plans.premium.description()}
							price="$20/month"
							features={LL.plans.premium.features().split(", ")}
							featureTitle={LL.plans.premium.featureTitle()}
							id={premiumPlanId}
							userTier={tier}
						/>
					</>
				) : (
					<div className="loading">{LL.basic.loading()}</div>
				)}
			</div>
			{customerPortalUrl ? (
				<Button type="link" href={customerPortalUrl} target="_blank">
					{LL.plan.managePlanButton()}
				</Button>
			) : null}
		</Modal>
	);
}
