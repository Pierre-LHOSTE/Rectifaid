import type { Preview } from "@storybook/react";
// biome-ignore lint/correctness/noUnusedImports: Idk
import React from "react";

const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
			backgrounds: {
				default: isDarkTheme ? "dark" : "light",
				values: [
					{ name: "light", value: "#F4F4F4" },
					{ name: "dark", value: "#13161c" },
				],
			},
		},
		nextjs: {
			appDirectory: true,
			router: {
				basePath: "/",
			},
		},
	},
	decorators: [
		(Story) => {
			return (
				<>
					<Story />
				</>
			);
		},
	],
};

export default preview;
