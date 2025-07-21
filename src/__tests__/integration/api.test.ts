import dotenv from "dotenv";
// Load environment variables from .env.test if it exists
dotenv.config();

import { getContext } from "../../api";

describe.skip("getContext Integration Tests", () => {
  it("should successfully fetch context for a valid question", async () => {
    const question = "What are Onepoint's AI capabilities?";
    const result = await getContext(question);
    // Verify the result
    expect(result.success).toBeTruthy();
    console.log("This is the result: ", result);
  });
});
