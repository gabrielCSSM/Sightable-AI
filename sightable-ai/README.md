Docker commands:

To serve the database: cd ".\docker\database" | docker compose up
To serve the api: uvicorn app.ai_process.apiV2:app --reload --host 0.0.0.0 --port 8088