"use client";

import { useState } from "react";
import { IconCard } from "./IconCard";
import type { Icon, Category } from "@/interfaces";
import useFilteredIcons from "@/hooks/useFilteredIcons";
import { Modal } from "@/components/modal";

interface IconListProps {
  icons: Icon[];
  selectedCategory: Category;
  search: string;
}

export const IconList: React.FC<IconListProps> = ({ icons, selectedCategory, search }) => {
  const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null);

  const filteredIcons = useFilteredIcons({
    icons,
    search,
    selectedCategory,
  });

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {filteredIcons.map((icon) => (
          <li key={icon.name}>
            <IconCard icon={icon} onClick={() => setSelectedIcon(icon)} />
          </li>
        ))}
      </ul>

      {selectedIcon && (
        <Modal
          icon={selectedIcon}
          open
          onOpenChange={(open) => {
            if (!open) setSelectedIcon(null);
          }}
        />
      )}
    </>
  );
};
