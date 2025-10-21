import DebugText from "../debugText";
import ChatBotCard from "./cards/chatbotOptionCard";
import NotesCard from "./cards/noteOptionCard";
import SummaryCard from "./cards/summaryOptionCard";

export function UploadFile() {
  return (
    <div>
      <form>
        <input type="file" id="fileToUpload" name="fileToUpload" />
        <br></br>
        <input
          className="p-2 border-2 border-red-50"
          type="submit"
          value="Upload File"
        ></input>
      </form>
    </div>
  );
}

export default function RenderUI() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-16 gap-16 sm:p-20">
      <DebugText PageTitle="MAIN" />
      <div className="grid grid-cols-3 gap-16">
        <NotesCard />
        <SummaryCard />
        <ChatBotCard available={false} />
      </div>

      <UploadFile />
    </div>
  );
}
