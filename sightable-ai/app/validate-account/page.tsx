"use client";
import { redirect } from "next/navigation";
import logo from "@/public/logo_sightable.png";
import ValidateForm from "./ValidateForm";

export default function renderValidation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="absolute top-8 left-8 z-20">
        <button
          onClick={() => redirect("/")}
          className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-teal-900 to-cyan-800 rounded-lg flex items-center justify-center">
            <img src={logo.src}></img>
          </div>
          <span
            className="font-semibold text-sm"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Sightable AI
          </span>
        </button>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-900/50 backdrop-blur-xl border-2 border-slate-800 rounded-3xl p-8 shadow-2xl">
          <ValidateForm />
        </div>
      </div>
    </div>
  );
}
