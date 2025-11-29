"use server";

import { writeFileSync } from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "pdfjs-dist/legacy/build/pdf.worker.mjs";

export async function handleFileUpload(filesData: Array<T>) {
  const results: Array<any> = [];
  for (const fl of filesData) {
    try {
      const file = fl["file"];
      const buffer = await file.arrayBuffer();
      const fileBuffer = Buffer.from(buffer);

      writeFileSync("./data/" + file.name, fileBuffer);

      let text = "";
      const buffArr = new Uint8Array(fileBuffer);

      if (String(file.name).toLowerCase().endsWith(".pdf")) {
        // run pdfjs in single-threaded mode on the server
        const loadingTask = pdfjsLib.getDocument({ data: buffArr });
        const pdf = await loadingTask.promise;
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((it: any) => it.str).join(" ");
          text += pageText + "\n";
        }
        await pdf.destroy?.();
      }
      // send JSON and set headers so the server knows what to expect
      const res = await fetch(`${process.env.NEXT_PUBLIC_AI_URL}summarizer`, {
        method: "POST",

        body: JSON.stringify({ text }),
      });

      console.log(res);

      // check status and parse JSON safely
      if (res.ok) {
        results.push(await res.json());
        console.log(results);
      } else {
        // push raw text or status for debugging
        const body = await res.text();
        results.push({ status: res.status, body });
      }
    } catch (err: any) {
      results.push({ error: String(err) });
    }
  }
  return results;
}
