import { expect, test } from "bun:test";

import { sort, Stack } from "./sort";

test("returns standard for packages that are neither heavy nor bulky", () => {
  expect(sort(50, 50, 50, 10)).toBe(Stack.STANDARD);
  expect(sort(100, 100, 99, 15)).toBe(Stack.STANDARD);
  expect(sort(100, 50, 30, 19.99999999999)).toBe(Stack.STANDARD);
  expect(sort(99.9999, 49.9999, 149.9999, 19.99999999999)).toBe(Stack.STANDARD);
});

test("sorts special packages when volume >= 1,000,000 cm cubed", () => {
  expect(sort(100, 100, 100, 10)).toBe(Stack.SPECIAL);
  expect(sort(200, 50, 50, 10)).toBe(Stack.SPECIAL);
});

test("sorts special packages when any dimension >= 150 cm", () => {
  expect(sort(150, 50, 50, 10)).toBe(Stack.SPECIAL);
  expect(sort(100, 150, 50, 10)).toBe(Stack.SPECIAL);
  expect(sort(100, 50, 150, 10)).toBe(Stack.SPECIAL);
});

test("sorts special packages when mass >= 20 kg", () => {
  expect(sort(100, 50, 30, 20)).toBe(Stack.SPECIAL);
});

test("rejects heavy and bulky packages", () => {
  expect(sort(100, 100, 100, 30)).toBe(Stack.REJECTED);
  expect(sort(200, 200, 200, 20)).toBe(Stack.REJECTED);
  expect(sort(150, 1, 1, 25)).toBe(Stack.REJECTED);
});

test("handles missing dimensions gracefully", () => {
  expect(() => sort(1, 1, 0, 1)).toThrow();
  expect(() => sort(1, 1, 0.0000001, 1)).not.toThrow();
  expect(() => sort(150, 150, 150, 20)).not.toThrow();
});

test("converts non-numeric inputs if possible", () => {
  expect(() => sort("foo", "bar", "baz", "10")).toThrow();
  expect(sort("100", "50", "30", "10")).toBe(Stack.STANDARD);
  expect(sort("100", "50", "50", "20")).toBe(Stack.SPECIAL);
  expect(sort("200", "200", "200", "20")).toBe(Stack.REJECTED);
})