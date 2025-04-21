"use client";
import React from "react";

import { LayoutDashboard, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export const sidebarItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Purchases",
    href: "/purchases",
    icon: ShoppingBag,
  },
];

export default function SidebarMenu() {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col gap-2 pr-4">
      {sidebarItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={clsx(
              "group relative flex cursor-pointer items-center gap-2 px-4 py-3 before:absolute before:inset-0 before:-z-10 before:-translate-x-full before:rounded-r-full before:transition before:duration-300 hover:before:translate-x-0",
              isActive
                ? "before:from-muted text-foreground before:translate-x-0 before:bg-gradient-to-r before:to-transparent"
                : "text-muted-foreground before:from-muted before:bg-gradient-to-r before:to-transparent",
            )}
          >
            <item.icon className="size-5" />
            <span className="font-medium transition duration-300 group-hover:translate-x-1">
              {item.label}
            </span>
          </Link>
        );
      })}
    </ul>
  );
}
