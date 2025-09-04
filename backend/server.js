import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { Groq } from "groq-sdk";
import fetch from "node-fetch";
import dotenv from "dotenv";

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
app.use(cors());
app.use(bodyParser.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

console.log("✅ GROQ_API_KEY loaded:", !!process.env.GROQ_API_KEY);
console.log("✅ YOUTUBE_API_KEY loaded:", !!process.env.YOUTUBE_API_KEY);

// 🔍 Helper: Search YouTube Music
async function searchYouTubeMusic(query) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
      query
    )}&key=${process.env.YOUTUBE_API_KEY}`
  );
  const data = await response.json();

  if (data.items && data.items.length > 0) {
    const video = data.items[0];
    return `https://www.youtube.com/watch?v=${video.id.videoId}`;
  }

  // fallback → lofi beats live stream
  return "https://www.youtube.com/watch?v=5qap5aO4i9A";
}

// ✅ Endpoint: Mood → YouTube Music
app.post("/mood", async (req, res) => {
  try {
    const { thoughts, mood, language } = req.body;

    console.log("📩 Incoming request:", req.body);

    // 1. Send user thoughts to Groq
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are a music mood classifier. 
          Given the user's thoughts, return JSON with:
          - mood (1 word, lowercase)
          - keywords (2-3 words array)
          - genre (music style)
          - search (a music search query)
          -search (a concise search query for YouTube songs, avoid live/lofi/non-stop mixes)
          The search must return specific songs, not continuous live streams.`,
        },
        {
          role: "user",
          content: thoughts,
        },
      ],
    });

    const aiReply = completion.choices[0].message.content;
    console.log("🤖 Groq raw:", aiReply);

    let moodData;
    try {
      moodData = JSON.parse(aiReply);
    } catch {
      // fallback if Groq response is not JSON
      moodData = {
        mood: mood || "chill",
        keywords: ["music"],
        genre: "pop",
        search: "popular songs",
      };
    }

    // 2. Add language to search query
    let searchQuery = moodData.search;
    if (language && language !== "other") {
      searchQuery += ` ${language} songs`;
    }

    // 3. Search YouTube
    const songUrl = await searchYouTubeMusic(searchQuery);

    // 4. Return response
    res.json({
      input: thoughts,
      mood: moodData.mood,
      keywords: moodData.keywords,
      genre: moodData.genre,
      language,
      searchQuery,
      song: songUrl,
    });
  } catch (err) {
    console.error("❌ Error in /mood:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("🎵 Welcome to the Music Mood Backend!");
});

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Music Mood Backend running at http://localhost:${PORT}`)
);
