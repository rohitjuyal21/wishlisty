import * as React from "react";
import { EmailTemplate } from "@/components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Wishlisty <wishlisty@rohitjuyal.com>",
      to: ["rohitjuyal2003@gmail.com"],
      subject: "Reminder about your wishlist item",
      react: React.createElement(EmailTemplate, {
        firstName: "John",
        productName: "Product Name",
        productLink: "https://www.google.com",
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
