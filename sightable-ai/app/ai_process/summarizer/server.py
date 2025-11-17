from fastapi import FastAPI
import requests

app = FastAPI()

@app.post("/summarize")
async def summarize(payload: dict):
    text = payload["text"]

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "gemma:1b",
            "prompt": f"Summarize the following text:\n\n{text}",
            "stream": False
        }
    )

    summary = response.json()["response"]
    return {"summary": summary}
