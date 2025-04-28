import MainProducts from "@/components/MainProducts/MainProducts";
import { getUser } from "@/lib/getUser";
import prisma from "@/lib/prisma";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ priority: string; category: string }>;
}) {
  const { priority, category } = await searchParams;
  const user = await getUser();
  // const products = await prisma.wishList.findMany({
  //   where: {
  //     user_id: user?.id,
  //     ...(priority &&
  //       priority !== "all" && {
  //         priority: priority.toUpperCase(),
  //       }),
  //     ...(category && { category_id: Number(category) }),
  //   },
  //   omit: {
  //     user_id: true,
  //   },
  // });

  const products = await prisma.wishList.findMany({
    include: {
      category: true,
      user: true,
    },
  });
  console.log(products);

  const sortedProducts = products.sort((a, b) => {
    if (a.purchased && !b.purchased) return 1;
    if (!a.purchased && b.purchased) return -1;
    return 0;
  });

  return <MainProducts products={sortedProducts} />;
}
