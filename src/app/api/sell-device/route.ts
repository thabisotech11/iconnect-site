import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  category: z.string(),
  model: z.string(),
  estimatedValue: z.number().positive(),
  answers: z.record(z.string(), z.object({ label: z.string(), deduction: z.number() })),
  contact: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(6),
    notes: z.string().optional(),
  }),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid sell request", details: parsed.error.flatten() }, { status: 400 });
  }

  // Production wiring:
  // const supabase = createServiceRoleClient();
  // await supabase.from("device_quote_requests").insert({ goal: "sell", ...parsed.data });
  // await sendQuoteConfirmationEmail(parsed.data.contact.email, parsed.data.contact.name, parsed.data.model, parsed.data.estimatedValue, "sell");

  return NextResponse.json({ ok: true });
}
