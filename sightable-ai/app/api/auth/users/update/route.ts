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
  const pass = data["password"];
  const name = data["name"]
  if (await validateAccount(email, pass)) {
    return NextResponse.json(
      { status: 200 },
      { statusText: "Success on pending User" }
    );
  } else {
    return NextResponse.json(
      { error: "El usuario ya existe" },
      { status: 404 }
    );
  }
}