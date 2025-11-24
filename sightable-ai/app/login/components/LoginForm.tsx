"use client";
import { useState } from "react";
import { Mail, EyeOff, Eye, ArrowRight, Lock, Globe } from "lucide-react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showing, showPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    signIn("credentials", {
      redirect: false,
      type: "user",
      email: email,
      password: password,
    }).then((res) => {
      if (res?.ok) {
        redirect("/main");
      } else {
        console.log(res?.error);
      }
    });
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1
          className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Welcome Back
        </h1>
        <p className="text-slate-400 text-lg">Dive back into clarity</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300"
              placeholder="test@sightable.ai"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type={showing ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
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
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="group relative w-full h-14 bg-gradient-to-r from-teal-400 to-cyan-300 rounded-xl font-semibold text-slate-900 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {false ? (
            <div className="w-6 h-6 border-3 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <span>Log In</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-slate-900 text-slate-500">
              or continue with
            </span>
          </div>
        </div>

        <p className="text-center text-slate-400 pt-4">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => redirect("/create-account")}
            className="text-teal-400 font-semibold hover:text-teal-300 transition-colors"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}