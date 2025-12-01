"use server";

import { mkdirSync, writeFileSync } from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "pdfjs-dist/legacy/build/pdf.worker.mjs";
import mammoth from "mammoth";
import path from "path";

async function handlePDF(fileBuffer: Buffer) {
  let textContent = "";
  const buffArr = new Uint8Array(fileBuffer);

  const loadingTask = pdfjsLib.getDocument({ data: buffArr });
  const pdf = await loadingTask.promise;

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((it: any) => it.str).join(" ");
    textContent += pageText + "\n";
  }

  await pdf.destroy?.();
  return textContent;
}

async function handleTXT(fileBuffer: Buffer) {
  return fileBuffer.toString("utf8");
}

async function handleDOCX(fileBuffer: Buffer) {
  const { value } = await mammoth.extractRawText({ buffer: fileBuffer });
  return value || "";
}
export async function handleFileUpload(filesData: Array<T>, option: string) {
  const results: Array<any> = [];
  
  const dataDir = path.join(process.cwd(), "data");
  
  try {
    mkdirSync(dataDir, { recursive: true });
  } catch (err) {
    console.error("Could not create data directory:", err);
  }
    // normalize option once
  if (option === "summary-chat") {
    option = "summarizer";
  }

  for (const fl of filesData) {
    try {
      const file = fl["file"];
      const buffer = await file.arrayBuffer();
      const fileBuffer = Buffer.from(buffer);

      writeFileSync("./data/" + file.name, fileBuffer);
      const ext = String(file.name).toLowerCase().split(".").pop();
      console.log(ext);
      let responseText = "";
      const fileName = file.name;

      switch (ext) {
        case "pdf":
          responseText = await handlePDF(fileBuffer);
          break;
        case "docx":
          responseText = await handleDOCX(fileBuffer);
          break;
        case "txt":
          responseText = await handleTXT(fileBuffer);
          break;
        default:
          break;
      }
      
      //console.log(responseText)
      const res = await fetch(`${process.env.NEXT_PUBLIC_AI_URL}${option}`, {
        method: "POST",
        body: JSON.stringify({ fileName ,responseText }),
      });

      console.log(res)

      if (res.ok) {
        results.push(await res.json());
        console.log(results);
      } else {
        const body = await res.text();
        results.push({ status: res.status, body });
      }
    } catch (err: any) {
      results.push({ error: String(err) });
    }
  }
  return results;
}
