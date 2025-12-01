from fastapi import FastAPI, Request, Form
import base64
from fastapi.middleware.cors import CORSMiddleware
import httpx
import logging

app = FastAPI()

OLLAMA_URL = "http://localhost:11434/api/generate"
CHAT_URL = "http://localhost:11434/api/chat"

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def encode_file(file_bytes):
    return base64.b64encode(file_bytes).decode("utf-8")

async def _post_json(url: str, payload: dict):
    try:
        logger.info(f"Sending request to: {url}")
        logger.info(f"Payload: {payload}")
        
        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(url, json=payload)
            logger.info(f"Response status: {response.status_code}")
            logger.info(f"Response body: {response.text[:500]}")  # First 500 chars
            
            response.raise_for_status()
            return response.json()
    except Exception as e:
        logger.error(f"Error in _post_json: {str(e)}")
        raise


@app.post("/notes")
async def notes(request: Request):
    request = await request.json();
    text = request["responseText"];
    name = request["fileName"];
    prompt = f"""Extract bullet points and keypoints of the following text, following your template; {text}"""

    data = await _post_json(OLLAMA_URL, {"model": "gemma3:4b", "prompt": prompt, "stream": False})
    return {"archive": name, "summary": data.get("response")}

@app.post("/summarizer")
async def summarizer(request: Request):
    request = await request.json();
    text = request["responseText"];
    name = request["fileName"];
    prompt = f"""Summarize the following text, your only goal is to summarize this text, dont do anything else, just summarize it following your template; {text}"""

    data = await _post_json(OLLAMA_URL, {"model": "gemma3:4b", "prompt": prompt, "stream": False})
    return {"archive": name, "summary": data.get("response")}

@app.post("/chat")
async def chat(context: str = Form(...), question: str = Form(...)):
    try: 
        messages = [
            {"role": "system", "content": f"You must only answer using this context:\n{context}\n'"},
            {"role": "user", "content": question}
        ]
        
        data = await _post_json(CHAT_URL, {
            "model": "gemma3:4b", 
            "messages": messages,
            "stream": False
        })
        
        answer = data.get("message", {}).get("content") or data.get("response") or ""
        
        if not answer:
            logger.warning("No answer received from model")
            return {"answer": "No response from model"}
            
        logger.info(f"Answer generated: {answer[:100]}")
        return {"answer": answer}
        
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP error: {e.response.status_code} - {e.response.text}")
        return {"answer": f"Ollama error: {e.response.status_code}"}
    except httpx.ConnectError:
        logger.error("Cannot connect to Ollama")
        return {"answer": "Cannot connect to Ollama. Is it running?"}
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        return {"answer": f"Error: {str(e)}"}