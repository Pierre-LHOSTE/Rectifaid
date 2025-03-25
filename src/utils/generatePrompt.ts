import type { CategoryOptions, SelectedOptionsType } from "@/types/options";
import { getActiveCategory } from "@/utils/getActiveCategory";

type RulesConfig = {
	positive: string;
	negative: string;
};

type CategoryConfig = {
	description: string;
	firstRules: string[];
	lastRules: string[];
	rules: { [key in CategoryOptions]?: RulesConfig };
};

function getSelectedOptions(options: SelectedOptionsType): Set<string> {
	return new Set(Object.values(options).flatMap((optionSet) => Array.from(optionSet)));
}

function computeFirstRules(selectedCard: string, selectedOptions: Set<string>): string[] {
	const rules: string[] = [];
	const has = (option: CategoryOptions) => selectedOptions.has(option);

	if (["moderate", "heavy"].includes(selectedCard)) {
		const spelling = has("spelling");
		const punctuation = has("punctuation");
		const anglicisms = has("anglicisms");

		if (spelling || punctuation || anglicisms) {
			rules.push(
				`- ${spelling ? "Correct spelling" : "Do NOT correct spelling"}, ` +
					`${punctuation ? "correct punctuation" : "do NOT correct punctuation"}, ` +
					`${anglicisms ? "replace foreign terms with suitable equivalents" : "do NOT replace foreign terms"}.`
			);
		} else {
			rules.push(
				"- Do NOT correct spelling, punctuation, or replace foreign terms with suitable equivalents."
			);
		}
	}

	if (selectedCard === "heavy") {
		const fluidity = has("fluidity");
		const repetitions = has("repetitions");
		const heaviness = has("heaviness");

		if (fluidity || repetitions || heaviness) {
			rules.push(
				`- ${fluidity ? "Improve sentence fluidity" : "Do NOT improve sentence fluidity"}, ` +
					`${repetitions ? "remove redundancies" : "do NOT remove redundancies"}, ` +
					`${heaviness ? "simplify complex structures" : "do NOT simplify complex structures"}.`
			);
		} else {
			rules.push(
				"- Do NOT improve sentence fluidity, remove redundancies, or simplify complex structures."
			);
		}
	}

	return rules;
}

const categoryConfigs: Record<string, CategoryConfig> = {
	minimal: {
		description:
			"Correct the following text without altering its style or structure. Follow these strict rules:",
		firstRules: [],
		lastRules: ["- DO NOT modify sentence structure or wording in any way."],
		rules: {
			spelling: {
				positive: "- Fix all spelling mistakes.",
				negative: "- Do not correct spelling mistakes.",
			},
			punctuation: {
				positive: "- Correct punctuation errors.",
				negative: "- Do not correct punctuation errors.",
			},
			anglicisms: {
				positive: "- Replace foreign terms with appropriate equivalents in the user's language.",
				negative: "- Do not replace foreign terms.",
			},
		},
	},
	moderate: {
		description:
			"Improve the following text while preserving its original structure as much as possible. Apply the following rules:",
		firstRules: [],
		lastRules: ["- AVOID significant rewrites or changes to the tone."],
		rules: {
			fluidity: {
				positive: "- Smooth out sentences for better readability.",
				negative: "- Do not smooth out sentences.",
			},
			repetitions: {
				positive: "- Remove redundant words or phrases.",
				negative: "- Do not remove redundant words or phrases.",
			},
			heaviness: {
				positive: "- Simplify unnecessarily complex structures while maintaining meaning.",
				negative: "- Do not simplify unnecessarily complex structures.",
			},
		},
	},
	heavy: {
		description:
			"Enhance the following text while maintaining its original meaning. Follow these guidelines:",
		firstRules: [],
		lastRules: ["- Ensure the result is natural, engaging, and effective."],
		rules: {
			rephrase: {
				positive: "- Rephrase awkward or unclear sentences.",
				negative: "- Do not rephrase awkward or unclear sentences.",
			},
			reorganize: {
				positive: "- Reorganize ideas for better coherence.",
				negative: "- Do not reorganize ideas.",
			},
			restructure: {
				positive: "- Restructure paragraphs for improved readability.",
				negative: "- Do not restructure paragraphs.",
			},
			enrich: {
				positive: "- Enrich vocabulary with more precise and varied word choices.",
				negative: "- Do not enrich vocabulary.",
			},
		},
	},
};

export default function generatePrompt(text: string, options: SelectedOptionsType): string {
	const selectedCard = getActiveCategory(options);
	const selectedOptions = getSelectedOptions(options);
	const config = categoryConfigs[selectedCard];
	if (!config) return "";

	config.firstRules = computeFirstRules(selectedCard, selectedOptions);

	const rules = [config.description, ...config.firstRules];

	for (const [key, rule] of Object.entries(config.rules)) {
		rules.push(selectedOptions.has(key) ? rule.positive : rule.negative);
	}

	rules.push(...config.lastRules);

	return `${rules.filter(Boolean).join("\n")}

After applying the necessary modifications, return the response with the following properties:
- **correctedText**: The corrected text after applying the modifications.
- **explanations**: A list of corrections made, each containing:
    - **from**: The original part of the text that was modified, with enough context to remain understandable.
    - **to**: The corrected version of that part.
    - **why**: A short and simple explanation of the correction, easy to understand. Always respond in the same language as the original text.
    - **tip**: A striking and memorable tip to avoid this mistake in the future, also in the same language. Examples: « To distinguish between "it's" and "its", replace "it's" with "it is" or "it has." If the sentence still makes sense, then "it's" is correct ».

Here is the text to process:
<text>
${text}
</text>

Ensure that every correction is clearly explained in the “explanations” array. If no changes were necessary, return the text as is with an empty explanations array.
DO NOT forget to respond in the same language as the original text.`;
}
