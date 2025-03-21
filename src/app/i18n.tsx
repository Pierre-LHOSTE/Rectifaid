"use client";
import TypesafeI18n from "@/i18n/i18n-react";
import { detectLocale } from "@/i18n/i18n-util";
import { loadLocaleAsync } from "@/i18n/i18n-util.async";
import { type ReactNode, useEffect, useState } from "react";
import { navigatorDetector } from "typesafe-i18n/detectors";

export default function Locale({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const locale = detectLocale(navigatorDetector);
	const [localesLoaded, setLocalesLoaded] = useState(false);

	useEffect(() => {
		loadLocaleAsync(locale).then(() => setLocalesLoaded(true));
	}, [locale]);

	if (!localesLoaded) {
		return null;
	}

	return <TypesafeI18n locale={locale}>{children}</TypesafeI18n>;
}
