import type { Meta, StoryObj } from "@storybook/react";

import CardSelect from "./CardSelect";

const meta = {
	title: "CardSelect",
	component: CardSelect,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof CardSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {
	args: {
		title: "Title",
		description:
			"A long description that should be displayed in the card body. It should be long enough to wrap to multiple lines.",
		options: ["anglicisms", "enrich"],
		id: "minimal",
	},
};

export const NotSelected: Story = {
	args: {
		title: "Title",
		description:
			"A long description that should be displayed in the card body. It should be long enough to wrap to multiple lines.",
		options: [],
		id: "moderate",
	},
};
