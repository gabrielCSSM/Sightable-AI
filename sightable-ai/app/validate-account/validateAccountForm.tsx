"use client";
import { FormEvent, useState } from "react";
import DebugText from "../debugText";
import validateUser from "./handle";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default function validateAccountForm() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const handleVal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const authCode = fd.get("authCode");
    const response = await validateUser(authCode ?? "");
    console.log(response["code"]);

    if (!response["code"]) {
      setError("Codigo no valido!");
    } else {
      setError("");
      signIn("credentials", {
        redirect: false,
        type: "user",
        email: response["email"],
        password: response["pass"],
      });
      redirect("/validate-account/success");
    }
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
        <p className="text-red-600">{error}</p>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2"
        >
          Validate
        </button>
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
