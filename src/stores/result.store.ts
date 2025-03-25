import type {} from "@/types/options";
import { create } from "zustand";
import type { ExplanationType } from "@/types/explanations";

interface StoreType {
	input: string;
	oldInput: string;
	result: {
		correctedText: string;
		explanations: ExplanationType[];
	};

	setInput: (input: string) => void;
	setOldInput: (oldInput: string) => void;
	setResult: (result: {
		correctedText: string;
		explanations: ExplanationType[];
	}) => void;
}

export const useResultStore = create<StoreType>((set) => ({
	input: "",
	oldInput: "",
	result: {
		correctedText: "",
		explanations: [],
	},

	setInput: (input) => set(() => ({ input })),
	setOldInput: (oldInput) => set(() => ({ oldInput })),
	setResult: (result) => set(() => ({ result })),
}));
