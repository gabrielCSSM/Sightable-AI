"use client";
import DebugText from "../debugText";
import ChatBotCard from "./options/chatbot/chatbotOptionCard";
import NotesCard from "./options/notes/noteOptionCard";
import SummaryCard from "./options/summary/summaryOptionCard";

export function UploadFile() {
  const handleFile = async (e: React.FormEvent) => {
    
  };

  return (
    <div className="p-1 border border-amber-50 rounded-2xl flex flex-col items-center-safe">
      <form method="POST" onSubmit={handleFile}>
        <input type="file" id="fileToUpload" name="fileToUpload" />
        <br></br>
        <input
          className="p-2 border-2 border-red-50"
          type="submit"
          value="Upload File"
        />
      </form>
    </div>
  );
}

export default function RenderUI({ available }: { available: boolean }) {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-16 gap-16 sm:p-20">
      <DebugText PageTitle="MAIN" />
      <div className="grid grid-cols-3 gap-16">
        <NotesCard />
        <SummaryCard />
        <ChatBotCard available={available} />
      </div>
      <UploadFile />
    </div>
  );
}
