import type { SelectedOptionsType } from "@/types/options";
import { describe, expect, test } from "@jest/globals";
import generatePrompt from "./generatePrompt";

describe("generatePrompt tests", () => {
	test("should return the correct prompt for minimal options", () => {
		const selectedOptions: SelectedOptionsType = {
			minimal: new Set(["spelling"]),
			moderate: new Set([]),
			heavy: new Set([]),
		};
		const prompt = generatePrompt("test", selectedOptions);
		expect(
			prompt
		).toEqual(`Correct the following text without altering its style or structure. Follow these strict rules:
- Fix all spelling mistakes.
- Do not correct punctuation errors.
- Do not replace foreign terms.
- DO NOT modify sentence structure or wording in any way.

After applying the necessary modifications, return the response with the following properties:
- **correctedText**: The corrected text after applying the modifications.
- **explanations**: A list of corrections made, each containing:
    - **from**: The original part of the text that was modified, with enough context to remain understandable.
    - **to**: The corrected version of that part.
    - **why**: A short and simple explanation of the correction, easy to understand. Always respond in the same language as the original text.
    - **tip**: A striking and memorable tip to avoid this mistake in the future, also in the same language. Examples: « To distinguish between "it's" and "its", replace "it's" with "it is" or "it has." If the sentence still makes sense, then "it's" is correct ».

Here is the text to process:
<text>
test
</text>

Ensure that every correction is clearly explained in the “explanations” array. If no changes were necessary, return the text as is with an empty explanations array.
DO NOT forget to respond in the same language as the original text.`);
	});

	test("should return the correct prompt for moderate options", () => {
		const selectedOptions: SelectedOptionsType = {
			minimal: new Set(["spelling"]),
			moderate: new Set(["fluidity"]),
			heavy: new Set([]),
		};
		const prompt = generatePrompt("test", selectedOptions);
		expect(
			prompt
		).toEqual(`Improve the following text while preserving its original structure as much as possible. Apply the following rules:
- Correct spelling, do NOT correct punctuation, do NOT replace foreign terms.
- Smooth out sentences for better readability.
- Do not remove redundant words or phrases.
- Do not simplify unnecessarily complex structures.
- AVOID significant rewrites or changes to the tone.

After applying the necessary modifications, return the response with the following properties:
- **correctedText**: The corrected text after applying the modifications.
- **explanations**: A list of corrections made, each containing:
    - **from**: The original part of the text that was modified, with enough context to remain understandable.
    - **to**: The corrected version of that part.
    - **why**: A short and simple explanation of the correction, easy to understand. Always respond in the same language as the original text.
    - **tip**: A striking and memorable tip to avoid this mistake in the future, also in the same language. Examples: « To distinguish between "it's" and "its", replace "it's" with "it is" or "it has." If the sentence still makes sense, then "it's" is correct ».

Here is the text to process:
<text>
test
</text>

Ensure that every correction is clearly explained in the “explanations” array. If no changes were necessary, return the text as is with an empty explanations array.
DO NOT forget to respond in the same language as the original text.`);
	});

	test("should return the correct prompt for heavy options", () => {
		const selectedOptions: SelectedOptionsType = {
			minimal: new Set(["spelling"]),
			moderate: new Set([]),
			heavy: new Set(["restructure"]),
		};
		const prompt = generatePrompt("test", selectedOptions);
		expect(
			prompt
		).toEqual(`Enhance the following text while maintaining its original meaning. Follow these guidelines:
- Correct spelling, do NOT correct punctuation, do NOT replace foreign terms.
- Do NOT improve sentence fluidity, remove redundancies, or simplify complex structures.
- Do not rephrase awkward or unclear sentences.
- Do not reorganize ideas.
- Restructure paragraphs for improved readability.
- Do not enrich vocabulary.
- Ensure the result is natural, engaging, and effective.

After applying the necessary modifications, return the response with the following properties:
- **correctedText**: The corrected text after applying the modifications.
- **explanations**: A list of corrections made, each containing:
    - **from**: The original part of the text that was modified, with enough context to remain understandable.
    - **to**: The corrected version of that part.
    - **why**: A short and simple explanation of the correction, easy to understand. Always respond in the same language as the original text.
    - **tip**: A striking and memorable tip to avoid this mistake in the future, also in the same language. Examples: « To distinguish between "it's" and "its", replace "it's" with "it is" or "it has." If the sentence still makes sense, then "it's" is correct ».

Here is the text to process:
<text>
test
</text>

Ensure that every correction is clearly explained in the “explanations” array. If no changes were necessary, return the text as is with an empty explanations array.
DO NOT forget to respond in the same language as the original text.`);
	});

	test("should return the correct prompt for moderate options", () => {
		const selectedOptions: SelectedOptionsType = {
			minimal: new Set(["spelling"]),
			moderate: new Set(["fluidity"]),
			heavy: new Set([]),
		};
		const prompt = generatePrompt("test", selectedOptions);
		expect(
			prompt
		).toEqual(`Improve the following text while preserving its original structure as much as possible. Apply the following rules:
- Correct spelling, do NOT correct punctuation, do NOT replace foreign terms.
- Smooth out sentences for better readability.
- Do not remove redundant words or phrases.
- Do not simplify unnecessarily complex structures.
- AVOID significant rewrites or changes to the tone.

After applying the necessary modifications, return the response with the following properties:
- **correctedText**: The corrected text after applying the modifications.
- **explanations**: A list of corrections made, each containing:
    - **from**: The original part of the text that was modified, with enough context to remain understandable.
    - **to**: The corrected version of that part.
    - **why**: A short and simple explanation of the correction, easy to understand. Always respond in the same language as the original text.
    - **tip**: A striking and memorable tip to avoid this mistake in the future, also in the same language. Examples: « To distinguish between "it's" and "its", replace "it's" with "it is" or "it has." If the sentence still makes sense, then "it's" is correct ».

Here is the text to process:
<text>
test
</text>

Ensure that every correction is clearly explained in the “explanations” array. If no changes were necessary, return the text as is with an empty explanations array.
DO NOT forget to respond in the same language as the original text.`);
	});

	test("should return the correct prompt for all options", () => {
		const selectedOptions: SelectedOptionsType = {
			minimal: new Set(["spelling", "punctuation", "anglicisms"]),
			moderate: new Set(["fluidity", "repetitions", "heaviness"]),
			heavy: new Set(["restructure", "rephrase", "reorganize", "enrich"]),
		};
		const prompt = generatePrompt("test", selectedOptions);
		expect(
			prompt
		).toEqual(`Enhance the following text while maintaining its original meaning. Follow these guidelines:
- Correct spelling, correct punctuation, replace foreign terms with suitable equivalents.
- Improve sentence fluidity, remove redundancies, simplify complex structures.
- Rephrase awkward or unclear sentences.
- Reorganize ideas for better coherence.
- Restructure paragraphs for improved readability.
- Enrich vocabulary with more precise and varied word choices.
- Ensure the result is natural, engaging, and effective.

After applying the necessary modifications, return the response with the following properties:
- **correctedText**: The corrected text after applying the modifications.
- **explanations**: A list of corrections made, each containing:
    - **from**: The original part of the text that was modified, with enough context to remain understandable.
    - **to**: The corrected version of that part.
    - **why**: A short and simple explanation of the correction, easy to understand. Always respond in the same language as the original text.
    - **tip**: A striking and memorable tip to avoid this mistake in the future, also in the same language. Examples: « To distinguish between "it's" and "its", replace "it's" with "it is" or "it has." If the sentence still makes sense, then "it's" is correct ».

Here is the text to process:
<text>
test
</text>

Ensure that every correction is clearly explained in the “explanations” array. If no changes were necessary, return the text as is with an empty explanations array.
DO NOT forget to respond in the same language as the original text.`);
	});
});
