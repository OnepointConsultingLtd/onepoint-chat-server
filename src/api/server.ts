import express, { RequestHandler } from "express";
import { getChatHistory } from "./handleApi";
import cors from "cors";
import path from "path";
import wkhtmltopdf from 'wkhtmltopdf';

/**
 * This is the server that will be used to fetch the chat history for a client ID
 */
const app = express();
app.use(express.json({ limit: '50mb' })); // Increased limit for HTML content
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

// PDF Export endpoint
app.post("/api/export/pdf", (async (req, res) => {
	try {
		const { htmlContent } = req.body;

		if (!htmlContent) {
			return res.status(400).json({ error: 'HTML content is required' });
		}

		// Configure PDF options - using only supported options
		const options = {
			pageSize: 'A4' as const,
			marginTop: '20mm',
			marginRight: '20mm',
			marginBottom: '20mm',
			marginLeft: '20mm',
			encoding: 'UTF-8',
			enableLocalFileAccess: true,
			enableJavascript: true,
			javascriptDelay: 1000,
			noStopSlowScripts: true,
			printMediaType: true
		};

		// Set response headers before generating PDF
		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader('Content-Disposition', 'attachment; filename=chat-history.pdf');

		// Generate PDF and pipe directly to response
		wkhtmltopdf(htmlContent, options).pipe(res);

	} catch (error) {
		console.error('Error generating PDF:', error);
		// Only send error response if headers haven't been sent
		if (!res.headersSent) {
			res.status(500).json({ error: 'Failed to generate PDF' });
		}
	}
}) as RequestHandler);

const PORT = process.env.REST_API_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
