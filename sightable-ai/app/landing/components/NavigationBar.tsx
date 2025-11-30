import { Globe } from "lucide-react";
import { useState } from "react";
import logo from "@/public/logo_sightable.png"


export default function Main_NavigationBar() {
    return (
      <nav className="relative z-10 px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-900 to-cyan-800 rounded-full flex items-center justify-center">
            <img src={logo.src}></img>
          </div>
          <span className="text-xl font-bold" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Sightable AI</span>
        </div>
      </nav>);
}