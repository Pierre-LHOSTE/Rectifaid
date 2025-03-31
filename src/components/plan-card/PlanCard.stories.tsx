import type { Meta, StoryObj } from "@storybook/react";
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React from "react";

import PlanCard from "./PlanCard";

const meta = {
	title: "PlanCard",
	component: PlanCard,
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
} satisfies Meta<typeof PlanCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Basic",
		description: "Increase your token up to ten times compared to free plan.",
		price: "$10/month",
		features: ["Feature 1", "Feature 2", "Feature 3"],
		featureTitle: "Features",
	},
};
