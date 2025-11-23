import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
export default function Main_News() {
  const [language, setLanguage] = useState("EN");
  const [hoveredCard, setHoveredCard] = useState(null);
  const news = [
    {
      date: "Nov 15, 2024",
      title: "Quiz Mode Coming Soon",
      description:
        "Test your knowledge with AI-generated questions from your content.",
      badge: "Coming Soon",
      color: "amber",
    },
    {
      date: "Nov 1, 2024",
      title: "Chatbot Mode Released",
      description:
        "Ask questions and get instant answers from your uploaded documents.",
      badge: "New",
      color: "teal",
    },
    {
      date: "Oct 20, 2024",
      title: "Enhanced Summary Quality",
      description:
        "Our AI now provides more accurate and contextual summaries.",
      badge: "Update",
      color: "coral",
    },
  ];
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-8 pb-20">
      <div className="text-center mb-12">
        <h2
          className="text-4xl font-bold mb-4"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          What's New
        </h2>
        <p className="text-slate-400 text-lg">
          Stay updated with the latest features and improvements
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {news.map((item, index) => (
          <div
            key={index}
            className={`group relative bg-slate-800/40 backdrop-blur-sm border-2 rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
              hoveredCard === index
                ? "border-teal-400 shadow-lg shadow-teal-500/20 transform scale-105"
                : "border-slate-700 hover:border-slate-600"
            }`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Glow effect on hover */}
            {hoveredCard === index && (
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent rounded-2xl"></div>
            )}

            <div className="relative z-10">
              {/* Badge */}
              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                  item.color === "amber"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-400/30"
                    : item.color === "teal"
                    ? "bg-teal-500/20 text-teal-300 border border-teal-400/30"
                    : "bg-pink-500/20 text-pink-300 border border-pink-400/30"
                }`}
              >
                {item.badge}
              </div>

              {/* Date */}
              <p className="text-slate-500 text-sm mb-2">{item.date}</p>

              {/* Title */}
              <h3
                className="text-xl font-semibold mb-3 text-white group-hover:text-teal-300 transition-colors"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Read more indicator */}
              <div className="mt-4 flex items-center gap-2 text-teal-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
