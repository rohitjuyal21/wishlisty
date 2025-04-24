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

    if (!user) {
      return Response.json(
        { message: "Unauthorized", status: "error" },
        { status: 401 },
      );
    }

    const wishlistItem = await prisma.wishList.create({
      data: {
        productName,
        productLink,
        note,
        priority,
        category,
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

export async function PUT(req: Request) {
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

    if (!user) {
      return Response.json(
        { message: "Unauthorized", status: "error" },
        { status: 401 },
      );
    }

    const wishlistItem = await prisma.wishList.update({
      where: {
        id: body.id,
        user_id: user.id,
      },
      data: {
        productName,
        productLink,
        note,
        priority,
        category,
        purchased,
        remindAt,
        user_id: user.id,
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

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    console.log(body);

    const user = await getUser();

    if (!user) {
      return Response.json(
        { message: "Unauthorized", status: "error" },
        { status: 401 },
      );
    }

    await prisma.wishList.delete({
      where: {
        id: body.id,
        user_id: user.id,
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
