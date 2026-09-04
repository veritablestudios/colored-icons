import { computeIconSize, cn, ensureProtocol } from "@/lib/utils";
import { describe, expect, it } from "vitest";

describe("cn", () => {
  it("should merge class names correctly", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("should resolve tailwind class conflicts", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("should ignore falsy and conditional values", () => {
    const isHidden = false;
    expect(cn("base", isHidden && "hidden", null, undefined, "active")).toBe("base active");
  });
});

describe("ensureProtocol", () => {
  it("should return empty string for empty url", () => {
    expect(ensureProtocol("")).toBe("");
  });

  it("should prepend https by default to bare domain", () => {
    expect(ensureProtocol("example.com")).toBe("https://example.com");
  });

  it("should support specifying http as protocol", () => {
    expect(ensureProtocol("example.com", "http")).toBe("http://example.com");
  });

  it("should not double-prepend protocol if already present", () => {
    expect(ensureProtocol("https://example.com")).toBe("https://example.com");
    expect(ensureProtocol("http://example.com")).toBe("http://example.com");
    expect(ensureProtocol("HTTPS://EXAMPLE.COM")).toBe("HTTPS://EXAMPLE.COM");
  });

  it("should trim surrounding whitespace", () => {
    expect(ensureProtocol("  example.com  ")).toBe("https://example.com");
    expect(ensureProtocol("  https://example.com  ")).toBe("https://example.com");
  });
});

describe("computeIconSize", () => {
  it("should return 5 for horizontal or wordmark icons", () => {
    expect(
      computeIconSize({
        name: "Test",
        category: "technology",
        classes: ["ci-test-horizontal"],
        url: "test.com",
      }),
    ).toBe(5);

    expect(
      computeIconSize({
        name: "Test",
        category: "technology",
        classes: ["ci-test-wordmark"],
        url: "test.com",
      }),
    ).toBe(5);
  });

  it("should return 4 for vertical icons", () => {
    expect(
      computeIconSize({
        name: "Test",
        category: "technology",
        classes: ["ci-test-vertical"],
        url: "test.com",
      }),
    ).toBe(4);
  });

  it("should return 3 for animals category icons", () => {
    expect(
      computeIconSize({
        name: "Bear",
        category: "animals",
        classes: ["ci-bear"],
        url: "bear.com",
      }),
    ).toBe(3);

    expect(
      computeIconSize({
        name: "Cow",
        category: "ANIMALS",
        classes: ["ci-cow"],
        url: "cow.com",
      }),
    ).toBe(3);
  });

  it("should return 2 by default", () => {
    expect(
      computeIconSize({
        name: "React",
        category: "technology",
        classes: ["ci-react"],
        url: "react.dev",
      }),
    ).toBe(2);
  });
});
