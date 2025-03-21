import type { SelectedOptionsType, CategoryType } from "@/types/options";

export function getActiveCategory(selectedOptions: SelectedOptionsType): CategoryType {
	if (selectedOptions.heavy.size > 0) {
		return "heavy";
	}
	if (selectedOptions.moderate.size > 0) {
		return "moderate";
	}
	return "minimal";
}
