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
	selectedOptions: {
		minimal: new Set(["spelling", "punctuation", "anglicisms"]),
		moderate: new Set([]),
		heavy: new Set([]),
	},
	selectOption: (category: CategoryType, option: CategoryOptions) => {
		set((state) => {
			const newCardOptions = { ...state.selectedOptions };
			if (!newCardOptions[category].has(option)) {
				newCardOptions[category].add(option);
			}
			if (category === "heavy" && newCardOptions.moderate.size === 0) {
				const moderateOptions = optionDefinitions.moderate;
				newCardOptions.moderate = new Set(moderateOptions);
			}
			return { selectedOptions: newCardOptions };
		});
	},

	deselectOption: (category: CategoryType, option: CategoryOptions) => {
		set((state) => {
			if (category === "minimal" && state.selectedOptions[category].size === 1) {
				return state;
			}
			const newCardOptions = { ...state.selectedOptions };
			newCardOptions[category].delete(option);
			return { selectedOptions: newCardOptions };
		});
	},

	selectAllOptions: (category: CategoryType) => {
		set((state) => {
			const newCardOptions = { ...state.selectedOptions };
			const options = optionDefinitions[category];
			newCardOptions[category] = new Set(options);
			if (category === "heavy" && newCardOptions.moderate.size === 0) {
				const moderateOptions = optionDefinitions.moderate;
				newCardOptions.moderate = new Set(moderateOptions);
			}
			return { selectedOptions: newCardOptions };
		});
	},

	deselectAllOptions: (category: CategoryType) => {
		set((state) => {
			const newCardOptions = { ...state.selectedOptions };
			if (category === "minimal") {
				newCardOptions[category] = new Set(["spelling"]);
			} else {
				newCardOptions[category] = new Set();
			}
			return { selectedOptions: newCardOptions };
		});
	},
}));
