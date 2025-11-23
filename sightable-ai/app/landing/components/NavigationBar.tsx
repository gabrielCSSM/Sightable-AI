import { Globe } from "lucide-react";
import { useState } from "react";
import logo from "@/public/logo_sightable.png"


export default function Main_NavigationBar() {
    const [language, setLanguage] = useState('ES');
    const languages = ['EN', 'ES', 'DE'];
    return (
      <nav className="relative z-10 px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-900 to-cyan-800 rounded-full flex items-center justify-center">
            <img src={logo.src}></img>
          </div>
          <span className="text-xl font-bold" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Sightable AI</span>
        </div>

        {/* Language Selector */}
        <div className="relative">
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
        </div>
      </nav>);
}