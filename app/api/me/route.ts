import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function GET() {
  const token = (await cookies()).get("token");
  if (!token) return new Response("Unauthorized", { status: 401 });

  try {
    const { id } = jwt.verify(token.value, process.env.JWT_SECRET!) as {
      id: number;
    };

    console.log(id);

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    return Response.json({ data: user, status: "success" }, { status: 200 });
  } catch {
    return new Response("Invalid token", { status: 401 });
  }
}
