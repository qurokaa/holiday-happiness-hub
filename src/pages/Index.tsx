
import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import HeartBackground from '@/components/HeartBackground';
import GradientButton from '@/components/GradientButton';
import VideoPlayer from '@/components/VideoPlayer';
import holidayImage from '@/assets/holiday_image.jpg';
import { Slider } from "@/components/ui/slider";

const Index = () => {
  const [displayImage, setDisplayImage] = useState<boolean>(false);
  const [imageTransparency, setImageTransparency] = useState<number>(0); // Initially at zero
  const [messageWords, setMessageWords] = useState<string[]>([]); 
  const audioRef = useRef<HTMLAudioElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  
  const fullMessage = "привет поздравляю тебя с восемь марта".split(" ");
  
  const handleButtonClick = () => {
    // Show the revealed image
    setDisplayImage(true);
    
    // Add the next word to the message if not all words have been added
    if (messageWords.length < fullMessage.length) {
      setMessageWords(prev => [...prev, fullMessage[prev.length]]);
    }
    
    // Play sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => {
        console.error("Audio playback failed:", err);
      });
    }
    
    // Scroll to the bottom to see the darkening effect
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTransparencyChange = (value: number[]) => {
    setImageTransparency(value[0]);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden pb-20">
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
              
              {/* Preview of the image with adjustable opacity */}
              <div className="relative w-full mb-6">
                <img 
                  src={holidayImage} 
                  alt="Holiday preview" 
                  className="w-full h-auto rounded-lg object-contain max-h-[300px]"
                  style={{ opacity: displayImage ? 1 : imageTransparency / 100 }}
                />
              </div>
              
              {/* Transparency slider */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">
                    Image Preview Transparency: {imageTransparency}%
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
          />
        </div>
        
        {/* Progressive darkening sections with message words */}
        <div className="mt-16 relative z-10">
          {messageWords.map((word, index) => {
            const darkness = (index / fullMessage.length) * 0.85; // Calculate darkness level (max 85% dark)
            return (
              <div 
                key={index}
                className="py-16 text-center transition-all duration-500"
                style={{ 
                  backgroundColor: `rgba(0, 0, 0, ${darkness})`,
                  color: darkness > 0.5 ? 'white' : 'black',
                }}
              >
                <p className="text-4xl font-comic animate-fade-in">{word}</p>
              </div>
            );
          })}
        </div>
        
        {/* Bottom image that shows when all words are revealed */}
        {messageWords.length === fullMessage.length && (
          <div className="mt-8 p-8 bg-black text-white text-center" ref={bottomRef}>
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
