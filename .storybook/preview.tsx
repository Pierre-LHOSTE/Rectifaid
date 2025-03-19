import type { Preview } from "@storybook/react";
import { ConfigProvider } from "antd";
// biome-ignore lint/correctness/noUnusedImports: Idk
import React from "react";
import darkTheme from "../src/themes/dark";
import lightTheme from "../src/themes/light";

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
			const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

			return (
				<ConfigProvider theme={isDarkTheme ? darkTheme : lightTheme}>
					<Story />
				</ConfigProvider>
			);
		},
	],
};

export default preview;
