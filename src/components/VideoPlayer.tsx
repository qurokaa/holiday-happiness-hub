
import React, { useState, useRef } from 'react';
import { Maximize, Minimize, Volume2, VolumeX } from 'lucide-react';

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
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
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
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error("Fullscreen error:", err);
      });
    } else if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => {
        console.error("Exit fullscreen error:", err);
      });
    }
  };
  
  // Listen for fullscreen change events (e.g., when user presses Escape)
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
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
    <div className={`glass-panel overflow-hidden ${className}`} ref={containerRef}>
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
          
          <div className="text-sm text-gray-500">видяо0о0о00</div>
          
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
