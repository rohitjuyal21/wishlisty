import Image from "next/image";
import React from "react";

export default function WishlistyLogo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/assets/wishlisty-logo.png"
        alt="wishlisty"
        width={28}
        height={28}
      />
      <span className="font-rowdies text-xl">Wishlisty</span>
    </div>
  );
}
