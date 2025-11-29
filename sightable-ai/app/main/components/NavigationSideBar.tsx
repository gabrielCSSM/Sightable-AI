import {
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  CircleFadingArrowUp,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { myUser } from "./myUser";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function NavigationSideBar({ myUser }: { myUser: myUser }) {
  return (
    <>
      {myUser["role"] == "user" ? (
        <nav className="space-y-2">
          <Link href={"/settings?currentPage=settings"}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition-colors text-left">
            <Settings className="w-5 h-5 text-teal-400" />
            <span>Settings</span>
          </Link>

          <Link href={"/settings?currentPage=subscription"} 
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition-colors text-left">
            <CreditCard className="w-5 h-5 text-teal-400" />
            <span>Subscription</span>
          </Link>

          <Link href={"/settings?currentPage=help"} 
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition-colors text-left">
            <HelpCircle className="w-5 h-5 text-teal-400" />
            <span>Help & Support</span>
          </Link>
          <div className="border-t border-slate-800 my-4"></div>
          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/20 rounded-xl transition-colors text-left text-red-400"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </nav>
      ) : (
        <nav className="space-y-2">

          <button onClick={() => redirect("/create-account")}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition-colors text-left">
            <CircleFadingArrowUp className="w-5 h-5 text-teal-400" />
            <span>Upgrade account</span>
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
      )}
    </>
  );
}
