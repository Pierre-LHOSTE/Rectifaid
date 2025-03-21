import type { Meta, StoryObj } from "@storybook/react";

import TextDetails from "./TextDetails";

const meta = {
	title: "TextDetails",
	component: TextDetails,
	parameters: {
		// layout: 'centered',
	},
} satisfies Meta<typeof TextDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		details: [
			"Word count: 100",
			"Character count: 500",
			"Sentence count: 10",
			"Paragraph count: 2",
			"Readability score: 80%",
		],
		actions: [
			{
				action: () => alert("Action 1"),
				label: "Action 1",
				type: "primary",
			},
			{
				action: () => alert("Action 2"),
				label: "Action 2",
				type: "default",
			},
		],
	},
};
