import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  topic: z.string(),
  message: z.string().min(5),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid contact form submission" }, { status: 400 });
  }

  // Production wiring:
  // const supabase = createServiceRoleClient();
  // await supabase.from("contact_messages").insert(parsed.data);

  return NextResponse.json({ ok: true });
}
