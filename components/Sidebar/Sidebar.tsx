import React from "react";
import SidebarTop from "./SidebarTop";
import SidebarMenu from "./SidebarMenu";

export default function Sidebar() {
  return (
    <aside className="border-r py-6 min-h-screen w-64 flex flex-col gap-8">
      <SidebarTop />
      <SidebarMenu />
    </aside>
  );
}
