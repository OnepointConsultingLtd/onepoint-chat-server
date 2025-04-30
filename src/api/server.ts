import express, { RequestHandler } from "express";
import { getChatHistory } from "./handleApi";
import cors from "cors";
import path from "path";

/**
 * This is the server that will be used to fetch the chat history for a client ID
 */
const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from the dist directory
const static_files_path = path.join(__dirname, '../../onepoint-chat-ui/dist');
app.use(express.static(static_files_path));
console.log(`Serving static files from ${static_files_path}`);

app.get("/api/chat/:conversationId", (async (req, res) => {
	try {
		const { conversationId } = req.params;
		const history = await getChatHistory(conversationId);
		res.json(history);
	} catch (error) {
		console.error("Error fetching chat history:", error);
		res.status(500).json({ error: "Failed to fetch chat history" });
	}
}) as RequestHandler);

const PORT = process.env.REST_API_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
