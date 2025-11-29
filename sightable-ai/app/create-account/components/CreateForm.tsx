"use client";
import { useState } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, EyeOff, Eye, ArrowRight, Lock } from "lucide-react";

export default function CreateForm() {
  const emailRegEx = new RegExp("^([a-z]+@[a-z]+.[a-z]{1,3})$");
  const passRegEx = new RegExp("^(.{8,30})$");

  const [email, setEmail] = useState("");
  const [error_email, setErrorEmail] = useState("");

  const [password, setPassword] = useState("");
  const [error_pass, setPassError] = useState("");

  const [error, setError] = useState("");
  const [showing, showPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      error.length != 0 ||
      error_pass.length != 0 ||
      error_email.length != 0
    ) {
      setError("FIX YOUR ERRORS!");
    } else {
      const res = await fetch("/api/auth/users/pending/", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Usuario ya existe!");
      } else {
        setError("");
        signIn("credentials", {
          redirect: false,
          type: "pending",
          email: email,
          pass: password,
        });
        setTimeout(() => {
          redirect("/validate-account");
        }, 1000);
      }
    }
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1
          className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Join Sightable
        </h1>
        <p className="text-slate-400 text-lg">Start your journey to clarity</p>
      </div>

      <div className="mb-2">
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
              if (!e.target.value.match(emailRegEx)) {
                setErrorEmail("Introduce un correo valido!");
              } else {
                setErrorEmail("");
              }
            }}
            onFocus={(e) => {
              if (!e.target.value.match(passRegEx) && e.target.value != "") {
                setErrorEmail("Introduce un correo valido!");
              } else {
                setErrorEmail("");
              }
            }}
            onBlur={(e) => {
              if (e.target.value == "") {
                setErrorEmail("");
              }
            }}
            className="w-full h-14 pl-12 pr-4 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300"
            placeholder="test@sightable.ai"
          />
        </div>
        <p className="text-shadow-blue-50">{error_email}</p>
      </div>

      <div className="mb-1">
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type={showing ? "text" : "password"}
            onChange={(p) => {
              setPassword(p.target.value);
              if (!p.target.value.match(passRegEx)) {
                setPassError("Introduce una contraseña valida!");
              } else {
                setPassError("");
              }
            }}
            onFocus={(p) => {
              if (!p.target.value.match(passRegEx) && p.target.value != "") {
                setPassError("Introduce una contraseña valida!");
              } else {
                setPassError("");
              }
            }}
            onBlur={(p) => {
              if (p.target.value == "") {
                setPassError("");
              }
            }}
            className="w-full h-14 pl-12 pr-12 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => showPassword(!showing)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-teal-400 transition-colors"
          >
            {showing ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-shadow-blue-50">{error_pass}</p>
        <p className="text-xs text-slate-500 mt-2">
          At least 8 characters with a mix of letters and numbers
        </p>
      </div>

      <div />
      <div className="flex items-start gap-3 pt-2 mb-3">
        <input
          type="checkbox"
          id="terms"
          className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-800 text-teal-400 focus:ring-teal-400 focus:ring-2"
        />
        <label htmlFor="terms" className="text-sm text-slate-400">
          I agree to the{" "}
          <a href="#" className="text-teal-400 hover:text-teal-300">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-teal-400 hover:text-teal-300">
            Privacy Policy
          </a>
        </label>
      </div>

      <p className="text-shadow-blue-50">{error}</p>

      <button
        onClick={handleSubmit}
        className="group relative w-full h-14 bg-gradient-to-r from-teal-400 to-cyan-300 rounded-xl font-semibold text-slate-900 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {false ? (
          <div className="w-6 h-6 border-3 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            <span>Create Account</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <p className="text-center text-slate-400 pt-4">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => redirect("/login")}
          className="text-teal-400 font-semibold hover:text-teal-300 transition-colors"
        >
          Log in
        </button>
      </p>
    </div>
  );
}
