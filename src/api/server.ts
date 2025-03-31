import express, { RequestHandler } from "express";
import { getChatHistory } from "./handleApi";
import cors from "cors";

/**
 * This is the server that will be used to fetch the chat history for a client ID
 */
const app = express();
app.use(express.json());
app.use(cors());

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

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
