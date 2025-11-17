from fastapi import FastAPI, UploadFile
import base64
import requests

app = FastAPI()

OLLAMA_URL = "http://localhost:11434/api/generate"
CHAT_URL = "http://localhost:11434/api/chat"


def encode_file(file_bytes):
    return base64.b64encode(file_bytes).decode("utf-8")


# GEMMA 3

@app.post("/extract")
async def extract(file: UploadFile):
    content = await file.read()
    encoded = encode_file(content)

    prompt = """
You are Gemma 3 Vision. Extract all the text from the provided image/PDF page and give a clean transcription.
"""

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "gemma3:4b",
            "prompt": prompt,
            "images": [encoded],
            "stream": False
        }
    )

    text = response.json()["response"]
    return {"text": text}


@app.post("/summarize")
async def summarize(payload: dict):
    text = payload["text"]

    prompt = f"""
Summarize the following extracted document text in a clear, structured form:

{text}
"""

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "gemma3:4b",
            "prompt": prompt,
            "stream": False
        }
    )

    return {"summary": response.json()["response"]}


# GTP OSS

@app.post("/chat")
async def chat(payload: dict):
    context = payload["context"]
    question = payload["question"]

    messages = [
        {
            "role": "system",
            "content": f"You may only answer using this context:\n{context}\nIf the question is unrelated, reply: 'I cannot answer that.'"
        },
        {"role": "user", "content": question}
    ]

    response = requests.post(
        CHAT_URL,
        json={"model": "gpt-oss", "messages": messages}
    )

    answer = response.json()["message"]["content"]
    return {"answer": answer}

@app.post("/process")
async def process(file: UploadFile, question: str):

    content = await file.read()
    encoded = encode_file(content)

    extract_prompt = "Extract all text from this document."
    extract_response = requests.post(
        OLLAMA_URL,
        json={
            "model": "gemma3:4b",
            "prompt": extract_prompt,
            "images": [encoded],
            "stream": False
        }
    )
    extracted_text = extract_response.json()["response"]

    summary_prompt = f"Summarize the following text:\n\n{extracted_text}"
    summary_response = requests.post(
        OLLAMA_URL,
        json={"model": "gemma3:4b", "prompt": summary_prompt, "stream": False}
    )
    summary = summary_response.json()["response"]

    messages = [
        {
            "role": "system",
            "content":
                "You can ONLY answer using the provided context. "
                "If unrelated, say 'I cannot answer that.'\n\n"
                f"Context:\n{summary}"
        },
        {"role": "user", "content": question}
    ]

    chat_response = requests.post(
        CHAT_URL,
        json={"model": "gpt-oss", "messages": messages}
    )
    answer = chat_response.json()["message"]["content"]

    return {
        "extracted_text": extracted_text,
        "summary": summary,
        "answer": answer
    }
