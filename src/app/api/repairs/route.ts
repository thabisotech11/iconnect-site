import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  device: z.string(),
  issue: z.string().min(3),
  date: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid repair booking" }, { status: 400 });
  }

  // Production wiring:
  // const supabase = createServiceRoleClient();
  // await supabase.from("repair_bookings").insert({
  //   device: parsed.data.device, issue: parsed.data.issue, preferred_date: parsed.data.date,
  //   contact_name: parsed.data.name, contact_email: parsed.data.email, contact_phone: parsed.data.phone,
  // });

  return NextResponse.json({ ok: true });
}
