
import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import HeartBackground from '@/components/HeartBackground';
import GradientButton from '@/components/GradientButton';
import VideoPlayer from '@/components/VideoPlayer';
import holidayImage from '@/assets/holiday_image.jpg';

const Index = () => {
  const [displayImage, setDisplayImage] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleButtonClick = () => {
    // Show the revealed image
    setDisplayImage(true);
    
    // Play sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => {
        console.error("Audio playback failed:", err);
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden pb-20">
      {/* Animated hearts background */}
      <HeartBackground />
      
      {/* Content container */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Header />
        
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 mt-8">
          <div className="flex flex-col gap-6">
            {/* Reveal section */}
            <div className="glass-panel p-6 w-full max-w-md mx-auto animate-scale-in">
              <h2 className="text-2xl font-comic mb-4 text-center text-holiday-darkPink">Holiday Surprise</h2>
              
              {/* Preview of the image with 30% opacity */}
              <div className="relative w-full mb-6">
                <img 
                  src={holidayImage} 
                  alt="Holiday preview" 
                  className="w-full h-auto rounded-lg object-contain max-h-[300px]"
                  style={{ opacity: displayImage ? 1 : 0.3 }}
                />
              </div>
              
              {/* Reveal button */}
              <div className="flex justify-center">
                <GradientButton
                  onClick={handleButtonClick}
                  className="animate-pulse"
                >
                  Reveal Holiday Surprise
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
