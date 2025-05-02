import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { productId: string } },
) {
  try {
    const { productId } = await params;
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
    const session = await auth();

    if (!session) {
      return Response.json(
        { message: "Unauthorized", status: "error" },
        { status: 401 },
      );
    }

    const existingCategory = await prisma.category.findUnique({
      where: {
        name: category,
      },
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

    const wishlistItem = await prisma.wishList.update({
      where: {
        id: Number(productId),
        user_id: session?.user?.id,
      },
      data: {
        productName,
        productLink,
        note,
        priority,
        category_id,
        purchased,
        remindAt,
        user_id: session?.user?.id,
        updatedAt: new Date(),
      },
    });

    return Response.json(
      {
        message: "Wishlist item updated successfully",
        status: "success",
        wishlistItem,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: error, status: "error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } },
) {
  try {
    const { productId } = await params;

    const session = await auth();

    if (!session) {
      return Response.json(
        { message: "Unauthorized", status: "error" },
        { status: 401 },
      );
    }

    await prisma.wishList.delete({
      where: {
        id: Number(productId),
        user_id: session?.user?.id,
      },
    });

    return Response.json(
      {
        message: "Wishlist item deleted successfully",
        status: "success",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: error, status: "error" }, { status: 500 });
  }
}
