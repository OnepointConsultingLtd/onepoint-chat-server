import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import "./logger";
import { startWebSocketServer } from "./ws/server";

const port = parseInt(process.env.PORT || "5000", 10);

console.log("Starting Onepoint Chat Server...");
startWebSocketServer(port);
console.log("Started Onepoint Chat Server.");
