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
		openSelect: "Open options",
		title: "Select the type of correction",
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
		close: "Close",
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
		getPlanButton: "Get plan",
		activePlanButton: "Active",
		managePlanButton: "Manage my subscription",
	},
	plans: {
		free: {
			title: "Free plan",
			description: "Free plan with limited features.",
			features: "Limited to 1250 tokens per month",
			featureTitle: "Features",
		},
		basic: {
			title: "Basic plan",
			description: "Increased limits up to 12500 tokens per month with a new more powerful model.",
			features: "Limited to 12500 tokens per month, A more powerful model",
			featureTitle: "Everything in the free plan, plus",
		},
		premium: {
			title: "Premium plan",
			description: "Increased limits up to 125000 tokens per month",
			features: "Limited to 125000 tokens per month",
			featureTitle: "Everything in the basic plan, plus",
		},
	},
} satisfies BaseTranslation;

export default en;
