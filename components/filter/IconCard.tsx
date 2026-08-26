"use client";

import type { Icon } from "@/interfaces";
import { Card, CardContent } from "@/components/ui/card";
import { computeIconSize } from "@/lib/utils";

interface IconCardProps {
  icon: Icon;
  onClick?: () => void;
}

export const IconCard: React.FC<IconCardProps> = ({ icon, onClick }) => {
  const size = computeIconSize(icon);

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="w-full text-left rounded-xl border border-slate-200 p-0 cursor-pointer hover:border-purple-300 hover:shadow-md hover:shadow-purple-50 transition-all duration-200 hover:scale-[1.012] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-1"
    >
      <CardContent className="flex gap-3 p-3 sm:p-4 items-center w-full">
        <i
          className={`ci ci-${icon.classes[0]} ci-${size}x sm:ci-${size + 1}x`}
          aria-hidden="true"
        />
        <span className="flex flex-col gap-0.5 min-w-0">
          <h4 className="text-gray-800 font-semibold truncate text-sm">{icon.name}</h4>
          <p className="text-gray-400 text-xs truncate">{icon.url}</p>
        </span>
      </CardContent>
    </Card>
  );
};
