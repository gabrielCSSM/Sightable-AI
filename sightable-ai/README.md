# Project Setup Guide

This guide will walk you through the complete setup process for this project.

## Prerequisites

- Docker and Docker Compose
- Node.js and npm
- Python with pip
- Ollama

## Installation Steps

### 1. Clone the Repository

First, clone this repository to your local machine:

```bash
git clone https://github.com/gabrielCSSM/Sightable-AI.git
cd sightable-ai
```

### 2. Set Up Docker Database

In the project root directory, you'll find two files: `docker-compose.yaml` and `createDB.sql`.

Start the Docker container:

```bash
docker compose up
```

Once the container is running, navigate to `localhost:8080` in your browser and log in using the credentials provided in the `docker-compose.yaml` file (note: storing credentials in docker-compose is not a best practice).

After logging in, copy and paste the script from `createDB.sql` to create the database structure.

### 3. Create Environment File

Create an environment configuration file in the project root directory.

### 4. Install Node.js Dependencies

Install all Node.js dependencies:

```bash
npm install
```

### 5. Set Up Python Virtual Environment

Open a new terminal and activate the Python virtual environment:

```bash
venv\Scripts\activate
```

Once activated, install the Python dependencies:

```bash
pip install -r requirements.txt
```

### 6. Set Up AI Model

Open Command Prompt (cmd) and run the Ollama AI model:

```bash
ollama run gemma3:4b
```

This will download and prepare the AI model for use.

### 7. Start the Application

You need to run two services simultaneously:

**Terminal 1** - Start the main project:
```bash
npm run dev
```

**Terminal 2** - Start the FastAPI server (with venv activated):
```bash
cd app\ai_process
fastapi dev api_sightable.py
```

## You're All Set!

The application should now be running and ready to use.

## Project Structure

- Root directory contains Docker configuration and database setup
- Node.js application serves the main project
- Python FastAPI application in `app\ai_process` handles AI processing

## Notes

- Make sure all services are running before using the application
- Keep the Docker container, npm dev server, and FastAPI server running during development
- The AI model needs to be running for AI-related features to work