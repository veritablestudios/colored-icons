"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/kibo-ui/combobox";
import type { Category } from "@/interfaces";
import { CategoryIcon } from "./CategoryIcon";

interface DropdownProps {
  categories: Category[];
  onCategoryChange?: (category: Category) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ categories, onCategoryChange }) => {
  const categoryData = categories.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  const handleValueChange = (newValue: string) => {
    const selectedCategory = categories.find((cat) => cat.name === newValue);
    if (selectedCategory && onCategoryChange) {
      onCategoryChange(selectedCategory);
    }
  };

  return (
    <Combobox data={categoryData} onValueChange={handleValueChange} type="category">
      <ComboboxTrigger className="w-full" />
      <ComboboxContent>
        <ComboboxInput placeholder="Search category..." />
        <ComboboxEmpty>No category found.</ComboboxEmpty>
        <ComboboxList>
          <ComboboxGroup>
            {categories.map((category) => (
              <ComboboxItem key={category.name} value={category.name}>
                <span className="flex items-center gap-2">
                  <CategoryIcon name={category.name} />
                  {category.name}
                </span>
              </ComboboxItem>
            ))}
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
