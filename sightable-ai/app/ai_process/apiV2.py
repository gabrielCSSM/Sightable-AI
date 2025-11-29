from fastapi import FastAPI, Request, UploadFile, File, Form, HTTPException, status
import base64
import httpx

app = FastAPI()

OLLAMA_URL = "http://localhost:11434/api/generate"
CHAT_URL = "http://localhost:11434/api/chat"


def encode_file(file_bytes):
    return base64.b64encode(file_bytes).decode("utf-8")


async def _post_json(url: str, payload: dict):
    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            resp = await client.post(url, json=payload)
        except httpx.RequestError as e:
            raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(e))
        if resp.status_code >= 400:
            raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=f"{url} returned {resp.status_code}: {resp.text}")
        try:
            return resp.json()
        except ValueError:
            raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Invalid JSON from external service")

@app.post("/notes")
async def notes(request: Request):
    text = await request.body()
    targetLang = "Spanish"
    prompt = f"""SYSTEM INSTRUCTIONS — STRICT:
            You are a bullet-point summarization engine.  
            You MUST obey the following rules without exception:

    1. You can ONLY produce bullet-point key-point summaries of the text provided by the user.  
    2. You MUST NOT:   
        - answer questions  
        - expand  
        - analyze  
        - comment  
        - rewrite  
        - infer missing information  
        - output paragraphs or non-bullet formats
        - offer anything   
    3. Every response MUST be formatted strictly as:
        • Key point 1  
        • Key point 2  
        • Key point 3  
        (etc.)

    OUTPUT LANGUAGE:
    All outputs MUST be in **{targetLang}** only.
    The output must be in JSON format.
    
    YOUR TEXT IS: {text}"""

    data = await _post_json(OLLAMA_URL, {"model": "gemma3:4b", "prompt": prompt, "stream": False})
    return {"summary": data.get("response")}

@app.post("/summarizer")
async def summarizer(request: Request):
    text = await request.body()
    targetLang = "Dutch"
    prompt = f"""SYSTEM INSTRUCTIONS — NON-NEGOTIABLE:
        You are a strict summarization engine. You MUST obey the following rules with zero exceptions:

        1. You can ONLY summarize the text the user provides.  
        2. You may NOT perform any of these actions:  
            - answer questions  
            - explain  
            - translate  
            - classify  
            - comment  
            - rewrite  
            - continue text  
            - generate new content  
            - expand upon ideas  
        3. If the user requests anything other than a summary, you MUST reply with a refusal message in the target language.

        OUTPUT REQUIREMENT:
        All your summaries and refusals MUST be written in Spanish only.
        The output must be in JSON format. Following the structure 
        Greeting: Where the greeting will go, 
        Content: Where the Information will go and 
        Farewell: Where the rest will go.
        YOU MUST FOLLOW THE OUTPUT TEMPLATE

        YOUR TEXT IS: {text}"""

    data = await _post_json(OLLAMA_URL, {"model": "gemma3:4b", "prompt": prompt, "stream": False})
    return {"summary": data.get("response")}


# GTP OSS

@app.post("/chat")
async def chat(context: str = Form(...), question: str = Form(...)):
    messages = [
        {"role": "system", "content": f"You may only answer using this context:\n{context}\nIf the question is unrelated, reply: 'I cannot answer that.'"},
        {"role": "user", "content": question}
    ]

    data = await _post_json(CHAT_URL, {"model": "gpt-oss", "messages": messages})
    # try common response shapes
    answer = data.get("message", {}).get("content") or data.get("response") or ""
    return {"answer": answer}


@app.post("/process")
async def process(file: UploadFile = File(...), question: str = Form(...)):
    content = await file.read()
    encoded = encode_file(content)

    extract_payload = {"model": "gemma3:4b", "prompt": "Extract all text from this document.", "images": [encoded], "stream": False}
    extract_data = await _post_json(OLLAMA_URL, extract_payload)
    extracted_text = extract_data.get("response", "")

    summary_prompt = f"Summarize the following text:\n\n{extracted_text}"
    summary_data = await _post_json(OLLAMA_URL, {"model": "gemma3:4b", "prompt": summary_prompt, "stream": False})
    summary = summary_data.get("response", "")

    messages = [
        {"role": "system", "content": "You can ONLY answer using the provided context. If unrelated, say 'I cannot answer that.'\n\n" f"Context:\n{summary}"},
        {"role": "user", "content": question}
    ]

    chat_data = await _post_json(CHAT_URL, {"model": "gpt-oss", "messages": messages})
    answer = chat_data.get("message", {}).get("content") or chat_data.get("response", "")

    return {"extracted_text": extracted_text, "summary": summary, "answer": answer}