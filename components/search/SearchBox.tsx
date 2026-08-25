"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchContext } from "@/context/SearchContextProvider";
import { useContext, useRef } from "react";
import { Search, X } from "lucide-react";
import useSearchShortcuts from "@/hooks/useSearchShortcuts";

export function SearchBox() {
  const ref = useRef<HTMLInputElement>(null);

  const { search, setSearch, focusTrigger } = useContext(SearchContext);
  useSearchShortcuts(ref, focusTrigger);

  const handleClearSearch = () => {
    setSearch("");
    ref.current?.focus();
  };

  return (
    <div className="relative animate-in fade-in slide-in-from-bottom-1">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search icons…"
        type="search"
        className="pl-8 h-10 focus-visible:ring-purple-600 focus-visible:border-transparent transition-shadow"
        ref={ref}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search icons"
      />
      {search && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 h-8 w-8 -translate-y-1/2 hover:bg-transparent transition-transform hover:scale-110 active:scale-95"
          onClick={handleClearSearch}
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
