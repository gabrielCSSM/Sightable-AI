"use client";
import { signIn } from "next-auth/react";
import {
  Zap,
  UserPlus,
  X,
  CheckCircle,
  Lock,
  Mail,
  Clock,
  FileText,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { redirect } from "next/navigation";
import logo from "@/public/logo_sightable.png";

export default function GuestDialog() {
  async function handleGuest() {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "api/auth/guest");
    if (res.ok) {
      res.json().then((f) => {
        signIn("credentials", { type: "guest", email: f["email"] });
      });
    }
  }

  const guestFeatures = [
    { icon: Clock, text: "No registration required", color: "text-teal-400" },
    { icon: FileText, text: "Process up to 3 files", color: "text-purple-400" },
  ];

  const accountBenefits = [
    {
      icon: CheckCircle,
      text: "Process up to 5 files at once",
      color: "text-teal-400",
    },
    { icon: CheckCircle, text: "Save your history", color: "text-teal-400" },
    { icon: CheckCircle, text: "Unlimited summaries", color: "text-teal-400" },
    { icon: CheckCircle, text: "All modes unlocked", color: "text-teal-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-50 w-full max-w-4xl animate-fadeIn">
        <div className="bg-slate-900/95 backdrop-blur-xl border-2 border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        
          <div className="text-center pt-12 pb-8 px-8 border-b border-slate-800">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-900 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/30">
              <img src={logo.src}/>
            </div>
            <h1
              className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Welcome to Sightable AI
            </h1>
            <p className="text-slate-400 text-lg">
              Choose how you'd like to continue
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="relative">
              <div className="h-full bg-slate-800/40 backdrop-blur-sm border-2 border-slate-700 rounded-2xl p-6 hover:border-teal-400/50 transition-all duration-300 flex flex-col">
                <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs font-semibold mb-6 self-start">
                  <Zap className="w-3 h-3" />
                  <span>Quick Start</span>
                </div>

                <div className="mb-6">
                  <h2
                    className="text-2xl font-bold mb-2"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Continue as Guest
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Start using Sightable AI instantly, no account needed
                  </p>
                </div>

                <div className="space-y-3 mb-8 flex-grow">
                  {guestFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className={`w-4 h-4 ${feature.color}`} />
                        </div>
                        <span className="text-sm">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-200">
                      <p className="font-semibold mb-1">Limited Features</p>
                      <p className="text-amber-300/80">
                        Your work won't be saved and you'll have fewer
                        processing options
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGuest}
                  className="group w-full py-4 bg-transparent border-2 border-teal-400 rounded-xl font-semibold text-teal-400 hover:bg-teal-400/10 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  <span>Continue as Guest</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="h-full bg-gradient-to-br from-teal-500/10 to-purple-500/10 backdrop-blur-sm border-2 border-teal-400/50 rounded-2xl p-6 shadow-lg shadow-teal-500/20 flex flex-col">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-cyan-300 text-slate-900 px-3 py-1 rounded-full text-xs font-semibold mb-6 self-start">
                  <Sparkles className="w-3 h-3" />
                  <span>Recommended</span>
                </div>

                <div className="mb-6">
                  <h2
                    className="text-2xl font-bold mb-2"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Create Free Account
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Unlock the full Sightable AI experience
                  </p>
                </div>

                <div className="space-y-3 mb-8 flex-grow">
                  {accountBenefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <Icon
                          className={`w-5 h-5 ${benefit.color} flex-shrink-0`}
                        />
                        <span className="text-sm font-medium">
                          {benefit.text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => redirect("/create-account")}
                  className="group w-full py-4 bg-gradient-to-r from-teal-400 to-cyan-300 rounded-xl font-semibold text-slate-900 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 mb-4"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Create Free Account</span>
                </button>

                {/* Sign In Link */}
                <p className="text-center text-slate-400 text-sm">
                  Already have an account?{" "}
                  <button
                    onClick={() => redirect("/login")}
                    className="text-teal-400 font-semibold hover:text-teal-300 transition-colors"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="px-8 pb-8 text-center">
            <p className="text-xs text-slate-500">
              By continuing, you agree to our{" "}
              <a href="#" className="text-teal-400 hover:text-teal-300">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-teal-400 hover:text-teal-300">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
