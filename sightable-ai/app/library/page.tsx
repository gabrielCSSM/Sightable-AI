"use client";
import React, { useState } from "react";
import { Library, FileText, Sparkles, Clock, User, X } from "lucide-react";
import logo from "@/public/logo_sightable.png";
import { redirect } from "next/navigation";
import { myUser } from "../main/components/myUser";

export default function UserLibrary({myUser, items}: {myUser: myUser, items: []}) {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [selectedItem, setSelectedItem] = useState(null);

  // Sample data - would come from database
  const libraryItems = [
    {
      id: 1,
      type: "notes",
      title: "Machine Learning Fundamentals",
      content:
        "• Neural networks are computational models inspired by biological neurons\n• Supervised learning requires labeled training data\n• Deep learning uses multiple layers to extract features\n• Backpropagation is the key algorithm for training networks",
      created_at: "2024-11-28T10:30:00",
      updated_at: "2024-11-28T10:30:00",
    },
    {
      id: 2,
      type: "summary",
      title: "Climate Change Report 2024",
      summary_content:
        "The 2024 Climate Change Report highlights accelerating global temperature increases and their widespread impacts on ecosystems and human societies. Key findings include rising sea levels, increased frequency of extreme weather events, and urgent recommendations for immediate policy action to reduce carbon emissions.",
      original_content: "Full report content would be stored here...",
      created_at: "2024-11-27T15:45:00",
      updated_at: "2024-11-27T15:45:00",
    },
    {
      id: 3,
      type: "notes",
      title: "React Hooks Best Practices",
      content:
        "• useState for component state management\n• useEffect for side effects and lifecycle\n• useContext for global state without prop drilling\n• Custom hooks for reusable logic\n• Always follow the Rules of Hooks",
      created_at: "2024-11-26T09:15:00",
      updated_at: "2024-11-27T14:20:00",
    },
    {
      id: 4,
      type: "summary",
      title: "Quantum Computing Introduction",
      summary_content:
        "Quantum computing represents a paradigm shift in computational power by leveraging quantum mechanical phenomena like superposition and entanglement. Unlike classical bits, qubits can exist in multiple states simultaneously, enabling exponential speedups for specific problem classes including cryptography, optimization, and molecular simulation.",
      original_content: "Full quantum computing lecture notes...",
      created_at: "2024-11-25T13:00:00",
      updated_at: "2024-11-25T13:00:00",
    },
    {
      id: 5,
      type: "notes",
      title: "Database Design Principles",
      content:
        "• Normalization reduces data redundancy\n• Primary keys uniquely identify records\n• Foreign keys establish relationships\n• Indexes improve query performance\n• ACID properties ensure transaction reliability",
      created_at: "2024-11-24T11:30:00",
      updated_at: "2024-11-26T16:45:00",
    },
    {
      id: 6,
      type: "summary",
      title: "History of the Renaissance",
      summary_content:
        "The Renaissance was a cultural movement spanning the 14th-17th centuries, marking the transition from medieval to modern Europe. Characterized by renewed interest in classical learning, artistic innovation, and humanistic philosophy, this period produced landmark achievements in art, science, and literature that continue to influence Western civilization.",
      original_content: "Complete Renaissance history document...",
      created_at: "2024-11-23T08:20:00",
      updated_at: "2024-11-23T08:20:00",
    },
  ];

  const renderGridView = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {libraryItems.map((item) => (
        <div
          key={item.id}
          className="group bg-slate-800/30 backdrop-blur-sm border-2 border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300 cursor-pointer flex flex-col"
          onClick={() => setSelectedItem(item)}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                item.type === "notes"
                  ? "bg-gradient-to-br from-purple-500 to-purple-400"
                  : "bg-gradient-to-br from-pink-500 to-pink-400"
              }`}
            >
              {item.type === "notes" ? (
                <FileText className="w-6 h-6 text-white" />
              ) : (
                <Sparkles className="w-6 h-6 text-white" />
              )}
            </div>
          </div>

          {/* Title */}
          <h3
            className="text-lg font-bold mb-3 line-clamp-2"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            {item.title}
          </h3>

          {/* Preview */}
          <div className="flex-1 mb-4">
            <p className="text-sm text-slate-400 line-clamp-3">
              {item.type === "notes" ? item.content : item.summary_content}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-700">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-4 h-4" />
              <span>{item.updated_at}</span>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                item.type === "notes"
                  ? "bg-purple-500/20 text-purple-300"
                  : "bg-pink-500/20 text-pink-300"
              }`}
            >
              {item.type === "notes" ? "Notes" : "Summary"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {libraryItems.map((item) => (
        <div
          key={item.id}
          className="group bg-slate-800/30 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-5 hover:border-slate-600 transition-all duration-300 cursor-pointer"
          onClick={() => setSelectedItem(item)}
        >
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                item.type === "notes"
                  ? "bg-gradient-to-br from-purple-500 to-purple-400"
                  : "bg-gradient-to-br from-pink-500 to-pink-400"
              }`}
            >
              {item.type === "notes" ? (
                <FileText className="w-6 h-6 text-white" />
              ) : (
                <Sparkles className="w-6 h-6 text-white" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3
                  className="text-lg font-bold"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 ml-4">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.type === "notes"
                        ? "bg-purple-500/20 text-purple-300"
                        : "bg-pink-500/20 text-pink-300"
                    }`}
                  >
                    {item.type === "notes" ? "Notes" : "Summary"}
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 line-clamp-2 mb-3">
                {item.type === "notes" ? item.content : item.summary_content}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-4 h-4" />
                <span>{item.updated_at}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

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
          <div className="w-10 h-10 bg-gradient-to-br from-teal-900 to-cyan-600 rounded-full flex items-center justify-center">
            <button onClick={() => redirect("/main")}>
              <img src={logo.src} />
            </button>
          </div>
          <span
            className="text-xl font-bold"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Duckvision
          </span>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-teal-400 transition-all duration-300">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-slate-900" />
          </div>
          <span className="font-semibold">Alex J.</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/30">
              <Library className="w-8 h-8 text-slate-900" />
            </div>
            <div>
              <h1
                className="text-4xl font-bold"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Library
              </h1>
              <p className="text-slate-400 mt-1">
                Your saved notes and summaries
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 mt-6">
            <div className="bg-purple-500/20 border border-purple-400/30 rounded-xl px-4 py-3 flex items-center gap-3">
              <FileText className="w-5 h-5 text-purple-300" />
              <div>
                <p className="text-2xl font-bold text-purple-300">
                  {libraryItems.filter((i) => i.type === "notes").length}
                </p>
                <p className="text-xs text-purple-400">Notes</p>
              </div>
            </div>
            <div className="bg-pink-500/20 border border-pink-400/30 rounded-xl px-4 py-3 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-pink-300" />
              <div>
                <p className="text-2xl font-bold text-pink-300">
                  {libraryItems.filter((i) => i.type === "summary").length}
                </p>
                <p className="text-xs text-pink-400">Summaries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-slate-400 text-sm">
          Showing {libraryItems.length}{" "}
          {libraryItems.length === 1 ? "item" : "items"}
        </div>

        {/* Content */}
        {libraryItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Library className="w-12 h-12 text-slate-600" />
            </div>
            <h3
              className="text-xl font-bold mb-2"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              No items found
            </h3>
            <p className="text-slate-400 mb-6">
              {searchQuery
                ? "Try a different search term"
                : "Start by creating your first note or summary"}
            </p>
          </div>
        ) : (
          <>{viewMode === "grid" ? renderGridView() : renderListView()}</>
        )}
      </main>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900/95 backdrop-blur-xl border-2 border-slate-800 rounded-3xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 border-b border-slate-800">
              <div className="flex items-start gap-4 flex-1">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    selectedItem.type === "notes"
                      ? "bg-gradient-to-br from-purple-500 to-purple-400"
                      : "bg-gradient-to-br from-pink-500 to-pink-400"
                  }`}
                >
                  {selectedItem.type === "notes" ? (
                    <FileText className="w-6 h-6 text-white" />
                  ) : (
                    <Sparkles className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h2
                    className="text-2xl font-bold mb-2"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {selectedItem.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedItem.updated_at}
                    </span>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedItem.type === "notes"
                          ? "bg-purple-500/20 text-purple-300"
                          : "bg-pink-500/20 text-pink-300"
                      }`}
                    >
                      {selectedItem.type === "notes" ? "Notes" : "Summary"}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors ml-4"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-invert max-w-none">
                {selectedItem.type === "notes" ? (
                  <pre className="text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                    {selectedItem.content}
                  </pre>
                ) : (
                  <p className="text-slate-300 leading-relaxed">
                    {selectedItem.summary_content}
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between items-center p-6 border-t border-slate-800">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-6 py-2 bg-gradient-to-r from-teal-400 to-cyan-300 rounded-xl font-semibold text-slate-900 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
