import { useI18nContext } from "@/i18n/i18n-react";
import { Input } from "antd";
import "./text-input.scss";

export default function TextInput() {
	const { LL, locale } = useI18nContext();

	return (
		<div id="text-input">
			<Input.TextArea
				lang={locale}
				placeholder={LL.textInputPlaceholder()}
				style={{
					resize: "none",
				}}
			/>
		</div>
	);
}
