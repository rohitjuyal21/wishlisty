import { Loader2 } from "lucide-react";
import React from "react";

export default function loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <Loader2 className="text-muted-foreground h-10 w-10 animate-spin" />
    </div>
  );
}
