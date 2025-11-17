from fastapi import FastAPI
import requests

app = FastAPI()

@app.post("/chat")
async def chat(payload: dict):
    context = payload["context"]
    question = payload["question"]

    prompt = f"""You are a chatbot that can ONLY answer based on this context:

    {context}

    If the question is unrelated, say: 'I cannot answer that.'
    
    Question: {question}
    """

    response = requests.post(
        "http://localhost:11434/api/chat",
        json={"model": "gpt-oss", "messages": [{"role": "user", "content": prompt}]}
    )
    
    answer = response.json()["message"]["content"]
    return {"answer": answer}
