"use server";

import { createReadStream, writeFileSync } from "fs";
import { PDFParse } from "pdf-parse";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "pdfjs-dist/legacy/build/pdf.worker.mjs";

export async function handleFileUpload(filesData: Array<T>) {
  filesData.map(async (fl) => {
    const file = fl["file"];
    //console.log(file);
    const fd = new FormData();
    fd.append("File", file);
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);
    //console.log(file.text().toString());

    writeFileSync("./data/" + file.name + "", fileBuffer);
    //readFile( "./data/" + file.name + "")
    let text = "";
    const buffArr = new Uint8Array(fileBuffer);

    if (String(file.name).endsWith(".pdf")) {
      //console.log(text);

      const loadingTask = pdfjsLib.getDocument({ data: buffArr });
      const pdf = await loadingTask.promise;
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((it: any) => it.str).join(" ");
        text += pageText + "\n";
      }
      console.log(text);
      await pdf.destroy?.();

      const res = await fetch(`${process.env.NEXT_PUBLIC_AI_URL}summarizer`, {
        method: "POST",
        body: text,
      });
      console.log(await res.json());
    }
  });
  //console.log(file)
}

async function readFile(filePath) {
  const readStream = createReadStream(filePath, { encoding: "utf8" });

  try {
    for await (const chunk of readStream) {
      console.log("--- File chunk start ---");
      console.log(chunk);
      console.log("--- File chunk end ---");
    }
    console.log("Finished reading the file.");
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
}
