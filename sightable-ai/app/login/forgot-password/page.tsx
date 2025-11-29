"use client"
import { ChevronLeft, Mail, ArrowRight, CheckCircle } from "lucide-react";
import email from "next-auth/providers/email";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleForgotPassword = () => {
    setIsSubmitting(true);
    setTimeout(async () => {
      setIsSubmitting(false);
      //alert("Password reset link sent to your email!");
      const res = await fetch("/api/auth/users/reset-password/", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      console.log(res)
    }, 1500);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <button
        onClick={() => redirect("/login")}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="font-semibold text-sm">Back to Login</span>
      </button>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-900/50 backdrop-blur-xl border-2 border-slate-800 rounded-3xl p-8 shadow-2xl">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/30">
            <Mail className="w-10 h-10 text-slate-900" />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1
              className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Reset Password
            </h1>
            <p className="text-slate-400 text-base">
              Enter your email and we'll send you instructions to reset your
              password
            </p>
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleForgotPassword}
            disabled={isSubmitting || !email}
            className="group w-full h-14 bg-gradient-to-r from-teal-400 to-cyan-300 rounded-xl font-semibold text-slate-900 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-3 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Send Reset Link</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Info Box */}
          <div className="bg-teal-500/10 border border-teal-400/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-teal-200">
                We'll send you an email with a secure link to reset your
                password. The link will expire in 1 hour.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
