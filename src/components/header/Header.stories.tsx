import type { Meta, StoryObj } from "@storybook/react";
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React from "react";

import Header from "./Header";

const meta = {
	title: "Header",
	component: Header,
	parameters: {
		// layout: "centered",
	},
	decorators: [
		(Story) => (
			<div style={{ backgroundColor: "white" }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		user: undefined,
	},
};

export const Connected: Story = {
	args: {
		user: {
			id: "1",
			name: "John Doe",
			email: "",
			emailVerified: false,
			createdAt: new Date(),
			updatedAt: new Date(),
			image: "https://vingt-douze.com/apple-icon.png?acf2eb774d94040e",
			tier: "free",
		},
	},
};

export const ConnectedNoImage: Story = {
	args: {
		user: {
			id: "1",
			name: "John Doe",
			email: "",
			emailVerified: false,
			createdAt: new Date(),
			updatedAt: new Date(),
			image: null,
			tier: "free",
		},
	},
};

export const Basic: Story = {
	args: {
		user: {
			id: "1",
			name: "John Doe",
			email: "",
			emailVerified: false,
			createdAt: new Date(),
			updatedAt: new Date(),
			image: "https://vingt-douze.com/apple-icon.png?acf2eb774d94040e",
			tier: "basic",
		},
	},
};

export const Premium: Story = {
	args: {
		user: {
			id: "1",
			name: "John Doe",
			email: "",
			emailVerified: false,
			createdAt: new Date(),
			updatedAt: new Date(),
			image: "https://vingt-douze.com/apple-icon.png?acf2eb774d94040e",
			tier: "premium",
		},
	},
};
