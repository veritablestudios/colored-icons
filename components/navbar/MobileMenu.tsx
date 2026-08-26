"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { menuItems } from "@/constants";
import type { MenuItem } from "@/constants/nav";
import { cn } from "@/lib/utils";

function MobileHamburger({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className="pointer-events-none"
      data-open={isOpen ? "true" : "false"}
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 12L20 12"
        className="origin-center -translate-y-1.75 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315"
      />
      <path
        d="M4 12H20"
        className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
      />
      <path
        d="M4 12H20"
        className="origin-center translate-y-1.75 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
      />
    </svg>
  );
}

const baseMenuItemClass =
  "block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium rounded-sm hover:bg-accent";

function MobileMenuItem({ item, onClick }: { item: MenuItem; onClick: () => void }) {
  const pathname = usePathname();

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseMenuItemClass}
        onClick={onClick}
      >
        {item.label}
      </a>
    );
  }

  const active = pathname === item.href;
  return (
    <Link
      href={item.href}
      className={cn(baseMenuItemClass, active && "text-foreground font-semibold bg-accent")}
      onClick={onClick}
    >
      {item.label}
    </Link>
  );
}

export const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <PopoverTrigger asChild>
          <Button className="group size-8" variant="ghost" size="icon" aria-expanded={isMenuOpen}>
            <MobileHamburger isOpen={isMenuOpen} />
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="start"
          className="w-48 p-2"
          aria-describedby="mobile-menu-description"
        >
          <nav className="space-y-2" role="navigation" aria-label="Main navigation">
            {menuItems.map((item) => (
              <MobileMenuItem key={item.href} item={item} onClick={() => setIsMenuOpen(false)} />
            ))}
          </nav>
        </PopoverContent>
      </Popover>
    </div>
  );
};
