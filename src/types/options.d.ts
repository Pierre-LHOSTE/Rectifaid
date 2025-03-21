import type { optionDefinitions } from "@/config/options";

export type OptionDefinitions = typeof optionDefinitions;
export type CategoryType = keyof OptionDefinitions;
export type CategoryOptions<T extends CategoryType = CategoryType> = OptionDefinitions[T][number];

export type SelectedOptionsType = Map<CategoryType, Set<CategoryOptions>>;
