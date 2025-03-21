import type { SelectedOptionsType } from "@/types/options";
import { describe, expect, test } from "@jest/globals";
import { getActiveCategory } from "./getActiveCategory";

describe("getActiveCategory tests", () => {
	test("should return minimal", () => {
		const selectedOptions: SelectedOptionsType = {
			minimal: new Set(["spelling", "punctuation"]),
			moderate: new Set([]),
			heavy: new Set([]),
		};
		const selectedCard = getActiveCategory(selectedOptions);
		expect(selectedCard).toEqual("minimal");
	});

	test("should return moderate", () => {
		const selectedOptions: SelectedOptionsType = {
			minimal: new Set(["spelling"]),
			moderate: new Set(["fluidity"]),
			heavy: new Set([]),
		};
		const selectedCard = getActiveCategory(selectedOptions);
		expect(selectedCard).toEqual("moderate");
	});

	test("should return heavy", () => {
		const selectedOptions: SelectedOptionsType = {
			minimal: new Set(["spelling"]),
			moderate: new Set([]),
			heavy: new Set(["restructure"]),
		};
		const selectedCard = getActiveCategory(selectedOptions);
		expect(selectedCard).toEqual("heavy");
	});

	test("should return heavy", () => {
		const selectedOptions: SelectedOptionsType = {
			minimal: new Set(["spelling"]),
			moderate: new Set(["repetitions"]),
			heavy: new Set(["restructure"]),
		};
		const selectedCard = getActiveCategory(selectedOptions);
		expect(selectedCard).toEqual("heavy");
	});
});
