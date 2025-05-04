import Link from "next/link";
import { Github } from "lucide-react";
import WishlistyLogo from "./WishlistyLogo";
import { Button } from "../ui/button";

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4">
        <div className="flex w-full items-center justify-between gap-2">
          <WishlistyLogo />
          <div className="text-muted-foreground w-full text-center text-sm">
            © {new Date().getFullYear()} Wishlisty. All rights reserved.
          </div>
          <Button variant="outline" size="icon" asChild>
            <Link
              href="https://github.com/rohitjuyal21/wishlisty"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
