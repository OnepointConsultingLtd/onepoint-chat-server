# API Module Structure

- **server.ts** — Express app, REST routes, static file serving
- **handleApi.ts** — MongoDB CRUD: chat history, conversations, delete
- **auth.ts** — Clerk token verification, CORS origin config
- **mongoClient.ts** — MongoDB connection singleton
