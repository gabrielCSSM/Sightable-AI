import validGuestName from "@/app/handleGuests/generateGuest";
import * as dbTools from "@/app/lib/databaseTools";
import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET() {
  const guestEmail = await validGuestName();
  dbTools.createGuest(guestEmail);
  return NextResponse.json(await dbTools.getGuestUser(guestEmail));
}

export async function POST(req: Request) { 
  const { type, email } = await req.json();

  const result = await signIn("credentials", {
    redirect: false,
    type,
    email,
  });

  if (result?.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.redirect("/guest-dashboard");
}



