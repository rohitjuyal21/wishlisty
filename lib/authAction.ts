"use server";

import bcrypt from "bcryptjs";
import { signupFormSchema } from "./schemas";
import prisma from "./prisma";

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

export const signUp = async (formData: SignUpFormData) => {
  const validatedCredentials = signupFormSchema.parse(formData);

  const hashedPassword = await bcrypt.hash(validatedCredentials.password, 10);

  const existingUser = await prisma.user.findUnique({
    where: {
      email: validatedCredentials.email,
    },
  });

  if (existingUser) {
    console.log("User already exists");
    return { status: "error" as const, message: "User already exists" };
  }
  const user = await prisma.user.create({
    data: {
      name: validatedCredentials.username,
      email: validatedCredentials.email,
      password: hashedPassword,
    },
  });

  console.log("user", user);

  if (!user) {
    throw new Error("Failed to create user");
  }

  return { status: "success" as const, user };
};
