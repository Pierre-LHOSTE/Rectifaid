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
		openSelect: "Ouvrir les options",
		title: "Sélectionner le type de correction",
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
	copy: {
		success: "Copié dans le presse-papier",
		error: "Erreur lors de la copie du texte",
	},
	basic: {
		loading: "Chargement…",
		cancel: "Annuler",
		close: "Fermer",
	},
	profile: {
		loginTitle: "Bienvenue !",
		loginDescription: "Connectez-vous ou créez un compte avec une des options ci-dessous",
		loginButton: "Se connecter",
		logout: "Déconnexion",
		oauth: "Se connecter avec {provider}",
		lastUsed: "Dernier utilisé",
	},
	plan: {
		free: "Gratuit",
		basic: "Basique",
		premium: "Premium",
		upgradeButton: "Mettre à niveau",
		upgradeDescription: "Mettez à niveau pour supprimer les limitations",
		getPlanButton: "Obtenir",
	},
	plans: {
		free: {
			title: "Gratuit",
			description: "Plan gratuit avec des fonctionnalités limitées.",
			features: "Limité à 1250 jetons par mois",
			featureTitle: "Caractéristiques",
		},
		basic: {
			title: "Basique",
			description:
				"Limites augmentées jusqu'à 12500 jetons par mois avec un nouveau modèle plus puissant.",
			features: "Limité à 12500 jetons par mois, Un modèle plus puissant",
			featureTitle: "Tout ce qui est dans le plan gratuit, plus",
		},
		premium: {
			title: "Premium",
			description: "Limites augmentées jusqu'à 125000 jetons par mois",
			features: "Limité à 125000 jetons par mois",
			featureTitle: "Tout ce qui est dans le plan basique, plus",
		},
	},
} satisfies Translation;

export default fr;
