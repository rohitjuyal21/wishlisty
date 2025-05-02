import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const footwearCategory = await prisma.category.upsert({
    where: { name: "Footwear" },
    update: {},
    create: { name: "Footwear" },
  });

  const electronicsCategory = await prisma.category.upsert({
    where: { name: "Electronics" },
    update: {},
    create: { name: "Electronics" },
  });
  await prisma.user.create({
    data: {
      name: "Rohit Juyal",
      email: "test@gmail.com",
      wishlist: {
        createMany: {
          data: [
            {
              productName: "Wrogn Running Shoes",
              productLink: "https://www.myntra.com/sports-shoes/wrogn/.../buy",
              note: "Looks cool for daily use",
              priority: "High",
              category_id: footwearCategory.id,
              remindAt: new Date("2025-04-20"),
            },
            {
              productName: "MacBook Pro M2",
              productLink: "https://www.apple.com/macbook-pro/",
              note: "For better performance",
              priority: "Urgent",
              category_id: electronicsCategory.id,
              remindAt: new Date("2025-05-01"),
            },
          ],
        },
      },
    },
  });
}

main();
