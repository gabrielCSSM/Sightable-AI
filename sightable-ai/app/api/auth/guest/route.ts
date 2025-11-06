import validGuestName from "@/app/handleGuests/generateGuest";
import * as dbTools from "@/app/lib/databaseTools";
import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET() {
  const guestEmail = await validGuestName();
  dbTools.createGuest(guestEmail);
  return NextResponse.json(await dbTools.getGuestUser(guestEmail));
}


