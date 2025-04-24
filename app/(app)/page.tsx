import MainProducts from "@/components/MainProducts/MainProducts";
import { getUser } from "@/lib/getUser";
import prisma from "@/lib/prisma";
export default async function Home() {
  const user = await getUser();
  const products = await prisma.wishList.findMany({
    where: {
      user_id: user?.id,
    },
    omit: {
      user_id: true,
    },
  });

  const sortedProducts = products.sort((a, b) => {
    if (a.purchased && !b.purchased) return 1;
    if (!a.purchased && b.purchased) return -1;
    return 0;
  });

  return <MainProducts products={sortedProducts} />;
}
