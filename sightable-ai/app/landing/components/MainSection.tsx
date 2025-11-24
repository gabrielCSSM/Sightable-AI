import { ArrowRight, EyeOff, Rocket, Sparkles, Zap } from "lucide-react";
import logo from "@/public/logo_sightable.png"
import Main_Features from "./Features";
import { redirect } from "next/navigation";

export default function Main_Main() {
  return (
    <main className="relative z-10 max-w-4xl mx-auto px-8 pt-20 pb-16 text-center">
      <div className="mb-8 flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-teal-900 via-cyan-700 to-teal-200 rounded-3xl flex items-center justify-center shadow-2xl shadow-teal-500/30 transform hover:scale-110 transition-transform duration-300">
            <img src={logo.src}></img>
          </div>
        </div>
      </div>

      <h1
        className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-teal-200 to-cyan-300 bg-clip-text text-transparent"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        Welcome to Sightable AI!
      </h1>

      <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
        Transform your study materials into digestible insights with AI-powered
        summaries, bullet points, and an intelligent chatbot—all in seconds.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
        <button className="group relative px-8 py-4 bg-gradient-to-r from-teal-400 to-cyan-300 rounded-xl font-semibold text-slate-900 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 min-w-[200px] justify-center" 
          onClick={() => redirect("/login")}>
          <span>Log In</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button className="group px-8 py-4 bg-transparent border-2 border-teal-400 rounded-xl font-semibold text-teal-400 hover:bg-teal-400/10 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 min-w-[200px] justify-center"
          onClick={() => redirect("/handleGuests")}>
          <Zap className="w-5 h-5" />
          <span>Try as Guest</span>
        </button>
      </div>

      <Main_Features />
    </main>
  );
}
