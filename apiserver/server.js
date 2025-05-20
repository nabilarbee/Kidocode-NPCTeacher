const app = require("express")();          // Create an Express application
const bodyParser = require("body-parser"); // Middleware to parse JSON request bodies
const fetch = require("node-fetch");       // Enables fetch API in Node.js
const fs = require("fs");                  // File system module (not used but included)

const PORT = 8080; // Define the port for the server to listen on

// Ensure fetch API is available globally for compatibility
globalThis.fetch = fetch;
globalThis.Headers = fetch.Headers;
globalThis.Request = fetch.Request;
globalThis.Response = fetch.Response;

app.use(bodyParser.json());  // Enable JSON request parsing for incoming requests

// Import the Google Generative AI SDK
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold
} = require("@google/generative-ai");

// Retrieve the API key from environment variables (must be set in .env)
const apikey = process.env.API_KEY;
const genai = new GoogleGenerativeAI(apikey);

// Configuration for AI response generation
const generationconfig = {
  temperature: 0,    // Lower value = more deterministic responses
  topP: 0.95,        // Controls randomness
  topK: 64,          // Limits possible responses to the top 64 choices
  responseMimeType: "text/plain" // Ensures response is returned as plain text
};

// Function to process chat requests using Gemini AI
async function run(prompt, history) {
  try {
    // Initialize the AI model with specific instructions and constraints
    const model = genai.getGenerativeModel({
      model: "gemini-2.0-flash-exp", // Fast version of Gemini 2.0 for quick responses
      systemInstruction: `You are a kind, fun, and family-friendly tutor at Kidocode.
Generate ONE multiple-choice question (with 4 options, labeled A to D) and indicate the correct answer.
The question MUST be chosen from one of the following topics with strict equal probability: HTML, Python, or Mathematics.
Generate for all 3 topics, but only randomly display one of them.
The question should be appropriate for children aged 10–17 years old.
Detailed Topic Guidelines:

-   **HTML:**
    -   Structure of a basic HTML document.
    -   Common tags for text formatting.
    -   Tags for lists.
    -   Image tags.
    -   Table tags.
    -   Form elements.
    -   Attributes.

-   **Python:**
    -   Variables and data types (integers, floats, strings, booleans, lists, tuples, dictionaries).
    -   Operators (arithmetic, comparison, logical).
    -   Control flow (if/elif/else statements, for and while loops).
    -   Functions (defining and calling).
    -   String manipulation (slicing, methods).
    -   List operations (indexing, slicing, methods).
    -   Basic input and output.

-   **Mathematics:**
    -   Number operations (addition, subtraction, multiplication, division, exponents, order of operations).
    -   Fractions, decimals, percentages.
    -   Basic algebra (solving linear equations, ratios, proportions).
    -   Geometry (area, perimeter, volume of simple shapes).
    -   Measurement units.
    -   Word problems applying mathematical concepts.

ONLY when asking the output of a code, include the code in the question as raw text and DO NOT use a code block or canvas. Also include the code all within the same line of the question DO NOT MAKE A NEW LINE FOR CODE.

Use the following format exactly:

Topic: [Your topic here]
Question: [Your question here]
A. [Option A]
B. [Option B]
C. [Option C]
D. [Option D]
Answer: [Write the correct Option's full answer WITHOUT the option's letter!]`
    });

    // Start a chat session with the AI model, providing chat history
    const chatSession = model.startChat({
      generationconfig, // Apply the predefined AI settings
      history: history, // Include past conversation history
    });

    // Send the user's prompt (message) to the AI and await a response
    const result = await chatSession.sendMessage(prompt);
    // Add this inside your 'run' function before returning the response
    const text = result.response.text();

    // Example raw response expected:
    // Topic: Mathematics
    // Question: What is 2+2?
    // A. 3
    // B. 4
    // C. 5
    // D. 6
    // Answer: 4

    const lines = text.trim().split("\n");

    const topicLine = lines.find(l => l.startsWith("Topic:")) || "";
    const questionLine = lines.find(l => l.startsWith("Question:")) || "";
    const answerLine = lines.find(l => l.startsWith("Answer:")) || "";

    const qstn = topicLine.replace("Topic:", "").trim();
    const qstnDesc = questionLine.replace("Question:", "").trim();
    const correctans = answerLine.replace("Answer:", "").trim();
    
    const answers = lines.filter(l => /^[A-D]\./.test(l)).map(l => l.slice(3).trim());


    

    return {
      Response: true,
      Data: {
        qstn,
        qstnDesc,
        answers,
        correctans
      }
    };


    // Return the AI's response in a structured format
    return { Response: true, Text: result.response.text() };
  } catch (error) {
    console.error("Error processing chat request:", error); // Log the error
    return { Response: false }; // Return failure response
  }
}

// New route to serve AI-generated questions
app.get("/api/question", async (req, res) => {
  const prompt = "Generate a question.";
  const history = [];

  try {
    const result = await run(prompt, history);
    res.json(result.Data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate question." });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
