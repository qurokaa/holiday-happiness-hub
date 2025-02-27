
import React, { useEffect, useState } from 'react';

const HeartBackground = () => {
  const [hearts, setHearts] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    // Create initial hearts
    const initialHearts = Array.from({ length: 20 }, (_, i) => createHeart(i));
    setHearts(initialHearts);
    
    // Add a new heart every 2 seconds
    const interval = setInterval(() => {
      setHearts(prev => [...prev, createHeart(prev.length)]);
      
      // Limit total hearts to prevent performance issues
      if (hearts.length > 50) {
        setHearts(prev => prev.slice(prev.length - 50));
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  const createHeart = (key: number) => {
    const size = Math.random() * 30 + 15; // Random size between 15-45px
    const left = Math.random() * 100; // Random position from 0-100%
    const delay = Math.random() * 5; // Random animation delay
    const duration = Math.random() * 5 + 10; // Random animation duration between 10-15s
    const opacity = Math.random() * 0.7 + 0.3; // Random opacity between 0.3-1
    
    return (
      <div
        key={key}
        className="absolute bottom-0 animate-float-up"
        style={{
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          opacity
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FFDEE2"/>
        </svg>
      </div>
    );
  };
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts}
    </div>
  );
};

export default HeartBackground;
