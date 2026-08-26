"use client";
import { createContext, useState, ReactNode, useCallback, useMemo } from "react";

interface SearchContextType {
  search: string;
  setSearch: (search: string) => void;
  focusTrigger: number;
  triggerFocus: () => void;
}
// Define initial context values
const initialSearchContext: SearchContextType = {
  search: "",
  setSearch: () => {},
  focusTrigger: 0,
  triggerFocus: () => {},
};

export const SearchContext = createContext<SearchContextType>(initialSearchContext);

interface SearchContextProviderProps {
  children: ReactNode;
}

export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const [search, setSearch] = useState<string>("");
  const [focusTrigger, setFocusTrigger] = useState<number>(0);

  const triggerFocus = useCallback(() => {
    setFocusTrigger((prev) => prev + 1);
  }, []);

  const contextValue = useMemo(
    () => ({
      search,
      setSearch,
      focusTrigger,
      triggerFocus,
    }),
    [search, focusTrigger, triggerFocus],
  );

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
};
