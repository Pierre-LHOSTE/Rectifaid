import { type ThemeConfig, theme } from "antd";
import styles from "./globals";

const lightTheme: ThemeConfig = {
	algorithm: theme.defaultAlgorithm,
	token: {
		...styles,
		colorBorder: "rgba(0, 0, 0, 0.1)",
		colorBorderSecondary: "rgba(0, 0, 0, 0.05)",
	},
};

export default lightTheme;
