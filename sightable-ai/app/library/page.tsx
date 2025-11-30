"use client";
import React, { useEffect, useState } from "react";
import { Library, FileText, Sparkles, Clock, User, X } from "lucide-react";
import logo from "@/public/logo_sightable.png";
import { redirect, useSearchParams } from "next/navigation";
import { myUser } from "../main/components/myUser";

export default function UserLibrary() {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [selectedItem, setSelectedItem] = useState(null);
  const [libraryItems, setLibraryItems] = useState<Array<any>>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useSearchParams();
  const data = router.get("data");

  const myUser = React.useMemo(() => {
    try {
      return data ? JSON.parse(atob(data)) : null;
    } catch {
      return null;
    }
  }, [data]);

  useEffect(() => {
    // fetch saved notes/summaries and map them into libraryItems shape
    if (!myUser || !myUser.email) return;

    const fetchLibrary = async () => {
      try {
        const params = new URLSearchParams({ user: myUser["email"] });
        const res = await fetch(`/api/auth/users/files?${params.toString()}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          console.error(
            "Failed to load library:",
            res.status,
            await res.text()
          );
          return;
        }

        const payload = await res.json();

        // payload might be [notesArray, summariesArray] or an object — handle both
        let notesArr: any[] = [];
        let summariesArr: any[] = [];

        if (Array.isArray(payload)) {
          notesArr = Array.isArray(payload[0]) ? payload[0] : [];
          summariesArr = Array.isArray(payload[1]) ? payload[1] : [];
        } else {
          notesArr = Array.isArray(payload.notes) ? payload.notes : [];
          summariesArr = Array.isArray(payload.summaries)
            ? payload.summaries
            : [];
        }

        const mapped: any[] = [];
        let idCounter = 1;

        // map notes -> library item shape
        for (const n of notesArr) {
          mapped.push({
            id: idCounter++,
            type: "notes",
            title: n.title ?? n.archive ?? "Untitled note",
            content: n.content ?? n.body ?? "",
            created_at: n.created_at ?? n.createdAt ?? n.created ?? "",
            updated_at: n.updated_at ?? n.updatedAt ?? n.updated ?? "",
          });
        }

        // map summaries -> library item shape
        for (const s of summariesArr) {
          mapped.push({
            id: idCounter++,
            type: "summary",
            title: s.title ?? s.archive ?? "Untitled summary",
            summary_content: s.summary_content ?? s.content ?? s.summary ?? "",
            created_at: s.created_at ?? s.createdAt ?? s.created ?? "",
            updated_at: s.updated_at ?? s.updatedAt ?? s.updated ?? "",
          });
        }

        setLibraryItems(mapped);
      } catch (err) {
        console.error("Error fetching library:", err);
      }
    };

    fetchLibrary();
  }, [myUser]);

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
            Sightable AI
          </span>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-teal-400 transition-all duration-300">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-slate-900" />
          </div>
          <span className="font-semibold">{myUser["user"]}</span>
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
                Archivo
              </h1>
              <p className="text-slate-400 mt-1">
                Tus notas y resumenes archivados
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
          <>{renderGridView()}</>
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
