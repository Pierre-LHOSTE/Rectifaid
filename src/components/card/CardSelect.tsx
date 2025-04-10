import { Checkbox, type CheckboxChangeEvent, type GlobalToken, Typography, theme } from "antd";
import "./card-select.css";
import type { CategoryType, CategoryOptions } from "@/types/options";
import { useOptionsStore } from "@/stores/options.store";
import c from "classnames";
import { useI18nContext } from "@/i18n/i18n-react";
import { getActiveCategory } from "@/utils/getActiveCategory";

const { useToken } = theme;

export default function CardSelect({
	title,
	description,
	options,
	id,
}: {
	title: string;
	description: string;
	options: CategoryOptions[];
	id: CategoryType;
}) {
	const { LL } = useI18nContext();
	const { token } = useToken();
	const { selectedOptions, selectOption, deselectOption, selectAllOptions, deselectAllOptions } =
		useOptionsStore();

	const selectedCard = getActiveCategory(selectedOptions);
	const isSelected = selectedCard === id;

	const isForcedSelected = getIsForcedSelected(id, selectedCard);

	const selectedOptionArray: CategoryOptions[] = selectedOptions[id]
		? Array.from(selectedOptions[id] as Set<CategoryOptions>)
		: [];

	function handleCheckAll(e: CheckboxChangeEvent) {
		e.stopPropagation();

		if (!isSelected) {
			switch (id) {
				case "minimal":
					deselectAllOptions("moderate");
					deselectAllOptions("heavy");
					selectAllOptions("minimal");
					break;
				case "moderate":
					deselectAllOptions("heavy");
					selectAllOptions("moderate");
					break;

				case "heavy":
					selectAllOptions("heavy");
					break;

				default:
					break;
			}
			return;
		}

		const size = selectedOptionArray.length;

		if (e.target.checked || (size > 0 && size < options.length)) {
			selectAllOptions(id);
		} else {
			deselectAllOptions(id);
		}
	}

	const handleCheckbox = (e: CheckboxChangeEvent, id: CategoryType, value: CategoryOptions) => {
		e.stopPropagation();

		e.target.checked ? selectOption(id, value) : deselectOption(id, value);
	};

	function handleStopPropagation(e: {
		stopPropagation: () => void;
	}) {
		e.stopPropagation();
	}

	return (
		<div
			className={c("card-select", { selected: isSelected })}
			style={{
				backgroundColor: getBackgroundColor(isSelected, isForcedSelected, token),
				borderColor: getBorderColor(isSelected, isForcedSelected, token),
			}}
		>
			<Typography.Title level={4}>
				<Checkbox
					checked={isSelected || isForcedSelected}
					indeterminate={
						(selectedOptionArray.length > 0 || isForcedSelected) &&
						selectedOptionArray.length < options.length
					}
					onChange={handleCheckAll}
					onClick={handleStopPropagation}
				>
					<Typography.Text onClick={handleStopPropagation}>{title}</Typography.Text>
				</Checkbox>
			</Typography.Title>
			<Typography.Paragraph type="secondary">{description}</Typography.Paragraph>
			<div className="card-options">
				{options.map((value) => (
					<Checkbox
						key={value}
						checked={selectedOptionArray.includes(value)}
						onClick={handleStopPropagation}
						onChange={(e) => handleCheckbox(e, id, value)}
					>
						<Typography.Text onClick={handleStopPropagation}>{LL.options[value]()}</Typography.Text>
					</Checkbox>
				))}
			</div>
		</div>
	);
}

function getBackgroundColor(isSelected: boolean, isForcedSelected: boolean, token: GlobalToken) {
	if (isSelected) return token.colorPrimaryBg;
	if (isForcedSelected) return token.colorBgContainerDisabled;
	return token.colorBgContainer;
}

function getBorderColor(isSelected: boolean, isForcedSelected: boolean, token: GlobalToken) {
	if (isSelected) return token.colorPrimaryBorder;
	if (isForcedSelected) return token.colorBgContainerDisabled;
	return token.colorBorder;
}

function getIsForcedSelected(id: CategoryType, selectedCard: CategoryType) {
	if (selectedCard === "minimal") return false;
	if (selectedCard === "moderate") {
		if (id === "minimal") return true;
		return false;
	}
	if (selectedCard === "heavy") {
		if (id === "minimal" || id === "moderate") return true;
		return false;
	}
	return false;
}
