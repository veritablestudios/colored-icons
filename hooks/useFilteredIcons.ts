import { useMemo } from "react";
import useDebounce from "@/hooks/useDebounce";
import type { Icon, Category } from "@/interfaces";

interface Params {
  icons: Icon[];
  search: string;
  selectedCategory: Category;
}

export default function useFilteredIcons({ icons, search, selectedCategory }: Params) {
  const debouncedSearch = useDebounce(search, 200);

  const searchFilteredIcons = useMemo(() => {
    if (!debouncedSearch) return icons;
    const s = debouncedSearch.toLowerCase();
    return icons.filter(
      (icon) =>
        icon.name.toLowerCase().includes(s) ||
        icon.url.toLowerCase().includes(s) ||
        icon.category.toLowerCase().includes(s) ||
        icon.classes.some((cls) => cls.toLowerCase().includes(s)),
    );
  }, [icons, debouncedSearch]);

  const filteredIcons = useMemo(() => {
    const sortedIcons = [...searchFilteredIcons].sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
    );

    if (selectedCategory.name === "All") return sortedIcons;
    const categoryName = selectedCategory.name.toLowerCase();
    return sortedIcons.filter((icon) => icon.category.toLowerCase() === categoryName);
  }, [searchFilteredIcons, selectedCategory]);

  return filteredIcons;
}
