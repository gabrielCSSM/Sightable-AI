"use client";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default function CreateAccountButton({ pendingUser, password }: { pendingUser: string, password: string }) {
  const handlePendingUser = async () => {
    signIn("credentials", { redirect: false,  type: "pending", email: pendingUser, pass: password });
    redirect("/validate-account")
  };

  return (
    <button
      onClick={handlePendingUser}
      className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2"
    >
      Create
    </button>
  );
}
