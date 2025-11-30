import * as dbTools from "@/app/lib/databaseTools";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";
import { URLSearchParams } from "url";

export async function GET(req: Request) {
    const user_id = req.url.split("?")[1].split("=")[1];
    const notes = await dbTools.getNotes(user_id);
    const summaries = await dbTools.getSummaries(user_id);
    const data = [notes, summaries]
    return NextResponse.json(data);
}

export async function POST(req: Request) {
  const data = await req.json();
  const action = data["action"];
  const user_id = data["user_id"];
  const title = data["archive"];
  const content = data["content"];

  if (action == "notes") {
    await dbTools.addNote(user_id, title, content);
    return NextResponse.json({ status: 200 }, { statusText: "Saved" });
  } else if (action == "summary") {
    await dbTools.addSummary(user_id, title, content);
    return NextResponse.json({ status: 200 }, { statusText: "Saved" });
  } else {
    return NextResponse.json({ status: 404 }, { statusText: "Not Found" });
  }
}
