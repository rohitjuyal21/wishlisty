import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SidebarTop() {
  return (
    <div className="px-4">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/wishlisty-logo.png"
          alt="wishlisty"
          width={36}
          height={36}
        />
        <span className="font-rowdies text-2xl">Wishlisty</span>
      </Link>
    </div>
  );
}
