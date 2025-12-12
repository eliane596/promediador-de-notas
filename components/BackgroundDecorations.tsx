import React from 'react';
import { Sparkles, Star, Heart, Cloud, Sun, Flower2, Music } from 'lucide-react';

const BackgroundDecorations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Top Left Area */}
      <div className="absolute top-20 left-10 text-lilac opacity-20 transform -rotate-12">
        <Sparkles size={48} />
      </div>
      <div className="absolute top-40 left-24 text-gold opacity-15">
        <Star size={24} fill="currentColor" />
      </div>

      {/* Top Right Area */}
      <div className="absolute top-28 right-10 text-lilac-dark opacity-10">
        <Cloud size={64} fill="currentColor" />
      </div>
      
      {/* Middle Sides */}
      <div className="absolute top-1/3 left-4 text-gold-dark opacity-20 transform rotate-45">
        <Heart size={32} />
      </div>
      <div className="absolute top-1/2 right-8 text-lilac opacity-25">
        <Flower2 size={40} />
      </div>

      {/* Bottom Area */}
      <div className="absolute bottom-40 left-20 text-lilac-dark opacity-15 transform rotate-12">
        <Music size={36} />
      </div>
      <div className="absolute bottom-32 right-1/4 text-gold opacity-20">
        <Sparkles size={28} />
      </div>
      <div className="absolute bottom-20 right-10 text-lilac opacity-20 transform -rotate-12">
        <Sun size={56} />
      </div>

      {/* Tiny scattered dots/stars */}
      <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-gold rounded-full opacity-30"></div>
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-lilac rounded-full opacity-30"></div>
      <div className="absolute top-10 right-1/2 w-2 h-2 bg-lilac-dark rounded-full opacity-20"></div>
    </div>
  );
};

export default BackgroundDecorations;