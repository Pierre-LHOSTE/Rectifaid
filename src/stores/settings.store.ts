import type {} from "@/types/options";
import { create } from "zustand";

interface StoreType {
	isMobile: boolean;
	setIsMobile: (isMobile: boolean) => void;
	showOptionsModal: boolean;
	setShowOptionsModal: (showOptionsModal: boolean) => void;
}

export const useSettingsStore = create<StoreType>((set) => ({
	isMobile: false,
	setIsMobile: (isMobile) => set(() => ({ isMobile: isMobile })),
	showOptionsModal: false,
	setShowOptionsModal: (showOptionsModal) => set(() => ({ showOptionsModal: showOptionsModal })),
}));
