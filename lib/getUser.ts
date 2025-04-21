import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export const getUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    if (!id) return null;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    return user;
  } catch (err) {
    console.error("Token verification failed", err);
    return null;
  }
};
