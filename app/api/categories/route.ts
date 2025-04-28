import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return Response.json(
      { data: categories, status: "success" },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
