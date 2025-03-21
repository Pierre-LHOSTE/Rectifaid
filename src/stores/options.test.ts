import { beforeEach, describe, expect, test } from "@jest/globals";
import { useOptionsStore } from "./options.store";
import { renderHook, act } from "@testing-library/react";

describe("minimal card tests", () => {
	beforeEach(() => {
		useOptionsStore.setState({
			selectedOptions: new Map([
				["minimal", new Set(["spelling"])],
				["moderate", new Set([])],
				["heavy", new Set([])],
			]),
		});
	});

	test("should initialize selectedCard to 'minimal'", () => {
		const { result } = renderHook(() => useOptionsStore());
		const selectedOptions = result.current.selectedOptions;
		expect(selectedOptions).toEqual(
			new Map([
				["minimal", new Set(["spelling"])],
				["moderate", new Set([])],
				["heavy", new Set([])],
			])
		);
	});

	test("when selecting an option, it should be added to selectedOptions", () => {
		const { result } = renderHook(() => useOptionsStore());
		act(() => {
			result.current.selectOption("minimal", "punctuation");
		});
		const selectedOptions = result.current.selectedOptions;
		expect(selectedOptions).toEqual(
			new Map([
				["minimal", new Set(["spelling", "punctuation"])],
				["moderate", new Set([])],
				["heavy", new Set([])],
			])
		);
	});

	test("when deselecting an option, it should be removed from selectedOptions", () => {
		const { result } = renderHook(() => useOptionsStore());
		act(() => {
			result.current.selectOption("minimal", "punctuation");
			result.current.deselectOption("minimal", "spelling");
		});
		const selectedOptions = result.current.selectedOptions;
		expect(selectedOptions).toEqual(
			new Map([
				["minimal", new Set(["punctuation"])],
				["moderate", new Set([])],
				["heavy", new Set([])],
			])
		);
	});

	test("when deselecting the last option, it should be kept as selected", () => {
		const { result } = renderHook(() => useOptionsStore());
		act(() => {
			result.current.deselectOption("minimal", "spelling");
			result.current.deselectOption("minimal", "punctuation");
		});
		const selectedOptions = result.current.selectedOptions;
		expect(selectedOptions).toEqual(
			new Map([
				["minimal", new Set(["spelling"])],
				["moderate", new Set([])],
				["heavy", new Set([])],
			])
		);
	});

	test("when selecting all options, all options should be selected", () => {
		const { result } = renderHook(() => useOptionsStore());
		act(() => {
			result.current.selectAllOptions("minimal");
		});
		const selectedOptions = result.current.selectedOptions;
		expect(selectedOptions).toEqual(
			new Map([
				["minimal", new Set(["spelling", "punctuation", "anglicisms"])],
				["moderate", new Set([])],
				["heavy", new Set([])],
			])
		);
	});

	test("when deselecting all options, only the first option should remain selected", () => {
		const { result } = renderHook(() => useOptionsStore());
		act(() => {
			result.current.deselectAllOptions("minimal");
		});
		const selectedOptions = result.current.selectedOptions;
		expect(selectedOptions).toEqual(
			new Map([
				["minimal", new Set(["spelling"])],
				["moderate", new Set([])],
				["heavy", new Set([])],
			])
		);
	});
});
