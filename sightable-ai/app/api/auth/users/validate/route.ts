import * as dbTools from "@/app/lib/databaseTools";
import { em } from "motion/react-client";
import { NextResponse } from "next/server";

function validateCode(code: String) {
  const validationStructure = new RegExp("([0-9]{8})");
  return validationStructure.test(code.trim());
}

async function validateAccount(authCode: string, email: string) {
  if (validateCode(authCode)) {
    if (await dbTools.checkValidationCode(email, authCode)) {
      await dbTools.updateStatus(email);
      const tempPWD = (await dbTools.getPendingUser(email))["password"];
      await dbTools.upgradeUser(email);
      return NextResponse.json(
        { success: true, email, tempPWD },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: "Wrong code" },
        { status: 400 }
      );
    }
  }
}

export async function GET() {
  return Response.json("Working");
}

export async function POST(req: Request) {
  const data = await req.json();
  const authCode = data["authCode"];
  const email = data["email"];
  const res = await validateAccount(authCode, email);
  return res;
}
