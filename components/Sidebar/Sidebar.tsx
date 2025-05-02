"use client";
import React from "react";
import SidebarTop from "./SidebarTop";
import SidebarMenu from "./SidebarMenu";

import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 flex h-screen w-64 flex-col gap-8 border-r py-6">
      <SidebarTop />
      <SidebarMenu />
      <div className="mt-auto px-4">
        <Button
          variant="outline"
          onClick={() => signOut({ redirectTo: "/signin" })}
        >
          <LogOut />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
