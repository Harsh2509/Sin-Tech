import { NextRequest } from "next/server";
import { z } from "zod";
export const runtime = "edge";

const bodySchema = z.object({
  email: z.string().email(),
  productId: z.number(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  return new Response(JSON.stringify(body));
}
