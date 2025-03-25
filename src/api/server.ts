import express, { RequestHandler } from "express";
import { getChatHistory } from "./handleApi";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Get chat history for a client ID
app.get("/api/chat/:clientId", (async (req, res) => {
	try {
		const { clientId } = req.params;
		console.log("Fetching chat history for client ID:", clientId);
		const history = await getChatHistory(clientId);
		res.json(history);
	} catch (error) {
		console.error("Error fetching chat history:", error);
		res.status(500).json({ error: "Failed to fetch chat history" });
	}
}) as RequestHandler);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
