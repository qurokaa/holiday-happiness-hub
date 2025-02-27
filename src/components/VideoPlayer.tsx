
import React, { useState, useRef } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  src, 
  poster,
  className = "" 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => {
          console.error("Video playback failed:", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const width = bounds.width;
      const percent = x / width;
      videoRef.current.currentTime = percent * videoRef.current.duration;
    }
  };
  
  return (
    <div className={`glass-panel overflow-hidden ${className}`}>
      <div className="relative group">
        <video
          ref={videoRef}
          className="w-full h-auto rounded-t-lg"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          poster={poster}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer group-hover:bg-black/20 transition-colors"
          onClick={togglePlay}
        >
          {!isPlaying && (
            <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center text-holiday-darkPink">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
              </svg>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div 
          className="w-full h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-gradient-to-r from-holiday-pink to-holiday-darkPink"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" fill="currentColor" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
              </svg>
            )}
          </button>
          
          <div className="text-sm text-gray-500">Holiday Video</div>
          
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.muted = !videoRef.current.muted;
              }
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 5.6V20.4C14 21.1 13.1 21.5 12.6 21L8 16H5C3.9 16 3 15.1 3 14V10C3 8.9 3.9 8 5 8H8L12.6 3C13.1 2.5 14 2.9 14 3.6V5.6ZM18.4 12C18.4 10.8 17.9 9.6 17 8.9V15.1C17.9 14.4 18.4 13.2 18.4 12ZM19.5 12C19.5 13.7 18.7 15.2 17.4 16.2V17.9C19.4 16.7 20.7 14.5 20.7 12S19.4 7.3 17.4 6.1V7.8C18.7 8.8 19.5 10.3 19.5 12Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
