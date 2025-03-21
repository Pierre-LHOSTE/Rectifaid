import type { optionDefinitions } from "@/config/options";

type OptionDefinitionsType = typeof optionDefinitions;

export type CategoryType = keyof OptionDefinitionsType;
export type CategoryOptions = OptionDefinitionsType[CategoryType][number];

export type SelectedOptionsType = Map<CategoryType, Set<CategoryOptions>>;
