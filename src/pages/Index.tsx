import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import HeartBackground from '@/components/HeartBackground';
import GradientButton from '@/components/GradientButton';
import VideoPlayer from '@/components/VideoPlayer';
import holidayImage from '@/assets/holiday_image.jpg';
import deerImage from '@/assets/deer.jpg'; // Import the deer image
import { Slider } from "@/components/ui/slider";

const Index = () => {
  const [message, setMessage] = useState<string>("");
  const [showFullImage, setShowFullImage] = useState<boolean>(false);
  const [imageTransparency, setImageTransparency] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(-1);
  const [scrollOpacity, setScrollOpacity] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const bottomImageRef = useRef<HTMLImageElement>(null);
  
  const fullMessage = "привяу, я хочу паздравить самую креативную, самую добрую, самую крутую, самую понимающюю, самую лучшую, самую прикольную, самую ещкеря, самую яркую, самую вдохновляющую, самую заботливую, самую стильную, самую умную, самую талантливую, самую позитивную, самую огненную, самую невероятную, самую уникальную, самую лайк э бос, самую топувую, самую афигеную, самую ошеламительную, самую ачуменую, самую искреннюю, самую душевную, самую лучистую, самую смелую, самую решительную, самую открытую, самую мечтательную, самую тёплую, самую солнечную, самую яркую и единственную такую девушку ваще на всем свете ваще галактитки ваще мира ну прям оч крутую с восьмым марта, желаю чтобы  ты была здарова, чтобы всегда улыбалсь и была счастлива, чтобы везло тебе, ярких впечатлений, хорошего проведенного времени, чтобы деньги небыли праблемой, крутых моментов вот желаю, чтобы во всех начинаниях у тебя все получалось, чтобы рампаги тока так летели, чтобы в геншине повезло на перса, чтобы в форте топ 1 занимала, чтобы тебе нравилось то чем ты занимаешся, А ТАКЖЕ МАТИУАЦИИ И ИМПРАВИЗАЦИИ А ТАКЖЕ МИРНОГО НЕБА НАД ГОЛОВОЙ❤";
  const messageWords = fullMessage.split(" ");
  
  const handleButtonClick = () => {
    setWordIndex(prev => {
      const nextIndex = prev + 1;
      if (nextIndex >= messageWords.length) return prev;
      return nextIndex;
    });
    
    if (!showFullImage) {
      setShowFullImage(true);
    }
    
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => {
        console.error("Audio playback failed:", err);
      });
    }
  };

  useEffect(() => {
    if (wordIndex >= 0) {
      const displayedMessage = messageWords.slice(0, wordIndex + 1).join(" ");
      setMessage(displayedMessage);
    }
  }, [wordIndex, messageWords]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.min(scrollY / scrollHeight, 1);
      setScrollOpacity(scrollPercentage * 0.8);
      
      console.log("Scrolling: ", scrollY, scrollHeight, scrollPercentage);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTransparencyChange = (value: number[]) => {
    setImageTransparency(value[0]);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-b from-holiday-pink to-holiday-white">
      <HeartBackground />
      
      <div 
        className="fixed inset-0 bg-black pointer-events-none transition-opacity duration-300 z-0"
        style={{ opacity: scrollOpacity }}
      ></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Header />
        
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 mt-8">
          <div className="flex flex-col gap-6">
            <div className="glass-panel p-6 w-full max-w-md mx-auto animate-scale-in">
              <h2 className="text-2xl font-comic mb-4 text-center text-holiday-darkPink">чотам?</h2>
              
              {showFullImage && (
                <div className="relative w-full mb-6">
                  <img 
                    src={holidayImage} 
                    alt="Holiday preview" 
                    className="w-full h-auto rounded-lg object-contain max-h-[300px]"
                  />
                </div>
              )}
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">
                    празрачнасть: {imageTransparency}%
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
                  <span>нивидимка</span>
                  <span>видимка</span>
                </div>
              </div>
              
              <div className="flex justify-center">
                <GradientButton
                  onClick={handleButtonClick}
                  className="animate-pulse"
                >
                  чо тут ваще есть блин??
                </GradientButton>
              </div>
            </div>
          </div>
          
          <div className="h-fit" style={{ opacity: imageTransparency / 100 }}>
            <VideoPlayer 
              src="/src/assets/holiday_video.mp4"
              poster={holidayImage}
              className="h-fit"
            />
          </div>
        </div>
        
        {message && (
          <div className="mt-16 py-12 text-center min-h-[200px] flex items-center justify-center">
            <p className="text-4xl font-comic animate-fade-in text-holiday-darkPink">{message}</p>
          </div>
        )}
      </div>
      
      <div className="h-[500px]"></div>
      <div className="h-[500px]"></div>
      <div className="h-[500px]"></div>
      <div className="h-[500px]"></div>
      <div className="h-[500px]"></div>
      
      <div className="w-full bg-gradient-to-b from-transparent to-black py-16 mt-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-comic mb-10 text-white">С праздником!</h2>
          <div className="relative">
            <img 
              src={deerImage} 
              alt="Deer in nature" 
              className="mx-auto max-w-full h-auto rounded-lg shadow-2xl animate-fade-in mb-16"
              ref={bottomImageRef}
              style={{ maxHeight: '500px', objectFit: 'contain' }}
              onError={(e) => console.error("Image failed to load:", e)}
              onLoad={() => console.log("Deer image loaded successfully")}
            />
            <p className="text-white text-sm mt-2">минон.png</p>
          </div>
        </div>
      </div>
      
      <audio ref={audioRef} className="hidden">
        <source src="https://assets.mixkit.co/sfx/preview/mixkit-christmas-bells-ringing-2976.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Index;
