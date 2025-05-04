import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "/public/assets/wishlisty-logo.png";
import WishlistyLogo from "../Landing/WishlistyLogo";

export default function SidebarTop() {
  return (
    <div className="px-4">
      <Link href="/" className="flex items-center gap-2">
        <WishlistyLogo />
      </Link>
    </div>
  );
}
