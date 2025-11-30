import {
  Bot,
  CheckCircle,
  ChevronLeft,
  Copy,
  Download,
  FileText,
  ListChecks,
  MessageSquare,
  Send,
  Share2,
  Sparkles,
  User,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { myUser } from "./myUser";

function renderNotes(response: Array<T>, myUser: myUser) {
  const handleSave = async (r, k) => {
    const payload = {
      action: "notes",
      user_id: myUser["email"],
      archive: r["archive"],
      content: r["summary"],
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/auth/users/files`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br rounded-4xl from-slate-950 via-slate-900 to-slate-950 text-white p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div>
              <h1
                className="text-3xl font-bold flex items-center gap-3"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-400 rounded-xl flex items-center justify-center">
                  <ListChecks className="w-6 h-6 text-white" />
                </div>
                Notes
              </h1>
              <p className="text-slate-400 mt-1">
                Quick bullet points from your documents
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {response.map((r, k) => {
            return (
              <div className="">
                <div className="flex gap-3">
                  <h1>{r.archive} </h1>
                  <button
                    onClick={() => handleSave(r, k)}
                    className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-teal-400 transition-all"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
                <div
                  key={k}
                  className="bg-slate-800/30 backdrop-blur-sm border-2 border-slate-700 rounded-2xl p-8"
                >
                  <div className="space-y-8">
                    <pre className="whitespace-pre-wrap break-words text-textPrimary">
                      {r.summary}
                    </pre>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function renderSummary(response: Array<T>, myUser: myUser) {
  const handleSave = async (r, k) => {
    const payload = {
      action: "summary",
      user_id: myUser["email"],
      archive: r["archive"],
      content: r["summary"],
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/auth/users/files`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      }
    );
  };
  return (
    <div className="min-h-screen bg-gradient-to-br rounded-4xl from-slate-950 via-slate-900 to-slate-950 text-white p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div>
              <h1
                className="text-3xl font-bold flex items-center gap-3"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-400 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                Summary
              </h1>
              <p className="text-slate-400 mt-1">
                Comprehensive overview of your content
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-teal-400 transition-all">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {response.map((r, k) => {
            return (
              <div>
                <div className="flex gap-3">
                  <h1>{r.archive} </h1>
                  <button
                    onClick={() => handleSave(r, k)}
                    className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-teal-400 transition-all"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
                <div
                  key={k}
                  className="bg-slate-800/30 backdrop-blur-sm border-2 border-slate-700 rounded-2xl p-8"
                >
                  <div className="space-y-8">
                    <pre className="whitespace-pre-wrap break-words text-textPrimary">
                      {r.summary}
                    </pre>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function renderChatbot(response: Array<T>) {
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I've analyzed your documents. What would you like to know?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Format context for the API
  const formatContext = () => {
    if (!response || response.length === 0) return "";
    console.log(response);
    return response
      .map((doc, index) => {
        return `Document ${index + 1}: ${doc.archive}\n${doc.summary}`;
      })
      .join("\n\n---\n\n");
  };

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { role: "user", content: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);
    const currentQuestion = chatInput;
    setChatInput("");
    setIsChatLoading(true);

    try {
      // Create FormData to match your Python API
      const formData = new FormData();
      formData.append("context", formatContext());
      formData.append("question", currentQuestion);

      const response = await fetch(`${process.env.NEXT_PUBLIC_AI_URL}chat`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to get response from API");
      }

      const data = await response.json();

      // Get answer from response
      const answer = data.answer || "Sorry, I couldn't generate a response.";

      // Parse JSON response if your model returns JSON
      let assistantMessage;
      try {
        const jsonResponse = JSON.parse(answer);
        assistantMessage = {
          role: "assistant",
          content: `${jsonResponse.Greeting}\n\n${jsonResponse.Content}\n\n${jsonResponse.Farewell}`,
        };
      } catch (e) {
        // If not JSON, use as-is
        assistantMessage = {
          role: "assistant",
          content: answer,
        };
      }

      setChatMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling API:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error. Please make sure the API server is running.",
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div>
              <h1
                className="text-3xl font-bold flex items-center gap-3"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-400 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                Chatbot
              </h1>
              <p className="text-slate-400 mt-1">
                Ask questions about your documents
              </p>
              {response.length > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <p className="text-amber-400 text-sm">
                    {response.length} document{response.length !== 1 ? "s" : ""}{" "}
                    loaded
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 bg-slate-800/30 backdrop-blur-sm border-2 border-slate-700 rounded-2xl flex flex-col overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-teal-400 to-cyan-300"
                      : "bg-gradient-to-br from-amber-500 to-amber-400"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-5 h-5 text-slate-900" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[70%] rounded-2xl p-4 ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-400/30"
                      : "bg-slate-700/50 border border-slate-600"
                  }`}
                >
                  <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isChatLoading && (
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-slate-700/50 border border-slate-600 rounded-2xl p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-700 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleChatSend()}
                placeholder="Ask a question about your documents..."
                className="flex-1 h-12 px-4 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
              />
              <button
                onClick={handleChatSend}
                disabled={!chatInput.trim() || isChatLoading}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-400 rounded-xl font-semibold text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RenderResponse({
  response,
  option,
  myUser,
}: {
  response: Array<T>;
  option: string;
  myUser: myUser;
}) {
  return (
    <>
      {option === "notes" ? renderNotes(response, myUser) : <></>}
      {option === "summarizer" ? renderSummary(response, myUser) : <></>}
      {option === "summary-chat" ? renderChatbot(response) : <></>}
    </>
  );
}
