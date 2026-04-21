import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import "./logger";
import { connectRegistry, ensureOnepointSeedIfEmpty, refreshAllowedOriginsCache } from "./db/registry";
import { startWebSocketServer } from "./ws/server";

async function main() {
  await connectRegistry();
  await ensureOnepointSeedIfEmpty();
  await refreshAllowedOriginsCache();

  const port = parseInt(process.env.PORT || "5000", 10);

  console.log("Starting Onepoint Chat Server...");
  startWebSocketServer(port);
  console.log("Started Onepoint Chat Server (HTTP + WebSocket on one port).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
