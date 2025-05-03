import * as React from "react";
import { EmailTemplate } from "@/components/EmailTemplate";
import { Resend } from "resend";
import prisma from "@/lib/prisma";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";

dayjs.extend(utc);
dayjs.extend(timezone);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  const API_SECRET = process.env.REMINDER_API_SECRET;

  console.log("API_SECRET", API_SECRET);
  const authHeader = req.headers.get("Authorization");

  if (authHeader !== `Bearer ${API_SECRET}`) {
    return Response.json(
      { status: "error", error: "Unauthorized" },
      { status: 401 },
    );
  }

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const TIMEZONE = "Asia/Kolkata";

  const startOfToday = dayjs().tz(TIMEZONE).startOf("day").toDate();
  const endOfToday = dayjs().tz(TIMEZONE).endOf("day").toDate();

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

  if (!productsToRemind.length) {
    return Response.json({ status: "no-products" });
  }

  try {
    for (const product of productsToRemind) {
      const { error } = await resend.emails.send({
        from: "Wishlisty <wishlisty@rohitjuyal.com>",
        to: [product?.user?.email] as string[],
        subject: `Don't forget about ${product?.productName} - still waiting in your wishlist!`,
        react: React.createElement(EmailTemplate, {
          key: product?.id,
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
