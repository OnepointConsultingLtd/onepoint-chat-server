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

- **Single Node process** listens on **`PORT`** (default **5000**): Express serves REST, static UI, and WebSocket upgrades at path **`/ws`**.
- You can also run the chat UI with Vite during development (`onepoint-chat-ui`).

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
PORT=5000  # HTTP + WebSocket (chat WS path: /ws)

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

1. Set up `.env.local` with all required credentials
2. `yarn build && yarn start` at repo root (server on `PORT`, default 5000)
3. UI code is in `onepoint-chat-ui` (embed or Vite dev against the same `PORT`)

## Remember

- Don't commit `.env.local`
- UI is React-based
- Keep all credentials in `.env.local` only
- Frontend-backend communication: **same origin/port** — REST under `/api/...`, chat WebSocket at **`/ws?token=...`**

## Troubleshooting

When it breaks:

1. Check `.env.local`
2. Verify MongoDB connection
3. Check **`PORT`** is free
4. Verify the Node server is running
