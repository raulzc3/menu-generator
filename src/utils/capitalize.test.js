import capitalize from "./capitalize";

describe("capitalize function", () => {
  it("capitalizes the first letter of a word", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("handles an empty string", () => {
    expect(capitalize("")).toBe("");
  });

  it("handles a single character", () => {
    expect(capitalize("a")).toBe("A");
  });

  it("does not modify already capitalized words", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });

  it("does not change the case of the rest of the string", () => {
    expect(capitalize("hELLO")).toBe("HELLO"); // Se mantiene en mayúsculas
  });

  it("returns an empty string when input is null or undefined", () => {
    expect(capitalize(null)).toBe("");
    expect(capitalize(undefined)).toBe("");
  });
});
