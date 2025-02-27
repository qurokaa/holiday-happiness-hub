
import React, { useState } from 'react';

interface GradientButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({ 
  onClick, 
  children,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      className={`button-gradient py-3 px-6 text-white font-medium text-lg rounded-full shadow-md ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{children}</span>
      <div 
        className="absolute inset-0 bg-black transition-opacity duration-300 rounded-full"
        style={{ 
          opacity: isHovered ? 0.15 : 0,
        }}
      />
    </button>
  );
};

export default GradientButton;
