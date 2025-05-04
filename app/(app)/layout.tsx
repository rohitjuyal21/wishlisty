import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex">
      <Sidebar />
      <div className="min-h-screen flex-1 p-6 md:ml-64">{children}</div>
    </main>
  );
}
