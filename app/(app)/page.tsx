import { auth } from "@/auth";
import MainProducts from "@/components/MainProducts/MainProducts";
import prisma from "@/lib/prisma";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ priority: string; category: string }>;
}) {
  const { priority, category } = await searchParams;
  const session = await auth();

  const products = await prisma.wishList.findMany({
    where: {
      user_id: session?.user?.id,
      ...(priority &&
        priority !== "all" && {
          priority: priority.toUpperCase(),
        }),
      ...(category && { category_id: Number(category) }),
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  const sortedProducts = products.sort((a, b) => {
    if (a.purchased && !b.purchased) return 1;
    if (!a.purchased && b.purchased) return -1;
    return 0;
  });

  return <MainProducts products={sortedProducts} />;
}
