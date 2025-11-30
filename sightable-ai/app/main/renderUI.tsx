"use client";

import React, { useState, useRef } from "react";
import { handleFileUpload } from "./handler";
import logo from "@/public/logo_sightable.png";

import {
  Upload,
  X,
  FileText,
  File,
  Image,
  User,
  ChevronRight,
  Sparkles,
  MessageSquare,
  ListChecks,
  CheckCircle,
  Trash,
} from "lucide-react";
import ProfileSide from "./components/Profile";
import { myUser } from "./components/myUser";
import RenderResponse from "./components/ResponseRender";

export default function RenderUI({
  available,
  myUser,
}: {
  available: boolean;
  myUser: myUser;
}) {
  const [profile, profileOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedMode, setSelectedMode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const [response, setResponse] = useState([]);

  const MAX_FILES = myUser["role"] == "user" ? 5 : 3;
  const MAX_SIZE_MB = 150;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

  const modes = [
    {
      id: "notes",
      name: "Notes",
      icon: ListChecks,
      color: "purple",
      description: "Quick bullet points and key takeaways",
      gradient: "from-purple-500 to-purple-400",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-400/30",
      textColor: "text-purple-300",
    },
    {
      id: "summarizer",
      name: "Summary",
      icon: Sparkles,
      color: "pink",
      description: "Comprehensive overview of content",
      gradient: "from-pink-500 to-pink-400",
      bgColor: "bg-pink-500/20",
      borderColor: "border-pink-400/30",
      textColor: "text-pink-300",
    },
    {
      id: "summary-chat",
      name: "Chatbot",
      icon: MessageSquare,
      color: "amber",
      description:
        myUser["role"] == "user"
          ? "Ask questions about your content"
          : "Not available for guests users.",
      gradient: "from-amber-500 to-amber-400",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-400/30",
      textColor: "text-amber-300",
    },
  ];

  const getTotalSize = () => {
    return uploadedFiles.reduce((total, file) => total + file.size, 0);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "svg"].includes(ext)) return Image;
    if (["pdf"].includes(ext)) return FileText;
    return File;
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const currentTotal = getTotalSize();
    const newFiles = [];
    let newTotal = currentTotal;

    for (const file of files) {
      if (uploadedFiles.length + newFiles.length >= MAX_FILES) {
        alert(`Maximum ${MAX_FILES} files allowed`);
        break;
      }

      if (newTotal + file.size > MAX_SIZE_BYTES) {
        alert(`Total file size exceeds ${MAX_SIZE_MB}MB limit`);
        break;
      }

      newFiles.push({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        file: file,
      });
      newTotal += file.size;
    }

    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(uploadedFiles.filter((f) => f.id !== fileId));
  };

  const handleProcess = () => {
    if (!selectedMode) return;
    setIsProcessing(true);

    // Simulate processing
    setTimeout(async () => {
      setIsProcessing(false);
      const data = await handleFileUpload(uploadedFiles, selectedMode);
      setResponse(data);
      //setResponse("a")
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <header className="relative z-10 px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-full flex items-center justify-center">
            <img src={logo.src}></img>
          </div>
          <span
            className="text-xl font-bold"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Sightable AI
          </span>
        </div>

        {/* User Dashboard Toggle */}
        <button
          onClick={() => {
            profileOpen(!profile);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-teal-400 transition-all duration-300 group"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-slate-900" />
          </div>
          <span className="font-semibold hidden sm:inline">
            {myUser["user"] ?? "User"}
          </span>
          <ChevronRight
            className={`w-4 h-4 transition-transform duration-300 ${
              profile ? "rotate-180" : ""
            }`}
          />
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-8 py-12">
        {/* Upload Area */}
        {uploadedFiles.length === 0 ? (
          <div
            className={`relative border-4 border-dashed rounded-3xl p-12 transition-all duration-300 ${
              isDragging
                ? "border-teal-400 bg-teal-400/10 scale-[1.02]"
                : "border-slate-700 bg-slate-800/30"
            }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileInput}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/30 animate-pulse">
                <Upload className="w-12 h-12 text-slate-900" />
              </div>

              <h2
                className="text-3xl font-bold mb-4"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Drop your files here
              </h2>
              <p className="text-slate-400 text-lg mb-6">
                or click to browse your device
              </p>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="group px-8 py-4 bg-gradient-to-r from-teal-400 to-cyan-300 rounded-xl font-semibold text-slate-900 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
              >
                <Upload className="w-5 h-5" />
                <span>Choose Files</span>
              </button>

              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-400" />
                  <span>Maximum {MAX_FILES} files</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-400" />
                  <span>Up to {MAX_SIZE_MB}MB total</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-400" />
                  <span>PDF, DOC, TXT, Images</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Uploaded Files */}
            <div className="bg-slate-800/30 backdrop-blur-sm border-2 border-slate-700 rounded-2xl p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3
                  className="text-xl font-bold"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Uploaded Files ({uploadedFiles.length}/{MAX_FILES})
                </h3>
                <div className="text-sm text-slate-400">
                  {formatFileSize(getTotalSize())} / {MAX_SIZE_MB}MB
                </div>
              </div>

              <div className="space-y-3">
                {uploadedFiles.map((file) => {
                  const FileIconComponent = getFileIcon(file.name);
                  return (
                    <div
                      key={file.id}
                      className="flex items-center justify-between bg-slate-800/50 border border-slate-700 rounded-xl p-4 group hover:border-slate-600 transition-all"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileIconComponent className="w-5 h-5 text-teal-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{file.name}</p>
                          <p className="text-sm text-slate-500">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="ml-4 p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
                      >
                        <X className="w-5 h-5 text-slate-500 group-hover:text-red-400" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {uploadedFiles.length >= 5 ? (
                <div />
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 w-full py-3 border-2 border-dashed border-slate-600 rounded-xl text-slate-400 hover:border-teal-400 hover:text-teal-400 transition-all duration-300 font-semibold"
                >
                  + Add More Files
                </button>
              )}
            </div>

            {/* Mode Selection */}
            <div className="mb-8">
              <h3
                className="text-2xl font-bold mb-6 text-center"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Choose Your Mode
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {modes.map((mode) => {
                  const Icon = mode.icon;
                  const isSelected = selectedMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() =>
                        response.length == 0
                          ? setSelectedMode(mode.id)
                          : setResponse([])
                      }
                      className={`relative bg-slate-800/40 backdrop-blur-sm border-2 rounded-2xl p-6 transition-all duration-300 group ${
                        isSelected
                          ? `${mode.borderColor} shadow-lg transform scale-105`
                          : "border-slate-700 hover:border-slate-600 hover:transform hover:scale-[1.02]"
                      }`}
                    >
                      {isSelected && (
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${mode.bgColor} rounded-2xl`}
                        ></div>
                      )}

                      <div className="relative z-10">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br ${mode.gradient} rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>

                        <h4
                          className="text-xl font-bold mb-2"
                          style={{ fontFamily: "Space Grotesk, sans-serif" }}
                        >
                          {mode.name}
                        </h4>

                        <p className="text-slate-400 text-sm">
                          {mode.description}
                        </p>

                        {isSelected && (
                          <div className="mt-4 flex items-center justify-center gap-2 text-teal-400">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-semibold text-sm">
                              Selected
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Process Button */}
            <div className="flex flex-row justify-center text-center gap-6">
              <button
                onClick={handleProcess}
                disabled={!selectedMode || isProcessing}
                className="group px-12 py-4 bg-gradient-to-r from-teal-400 to-cyan-300 rounded-xl font-semibold text-slate-900 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-3 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Process Files</span>
                  </>
                )}
              </button>
              {response.length != 0 ? (
                <button
                  onClick={() => {
                    setResponse([]);
                    setSelectedMode("");
                  }}
                  className="group px-12 py-4 bg-gradient-to-r from-red-900 to-red-600 rounded-xl font-semibold text-slate-900 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Trash className="w-5 h-5" />
                  <span>Clean</span>
                </button>
              ) : (
                <></>
              )}
            </div>
            {response.length != 0 ? (
              <div className="mt-5">
                <RenderResponse response={response} option={selectedMode} />
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </main>

      {/* User Dashboard Sidebar */}
      <ProfileSide open={profile} myUser={myUser} />

      {profile && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => profileOpen(false)}
        ></div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileInput}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
      />
    </div>
  );
}
