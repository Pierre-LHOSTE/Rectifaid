import type {} from "@/types/options";
import { create } from "zustand";
import type { ExplanationType } from "@/types/explanations";

interface StoreType {
	result: {
		correctedText: string;
		explanations: ExplanationType[];
	};

	setResult: (result: {
		correctedText: string;
		explanations: ExplanationType[];
	}) => void;
}

export const useResultStore = create<StoreType>((set) => ({
	result: {
		correctedText: "",
		explanations: [],
	},
	setResult: (result) => set(() => ({ result })),
}));
