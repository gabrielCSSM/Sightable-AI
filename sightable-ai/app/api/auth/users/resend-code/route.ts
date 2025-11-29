import * as dbTools from "@/app/lib/databaseTools";
import { NextResponse } from "next/server";

export async function validateAccount(email: string, pass: string) {
  if ((await dbTools.checkLoggedUser(email)) != 0) {
    return false;
  } else {
    dbTools.createPendingUser(email, pass);
    return true;
  }
}

export async function GET() {}

export async function POST(req: Request) {
  const data = await req.json();
  const email = data["email"];
  
  if (await dbTools.checkPendingUser(email) == 1) {
    await dbTools.updateValidationCode(email);
    return NextResponse.json(
      { status: 200 },
      { statusText: "Success on password reset" }
    );
  } else {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
}
