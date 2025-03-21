import type {} from "@/types/options";
import { create } from "zustand";
import type { ExplanationsType } from "@/types/explanations";

interface StoreType {
	correctedText: string;
	setCorrectedText: (text: string) => void;

	explanations: ExplanationsType[];
	setExplanations: (explanations: ExplanationsType[]) => void;
}

export const useResultStore = create<StoreType>((set) => ({
	correctedText: "",
	setCorrectedText: (text: string) => set({ correctedText: text }),

	explanations: [],
	setExplanations: (explanations: ExplanationsType[]) => set({ explanations }),
}));
