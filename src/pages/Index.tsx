
import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import HeartBackground from '@/components/HeartBackground';
import ImageUploader from '@/components/ImageUploader';
import GradientButton from '@/components/GradientButton';
import VideoPlayer from '@/components/VideoPlayer';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [transparency, setTransparency] = useState(100);
  const [displayImage, setDisplayImage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleButtonClick = () => {
    // Show the revealed image
    setDisplayImage(uploadedImage);
    
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
            {/* Image uploader with transparency slider */}
            <ImageUploader 
              onImageChange={setUploadedImage}
              transparency={transparency}
              onTransparencyChange={setTransparency}
            />
            
            {/* Reveal button */}
            <div className="flex justify-center">
              <GradientButton
                onClick={handleButtonClick}
                className="animate-pulse"
              >
                Reveal Holiday Surprise
              </GradientButton>
            </div>
            
            {/* Display revealed image */}
            {displayImage && (
              <div className="glass-panel p-4 overflow-hidden animate-scale-in">
                <img
                  src={displayImage}
                  alt="Revealed image"
                  className="w-full h-auto rounded-lg object-contain max-h-[400px]"
                />
              </div>
            )}
          </div>
          
          {/* Video player */}
          <VideoPlayer 
            src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
            poster="https://sample-videos.com/img/Sample-jpg-image-1mb.jpg"
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
