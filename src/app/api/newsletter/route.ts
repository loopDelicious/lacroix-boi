import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";

const signupSchema = z.object({
  email: z.string().trim().email().max(254),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request body." }, { status: 400 });
  }

  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();

  try {
    const inserted = await db
      .insert(newsletterSubscribers)
      .values({ email })
      .onConflictDoNothing({ target: newsletterSubscribers.email })
      .returning({ id: newsletterSubscribers.id });

    return NextResponse.json({
      ok: true,
      alreadySubscribed: inserted.length === 0,
    });
  } catch (err) {
    console.error("Failed to save newsletter signup", err);
    return NextResponse.json(
      { error: "We couldn't save that just now. Try once more." },
      { status: 500 },
    );
  }
}
