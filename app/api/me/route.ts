import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return Response.json({ data: user, status: "success" }, { status: 200 });
  } catch {
    return new Response("Invalid token", { status: 401 });
  }
}
