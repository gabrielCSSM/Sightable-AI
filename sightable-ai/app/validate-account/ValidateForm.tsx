"use client";
import React, { FormEvent, useEffect, useState } from "react";
import validateUser, { obterSession } from "./handle";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { Mail, CheckCircle } from "lucide-react";

export default function ValidateForm() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("test@sightable.ai");

  useEffect(() => {
    obterSession().then(
      (f) => {
        setEmail(String(f?.email));
      },
      (e) => {
        setError(e);
      }
    );
  }, []);

  const handleVal = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await validateUser(code ?? "");
    console.log(response);

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
  /*
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
  );*/

  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/30">
          <Mail className="w-10 h-10 text-slate-900" />
        </div>
        <h1
          className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Check Your Email
        </h1>
        <p className="text-slate-400 text-lg">We sent a verification code to</p>
        <p className="text-teal-400 font-semibold mt-1">{email}</p>
      </div>

      <div className="space-y-6">
        {/* Verification Code */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-4 text-center">
            Enter 8-digit code
          </label>
          <div className="flex gap-3 justify-center">
            <input
              type="text"
              maxLength={8}
              placeholder="Ex: 12345678"
              onChange={(e) => {
                setCode(e.target.value);
              }}
              className="h-14 w-full text-center text-2xl font-bold bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300"
            />
          </div>
        </div>

        {/* Resend Code */}
        <div className="text-center">
          <p className="text-slate-400 text-sm mb-2">
            Didn't receive the code?
          </p>
          <button
            type="button"
            className="text-teal-400 font-semibold hover:text-teal-300 transition-colors text-sm"
          >
            Resend code
          </button>
        </div>

        {/* Submit Button */}
        <button
          onClick={(e) => handleVal(e)}
          //disabled={isSubmitting || formData.code.some(d => !d)}
          className="group relative w-full h-14 bg-gradient-to-r from-teal-400 to-cyan-300 rounded-xl font-semibold text-slate-900 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {false ? (
            <div className="w-6 h-6 border-3 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Verify Account</span>
            </>
          )}
        </button>

        {/* Back Link */}
        <p className="text-center text-slate-400 pt-2">
          <button
            type="button"
            onClick={() => redirect("/")}
            className="text-teal-400 font-semibold hover:text-teal-300 transition-colors text-sm"
          >
            ← Back to sign up
          </button>
        </p>
      </div>
    </div>
  );
}
