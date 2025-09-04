import { Button } from "./ui/button";
import { Heart, Music, Star, Sparkles, Play } from "lucide-react";
import exampleImage from 'figma:asset/9d545445cdba9759eb3dd55e0bd5d14e229ff17f.png';
import exampleImage2 from 'figma:asset/ea555316b9296af713c2d90985b8797dc86f45e6.png';

export function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-purple-200 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Kawaii background pattern */}
      <div className="absolute inset-0 opacity-30">
        {/* Floating hearts */}
        <Heart className="absolute top-20 left-16 w-6 h-6 text-pink-400 animate-pulse" fill="currentColor" />
        <Heart className="absolute top-32 right-20 w-4 h-4 text-pink-300 animate-pulse delay-1000" fill="currentColor" />
        <Heart className="absolute bottom-40 left-20 w-5 h-5 text-pink-400 animate-pulse delay-500" fill="currentColor" />
        <Heart className="absolute bottom-60 right-32 w-6 h-6 text-pink-300 animate-pulse delay-1500" fill="currentColor" />
        
        {/* Floating stars */}
        <Star className="absolute top-40 left-32 w-5 h-5 text-purple-400 animate-spin-slow" fill="currentColor" />
        <Star className="absolute top-60 right-16 w-4 h-4 text-purple-300 animate-spin-slow delay-700" fill="currentColor" />
        <Star className="absolute bottom-32 left-40 w-6 h-6 text-purple-400 animate-spin-slow delay-300" fill="currentColor" />
        <Star className="absolute bottom-20 right-24 w-4 h-4 text-purple-300 animate-spin-slow delay-1200" fill="currentColor" />
        
        {/* Sparkles */}
        <Sparkles className="absolute top-28 left-1/2 w-5 h-5 text-pink-400 animate-pulse delay-200" />
        <Sparkles className="absolute bottom-28 right-1/3 w-4 h-4 text-purple-400 animate-pulse delay-800" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Cute welcome header with kawaii style */}
        <div className="mb-8">
          {/* Kawaii music icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center">
                <Music className="w-12 h-12 text-pink-500" />
              </div>
              {/* Cute blush effects */}
              <div className="absolute -left-2 top-6 w-3 h-3 bg-pink-300 rounded-full opacity-60"></div>
              <div className="absolute -right-2 top-6 w-3 h-3 bg-pink-300 rounded-full opacity-60"></div>
            </div>
          </div>

          {/* Welcome text in kawaii style */}
          <div className="mb-6">
            <h1 className="text-6xl text-pink-500 drop-shadow-sm mb-2 font-bold">
              Welcome
            </h1>
            <div className="flex justify-center items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-pink-400" fill="currentColor" />
              <span className="text-2xl text-purple-600 font-medium">to MusicFlow</span>
              <Heart className="w-5 h-5 text-pink-400" fill="currentColor" />
            </div>
          </div>

          <p className="text-lg text-purple-700/80 mb-8">
            Let's make some beautiful music together! ✨
          </p>
        </div>

        {/* Cute music illustration area */}
        <div className="mb-10">
          <div className="relative mx-auto w-64 h-64 bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-6 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-8 h-8 bg-pink-300 rounded-full"></div>
              <div className="absolute top-12 right-6 w-6 h-6 bg-purple-300 rounded-full"></div>
              <div className="absolute bottom-8 left-8 w-6 h-6 bg-pink-200 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-purple-200 rounded-full"></div>
            </div>
            
            {/* Main illustration - cute music player */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
              <div className="w-32 h-20 bg-gradient-to-b from-purple-300 to-purple-400 rounded-2xl shadow-lg mb-4 relative">
                {/* Screen */}
                <div className="absolute top-2 left-2 right-2 h-10 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg flex items-center justify-center">
                  <Music className="w-4 h-4 text-purple-600" />
                </div>
                {/* Controls */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
                  <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  </div>
                  <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                </div>
              </div>
              
              {/* Floating musical notes */}
              <div className="absolute top-6 left-6 animate-bounce">
                <Music className="w-4 h-4 text-pink-500" />
              </div>
              <div className="absolute top-8 right-8 animate-bounce delay-300">
                <Music className="w-3 h-3 text-purple-500" />
              </div>
              <div className="absolute bottom-12 left-12 animate-bounce delay-700">
                <Music className="w-4 h-4 text-pink-400" />
              </div>
              <div className="absolute bottom-16 right-6 animate-bounce delay-1000">
                <Music className="w-3 h-3 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Cute start button */}
        <div className="flex flex-col items-center">
          <Button
            onClick={onStart}
            size="lg"
            className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white border-0 py-6 px-10 rounded-full shadow-xl transform hover:scale-110 transition-all duration-300 font-medium"
          >
            <Play className="w-5 h-5 mr-3" fill="currentColor" />
            Let's Go! 
            <Sparkles className="w-4 h-4 ml-2" />
          </Button>
          <div className="flex items-center mt-4 gap-1">
            <Star className="w-4 h-4 text-purple-400" fill="currentColor" />
            <p className="text-purple-600/70 text-sm">Ready for a magical music adventure?</p>
            <Star className="w-4 h-4 text-pink-400" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Additional kawaii decorations */}
      <div className="absolute top-16 left-8">
        <div className="flex items-center gap-1">
          <Heart className="w-3 h-3 text-pink-400 animate-pulse" fill="currentColor" />
          <Heart className="w-4 h-4 text-pink-300 animate-pulse delay-300" fill="currentColor" />
          <Heart className="w-3 h-3 text-pink-400 animate-pulse delay-600" fill="currentColor" />
        </div>
      </div>
      
      <div className="absolute bottom-16 right-8">
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-purple-400 animate-pulse" fill="currentColor" />
          <Star className="w-4 h-4 text-purple-300 animate-pulse delay-400" fill="currentColor" />
          <Star className="w-3 h-3 text-purple-400 animate-pulse delay-800" fill="currentColor" />
        </div>
      </div>
    </div>
  );
}