import { FileText, MessageSquare, Sparkles } from "lucide-react";
export default function Main_Features() {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-16">
      <div className="px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full text-sm flex items-center gap-2">
        <FileText className="w-4 h-4 text-purple-300" />
        <span className="text-purple-200">Quick Notes</span>
      </div>
      <div className="px-4 py-2 bg-pink-500/20 border border-pink-400/30 rounded-full text-sm flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-pink-300" />
        <span className="text-pink-200">Smart Summaries</span>
      </div>
      <div className="px-4 py-2 bg-amber-500/20 border border-amber-400/30 rounded-full text-sm flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-amber-300" />
        <span className="text-amber-200">AI Chatbot</span>
      </div>
    </div>
  );
}
