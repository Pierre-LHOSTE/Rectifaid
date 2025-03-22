import type { Meta, StoryObj } from "@storybook/react";
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React from "react";

import ExplanationsList from "./ExplanationsList";

const meta = {
	title: "ExplanationsList",
	component: ExplanationsList,
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story) => (
			<div style={{ width: "600px" }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof ExplanationsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		explanations: [
			{
				from: "Ses mon chat",
				to: "C'est mon chat",
				why: "The phrase 'Ses mon chat' is incorrect because 'Ses' is a possessive pronoun used for plural nouns, while 'C'est' is used to mean 'It is' or 'This is'.",
				tip: "To distinguish between 'c'est' and 'ses', replace 'c'est' with 'cela est'. If the sentence is still logical, then 'c'est' is correct. Example: 'C'est à moi' becomes 'Cela est à moi.'",
			},
			{
				from: "Ses mon chat",
				to: "C'est mon chat",
				why: "The phrase 'Ses mon chat' is incorrect because 'Ses' is a possessive pronoun used for plural nouns, while 'C'est' is used to mean 'It is' or 'This is'.",
				tip: "To distinguish between 'c'est' and 'ses', replace 'c'est' with 'cela est'. If the sentence is still logical, then 'c'est' is correct. Example: 'C'est à moi' becomes 'Cela est à moi.'",
			},
		],
	},
};
