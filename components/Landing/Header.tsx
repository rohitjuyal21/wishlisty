"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import WishlistyLogo from "@/components/Landing/WishlistyLogo";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Session } from "next-auth";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion } from "framer-motion";
import { MotionConfig } from "framer-motion";

interface HeaderProps {
  session: Session | null;
}

export default function Header({ session }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 z-30 w-full ${
        scrolled
          ? "bg-background/80 border-b backdrop-blur-xs"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <WishlistyLogo />
        </div>
        {/* Desktop Nav */}
        <div className="hidden items-center md:flex">
          <Button
            variant="link"
            asChild
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            <Link href="#features">Features</Link>
          </Button>
          <Button
            variant="link"
            asChild
            className="text-muted-foreground text-sm"
          >
            <Link href="#how-it-works">How It Works</Link>
          </Button>
          {session ? (
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              <Button asChild variant="outline">
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-4 pt-10">
              <VisuallyHidden>
                <SheetTitle></SheetTitle>
              </VisuallyHidden>
              <VisuallyHidden>
                <SheetDescription></SheetDescription>
              </VisuallyHidden>
              <Button
                variant="link"
                asChild
                className="text-muted-foreground hover:text-foreground justify-start"
                onClick={() => setOpen(false)}
              >
                <Link href="#features">Features</Link>
              </Button>
              <Button
                variant="link"
                asChild
                className="text-muted-foreground hover:text-foreground justify-start"
                onClick={() => setOpen(false)}
              >
                <Link href="#how-it-works">How It Works</Link>
              </Button>
              {session ? (
                <Button asChild className="mx-4" onClick={() => setOpen(false)}>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="mx-4 w-fit justify-center"
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/signin">Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    className="mx-4 w-fit justify-center"
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
