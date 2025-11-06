"use client";
import { useState } from "react";
import DebugText from "../debugText";
import ValidateAccountButton from "./components/validateButton";

export default function validateAccountForm() {
  const [code, setCode] = useState("");
  const handleVal = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-16 gap-16 sm:p-20">
      <DebugText PageTitle={"ACCOUNT VALIDATION"} />

      <form
        onSubmit={handleVal}
        className="flex flex-col gap-3 max-w-sm mx-auto p-6 border rounded-xl shadow"
      >
        <h2 className="text-2xl font-bold mb-2 text-center">
          Validate your account
        </h2>
        <input
          name="authCode"
          type="text"
          onChange={(e) => setCode(e.target.value)}
          placeholder="Ex: 12345678"
          className="border p-2 rounded"
          required
        />
        <ValidateAccountButton authCode={code} />
      </form>
      <p className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
        Problems validating your account?{" "}
        <a className="underline hover:font-bold" href="#">
          Resend a new code.
        </a>
      </p>

      <button
        type="submit"
        className="bg-red-500 hover:bg-red-700 text-white rounded p-2"
      >
        <a href="/">Return</a>
      </button>
    </div>
  );
}
