"use client";
import { Globe } from "lucide-react";
import { useState } from "react";

export default function LanguageSelector() {
    const [language, setLanguage] = useState("ES");
  const languages = ["EN", "ES", "DE"];
    return(<div className="absolute top-8 right-8 z-20">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-teal-400 transition-all duration-300 group"
          onClick={() => {
            const currentIndex = languages.indexOf(language);
            const nextIndex = (currentIndex + 1) % languages.length;
            setLanguage(languages[nextIndex]);
          }}
        >
          <Globe className="w-4 h-4 text-teal-400 group-hover:rotate-180 transition-transform duration-500" />
          <span className="font-semibold">{language}</span>
        </button>
      </div>)
}