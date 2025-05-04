"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import SidebarTop from "./SidebarTop";
import SidebarMenu from "./SidebarMenu";
import UserInfo from "./UserInfo";
import { useSession } from "next-auth/react";

export default function MobileSidebar() {
  const { data: session } = useSession();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="size-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex max-w-72 flex-col gap-8 py-6 sm:max-w-72"
      >
        <VisuallyHidden>
          <SheetTitle />
        </VisuallyHidden>
        <VisuallyHidden>
          <SheetDescription />
        </VisuallyHidden>
        <SidebarTop />
        <SidebarMenu />
        <UserInfo user={session?.user} />
      </SheetContent>
    </Sheet>
  );
}
