"use client";
import { Hash, sign } from "crypto";
import { signIn } from "next-auth/react";

export default function LoginButton({
  email,
  pass,
}: {
  email: string;
  pass: string;
}) {
  return (
    <button onClick={() => signIn("credentials", {username: email, password: pass})} 
    className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2">
      <a href="/api/auth/signin">Login</a>
    </button>
  );
}
