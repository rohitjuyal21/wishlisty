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

export async function GET() {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const TIMEZONE = "Asia/Kolkata";

  const startOfToday = dayjs().tz(TIMEZONE).startOf("day").toDate();
  const endOfToday = dayjs().tz(TIMEZONE).endOf("day").toDate();

  console.log("API key:", process.env.RESEND_API_KEY);

  console.log("✅ Reminder API hit");
  console.log("Start of today:", startOfToday);
  console.log("End of today:", endOfToday);

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

  console.log(`🎯 Found ${productsToRemind.length} products to remind`);

  if (!productsToRemind.length) {
    return Response.json({ status: "no-products" });
  }

  try {
    for (const product of productsToRemind) {
      console.log(`📧 Sending email to ${product?.user?.email}`);

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
        console.error("❌ Error sending email:", error);
        return Response.json({ status: "error", error }, { status: 500 });
      }

      console.log("✅ Email sent successfully");
    }

    return Response.json({ status: "success" });
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    return Response.json({ status: "error", error }, { status: 500 });
  }
}
