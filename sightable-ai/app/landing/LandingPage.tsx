"use client";
import React from "react";
import Main_NavigationBar from "./components/NavigationBar";
import Main_Main from "./components/MainSection";
import Main_News from "./components/News";

export default function LandingPage() {
  return(
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>
      <Main_NavigationBar />
      <Main_Main />
      <Main_News />
      <div className="h-20"></div>
    </div>
  );
}
