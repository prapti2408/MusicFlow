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

// 🔍 Mood → Genre mapping (fallback if Groq fails)
const moodGenreMap = {
  happy: "upbeat pop songs",
  sad: "acoustic emotional songs",
  angry: "rock or metal songs",
  energetic: "edm dance tracks",
  relaxed: "lofi chill beats",
  romantic: "love ballads",
  focused: "instrumental study music",
};

// 🔍 YouTube Search Helper (returns a random video from top 5)
async function searchYouTubeMusic(query) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(
      query
    )}&key=${process.env.YOUTUBE_API_KEY}`
  );
  const data = await response.json();

  if (data.items && data.items.length > 0) {
    const video = data.items[Math.floor(Math.random() * data.items.length)];
    return `https://www.youtube.com/watch?v=${video.id.videoId}`;
  }

  // fallback → lofi beats
  return "https://www.youtube.com/watch?v=5qap5aO4i9A";
}

// ✅ Endpoint: Mood → YouTube Music
app.post("/mood", async (req, res) => {
  try {
    const { thoughts, mood, language } = req.body;

    console.log("📩 Incoming request:", req.body);

    // 1. Ask Groq to classify mood
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are a music mood classifier. 
          Given the user's thoughts, return ONLY valid JSON like this:
          {
            "mood": "happy",
            "genre": "pop",
            "search": "happy pop songs"
          }
          Rules:
          - mood must be 1 lowercase word.
          - genre must be a real music genre.
          - search must include specific songs/artists (avoid "live/lofi/24x7").
          - focus on single songs, not nonstop mixes.`,
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
      // fallback if Groq fails
      const fallbackMood = mood || "relaxed";
      moodData = {
        mood: fallbackMood,
        genre: moodGenreMap[fallbackMood] || "pop",
        search: moodGenreMap[fallbackMood] || "popular songs",
      };
    }

    // 2. Add language filter
    let searchQuery = moodData.search;
    if (language && language !== "other") {
      searchQuery += ` ${language} songs`;
    }

    // 3. Search YouTube
    const songUrl = await searchYouTubeMusic(searchQuery);

    // 4. Send response
    res.json({
      input: thoughts,
      mood: moodData.mood,
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
