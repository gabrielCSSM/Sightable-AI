"use client";
import React, { useState, useEffect } from "react";
import { Loader, CheckCircle, Sparkles } from "lucide-react";
import logo from "@/public/logo_sightable.png";
import { redirect } from "next/navigation";


export default function DuckvisionRedirect () {
  const [countdown, setCountdown] = useState(3);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setIsComplete(true);
          // Simulate redirect
          setTimeout(() => {
            redirect("/main");
          }, 1500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + (100 / 30); // 3 seconds = 30 intervals of 100ms
      });
    }, 100);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-md w-full">
        {/* Logo Animation */}
        <div className="mb-8 flex justify-center">
          <div className={`relative transition-all duration-500 ${
            isComplete ? 'scale-110' : 'scale-100'
          }`}>
            <div className="w-32 h-32 bg-gradient-to-br from-teal-900 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-teal-500/30">
              <img src={logo.src} />
            </div>
            {/* Ripple effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-3xl animate-ping opacity-20"></div>
            
            {/* Success checkmark */}
            {isComplete && (
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Loading Text */}
        {!isComplete ? (
          <>
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              Processing Complete!
            </h1>
            <p className="text-slate-400 text-lg mb-8">
              Preparing your results...
            </p>

            {/* Countdown Circle */}
            <div className="relative w-24 h-24 mx-auto mb-8">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className="text-slate-700"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 40}
                  strokeDashoffset={2 * Math.PI * 40 * (1 - progress / 100)}
                  className="text-teal-400 transition-all duration-100"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  {countdown}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 mb-6 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-400 to-cyan-300 rounded-full transition-all duration-100 ease-linear shadow-lg shadow-teal-500/50"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent animate-pulse" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              All Set!
            </h1>
            <p className="text-slate-400 text-lg mb-8">
              Redirecting now...
            </p>
            
            {/* Success Animation */}
            <div className="flex justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-teal-400 animate-bounce" />
              <Sparkles className="w-6 h-6 text-cyan-400 animate-bounce" />
              <Sparkles className="w-6 h-6 text-teal-400 animate-bounce" />
            </div>
          </>
        )}

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-2 h-2 bg-teal-400/30 rounded-full animate-pulse" style={{left: '10%', top: '20%'}}></div>
          <div className="absolute w-2 h-2 bg-teal-400/30 rounded-full animate-pulse" style={{left: '80%', top: '30%'}}></div>
          <div className="absolute w-2 h-2 bg-teal-400/30 rounded-full animate-pulse" style={{left: '20%', top: '70%'}}></div>
          <div className="absolute w-2 h-2 bg-teal-400/30 rounded-full animate-pulse" style={{left: '90%', top: '60%'}}></div>
          <div className="absolute w-2 h-2 bg-teal-400/30 rounded-full animate-pulse" style={{left: '50%', top: '10%'}}></div>
          <div className="absolute w-2 h-2 bg-teal-400/30 rounded-full animate-pulse" style={{left: '60%', top: '80%'}}></div>
        </div>
      </div>
    </div>
  );
};