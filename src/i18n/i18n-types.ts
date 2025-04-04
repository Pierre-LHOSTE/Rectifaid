// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'
	| 'fr'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	options: {
		/**
		 * S​p​e​l​l​i​n​g​ ​c​o​r​r​e​c​t​i​o​n
		 */
		spelling: string
		/**
		 * P​u​n​c​t​u​a​t​i​o​n​ ​c​o​r​r​e​c​t​i​o​n
		 */
		punctuation: string
		/**
		 * A​n​g​l​i​c​i​s​m​ ​c​o​r​r​e​c​t​i​o​n
		 */
		anglicisms: string
		/**
		 * F​l​u​i​d​i​t​y​ ​i​m​p​r​o​v​e​m​e​n​t
		 */
		fluidity: string
		/**
		 * R​e​p​e​t​i​t​i​o​n​ ​r​e​m​o​v​a​l
		 */
		repetitions: string
		/**
		 * H​e​a​v​i​n​e​s​s​ ​r​e​m​o​v​a​l
		 */
		heaviness: string
		/**
		 * R​e​p​h​r​a​s​i​n​g​ ​s​e​n​t​e​n​c​e​s
		 */
		rephrase: string
		/**
		 * R​e​o​r​g​a​n​i​z​i​n​g​ ​i​d​e​a​s
		 */
		reorganize: string
		/**
		 * R​e​s​t​r​u​c​t​u​r​i​n​g​ ​p​a​r​a​g​r​a​p​h​s
		 */
		restructure: string
		/**
		 * V​o​c​a​b​u​l​a​r​y​ ​e​n​r​i​c​h​m​e​n​t
		 */
		enrich: string
	}
	card: {
		minimal: {
			/**
			 * M​i​n​i​m​a​l​ ​m​o​d​i​f​i​c​a​t​i​o​n​s
			 */
			title: string
			/**
			 * T​h​e​s​e​ ​c​h​a​n​g​e​s​ ​c​o​r​r​e​c​t​ ​e​r​r​o​r​s​ ​w​i​t​h​o​u​t​ ​a​f​f​e​c​t​i​n​g​ ​s​t​y​l​e​ ​o​r​ ​s​t​r​u​c​t​u​r​e
			 */
			description: string
		}
		moderate: {
			/**
			 * M​o​d​e​r​a​t​e​ ​m​o​d​i​f​i​c​a​t​i​o​n​s
			 */
			title: string
			/**
			 * T​h​e​s​e​ ​c​h​a​n​g​e​s​ ​i​m​p​r​o​v​e​ ​t​h​e​ ​t​e​x​t​ ​w​i​t​h​o​u​t​ ​a​l​t​e​r​i​n​g​ ​i​t​s​ ​m​e​a​n​i​n​g​ ​o​r​ ​s​t​y​l​e
			 */
			description: string
		}
		heavy: {
			/**
			 * H​e​a​v​y​ ​m​o​d​i​f​i​c​a​t​i​o​n​s
			 */
			title: string
			/**
			 * T​h​e​s​e​ ​c​h​a​n​g​e​s​ ​s​i​g​n​i​f​i​c​a​n​t​l​y​ ​a​l​t​e​r​ ​t​h​e​ ​t​e​x​t​,​ ​i​m​p​r​o​v​i​n​g​ ​i​t​s​ ​s​t​r​u​c​t​u​r​e​ ​a​n​d​ ​s​t​y​l​e
			 */
			description: string
		}
		/**
		 * O​p​e​n​ ​o​p​t​i​o​n​s
		 */
		openSelect: string
		/**
		 * S​e​l​e​c​t​ ​t​h​e​ ​t​y​p​e​ ​o​f​ ​c​o​r​r​e​c​t​i​o​n
		 */
		title: string
	}
	/**
	 * S​t​a​r​t​ ​t​y​p​i​n​g​…
	 */
	textInputPlaceholder: string
	textDetails: {
		stats: {
			/**
			 * {​0​}​ ​c​h​a​r​a​c​t​e​r​{​{​s​}​}
			 * @param {number} 0
			 */
			characters: RequiredParams<'0'>
			/**
			 * {​0​}​ ​w​o​r​d​{​{​s​}​}
			 * @param {number} 0
			 */
			words: RequiredParams<'0'>
			/**
			 * {​0​}​ ​l​i​n​e​{​{​s​}​}
			 * @param {number} 0
			 */
			lines: RequiredParams<'0'>
		}
		actions: {
			/**
			 * C​o​r​r​e​c​t​ ​t​e​x​t
			 */
			correct: string
			/**
			 * C​o​p​y
			 */
			copy: string
		}
	}
	copy: {
		/**
		 * T​e​x​t​ ​c​o​p​i​e​d​ ​t​o​ ​c​l​i​p​b​o​a​r​d
		 */
		success: string
		/**
		 * E​r​r​o​r​ ​c​o​p​y​i​n​g​ ​t​e​x​t
		 */
		error: string
	}
	basic: {
		/**
		 * L​o​a​d​i​n​g​…
		 */
		loading: string
		/**
		 * C​a​n​c​e​l
		 */
		cancel: string
		/**
		 * C​l​o​s​e
		 */
		close: string
	}
	profile: {
		/**
		 * W​e​l​c​o​m​e​ ​u​s​e​r​!
		 */
		loginTitle: string
		/**
		 * S​i​g​n​ ​i​n​ ​o​r​ ​c​r​e​a​t​e​ ​a​n​ ​a​c​c​o​u​n​t​ ​w​i​t​h​ ​o​n​e​ ​o​f​ ​t​h​e​ ​o​p​t​i​o​n​s​ ​b​e​l​o​w
		 */
		loginDescription: string
		/**
		 * S​i​g​n​ ​i​n
		 */
		loginButton: string
		/**
		 * L​o​g​o​u​t
		 */
		logout: string
		/**
		 * S​i​g​n​ ​i​n​ ​w​i​t​h​ ​{​p​r​o​v​i​d​e​r​}
		 * @param {string} provider
		 */
		oauth: RequiredParams<'provider'>
		/**
		 * L​a​s​t​ ​u​s​e​d
		 */
		lastUsed: string
	}
	plan: {
		/**
		 * F​r​e​e
		 */
		free: string
		/**
		 * B​a​s​i​c
		 */
		basic: string
		/**
		 * P​r​e​m​i​u​m
		 */
		premium: string
		/**
		 * U​p​g​r​a​d​e
		 */
		upgradeButton: string
		/**
		 * U​p​g​r​a​d​e​ ​t​o​ ​r​e​m​o​v​e​ ​l​i​m​i​t​a​t​i​o​n​s
		 */
		upgradeDescription: string
	}
}

export type TranslationFunctions = {
	options: {
		/**
		 * Spelling correction
		 */
		spelling: () => LocalizedString
		/**
		 * Punctuation correction
		 */
		punctuation: () => LocalizedString
		/**
		 * Anglicism correction
		 */
		anglicisms: () => LocalizedString
		/**
		 * Fluidity improvement
		 */
		fluidity: () => LocalizedString
		/**
		 * Repetition removal
		 */
		repetitions: () => LocalizedString
		/**
		 * Heaviness removal
		 */
		heaviness: () => LocalizedString
		/**
		 * Rephrasing sentences
		 */
		rephrase: () => LocalizedString
		/**
		 * Reorganizing ideas
		 */
		reorganize: () => LocalizedString
		/**
		 * Restructuring paragraphs
		 */
		restructure: () => LocalizedString
		/**
		 * Vocabulary enrichment
		 */
		enrich: () => LocalizedString
	}
	card: {
		minimal: {
			/**
			 * Minimal modifications
			 */
			title: () => LocalizedString
			/**
			 * These changes correct errors without affecting style or structure
			 */
			description: () => LocalizedString
		}
		moderate: {
			/**
			 * Moderate modifications
			 */
			title: () => LocalizedString
			/**
			 * These changes improve the text without altering its meaning or style
			 */
			description: () => LocalizedString
		}
		heavy: {
			/**
			 * Heavy modifications
			 */
			title: () => LocalizedString
			/**
			 * These changes significantly alter the text, improving its structure and style
			 */
			description: () => LocalizedString
		}
		/**
		 * Open options
		 */
		openSelect: () => LocalizedString
		/**
		 * Select the type of correction
		 */
		title: () => LocalizedString
	}
	/**
	 * Start typing…
	 */
	textInputPlaceholder: () => LocalizedString
	textDetails: {
		stats: {
			/**
			 * {0} character{{s}}
			 */
			characters: (arg0: number) => LocalizedString
			/**
			 * {0} word{{s}}
			 */
			words: (arg0: number) => LocalizedString
			/**
			 * {0} line{{s}}
			 */
			lines: (arg0: number) => LocalizedString
		}
		actions: {
			/**
			 * Correct text
			 */
			correct: () => LocalizedString
			/**
			 * Copy
			 */
			copy: () => LocalizedString
		}
	}
	copy: {
		/**
		 * Text copied to clipboard
		 */
		success: () => LocalizedString
		/**
		 * Error copying text
		 */
		error: () => LocalizedString
	}
	basic: {
		/**
		 * Loading…
		 */
		loading: () => LocalizedString
		/**
		 * Cancel
		 */
		cancel: () => LocalizedString
		/**
		 * Close
		 */
		close: () => LocalizedString
	}
	profile: {
		/**
		 * Welcome user!
		 */
		loginTitle: () => LocalizedString
		/**
		 * Sign in or create an account with one of the options below
		 */
		loginDescription: () => LocalizedString
		/**
		 * Sign in
		 */
		loginButton: () => LocalizedString
		/**
		 * Logout
		 */
		logout: () => LocalizedString
		/**
		 * Sign in with {provider}
		 */
		oauth: (arg: { provider: string }) => LocalizedString
		/**
		 * Last used
		 */
		lastUsed: () => LocalizedString
	}
	plan: {
		/**
		 * Free
		 */
		free: () => LocalizedString
		/**
		 * Basic
		 */
		basic: () => LocalizedString
		/**
		 * Premium
		 */
		premium: () => LocalizedString
		/**
		 * Upgrade
		 */
		upgradeButton: () => LocalizedString
		/**
		 * Upgrade to remove limitations
		 */
		upgradeDescription: () => LocalizedString
	}
}

export type Formatters = {}
