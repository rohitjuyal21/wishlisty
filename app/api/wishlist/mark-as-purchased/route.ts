import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { isPurchased, id } = body;

    const session = await auth();

    if (!session) {
      return Response.json(
        { message: "Unauthorized", status: "error" },
        { status: 401 },
      );
    }

    await prisma.wishList.update({
      where: { id, user_id: session?.user?.id },
      data: { purchased: isPurchased },
    });

    return Response.json(
      {
        message: isPurchased
          ? "Product marked as purchased"
          : "Product marked as not purchased",
        status: "success",
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: error, status: "error" }, { status: 500 });
  }
}
