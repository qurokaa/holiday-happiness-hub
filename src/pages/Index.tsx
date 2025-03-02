
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
  const [wordIndex, setWordIndex] = useState<number>(-1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  
  const fullMessage = "привет поздравляю тебя с восемь марта";
  const messageWords = fullMessage.split(" ");
  
  const handleButtonClick = () => {
    // Update word index to reveal words one at a time
    setWordIndex(prev => {
      const nextIndex = prev + 1;
      if (nextIndex >= messageWords.length) return prev;
      return nextIndex;
    });
    
    // Show the image when first clicked
    if (!showFullImage) {
      setShowFullImage(true);
    }
    
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

  // Update message when word index changes
  useEffect(() => {
    if (wordIndex >= 0) {
      const displayedMessage = messageWords.slice(0, wordIndex + 1).join(" ");
      setMessage(displayedMessage);
    }
  }, [wordIndex, messageWords]);

  const handleTransparencyChange = (value: number[]) => {
    setImageTransparency(value[0]);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-b from-holiday-pink to-holiday-white">
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
              
              {/* Transparency slider - for video transparency */}
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
          <div className="h-fit" style={{ opacity: imageTransparency / 100 }}>
            <VideoPlayer 
              src="/src/assets/holiday_video.mp4"
              poster={holidayImage}
              className="h-fit"
            />
          </div>
        </div>
        
        {/* Message display */}
        {message && (
          <div className="mt-16 py-12 text-center min-h-[200px] flex items-center justify-center">
            <p className="text-4xl font-comic animate-fade-in text-holiday-darkPink">{message}</p>
          </div>
        )}
      </div>
      
      {/* Empty divs to make the page longer */}
      <div className="h-[300px]"></div>
      <div className="h-[300px]"></div>
      <div className="h-[300px]"></div>
      
      {/* Gradient section with photo at the bottom */}
      <div className="w-full bg-gradient-to-b from-transparent to-black py-16 mt-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-comic mb-10 text-white">С праздником!</h2>
          <img 
            src="https://images.unsplash.com/photo-1472396961693-142e6e269027" 
            alt="Celebration" 
            className="mx-auto max-w-full h-auto rounded-lg shadow-2xl animate-fade-in mb-16"
            ref={bottomRef}
          />
        </div>
      </div>
      
      {/* Hidden audio element for sound effect */}
      <audio ref={audioRef} className="hidden">
        <source src="https://assets.mixkit.co/sfx/preview/mixkit-christmas-bells-ringing-2976.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Index;
