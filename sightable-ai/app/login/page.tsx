"use client";
import { useEffect, useState } from "react";
import DebugText from "../debugText";
import LoginButton from "./components/loginButton";

export default function loginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const type = "User";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-16 gap-16 sm:p-20">
      <DebugText PageTitle={"ACCOUNT VALIDATION"} />

      <form
        className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-16 gap-16 sm:p-20"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-2 text-center">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email. Ex: example@sightable.ai"
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your Password."
          className="border p-2 rounded"
          required
        />

        <p className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          Don't have a account?{" "}
          <a href="/create-account">
            Create one here.
          </a>
        </p>

        <div className="grid grid-cols-3 gap-16">
          <LoginButton type={type} email={email} pass={password}></LoginButton>
          <button className="bg-red-500 hover:bg-red-700 text-white rounded p-2">
            <a href="/">Return</a>
          </button>
          
        </div>
      </form>
    </div>
  );
}
