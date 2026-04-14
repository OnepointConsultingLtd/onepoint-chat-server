import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import "./logger";
import { connectRegistry, ensureOnepointSeedIfEmpty, refreshAllowedOriginsCache } from "./db/registry";
import app from "./api/server";
import { startWebSocketServer } from "./ws/server";

async function main() {
  await connectRegistry();
  await ensureOnepointSeedIfEmpty();
  await refreshAllowedOriginsCache();

  const REST_PORT = parseInt(process.env.REST_API_PORT || "5000", 10);
  const WS_PORT = parseInt(process.env.PORT || "4000", 10);

  console.log("Starting Onepoint Chat Server...");
  app.listen(REST_PORT, () => console.log(`REST API listening on port ${REST_PORT}`));
  startWebSocketServer(WS_PORT);
  console.log("Started Onepoint Chat Server.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
