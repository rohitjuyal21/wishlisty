import { z } from "zod";

export const signupFormSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "Username is required!" })
    .min(4, { message: "Username must be at least 4 characters!" }),
  email: z.string().nonempty({ message: "Email is required!" }).email(),
  password: z
    .string()
    .nonempty({ message: "Password is Required!" })
    .min(6, { message: "Password must be at least 6 characters!" }),
});

export const signinFormSchema = z.object({
  email: z.string().nonempty({ message: "Email is required!" }).email(),
  password: z
    .string()
    .nonempty({ message: "Password is Required!" })
    .min(6, { message: "Password must be at least 6 characters!" }),
});
