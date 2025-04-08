"use client";
import CardSelect from "../card/CardSelect";
import "./selector.css";
import { optionDefinitions } from "@/config/options";
import { useI18nContext } from "@/i18n/i18n-react";
import { useSettingsStore } from "@/stores/settings.store";
import { Button, Modal } from "antd";

export default function Selector() {
	const { LL } = useI18nContext();
	const { isMobile, setShowOptionsModal, showOptionsModal } = useSettingsStore();

	return (
		<>
			{isMobile ? (
				<div id="mobile-selector">
					<Button type="primary" size="large" onClick={() => setShowOptionsModal(true)}>
						{LL.card.openSelect()}
					</Button>
					<Modal
						open={showOptionsModal}
						onCancel={() => setShowOptionsModal(false)}
						footer={
							<Button type="primary" size="large" onClick={() => setShowOptionsModal(false)}>
								{LL.basic.close()}
							</Button>
						}
						title={LL.card.title()}
					>
						<div id="selector">
							<CardSelect
								title={LL.card.minimal.title()}
								description={LL.card.minimal.description()}
								options={[...optionDefinitions.minimal]}
								id="minimal"
							/>
							<CardSelect
								title={LL.card.moderate.title()}
								description={LL.card.moderate.description()}
								options={[...optionDefinitions.moderate]}
								id="moderate"
							/>
							<CardSelect
								title={LL.card.heavy.title()}
								description={LL.card.heavy.description()}
								options={[...optionDefinitions.heavy]}
								id="heavy"
							/>
						</div>
					</Modal>
				</div>
			) : (
				<div id="selector">
					<CardSelect
						title={LL.card.minimal.title()}
						description={LL.card.minimal.description()}
						options={[...optionDefinitions.minimal]}
						id="minimal"
					/>
					<CardSelect
						title={LL.card.moderate.title()}
						description={LL.card.moderate.description()}
						options={[...optionDefinitions.moderate]}
						id="moderate"
					/>
					<CardSelect
						title={LL.card.heavy.title()}
						description={LL.card.heavy.description()}
						options={[...optionDefinitions.heavy]}
						id="heavy"
					/>
				</div>
			)}
		</>
	);
}
