import type { Meta, StoryObj } from "@storybook/react";

import TextOutput from "./TextOutput";

const meta = {
	title: "TextOutput",
	component: TextOutput,
	parameters: {
		// layout: 'centered',
	},
} satisfies Meta<typeof TextOutput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		originalText: "Original text",
		correctedText: "Corrected text",
		startTime: 0,
		endTime: 10,
	},
};
