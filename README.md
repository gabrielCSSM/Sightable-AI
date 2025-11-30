# :eye: Sigthable Setup Guide

A comprehensive guide to get you up and running with this full-stack application featuring Docker, Node.js, Python, and AI capabilities.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Docker** and **Docker Compose** - [Install Docker](https://docs.docker.com/get-docker/)
- **Node.js** (v16 or higher) and **npm** - [Install Node.js](https://nodejs.org/)
- **Python** (v3.8 or higher) and **pip** - [Install Python](https://www.python.org/downloads/)
- **Ollama** - [Install Ollama](https://ollama.ai/)
- **Git** - [Install Git](https://git-scm.com/downloads)

## 🛠️ Installation Steps

### Step 1: Clone the Repository

```bash
git clone https://github.com/gabrielCSSM/Sightable-AI.git
cd sightable-ai
```

### Step 2: Database Setup with Docker

The project root contains two essential files:
- `docker-compose.yaml` - Docker configuration
- `createDB.sql` - Database initialization script

**Launch the Docker container:**

```bash
docker compose up
```

> ⏳ Wait for the container to fully start before proceeding.

**Initialize the database:**

1. Navigate to `http://localhost:8080` in your browser
2. Log in using the credentials found in `docker-compose.yaml`
   - ⚠️ **Note:** Credentials in docker-compose files are not recommended for production
3. Copy the entire content of `createDB.sql`
4. Paste and execute it in the database management interface

### Step 3: Environment Configuration

Create a `.env` file in the project root directory with your environment variables.

```bash
# Example .env structure (adjust as needed)
DATABASE_URL=your_url
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000/
NEXT_PUBLIC_URL=http://localhost:3000/
NEXT_PUBLIC_AI_URL=http://localhost:8000/
```

### Step 4: Install Node.js Dependencies

Install all required Node.js packages:

```bash
npm install
```

### Step 5: Python Virtual Environment Setup

**Create and activate the virtual environment:**

```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

**Install Python dependencies:**

```bash
pip install -r requirements.txt
```

> 💡 Your terminal prompt should change to indicate the virtual environment is active (e.g., `(venv)`).

### Step 6: AI Model Setup

Download and initialize the Gemma AI model using Ollama:

```bash
ollama run gemma3:4b
```

> 📥 First-time setup will download the model (~3.5GB). This may take a few minutes depending on your internet connection.

### Step 7: Launch the Application

You'll need **three separate terminal windows** running simultaneously:

#### Terminal 1: Docker Container
```bash
docker compose up
```
*Keep this running to maintain database connectivity*

#### Terminal 2: Node.js Development Server
```bash
npm run dev
```
*This serves the main application frontend and backend*

#### Terminal 3: FastAPI AI Service

```bash
# Activate virtual environment first
venv\Scripts\activate

# Navigate to AI service directory
cd app\ai_process

# Start FastAPI server
fastapi dev api_sightable.py
```

## ✅ Verification

Once all services are running, you should see:

- **Frontend/Backend:** Running on `http://localhost:3000` (or specified port)
- **Database UI:** Available at `http://localhost:8080`
- **FastAPI Docs:** Accessible at `http://localhost:8000/docs`

## 📁 Project Structure

```
project-root/
├── app/
│   └── ai_process/
│       └── api_sightable.py    # FastAPI AI service
├── venv/                        # Python virtual environment
├── docker-compose.yaml          # Docker configuration
├── createDB.sql                 # Database schema
├── requirements.txt             # Python dependencies
├── package.json                 # Node.js dependencies
└── .env                         # Environment variables
```

## 🔧 Troubleshooting

### Docker Issues
- Ensure Docker Desktop is running

### Virtual Environment Issues
- On Windows, you may need to enable script execution: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### AI Model Issues
- Verify Ollama is installed: `ollama --version`
- Check available models: `ollama list`

## 🎯 Development Workflow

1. Start Docker container for database
2. Activate Python virtual environment
3. Run `npm run dev` for frontend/backend
4. Run FastAPI server for AI features
5. Begin development with all services hot-reloading

## 📝 Important Notes

- **All services must be running** for full functionality
- **Keep terminals open** during development
- **Database persistence** is handled by Docker volumes
- **Hot reload** is enabled for both Node.js and FastAPI servers