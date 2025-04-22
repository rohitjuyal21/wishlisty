import { getUser } from "@/lib/getUser";

export async function POST(req: Request) {
  try {
    // Create this
  } catch (error) {
    console.log(error);
    return Response.json({ message: error, status: "error" }, { status: 400 });
  }
}
