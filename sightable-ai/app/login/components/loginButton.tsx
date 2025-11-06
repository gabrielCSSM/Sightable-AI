"use client";
import { signIn } from "next-auth/react";

export default function LoginButton({
  type,
  email,
  pass,
}: {
  type: string,
  email: string;
  pass: string;
}) {
  return (
    <button onClick={() => signIn("credentials", {type: type, email: email, password: pass})} 
    className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2"> Login
    </button>
  );
}
