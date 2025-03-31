import type {} from "@/types/options";
import { create } from "zustand";

interface StoreType {
	isMobile: boolean;
	setIsMobile: (isMobile: boolean) => void;
	showOptionsModal: boolean;
	setShowOptionsModal: (showOptionsModal: boolean) => void;
	showLoginModal: boolean;
	setShowLoginModal: (showLoginModal: boolean) => void;
	showPlansModal: boolean;
	setShowPlansModal: (showPlansModal: boolean) => void;
}

export const useSettingsStore = create<StoreType>((set) => ({
	isMobile: false,
	setIsMobile: (isMobile) => set(() => ({ isMobile: isMobile })),
	showOptionsModal: false,
	setShowOptionsModal: (showOptionsModal) => set(() => ({ showOptionsModal: showOptionsModal })),
	showLoginModal: false,
	setShowLoginModal: (showLoginModal) => set(() => ({ showLoginModal: showLoginModal })),
	showPlansModal: false,
	setShowPlansModal: (showPlansModal) => set(() => ({ showPlansModal: showPlansModal })),
}));
