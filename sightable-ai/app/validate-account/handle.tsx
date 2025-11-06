"use server";
import * as dbTools from "../lib/databaseTools";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { cookies } from "next/headers";

function validateCode(code: String) {
  const validationStructure = new RegExp("([0-9]{8})");
  return validationStructure.test(code.trim());
}

function sessionUnset() {
  cookies().then((e) => {
    e.delete("next-auth.csrf-token")
  });
}

export async function handleAccountValidation(authCode: string) {
  const session = await getServerSession(authOptions);

  if (validateCode(authCode)) {
    const email = session?.user.email ?? "Empty";

    if (await dbTools.checkValidationCode(email, authCode)) {
      await dbTools.updateStatus(email);
      const tempPWD = (await dbTools.getPendingUser(email))["password"];
      await dbTools.upgradeUser(email);
      //const password = (await dbTools.getPassword(email))["password"];
      sessionUnset();
      return { email, tempPWD };
    } else {
      throw new Error("Bad code Input.");
    }
  }
}
