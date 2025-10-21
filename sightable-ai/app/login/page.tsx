"use client";
import { useState } from "react";
import DebugText from "../debugText";
import LoginButton from "./components/loginButton";
import { signIn } from "next-auth/react";

export default function loginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password
    });
  };
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-16 gap-16 sm:p-20">
      <DebugText PageTitle={"ACCOUNT VALIDATION"} />

      
      <form  className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-16 gap-16 sm:p-20" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-2 text-center">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 rounded"
          required
        />

        <p className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          Don't have a account?{" "}
          <a className="underline hover:font-bold" href="/create-account">
            Create one here.
          </a>
        </p>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2"
        >
          Login{" "}
        </button>

        <button className="bg-red-500 hover:bg-red-700 text-white rounded p-2">
          <a href="/">Return</a>
        </button>
      </form>
    </div>
  );
}
