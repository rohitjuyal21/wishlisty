import WishlistyLogo from "@/components/Landing/WishlistyLogo";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <div className="flex w-full items-center justify-between p-4">
        <Link href="/">
          <WishlistyLogo />
        </Link>
        <Button variant="outline" size="icon">
          <Link
            href="https://github.com/rohitjuyal21/wishlisty"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
          </Link>
        </Button>
      </div>
      <div className="flex w-full flex-1 items-center justify-center">
        <div className="via-muted/50 relative w-full max-w-md rounded-xl border bg-gradient-to-r from-transparent to-transparent p-6 before:absolute before:-top-px before:left-0 before:h-px before:w-full before:bg-gradient-to-r before:from-transparent before:from-20% before:via-blue-500/70 before:via-50% before:to-transparent before:to-80% after:absolute after:-bottom-px after:left-0 after:h-px after:w-full after:bg-gradient-to-r after:from-transparent after:from-20% after:via-blue-500/70 after:via-50% after:to-transparent after:to-80%">
          {children}
        </div>
      </div>
    </div>
  );
}
