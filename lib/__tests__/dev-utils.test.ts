import { Icon } from "@/interfaces";
import { isDevelopmentMode, limitIconsInDev } from "@/lib/dev-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("limitIconsInDev", () => {
  const sampleIcons: Icon[] = [
    { name: "Bear", category: "animals", classes: ["ci-bear"], url: "bear.com" },
    { name: "Cow", category: "animals", classes: ["ci-cow"], url: "cow.com" },
    { name: "Crab", category: "animals", classes: ["ci-crab"], url: "crab.com" },
    { name: "React", category: "technology", classes: ["ci-react"], url: "react.dev" },
    { name: "Vue", category: "technology", classes: ["ci-vue"], url: "vuejs.org" },
  ];

  beforeEach(() => {
    vi.spyOn(console, "debug").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should limit icons per category according to the limit parameter", () => {
    const limited = limitIconsInDev(sampleIcons, 1);
    expect(limited).toHaveLength(2);
    expect(limited.map((i) => i.name)).toEqual(["Bear", "React"]);
  });

  it("should return all icons in a category if category count is less than limit", () => {
    const limited = limitIconsInDev(sampleIcons, 5);
    expect(limited).toHaveLength(5);
  });

  it("should default to a limit of 10 if unspecified", () => {
    const limited = limitIconsInDev(sampleIcons);
    expect(limited).toHaveLength(5);
  });
});

describe("isDevelopmentMode", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("should return true when NODE_ENV is development", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(isDevelopmentMode()).toBe(true);
  });

  it("should return false when NODE_ENV is test or production", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(isDevelopmentMode()).toBe(false);

    vi.stubEnv("NODE_ENV", "test");
    expect(isDevelopmentMode()).toBe(false);
  });
});
