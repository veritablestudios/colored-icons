"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ExternalLink, Clipboard, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import type { Icon } from "@/interfaces";
import { ensureProtocol, computeIconSize } from "@/lib/utils";
import useCopy from "@/hooks/useCopy";

function IconHeader({ icon }: { icon: Icon }) {
  return (
    <div className="flex items-center gap-8 mb-10">
      <div className="p-8 bg-linear-to-b from-slate-100 to-white rounded-2xl shadow-xs border border-slate-200">
        <i className={`ci ci-${icon.classes[0]} ci-4x text-slate-700`} />
      </div>
      <div className="flex flex-col">
        <DialogTitle className="text-2xl font-semibold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {icon.name}
        </DialogTitle>
        <Link
          href={ensureProtocol(icon.url)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:underline flex items-center gap-1"
        >
          <span>{icon.url}</span>
          <ExternalLink className="text-gray-500 w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

function IconCode({ iconClass }: { iconClass: string }) {
  const { copied, handleCopy } = useCopy();
  const snippet = `<i class="ci ci-${iconClass}"></i>`;

  return (
    <div className="flex items-center group">
      <pre className="flex-1 text-xs sm:text-sm whitespace-pre-wrap">
        <code className="font-mono">{snippet}</code>
      </pre>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleCopy(snippet)}
        className="m-2 hover:bg-slate-200/60 transition-all h-auto p-2 cursor-pointer"
        title="Copy to clipboard"
      >
        {copied ? (
          <ClipboardCheck className="w-5 h-5 text-green-600" />
        ) : (
          <Clipboard className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
        )}
      </Button>
    </div>
  );
}

function ZoomOverlay({ zoomedIcon }: { zoomedIcon: string | null }) {
  if (!zoomedIcon) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="p-8 bg-gray-300 rounded-xl shadow-xl sm:scale-150 scale-125 transition-all duration-150 ease-out animate-in fade-in zoom-in-50">
        <i className={`ci ci-${zoomedIcon} ci-6x text-gray-800`} />
      </div>
    </div>
  );
}

interface ModalProps {
  icon: Icon;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Modal: React.FC<ModalProps> = ({ icon, open, onOpenChange }) => {
  const [zoomedIcon, setZoomedIcon] = useState<string | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-2xl w-full rounded-2xl bg-white shadow-[0_0_50px_-12px] shadow-purple-500/10 border border-slate-200 max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0"
      >
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl py-4 px-8">
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100/80 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </div>

        <div className="mx-6 sm:mx-8 mb-8 flex min-h-0 flex-col">
          {/* Icon preview (static header area) */}
          <IconHeader icon={icon} />

          {/* Usage header */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900">Usage Guide</h3>
            <p className="text-sm text-slate-400">
              Copy and paste the following code into your HTML or JSX to use this icon:
            </p>
          </div>

          {/* Divider above scroll area */}
          <hr className="my-4 border-slate-200" />

          {/* Scrollable list area */}
          <div className="flex-1 overflow-y-auto pr-1 sm:pr-2">
            <div className="space-y-4">
              {icon.classes.map((iconClass) => (
                <div
                  key={iconClass}
                  className="bg-slate-50 border border-slate-200 px-3 rounded-xl flex items-center gap-4 h-20 hover:border-slate-300 hover:bg-white transition-colors"
                >
                  <i
                    className={`ci ci-${iconClass} ci-${computeIconSize(icon)}x mx-3 cursor-pointer transition-all duration-200`}
                    onMouseEnter={() => setZoomedIcon(iconClass)}
                    onMouseLeave={() => setZoomedIcon(null)}
                  />
                  <div className="flex-1">
                    <IconCode iconClass={iconClass} />
                  </div>
                </div>
              ))}
            </div>
            {/* bottom spacer to avoid last item hugging the edge */}
            <div className="h-2" />
          </div>
        </div>

        {/* Zoomed icon overlay */}
        <ZoomOverlay zoomedIcon={zoomedIcon} />
      </DialogContent>
    </Dialog>
  );
};
