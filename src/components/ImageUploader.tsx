
import React, { useState, useRef, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";

interface ImageUploaderProps {
  onImageChange: (image: string | null) => void;
  transparency: number;
  onTransparencyChange: (value: number) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageChange, 
  transparency, 
  onTransparencyChange 
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsLoading(true);
    
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onImageChange(result);
      setIsLoading(false);
    };
    
    reader.readAsDataURL(file);
  };
  
  const handleSliderChange = (value: number[]) => {
    onTransparencyChange(value[0]);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="glass-panel p-6 w-full max-w-md mx-auto animate-scale-in">
      <h2 className="text-2xl font-comic mb-4 text-center text-holiday-darkPink">Upload Image</h2>
      
      <div className="mb-6">
        <div 
          className="border-2 border-dashed border-holiday-pink rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-holiday-pink/5 transition-colors"
          onClick={triggerFileInput}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          {isLoading ? (
            <div className="py-8 text-center">
              <div className="animate-spin h-8 w-8 border-2 border-holiday-darkPink border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-gray-500">Loading image...</p>
            </div>
          ) : previewUrl ? (
            <div className="relative w-full">
              <img 
                src={previewUrl} 
                alt="Uploaded preview" 
                className="w-full h-auto rounded-lg object-contain max-h-[300px]"
                style={{ opacity: transparency / 100 }}
              />
              <button 
                className="absolute top-2 right-2 bg-holiday-darkPink text-white p-1 rounded-full w-8 h-8 flex items-center justify-center hover:bg-holiday-pink/80 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewUrl(null);
                  onImageChange(null);
                }}
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="py-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
              <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label htmlFor="transparency" className="text-sm font-medium text-gray-700">
            Transparency: {transparency}%
          </label>
        </div>
        <Slider
          id="transparency"
          defaultValue={[transparency]}
          max={100}
          step={1}
          className="w-full"
          onValueChange={handleSliderChange}
          disabled={!previewUrl}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Transparent (0%)</span>
          <span>Visible (100%)</span>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
