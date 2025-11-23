"use client";
import Page from "../main/page";
import React from "react";
import { motion } from "framer-motion";

export function LandingPage() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div className="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%) relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"></div>
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            Welcome to Sightable AI!
          </h1>
          <h3 className="text-3xl font-extralight tracking-tight text-balance text-white sm:text-4xl">
            Turn visual information into instant understanding.
          </h3>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            Sightable AI is an intelligent visual assistant that helps you
            extract knowledge from the world’s most information-dense content —
            documents, images, and videos.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <div className="items-baseline justify-center gap-x-6">
              <a
                href="/api/auth/signin"
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Log In.
              </a>
              <p className="px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs">
                You dont have an account?{" "}
                <a
                  href="/create-account"
                  className="font-semibold hover:font-bold hover:underline"
                >
                  Create one here.
                </a>
              </p>
            </div>
            <p className="text-sm/6 font-semibold text-white">
              <a
                href="/handleGuests/"
                className="hover:font-bold hover:underline"
              >
                Try it for free!
              </a>
              {" (With a limit of 3 files.)"}
              <span aria-hidden="true">→</span>
            </p>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div className="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%) relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"></div>
      </div>
    </div>
  );
}

export function LandingPage3() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.div
        className="max-w-3xl space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Title */}
        <motion.h1
          className="text-5xl font-extrabold text-gray-900 sm:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Welcome to <span className="text-indigo-600">Sightable AI!</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          className="text-2xl font-semibold text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Simplicity. Speed. Style.
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Sightable AI helps you design, collaborate, and launch digital
          experiences faster than ever — all in one place. Built for teams that
          move fast and value design.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.8,
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.button
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-2xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition-all duration-200"
          >
            Log In
          </motion.button>

          <motion.button
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-2xl border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition-all duration-200"
          >
            Try for Free
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
