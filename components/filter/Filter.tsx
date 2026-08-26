"use client";

import { useState, useContext } from "react";
import { Dropdown } from "./Dropdown";
import { DevModeBanner } from "./DevModeBanner";
import { CategoryList } from "./CategoryList";
import { IconList } from "./IconList";
import { icons, categories } from "@/constants";
import { SearchContext } from "@/context/SearchContextProvider";
import { isDevelopmentMode, limitIconsInDev } from "@/lib/dev-utils";
import type { Category } from "@/interfaces";

export const Filter = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const { search } = useContext(SearchContext);

  // Use development-limited icons in dev mode, full icons in production
  const iconsToUse = isDevelopmentMode() ? limitIconsInDev(icons) : icons;

  return (
    <div className="flex flex-col gap-6">
      {/* Development mode indicator */}
      <DevModeBanner />

      <div className="flex flex-col lg:flex-row gap-6">
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <div className="sm:hidden w-full">
          <Dropdown categories={categories} onCategoryChange={setSelectedCategory} />
        </div>
        <div className="flex-1">
          <IconList icons={iconsToUse} selectedCategory={selectedCategory} search={search} />
        </div>
      </div>
    </div>
  );
};
