import ProductCard from "@/components/MainProducts/ProductCard";
import { getUser } from "@/lib/getUser";
import prisma from "@/lib/prisma";
import React from "react";

export default async function page() {
  const user = await getUser();
  const purchasedPoducts = await prisma.wishList.findMany({
    where: {
      user_id: user?.id,
      purchased: true,
    },
    omit: {
      user_id: true,
    },
  });
  return (
    <div>
      <h3 className="text-2xl font-extrabold">Your Purchases</h3>
      <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
        {purchasedPoducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
