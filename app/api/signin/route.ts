import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return Response.json(
        { message: "User not exists!", status: "error" },
        { status: 401 },
      );
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return Response.json(
        { message: "Invalid username or password", status: "error" },
        { status: 401 },
      );
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET!);

    const cookie = await cookies();
    cookie.set("token", token, {
      maxAge: 15 * 24 * 60 * 60,
    });

    return Response.json(
      { message: "User created Successfully!", status: "success" },
      { status: 201 },
    );
  } catch (error) {
    return Response.json({ message: error, status: "error" }, { status: 400 });
  }
}
