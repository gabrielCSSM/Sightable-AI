"use client";
import { signIn } from "next-auth/react";
import { handleAccountValidation } from "../handle";
import { redirect } from "next/navigation";

export default function ValidateAccountButton({
  authCode,
}: {
  authCode: string;
}) {
  async function handleNewUser() {
    
    const user = await handleAccountValidation(authCode);
    signIn("credentials", {
      redirect: false,
      type: "user",
      email: user?.email,
      password: user?.tempPWD,
    });
    redirect("/validate-account/success");
  }

  return (
    <button
      onClick={() => handleNewUser()}
      className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2"
    >
      Validate
    </button>
  );
}
