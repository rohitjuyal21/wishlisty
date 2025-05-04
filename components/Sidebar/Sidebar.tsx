import React from "react";
import SidebarTop from "./SidebarTop";
import SidebarMenu from "./SidebarMenu";
import UserInfo from "./UserInfo";
import { auth } from "@/auth";

export default async function Sidebar() {
  const session = await auth();
  return (
    <aside className="fixed top-0 left-0 hidden h-screen w-64 flex-col gap-8 border-r py-6 md:flex">
      <SidebarTop />
      <SidebarMenu />
      <UserInfo user={session?.user} />
    </aside>
  );
}
