import PriorityFilter from "@/components/MainProducts/PriorityFilter";
import ProductCard from "@/components/MainProducts/ProductCard";
import { getUser } from "@/lib/getUser";
import prisma from "@/lib/prisma";
import Image from "next/image";
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
      ...(priority &&
        priority !== "all" && {
          priority: priority.toUpperCase(),
        }),
      ...(category && { category_id: Number(category) }),
      purchased: true,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-extrabold">Your Purchases</h3>
        <PriorityFilter />
      </div>
      {purchasedPoducts.length > 0 ? (
        <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
          {purchasedPoducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categories={categories}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <Image
            src="/assets/empty-wishlist.png"
            alt="Empty Wishlist"
            width={72}
            height={72}
          />
          <h2 className="mt-2 mb-1 text-xl font-semibold">
            Your purchases are empty
          </h2>
          <p className="text-muted-foreground text-sm">
            When you mark items as purchased from your wishlist, they&lsquo;ll
            appear here.
          </p>
        </div>
      )}
    </div>
  );
}
