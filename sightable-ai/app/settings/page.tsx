"use client";
import React, { useState } from "react";
import { User, Settings, CreditCard, HelpCircle } from "lucide-react";
import SettingsPage from "./SettingsPage";
import logo from "@/public/logo_sightable.png";
import SubscriptionPage from "./SubscriptionPage";
import HelpPage from "./HelpPage";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SettingsProfile() {
  // 'settings', 'subscription', 'help'
  const [currentPage, setCurrentPage] = useState("settings");
  const router = useSearchParams();
  const section = router.get("currentPage");
  const data = router.get("data");
  let myUser;
  if (data) {
    myUser = JSON.parse(atob(data));
  }
  //console.log(myUser)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-8 py-6 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => redirect("/main")}
            className="flex items-center gap-2 hover:text-teal-400 transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-teal-900 to-cyan-600 rounded-full flex items-center justify-center">
              <img src={logo.src}></img>
            </div>
            <span
              className="text-xl font-bold"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Sightable AI
            </span>
          </button>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-teal-400 transition-all duration-300">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-slate-900" />
          </div>
          <span className="font-semibold">{myUser["user"]}</span>
        </button>
      </header>

      {/* Navigation Tabs */}
      <div className="relative z-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <nav className="flex gap-1">
            <Link
              href={`/settings?currentPage=settings&data=${data}`}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all ${
                section === "settings"
                  ? "text-teal-400 border-b-2 border-teal-400"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
            <Link
              href={`/settings?currentPage=subscription&data=${data}`}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all ${
                section === "subscription"
                  ? "text-teal-400 border-b-2 border-teal-400"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span>Subscription</span>
            </Link>
            <Link
              href={`/settings?currentPage=help&data=${data}`}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all ${
                section === "help"
                  ? "text-teal-400 border-b-2 border-teal-400"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              <HelpCircle className="w-5 h-5" />
              <span>Help & Support</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        {section === "settings" && <SettingsPage myUser={myUser} />}
        {section === "subscription" && <SubscriptionPage />}
        {section === "help" && <HelpPage />}
      </main>
    </div>
  );
}
