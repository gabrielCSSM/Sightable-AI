"use server";

import { writeFileSync } from "fs";

export async function handleFileUpload(formData: FormData) {
    const file = formData.get("fileToUpload") as File
    console.log(file)
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);
    //await writeFileSync(file.name, fileBuffer);
}