import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="via-muted/50 relative w-full max-w-md rounded-xl border bg-gradient-to-r from-transparent to-transparent p-6 before:absolute before:-top-px before:left-0 before:h-px before:w-full before:bg-gradient-to-r before:from-transparent before:from-20% before:via-blue-500/70 before:via-50% before:to-transparent before:to-80% after:absolute after:-bottom-px after:left-0 after:h-px after:w-full after:bg-gradient-to-r after:from-transparent after:from-20% after:via-blue-500/70 after:via-50% after:to-transparent after:to-80%">
        {children}
      </div>
    </div>
  );
}
