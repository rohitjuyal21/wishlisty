import { getUser } from "@/lib/getUser";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      productName,
      productLink,
      note,
      priority,
      category,
      purchased,
      remindAt,
    } = body;
    const user = await getUser();
    console.log("user", user);

    if (!user) {
      return Response.json(
        { message: "Unauthorized", status: "error" },
        { status: 401 },
      );
    }

    const existingCategory = await prisma.category.findUnique({
      where: { name: category },
    });

    let category_id: number;

    if (!existingCategory) {
      const newCategory = await prisma.category.create({
        data: { name: category },
      });
      category_id = newCategory.id;
    } else {
      category_id = existingCategory.id;
    }

    const wishlistItem = await prisma.wishList.create({
      data: {
        productName,
        productLink,
        note,
        priority,
        category_id,
        purchased,
        remindAt,
        user_id: user.id,
      },
    });

    return Response.json(
      {
        message: "Wishlist item created successfully",
        status: "success",
        wishlistItem,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: error, status: "error" }, { status: 500 });
  }
}
