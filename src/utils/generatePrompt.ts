import type { CategoryOptions, SelectedOptionsType } from "@/types/options";
import { getActiveCategory } from "@/utils/getActiveCategory";

export default function generatePrompt(text: string, options: SelectedOptionsType) {
	let primaryRule = "";
	const selectedCard = getActiveCategory(options);
	switch (selectedCard) {
		case "minimal":
			primaryRule =
				"Correct only the errors without altering the style or structure; ensure the original format is preserved as closely as possible.";
			break;
		case "moderate":
			primaryRule = "Maintain the original formatting as much as possible.";
			break;
		case "heavy":
			primaryRule = "";
			break;
		default:
			primaryRule = "";
	}

	const o = Array.from(Object.values(options)).flatMap((optionSet) => Array.from(optionSet));

	function isSelected(option: CategoryOptions) {
		return o.includes(option);
	}

	const prompt = `
Act as a professional proofreader, editor, and writing assistant. Your task is to carefully analyze and correct or improve a given text while strictly adhering to the following rules:

- ${isSelected("spelling") ? "Correct all spelling mistakes." : "Do not correct spelling mistakes."}
- ${isSelected("punctuation") ? "Fix punctuation errors." : "Do not correct punctuation errors."}
- ${isSelected("anglicisms") ? "Replace anglicisms with proper alternatives." : "Do not correct anglicisms."}
- ${isSelected("fluidity") ? "Smooth out sentences." : "Do not smooth out sentences."}
- ${isSelected("repetitions") ? "Remove redundant words or phrases." : "Do not remove repetitions."}
- ${isSelected("heaviness") ? "Simplify unnecessarily complex structures." : "Do not simplify heavy structures."}
- ${isSelected("rephrase") ? "Rephrase awkward or unclear sentences." : "Do not rephrase sentences."}
- ${isSelected("reorganize") ? "Reorganize ideas for better clarity and impact." : "Do not reorganize ideas."}
- ${isSelected("restructure") ? "Restructure paragraphs to enhance readability." : "Do not restructure paragraphs."}
- ${isSelected("enrich") ? "Enrich vocabulary with more precise or varied word choices." : "Do not enrich vocabulary."}

Formatting rules:${primaryRule.length > 0 ? `\n- ${primaryRule}` : ""}
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
${text}
</text>

Ensure that every correction is clearly explained in the “explanations” array. If no changes were necessary, return the text as is with an empty explanations array.`;

	return prompt;
}
