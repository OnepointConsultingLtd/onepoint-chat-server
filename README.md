# Osca - The Onepoint's Smart Cognitive Assistant

Quick notes about the setup.

## Structure

- Frontend: `onepoint-chat-ui` directory
- Backend: root directory files

## Building and runing the project:

### Backend root level:

```bash
# nvm use v22.12.0
yarn
yarn run build
yarn run start
```

### Frontend:

```bash
cd ./onepoint-chat-ui
yarn
yarn run build || run_ui.ps1
```

## Servers

- Main Chat Server: Port 4000 (WebSocket server for chat functionality)
- History Server: Port 5000 (REST server for fetching chat history)
- You can also run the development server using vite during development time.

## Config Files

### Environment (.env.local)

```
# OpenAI Configuration

OPENAI_API_KEY=your_key
OPENAI_MODEL=gpt-4o-mini
INITIAL_PROVIDER=openai

# INITIAL_PROVIDER=gemini # uncomment this to use gemini
# GEMINI_API_KEY=<Gemini Key>
# GEMINI_MODEL=gemini-2.5-pro

# Server Settings
PORT=4000  # Main WebSocket server
REST_API_PORT=5000  # Chat history REST server

# RAG Configuration
PROMPT_FILE=config/prompts.toml
SLICE_SIZE=5

# Context API Settings
CONTEXT_API_URL=<AI engine address>
CONTEXT_API_KEY=<your_key>

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=onepoint-agent-db
COLLECTION_NAME=conversations
```

### UI Config

Main UI settings are in `onepoint-chat-ui/public/index.html`:

## Database Notes

MongoDB setup:

- Connection string goes in .env.local
- Stores all chat conversations
- Keeps track of conversation IDs
- Handles message history

## Starting Up

1. Set up .env.local with all required credentials
2. Start main server on port 4000 (WebSocket)
3. Start history server on port 5000 (REST)
4. UI code is in onepoint-chat-ui

## Remember

- Don't commit .env.local
- UI is React-based
- Keep all credentials in .env.local only
- Frontend-backend communication:
  - WebSocket on port 4000 for chat
  - REST on port 5000 for history

## Troubleshooting

When it breaks:

1. Check .env.local
2. Verify MongoDB connection
3. Check if both ports (4000 and 5000) are free
4. Verify both servers are running
