import { isDevelopmentMode } from "@/lib/dev-utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export const DevModeBanner = () => {
  if (!isDevelopmentMode()) return null;

  return (
    <Alert className="bg-yellow-50/50 border-yellow-200/80 rounded-lg p-3">
      <AlertTriangle className="h-4 w-4 text-yellow-600!" />
      <AlertDescription className="text-yellow-800 font-medium">
        Development Mode: Showing 10 icons per category
      </AlertDescription>
    </Alert>
  );
};
