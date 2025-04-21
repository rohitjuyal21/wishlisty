import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: "Rohit Juyal",
      email: "test@gmail.com",
      password: "1wqdsafqqrqwrw",
      wishlist: {
        createMany: {
          data: [
            {
              productName: "Wrogn Running Shoes",
              productLink: "https://www.myntra.com/sports-shoes/wrogn/.../buy",
              note: "Looks cool for daily use",
              priority: "High",
              category: "Footwear",
              remindAt: new Date("2025-04-20"),
            },
            {
              productName: "MacBook Pro M2",
              productLink: "https://www.apple.com/macbook-pro/",
              note: "For better performance",
              priority: "Urgent",
              category: "Electronics",
              remindAt: new Date("2025-05-01"),
            },
          ],
        },
      },
    },
  });
}

main();
