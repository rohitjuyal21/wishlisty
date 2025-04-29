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

export const WishlistItemSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productLink: z.string().url("Must be a valid URL"),
  note: z.string().optional(),
  priority: z.string({
    required_error: "Priority is required",
  }),
  category: z.string({
    required_error: "Category is required",
  }),
  purchased: z.boolean().optional(),
  remindAt: z.date({
    required_error: "Remind At is required",
    invalid_type_error: "Remind At must be a date",
  }),
});
