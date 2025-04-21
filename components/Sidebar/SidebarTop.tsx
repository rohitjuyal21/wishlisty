import Image from "next/image";
import React from "react";

export default function SidebarTop() {
  return (
    <div className="flex gap-2 items-center px-4">
      <Image
        src="/assets/wishlisty-logo.png"
        alt="wishlisty"
        width={36}
        height={36}
        priority={true}
      />
      <span className="font-rowdies text-2xl">Wishlisty</span>
    </div>
  );
}
