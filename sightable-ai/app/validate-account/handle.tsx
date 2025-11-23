"use server";
import * as dbTools from "../lib/databaseTools";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { cookies } from "next/headers";

export async function sessionUnset() {
  cookies().then((e) => {
    e.delete("next-auth.csrf-token");
  });
}

export default async function validateUser(authCode: FormDataEntryValue) {
  const session = await getServerSession(authOptions);
  const email = session?.user.email;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/auth/users/validate`,
    {
      method: "POST",
      body: JSON.stringify({ authCode, email }),
    }
  );
  
  if (res.ok) {
    const response = await res.json();
    const myRes = { code: true, email: response["email"], pass: response["tempPWD"] };
    sessionUnset();
    return myRes;
  } else {
    const myRes = { code: false, email: "", pass: "" };
    return myRes;
  }
}
