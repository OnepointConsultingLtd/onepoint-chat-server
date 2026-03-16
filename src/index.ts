import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import "./logger";
import "./api/server";
import { startWebSocketServer } from "./ws/server";

const WS_PORT = parseInt(process.env.PORT || "4000", 10);

console.log("Starting Onepoint Chat Server...");
startWebSocketServer(WS_PORT);
console.log("Started Onepoint Chat Server.");
