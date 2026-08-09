import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // Production wiring:
  // const supabase = createServiceRoleClient();
  // await supabase.from("newsletter_subscribers").upsert({ email: parsed.data.email });
  // await sendNewsletterWelcomeEmail(parsed.data.email);

  return NextResponse.json({ ok: true });
}
