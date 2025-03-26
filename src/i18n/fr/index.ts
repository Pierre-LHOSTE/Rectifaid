import type { Translation } from "../i18n-types";

const fr = {
	options: {
		spelling: "Correction des fautes",
		punctuation: "Correction de la ponctuation",
		anglicisms: "Correction des anglicismes",
		fluidity: "Fluidification des phrases",
		repetitions: "Suppression des répétitions",
		heaviness: "Suppression des lourdeurs",
		rephrase: "Reformulation des phrases",
		reorganize: "Réorganisation des idées",
		restructure: "Restructuration des paragraphes",
		enrich: "Enrichissement du vocabulaire",
	},
	card: {
		minimal: {
			title: "Modifications minimes",
			description: "Ces changements corrigent des erreurs sans affecter le style ni la structure",
		},
		moderate: {
			title: "Modifications légères",
			description:
				"On commence à toucher à la structure, mais le texte reste très fidèle à l’original",
		},
		heavy: {
			title: "Modifications majeures",
			description: "Ici, on transforme le texte de manière plus significative",
		},
	},
	textInputPlaceholder: "Commencez à écrire…",
	textDetails: {
		stats: {
			characters: "{0} caractère{{s}}",
			words: "{0} mot{{s}}",
			lines: "{0} ligne{{s}}",
		},
		actions: {
			correct: "Corriger le texte",
			copy: "Copier",
		},
	},
	loading: "Chargement…",
	successCopy: "Texte copié",
	errorCopy: "Erreur lors de la copie du texte",
} satisfies Translation;

export default fr;
