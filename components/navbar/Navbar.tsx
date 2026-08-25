"use client";

import { useRef, useContext, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchContext } from "@/context/SearchContextProvider";
import { pacifico } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { DesktopMenu } from "./DesktopMenu";

function Logo() {
  return (
    <Link
      className={cn(
        pacifico.className,
        "text-2xl lg:text-3xl hover:text-purple-600 transition-colors select-none rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
      )}
      href="/"
    >
      Coloured Icons
    </Link>
  );
}

function SearchButton({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="transition-transform hover:scale-110 active:scale-95"
    >
      <Link href="/" onClick={onClick}>
        <Search className="size-5" />
        <span className="sr-only">Search</span>
      </Link>
    </Button>
  );
}

interface NavbarProps {
  hideSearch?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ hideSearch = false }) => {
  const pathname = usePathname();

  const pendingFocusRef = useRef(false);
  const { triggerFocus } = useContext(SearchContext);

  const handleSearchClick = useCallback(() => {
    const searchSection = document.getElementById("search-section");
    if (searchSection) {
      const offset = 50;
      const elementPosition = searchSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      triggerFocus();
    }
  }, [triggerFocus]);

  useEffect(() => {
    if (pendingFocusRef.current && pathname === "/") {
      pendingFocusRef.current = false;
      handleSearchClick();
    }
  }, [pathname, handleSearchClick]);

  return (
    <nav className="py-4" aria-label="Global">
      <div className="flex items-center justify-between gap-4">
        {/* Left side - Logo (and hamburger on mobile) */}
        <div className="flex items-center gap-4">
          <MobileMenu />
          <Logo />
        </div>

        {/* Center - Desktop Navigation */}
        <DesktopMenu />

        {/* Right side - Search */}
        <div className="flex items-center">
          {!hideSearch && (
            <SearchButton
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                if (pathname === "/") {
                  e.preventDefault();
                  handleSearchClick();
                } else {
                  pendingFocusRef.current = true;
                }
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
};
