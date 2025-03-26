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
	startTime: number;
	endTime: number;

	setInput: (input: string) => void;
	setOldInput: (oldInput: string) => void;
	setResult: (result: {
		correctedText: string;
		explanations: ExplanationType[];
	}) => void;
	setStartTime: (startTime: number) => void;
	setEndTime: (endTime: number) => void;
}

export const useResultStore = create<StoreType>((set) => ({
	input: "",
	oldInput: "",
	result: {
		correctedText: "",
		explanations: [],
	},
	startTime: 0,
	endTime: 0,

	setInput: (input) => set(() => ({ input })),
	setOldInput: (oldInput) => set(() => ({ oldInput })),
	setResult: (result) => set(() => ({ result })),
	setStartTime: (startTime) => set(() => ({ startTime })),
	setEndTime: (endTime) => set(() => ({ endTime })),
}));
