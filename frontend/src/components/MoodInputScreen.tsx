import React, { useState, FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Heart, Music, Star, Sparkles, Smile, Search, ArrowLeft } from "lucide-react";

interface MoodInputScreenProps {
  onBack: () => void;
}

export default function MoodInputScreen({ onBack }: MoodInputScreenProps) {
  const [mood, setMood] = useState("");
  const [thoughts, setThoughts] = useState("");
  const [language, setLanguage] = useState("english");
  const [customLanguage, setCustomLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [songUrl, setSongUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSongUrl(null);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood,
          thoughts,
          language: language === "other" ? customLanguage : language,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(data));
      setSongUrl(data.song);
    } catch (err) {
      console.error(err);
      setError("Could not fetch music. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    mood.trim() &&
    thoughts.trim() &&
    (language === "english" || language === "hindi" || (language === "other" && customLanguage.trim()));

  // Extract YouTube video ID to embed
  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/v=([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-200 via-pink-100 to-purple-200 flex flex-col items-center justify-start py-12 px-4">
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-10 relative flex flex-col gap-8">
        <Button
          variant="outline"
          onClick={onBack}
          className="absolute top-6 left-6 bg-white/60 backdrop-blur-sm border-pink-200 hover:bg-white/80 text-purple-600 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        <div className="text-center flex flex-col items-center gap-2">
          <Smile className="w-12 h-12 text-purple-600" />
          <h2 className="text-3xl font-bold text-purple-600">🎵 Share Your Mood!</h2>
          <p className="text-purple-700/80 text-lg text-center">
            Tell us how you feel and get the perfect YouTube song recommendations
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <Label>Mood</Label>
            <Input
              placeholder="e.g., happy, sad, energetic..."
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="bg-white/80 border-pink-200 focus:border-purple-300 rounded-2xl py-3 px-4"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Thoughts</Label>
            <Textarea
              placeholder="Share what’s on your mind"
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
              className="bg-white/80 border-pink-200 focus:border-purple-300 rounded-2xl py-3 px-4 resize-none"
              rows={4}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="bg-white/80 border-pink-200 rounded-2xl py-3 px-4">
                <SelectValue placeholder="Choose language" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 border-pink-200 rounded-2xl">
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {language === "other" && (
              <Input
                placeholder="Type your preferred language..."
                value={customLanguage}
                onChange={(e) => setCustomLanguage(e.target.value)}
                className="bg-white/80 border-pink-200 focus:border-purple-300 rounded-2xl py-3 px-4 mt-2"
              />
            )}
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <Button
            type="submit"
            disabled={!isFormValid || loading}
            className="bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full py-4 font-medium hover:scale-105 transition-transform disabled:opacity-50"
          >
            {loading ? "Finding your music..." : "Find My Music"} <Search className="w-5 h-5 ml-2 inline" />
          </Button>
        </form>

        {songUrl && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <h3 className="text-purple-600 font-bold text-xl">Your Song</h3>
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={getYouTubeEmbedUrl(songUrl) || ""}
                title="YouTube Song"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
