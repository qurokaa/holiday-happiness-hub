import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import HeartBackground from '@/components/HeartBackground';
import GradientButton from '@/components/GradientButton';
import VideoPlayer from '@/components/VideoPlayer';
import holidayImage from '@/assets/holiday_image.jpg';
import { Slider } from "@/components/ui/slider";

const Index = () => {
  const [message, setMessage] = useState<string>("");
  const [showFullImage, setShowFullImage] = useState<boolean>(false);
  const [imageTransparency, setImageTransparency] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  
  const fullMessage = "привет поздравляю тебя с восемь марта";
  
  const handleButtonClick = () => {
    // Show the full message directly
    setMessage(fullMessage);
    setShowFullImage(true);
    
    // Play sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => {
        console.error("Audio playback failed:", err);
      });
    }
    
    // Scroll to the bottom to see the celebratory image
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTransparencyChange = (value: number[]) => {
    setImageTransparency(value[0]);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Animated hearts background */}
      <HeartBackground />
      
      {/* Content container */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Header />
        
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 mt-8">
          <div className="flex flex-col gap-6">
            {/* Reveal section */}
            <div className="glass-panel p-6 w-full max-w-md mx-auto animate-scale-in">
              <h2 className="text-2xl font-comic mb-4 text-center text-holiday-darkPink">чотам?</h2>
              
              {/* Only show image when button is clicked */}
              {showFullImage && (
                <div className="relative w-full mb-6">
                  <img 
                    src={holidayImage} 
                    alt="Holiday preview" 
                    className="w-full h-auto rounded-lg object-contain max-h-[300px]"
                  />
                </div>
              )}
              
              {/* Transparency slider - we keep it for adjusting visibility of video */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">
                    Video Preview Transparency: {imageTransparency}%
                  </label>
                </div>
                <Slider
                  defaultValue={[imageTransparency]}
                  max={100}
                  step={1}
                  className="w-full"
                  onValueChange={handleTransparencyChange}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Transparent (0%)</span>
                  <span>Visible (100%)</span>
                </div>
              </div>
              
              {/* Reveal button */}
              <div className="flex justify-center">
                <GradientButton
                  onClick={handleButtonClick}
                  className="animate-pulse"
                >
                  нука нука нука чо еще есть
                </GradientButton>
              </div>
            </div>
          </div>
          
          {/* Video player with local video */}
          <VideoPlayer 
            src="/src/assets/holiday_video.mp4"
            poster={holidayImage}
            className="h-fit"
            style={{ opacity: imageTransparency / 100 }}
          />
        </div>
        
        {/* Message display - now in a single row with gradient background */}
        {message && (
          <div className="mt-16 py-12 text-center bg-gradient-to-b from-transparent to-black min-h-[200px] flex items-center justify-center">
            <p className="text-4xl font-comic animate-fade-in text-white">{message}</p>
          </div>
        )}
        
        {/* Bottom image that shows when message is displayed */}
        {showFullImage && (
          <div className="mt-8 p-8 bg-black text-white text-center min-h-[500px]" ref={bottomRef}>
            <h2 className="text-3xl mb-6 font-comic">С праздником!</h2>
            <img 
              src="https://source.unsplash.com/random/800x600/?celebration,flowers" 
              alt="Celebration" 
              className="mx-auto max-w-full h-auto rounded-lg shadow-2xl animate-fade-in"
            />
          </div>
        )}
      </div>
      
      {/* Hidden audio element for sound effect */}
      <audio ref={audioRef} className="hidden">
        <source src="https://assets.mixkit.co/sfx/preview/mixkit-christmas-bells-ringing-2976.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      {/* Bottom reference for scrolling */}
      <div ref={bottomRef} className="h-1"></div>
    </div>
  );
};

export default Index;
