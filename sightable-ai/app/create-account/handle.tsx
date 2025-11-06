"use server";

import { redirect } from "next/dist/server/api-utils";
import * as dbTools from "../lib/databaseTools";

export async function validateAccount(email: string, pass: string) {
  if ((await dbTools.checkLoggedUser(email)) != 0) {
    // throw new Error("Already Exists")
    // HANDLE THE ACCOUNT ALREADY EXISTS
  } else {
    dbTools.createPendingUser(email, pass);
  }
}

export async function handleAccountCreation(formData: FormData) {
  const email = String(formData.get("email"));
  const pass = String(formData.get("password"));

  await validateAccount(email, pass);
}
