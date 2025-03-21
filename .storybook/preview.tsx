import type { Preview } from "@storybook/react";
import { ConfigProvider } from "antd";
// biome-ignore lint/correctness/noUnusedImports: Idk
import React, { useEffect, useState } from "react";
import darkTheme from "../src/themes/dark";
import lightTheme from "../src/themes/light";
import { detectLocale } from "../src/i18n/i18n-util";
import { loadLocaleAsync } from "../src/i18n/i18n-util.async";
import { navigatorDetector } from "typesafe-i18n/detectors";
import TypesafeI18n from "../src/i18n/i18n-react";

const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			default: isDarkTheme ? "dark" : "light",
			values: [
				{ name: "light", value: "#F4F4F4" },
				{ name: "dark", value: "#13161c" },
			],
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
			const locale = detectLocale(navigatorDetector);
			const [localesLoaded, setLocalesLoaded] = useState(false);

			useEffect(() => {
				loadLocaleAsync(locale).then(() => setLocalesLoaded(true));
			}, [locale]);

			if (!localesLoaded) {
				return <div>Loading...</div>;
			}

			return (
				<ConfigProvider theme={isDarkTheme ? darkTheme : lightTheme}>
					<TypesafeI18n locale={locale}>
						<Story />
					</TypesafeI18n>
				</ConfigProvider>
			);
		},
	],
};

export default preview;
