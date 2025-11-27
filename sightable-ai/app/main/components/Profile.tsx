import {
  X,
  User,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function ProfileSide({
  open,
  myUser,
}: {
  open: boolean;
  myUser: Object;
}) {
  console.log(myUser["email"]);
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-slate-900/95 backdrop-blur-xl border-l-2 border-slate-800 shadow-2xl transform transition-transform duration-300 z-50 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6">
        {/* User Profile */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-slate-900" />
          </div>
          <h2
            className="text-xl font-bold text-center mb-1"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            {myUser["user"] ?? "User"}
          </h2>
          <p className="text-slate-400 text-center text-sm">
            {myUser["email"] ?? "Email"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-teal-400">
              {myUser["files"] ?? "0"}
            </p>
            <p className="text-xs text-slate-500">Files Processed</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-purple-400">
              {myUser["summaries"] ?? "0"}
            </p>
            <p className="text-xs text-slate-500">Summaries</p>
          </div>
        </div>

        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition-colors text-left">
            <Settings className="w-5 h-5 text-teal-400" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition-colors text-left">
            <CreditCard className="w-5 h-5 text-teal-400" />
            <span>Subscription</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition-colors text-left">
            <HelpCircle className="w-5 h-5 text-teal-400" />
            <span>Help & Support</span>
          </button>
          <div className="border-t border-slate-800 my-4"></div>
          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/20 rounded-xl transition-colors text-left text-red-400"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
