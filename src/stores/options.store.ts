import type { CategoryOptions, CategoryType, SelectedOptionsType } from "@/types/options";
import { create } from "zustand";
import { optionDefinitions } from "@/config/options";

interface StoreType {
	selectedOptions: SelectedOptionsType;

	selectOption: (category: CategoryType, option: CategoryOptions) => void;
	deselectOption: (category: CategoryType, option: CategoryOptions) => void;

	selectAllOptions: (category: CategoryType) => void;
	deselectAllOptions: (category: CategoryType) => void;
}

export const useOptionsStore = create<StoreType>((set) => ({
	selectedOptions: new Map([
		["minimal", new Set(["spelling", "punctuation", "anglicisms"])],
		["moderate", new Set([])],
		["heavy", new Set([])],
	]),

	selectOption: (category: CategoryType, option: CategoryOptions) => {
		set((state) => {
			const newCardOptions = new Map(state.selectedOptions);
			newCardOptions.get(category)?.add(option);
			if (category === "heavy" && state.selectedOptions.get("moderate")?.size === 0) {
				const moderateOptions = optionDefinitions.moderate;
				newCardOptions.set("moderate", new Set(moderateOptions));
			}
			return { selectedOptions: newCardOptions };
		});
	},
	deselectOption: (category: CategoryType, option: CategoryOptions) => {
		set((state) => {
			if (category === "minimal" && state.selectedOptions.get(category)?.size === 1) {
				return state;
			}
			const newCardOptions = new Map(state.selectedOptions);
			newCardOptions.get(category)?.delete(option);
			return { selectedOptions: newCardOptions };
		});
	},

	selectAllOptions: (category: CategoryType) => {
		set((state) => {
			const newCardOptions = new Map(state.selectedOptions);
			const options = optionDefinitions[category];
			newCardOptions.set(category, new Set(options));
			if (category === "heavy" && state.selectedOptions.get("moderate")?.size === 0) {
				const moderateOptions = optionDefinitions.moderate;
				newCardOptions.set("moderate", new Set(moderateOptions));
			}
			return { selectedOptions: newCardOptions };
		});
	},

	deselectAllOptions: (category: CategoryType) => {
		set((state) => {
			const newCardOptions = new Map(state.selectedOptions);
			if (category === "minimal") {
				newCardOptions.set(category, new Set(["spelling"]));
			} else {
				newCardOptions.set(category, new Set());
			}
			return { selectedOptions: newCardOptions };
		});
	},
}));
