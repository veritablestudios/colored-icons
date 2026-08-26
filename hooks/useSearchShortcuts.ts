import { useEffect } from "react";

/**
 * Focuses the provided input when focusTrigger changes and adds Cmd/Ctrl+K shortcut.
 */
export default function useSearchShortcuts(
  ref: React.RefObject<HTMLInputElement | null>,
  focusTrigger: number,
) {
  // Focus when parent triggers it
  useEffect(() => {
    if (focusTrigger) {
      ref.current?.focus();
    }
  }, [focusTrigger, ref]);

  // Cmd/Ctrl + K to focus
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        ref.current?.focus();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [ref]);
}
