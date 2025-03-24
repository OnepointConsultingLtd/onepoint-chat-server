import express from "express";

const app = express();
app.use(express.json());

// TODO:
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
