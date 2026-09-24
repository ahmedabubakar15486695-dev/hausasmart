require("dotenv").config();

const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});

app.use("/api/", apiLimiter);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    app: "HausaSmart",
    message: "HausaSmart server is running"
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: "Please enter a message."
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "OPENAI_API_KEY is not configured."
      });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.6-luna",
instructions:
    
          "You are HausaSmart AI. Reply in simple, respectful Hausa when the user writes Hausa. If the user writes English, reply in clear English or Hausa as appropriate. Help with CVs, jobs, social media, translation, learning skills and everyday questions. Never invent job vacancies, companies or facts. Be helpful and concise.",
        input: message.trim()
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: data.error?.message || "AI request failed."
      });
    }

    const answer =
      data.output_text ||
      data.output?.flatMap(item => item.content || [])
        ?.filter(item => item.type === "output_text")
        ?.map(item => item.text)
        ?.join("") ||
      "Ban samu amsa ba.";

    res.json({
      success: true,
      answer
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "An samu matsala wajen haɗa HausaSmart AI."
    });
  }
});

app.listen(PORT, () => {
  console.log(`HausaSmart running on port ${PORT}`);
});
