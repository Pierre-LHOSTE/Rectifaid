import type { BaseTranslation } from "../i18n-types";

const en = {
	options: {
		spelling: "Spelling correction",
		punctuation: "Punctuation correction",
		anglicisms: "Anglicism correction",
		fluidity: "Fluidity improvement",
		repetitions: "Repetition removal",
		heaviness: "Heaviness removal",
		rephrase: "Rephrasing sentences",
		reorganize: "Reorganizing ideas",
		restructure: "Restructuring paragraphs",
		enrich: "Vocabulary enrichment",
	},
	card: {
		minimal: {
			title: "Minimal modifications",
			description: "These changes correct errors without affecting style or structure",
		},
		moderate: {
			title: "Moderate modifications",
			description: "These changes improve the text without altering its meaning or style",
		},
		heavy: {
			title: "Heavy modifications",
			description: "These changes significantly alter the text, improving its structure and style",
		},
	},
	textInputPlaceholder: "Start typing…",
	textDetails: {
		stats: {
			characters: "{0:number} character{{s}}",
			words: "{0:number} word{{s}}",
			lines: "{0:number} line{{s}}",
		},
		actions: {
			correct: "Correct text",
			copy: "Copy",
		},
	},
	copy: {
		success: "Text copied to clipboard",
		error: "Error copying text",
	},
	basic: {
		loading: "Loading…",
		cancel: "Cancel",
	},
	profile: {
		loginTitle: "Welcome user!",
		loginDescription: "Sign in or create an account with one of the options below",
		loginButton: "Sign in",
		logout: "Logout",
		oauth: "Sign in with {provider:string}",
		lastUsed: "Last used",
	},
	plan: {
		free: "Free",
		basic: "Basic",
		premium: "Premium",
		upgradeButton: "Upgrade",
		upgradeDescription: "Upgrade to remove limitations",
	},
} satisfies BaseTranslation;

export default en;
