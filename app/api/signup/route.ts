import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        { message: "User already exists!", status: "error" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(process.env.JWT_SECRET);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
    console.log("tojen", token);

    console.log(user);

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
