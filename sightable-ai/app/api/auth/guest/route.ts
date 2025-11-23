import * as dbTools from "@/app/lib/databaseTools";
import { randomInt } from "crypto";
import { NextResponse } from "next/server";

function generateRandomGuestID() {
  let idGuest = "";
  for (let index = 0; index < 8; index++) {
    const number = randomInt(10);
    idGuest = idGuest.concat(number.toString());
  }
  return idGuest;
}

async function validGuestName() {
  let template = "guest" + generateRandomGuestID() + "@sightable.ai";
  let valid = false;

  while (!valid) {
    if ((await dbTools.checkGuestUser(template)) != 1) {
      valid = true;
    } else {
      template = "guest" + generateRandomGuestID() + "@sightable.ai";
    }
  }

  return template;
}

export async function GET() {
  const guestEmail = await validGuestName();
  dbTools.createGuest(guestEmail);
  return NextResponse.json(await dbTools.getGuestUser(guestEmail));
}
