import PriorityFilter from "@/components/MainProducts/PriorityFilter";
import ProductCard from "@/components/MainProducts/ProductCard";
import { getUser } from "@/lib/getUser";
import prisma from "@/lib/prisma";
import React from "react";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ priority: string; category: string }>;
}) {
  const { priority, category } = await searchParams;

  const user = await getUser();

  const purchasedPoducts = await prisma.wishList.findMany({
    where: {
      user_id: user?.id,
      purchased: true,
      ...(priority &&
        priority !== "all" && {
          priority: priority.toUpperCase(),
        }),
      ...(category && { category }),
    },
    omit: {
      user_id: true,
    },
  });
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-extrabold">Your Purchases</h3>
        <PriorityFilter />
      </div>
      <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
        {purchasedPoducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
