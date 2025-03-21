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
		expect(prompt).toEqual(`
Act as a professional proofreader, editor, and writing assistant. Your task is to carefully analyze and correct or improve a given text while strictly adhering to the following rules:

- Correct all spelling mistakes.
- Do not correct punctuation errors.
- Do not correct anglicisms.
- Do not smooth out sentences.
- Do not remove repetitions.
- Do not simplify heavy structures.
- Do not rephrase sentences.
- Do not reorganize ideas.
- Do not restructure paragraphs.
- Do not enrich vocabulary.

Formatting rules:
- Correct only the errors without altering the style or structure; ensure the original format is preserved as closely as possible.
- Ensure the corrected text remains natural and appropriate for the intended audience.

After applying the necessary modifications, return the response in the following JSON format:
{
  "correctedText": "<corrected_text>",
  "explanations": [
    {
      "from": "<original_phrase>",
      "to": "<corrected_phrase>",
      "why": "<brief_explanation>",
      "tip": "<striking_tip>"
    },
    { ... }
  ]
}
Where:
- <original_phrase> and <corrected_phrase> should contain only the relevant part of the sentence that was modified, with enough context to remain understandable.
- The "why’ field must briefly explain the correction in a simple and easy-to-understand way. The explanation should be short, not too complex, and include a striking and memorable tip. For example:
  - "Ses à moi" → "C’est à moi", Tip: You can replace "ses" with "ceci est". If the sentence still makes sense, it’s "c’est" (short for "ceci est").
  - "J’aime mais chats" → "J’aime mes chats", Tip: Try adding "à moi" at the end: "J’aime mes chats à moi". Since it shows possession, it’s "mes" and not "mais", which expresses contrast.
- The explanation and tip can be combined for clarity, as in the second example.”
- The response, explanations, and tips must be in the same language as the text being corrected.


Here is the text to process:
<text>
test
</text>

Ensure that every correction is clearly explained in the “explanations” array. If no changes were necessary, return the text as is with an empty explanations array.`);
	});

	test("should return the correct prompt for moderate options", () => {
		const selectedOptions: SelectedOptionsType = {
			minimal: new Set(["spelling"]),
			moderate: new Set(["fluidity"]),
			heavy: new Set([]),
		};
		const prompt = generatePrompt("test", selectedOptions);
		expect(prompt).toEqual(`
Act as a professional proofreader, editor, and writing assistant. Your task is to carefully analyze and correct or improve a given text while strictly adhering to the following rules:

- Correct all spelling mistakes.
- Do not correct punctuation errors.
- Do not correct anglicisms.
- Smooth out sentences.
- Do not remove repetitions.
- Do not simplify heavy structures.
- Do not rephrase sentences.
- Do not reorganize ideas.
- Do not restructure paragraphs.
- Do not enrich vocabulary.

Formatting rules:
- Maintain the original formatting as much as possible.
- Ensure the corrected text remains natural and appropriate for the intended audience.

After applying the necessary modifications, return the response in the following JSON format:
{
  "correctedText": "<corrected_text>",
  "explanations": [
    {
      "from": "<original_phrase>",
      "to": "<corrected_phrase>",
      "why": "<brief_explanation>",
      "tip": "<striking_tip>"
    },
    { ... }
  ]
}
Where:
- <original_phrase> and <corrected_phrase> should contain only the relevant part of the sentence that was modified, with enough context to remain understandable.
- The "why’ field must briefly explain the correction in a simple and easy-to-understand way. The explanation should be short, not too complex, and include a striking and memorable tip. For example:
  - "Ses à moi" → "C’est à moi", Tip: You can replace "ses" with "ceci est". If the sentence still makes sense, it’s "c’est" (short for "ceci est").
  - "J’aime mais chats" → "J’aime mes chats", Tip: Try adding "à moi" at the end: "J’aime mes chats à moi". Since it shows possession, it’s "mes" and not "mais", which expresses contrast.
- The explanation and tip can be combined for clarity, as in the second example.”
- The response, explanations, and tips must be in the same language as the text being corrected.


Here is the text to process:
<text>
test
</text>

Ensure that every correction is clearly explained in the “explanations” array. If no changes were necessary, return the text as is with an empty explanations array.`);
	});

	test("should return the correct prompt for heavy options", () => {
		const selectedOptions: SelectedOptionsType = {
			minimal: new Set(["spelling"]),
			moderate: new Set([]),
			heavy: new Set(["restructure"]),
		};
		const prompt = generatePrompt("test", selectedOptions);
		expect(prompt).toEqual(`
Act as a professional proofreader, editor, and writing assistant. Your task is to carefully analyze and correct or improve a given text while strictly adhering to the following rules:

- Correct all spelling mistakes.
- Do not correct punctuation errors.
- Do not correct anglicisms.
- Do not smooth out sentences.
- Do not remove repetitions.
- Do not simplify heavy structures.
- Do not rephrase sentences.
- Do not reorganize ideas.
- Restructure paragraphs to enhance readability.
- Do not enrich vocabulary.

Formatting rules:
- Ensure the corrected text remains natural and appropriate for the intended audience.

After applying the necessary modifications, return the response in the following JSON format:
{
  "correctedText": "<corrected_text>",
  "explanations": [
    {
      "from": "<original_phrase>",
      "to": "<corrected_phrase>",
      "why": "<brief_explanation>",
      "tip": "<striking_tip>"
    },
    { ... }
  ]
}
Where:
- <original_phrase> and <corrected_phrase> should contain only the relevant part of the sentence that was modified, with enough context to remain understandable.
- The "why’ field must briefly explain the correction in a simple and easy-to-understand way. The explanation should be short, not too complex, and include a striking and memorable tip. For example:
  - "Ses à moi" → "C’est à moi", Tip: You can replace "ses" with "ceci est". If the sentence still makes sense, it’s "c’est" (short for "ceci est").
  - "J’aime mais chats" → "J’aime mes chats", Tip: Try adding "à moi" at the end: "J’aime mes chats à moi". Since it shows possession, it’s "mes" and not "mais", which expresses contrast.
- The explanation and tip can be combined for clarity, as in the second example.”
- The response, explanations, and tips must be in the same language as the text being corrected.


Here is the text to process:
<text>
test
</text>

Ensure that every correction is clearly explained in the “explanations” array. If no changes were necessary, return the text as is with an empty explanations array.`);
	});

	test("should return the correct prompt for moderate options", () => {
		const selectedOptions: SelectedOptionsType = {
			minimal: new Set(["spelling"]),
			moderate: new Set(["fluidity"]),
			heavy: new Set([]),
		};
		const prompt = generatePrompt("test", selectedOptions);
		expect(prompt).toEqual(`
Act as a professional proofreader, editor, and writing assistant. Your task is to carefully analyze and correct or improve a given text while strictly adhering to the following rules:

- Correct all spelling mistakes.
- Do not correct punctuation errors.
- Do not correct anglicisms.
- Smooth out sentences.
- Do not remove repetitions.
- Do not simplify heavy structures.
- Do not rephrase sentences.
- Do not reorganize ideas.
- Do not restructure paragraphs.
- Do not enrich vocabulary.

Formatting rules:
- Maintain the original formatting as much as possible.
- Ensure the corrected text remains natural and appropriate for the intended audience.

After applying the necessary modifications, return the response in the following JSON format:
{
  "correctedText": "<corrected_text>",
  "explanations": [
    {
      "from": "<original_phrase>",
      "to": "<corrected_phrase>",
      "why": "<brief_explanation>",
      "tip": "<striking_tip>"
    },
    { ... }
  ]
}
Where:
- <original_phrase> and <corrected_phrase> should contain only the relevant part of the sentence that was modified, with enough context to remain understandable.
- The "why’ field must briefly explain the correction in a simple and easy-to-understand way. The explanation should be short, not too complex, and include a striking and memorable tip. For example:
  - "Ses à moi" → "C’est à moi", Tip: You can replace "ses" with "ceci est". If the sentence still makes sense, it’s "c’est" (short for "ceci est").
  - "J’aime mais chats" → "J’aime mes chats", Tip: Try adding "à moi" at the end: "J’aime mes chats à moi". Since it shows possession, it’s "mes" and not "mais", which expresses contrast.
- The explanation and tip can be combined for clarity, as in the second example.”
- The response, explanations, and tips must be in the same language as the text being corrected.


Here is the text to process:
<text>
test
</text>

Ensure that every correction is clearly explained in the “explanations” array. If no changes were necessary, return the text as is with an empty explanations array.`);
	});

	test("should return the correct prompt for all options", () => {
		const selectedOptions: SelectedOptionsType = {
			minimal: new Set(["spelling", "punctuation", "anglicisms"]),
			moderate: new Set(["fluidity", "repetitions", "heaviness"]),
			heavy: new Set(["restructure", "rephrase", "reorganize", "enrich"]),
		};
		const prompt = generatePrompt("test", selectedOptions);
		expect(prompt).toEqual(`
Act as a professional proofreader, editor, and writing assistant. Your task is to carefully analyze and correct or improve a given text while strictly adhering to the following rules:

- Correct all spelling mistakes.
- Fix punctuation errors.
- Replace anglicisms with proper alternatives.
- Smooth out sentences.
- Remove redundant words or phrases.
- Simplify unnecessarily complex structures.
- Rephrase awkward or unclear sentences.
- Reorganize ideas for better clarity and impact.
- Restructure paragraphs to enhance readability.
- Enrich vocabulary with more precise or varied word choices.

Formatting rules:
- Ensure the corrected text remains natural and appropriate for the intended audience.

After applying the necessary modifications, return the response in the following JSON format:
{
  "correctedText": "<corrected_text>",
  "explanations": [
    {
      "from": "<original_phrase>",
      "to": "<corrected_phrase>",
      "why": "<brief_explanation>",
      "tip": "<striking_tip>"
    },
    { ... }
  ]
}
Where:
- <original_phrase> and <corrected_phrase> should contain only the relevant part of the sentence that was modified, with enough context to remain understandable.
- The "why’ field must briefly explain the correction in a simple and easy-to-understand way. The explanation should be short, not too complex, and include a striking and memorable tip. For example:
  - "Ses à moi" → "C’est à moi", Tip: You can replace "ses" with "ceci est". If the sentence still makes sense, it’s "c’est" (short for "ceci est").
  - "J’aime mais chats" → "J’aime mes chats", Tip: Try adding "à moi" at the end: "J’aime mes chats à moi". Since it shows possession, it’s "mes" and not "mais", which expresses contrast.
- The explanation and tip can be combined for clarity, as in the second example.”
- The response, explanations, and tips must be in the same language as the text being corrected.


Here is the text to process:
<text>
test
</text>

Ensure that every correction is clearly explained in the “explanations” array. If no changes were necessary, return the text as is with an empty explanations array.`);
	});
});
