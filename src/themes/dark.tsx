import { type ThemeConfig, theme } from "antd";
import styles from "./globals";

const darkTheme: ThemeConfig = {
	algorithm: theme.darkAlgorithm,
	token: {
		...styles,
		colorBgBase: "#13161c ",
		// colorBgLayout: "#13161c",
		colorBgContainer: "#1A1D23",
		// colorBgElevated: "#1c1b22",
		colorBorder: "rgba(255, 255, 255, 0.1)",
		colorBorderSecondary: "rgba(255, 255, 255, 0.05)",
	},
};

export default darkTheme;
