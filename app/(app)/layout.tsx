import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex">
      <Sidebar />
      <div className="flex-1 p-6">{children}</div>
    </main>
  );
}
