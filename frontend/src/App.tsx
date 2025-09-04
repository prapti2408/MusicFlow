import React from "react";
import { useState } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import MoodInputScreen from "./components/MoodInputScreen";


type AppState = "welcome" | "mood-input" | "recommendations";

interface RecommendationData {
  mood: string;
  thoughts: string;
  language: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("welcome" as AppState);
  const [recommendationData, setRecommendationData] = useState(null as RecommendationData | null);

  const handleStart = () => {
    setCurrentScreen("mood-input");
  };

  const handleBackToWelcome = () => {
    setCurrentScreen("welcome");
    setRecommendationData(null);
  };

  const handleBackToMoodInput = () => {
    setCurrentScreen("mood-input");
  };

  const handleGetRecommendations = (mood: string, thoughts: string, language: string) => {
    setRecommendationData({ mood, thoughts, language });
    setCurrentScreen("recommendations");
  };

  if (currentScreen === "welcome") {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (currentScreen === "mood-input") {
    return (
      <MoodInputScreen 
        onBack={handleBackToWelcome}
        onGetRecommendations={handleGetRecommendations}
      />
    );
  }

  // Recommendations screen - placeholder for now
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-purple-200 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-20">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl">
            <h2 className="text-3xl font-bold text-purple-600 mb-4">
              🎵 Your Personalized Recommendations! ✨
            </h2>
            <div className="bg-pink-50 rounded-2xl p-6 mb-6">
              <p className="text-purple-700"><strong>Mood:</strong> {recommendationData?.mood}</p>
              <p className="text-purple-700 mt-2"><strong>Language:</strong> {recommendationData?.language}</p>
              <p className="text-purple-700 mt-2"><strong>What's on your mind:</strong> {recommendationData?.thoughts}</p>
            </div>
            <p className="text-purple-600 mb-8">
              Based on your mood and thoughts, here's where your YouTube music recommendations would appear! 
              Your backend integration will generate personalized songs here.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={handleBackToMoodInput}
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform"
              >
                🔄 Try Another Mood
              </button>
              <button 
                onClick={handleBackToWelcome}
                className="bg-white/80 text-purple-600 px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform border border-purple-200"
              >
                🏠 Back Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}