import type { Meta, StoryObj } from "@storybook/react";

import TextInput from "./TextInput";

const meta = {
	title: "TextInput",
	component: TextInput,
	parameters: {
		// layout: 'centered',
	},
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
