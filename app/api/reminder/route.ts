import * as React from "react";
import { EmailTemplate } from "@/components/EmailTemplate";
import { Resend } from "resend";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const startOfToday = dayjs().startOf("day").toDate();
  const endOfToday = dayjs().endOf("day").toDate();

  const productsToRemind = await prisma.wishList.findMany({
    where: {
      remindAt: {
        gte: startOfToday,
        lte: endOfToday,
      },
      purchased: false,
    },
    include: {
      user: true,
    },
  });

  try {
    for (const product of productsToRemind) {
      const { error } = await resend.emails.send({
        from: "Wishlisty <wishlisty@rohitjuyal.com>",
        to: [product?.user?.email] as string[],
        subject: "Reminder about your wishlist item",
        react: React.createElement(EmailTemplate, {
          firstName: product?.user?.name as string,
          productName: product?.productName as string,
          productLink: product?.productLink as string,
        }),
      });

      if (error) {
        return Response.json({ status: "error", error }, { status: 500 });
      }
    }

    return Response.json({ status: "success" });
  } catch (error) {
    return Response.json({ status: "error", error }, { status: 500 });
  }
}
