import { Icon } from "@/interfaces";

/**
 * Utility function to limit icons per category in development mode
 * @param icons - Array of all icons
 * @param limit - Number of icons to show per category (default: 10)
 * @returns Limited array of icons if in development mode, otherwise original array
 */
const limitIconsInDev = (icons: Icon[], limit: number = 10): Icon[] => {
  const iconsByCategory = icons.reduce<Record<string, Icon[]>>((acc, icon) => {
    const category = icon.category.toLowerCase();
    (acc[category] ??= []).push(icon);
    return acc;
  }, {});

  const limitedIcons = Object.entries(iconsByCategory).flatMap(([category, categoryIcons]) => {
    const limited = categoryIcons.slice(0, limit);
    // helpful debug when developing locally
    console.debug(`${category}: ${limited.length}/${categoryIcons.length} icons`);
    return limited;
  });

  console.debug(`Total icons: ${limitedIcons.length}/${icons.length}`);
  return limitedIcons;
};

/**
 * Check if currently in development mode
 * @returns boolean indicating if in development mode
 */
const isDevelopmentMode = (): boolean => {
  return process.env.NODE_ENV === "development";
};
export { isDevelopmentMode, limitIconsInDev };
