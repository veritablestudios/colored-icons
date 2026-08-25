import type { Category } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CategoryIcon } from "./CategoryIcon";

interface Props {
  categories: Category[];
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export const CategoryList: React.FC<Props> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="hidden sm:flex flex-row lg:flex-col gap-1.5 text-sm lg:w-64 shrink-0 overflow-x-auto pb-2 lg:pb-0">
      {categories.map((category) => {
        const isSelected = selectedCategory.name === category.name;
        return (
          <Button
            key={category.name}
            variant="ghost"
            onClick={() => onCategoryChange(category)}
            className={cn(
              "inline-flex items-center whitespace-nowrap lg:justify-start transition-transform duration-150 active:scale-95",
              isSelected
                ? "bg-purple-600 text-white shadow-lg hover:bg-purple-700 hover:text-white"
                : "text-gray-600 hover:bg-purple-50 hover:text-purple-600",
            )}
          >
            <CategoryIcon name={category.name} />
            {category.name}
          </Button>
        );
      })}
    </div>
  );
};
