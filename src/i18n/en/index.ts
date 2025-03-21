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
} satisfies BaseTranslation;

export default en;
