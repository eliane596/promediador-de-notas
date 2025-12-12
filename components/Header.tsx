import React from 'react';
import { BookOpen, University } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b-4 border-lilac shadow-sm pb-6 pt-6 px-4 relative overflow-hidden z-20">
      <div className="absolute top-0 left-0 w-full h-2 bg-lilac"></div>
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        
        {/* Left Side: Name */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-7xl text-gray-900 font-bold tracking-tight mb-1 font-script transform -rotate-2 md:rotate-0 transition-transform hover:scale-105 duration-300 inline-block">
            Eliane Orozco
          </h1>
          
          {/* Heart Line Art Decoration - Thicker Gold Line */}
          <div className="text-gold mx-auto md:mx-0 mt-1 hidden md:block w-64 opacity-90">
            <svg viewBox="0 0 200 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-sm">
               {/* Central Heart */}
               <path d="M100 6 C 94 0, 85 0, 82 5 C 79 10, 85 15, 100 22 C 115 15, 121 10, 118 5 C 115 0, 106 0, 100 6" />
               
               {/* Left Swirls and small heart */}
               <path d="M82 14 C 70 14, 60 18, 50 14 S 30 10, 25 14" />
               <path d="M25 14 C 22 11, 18 11, 18 13 C 18 15, 25 18, 25 18 C 25 18, 32 15, 32 13 C 32 11, 28 11, 25 14" />

               {/* Right Swirls and small heart */}
               <path d="M118 14 C 130 14, 140 18, 150 14 S 170 10, 175 14" />
               <path d="M175 14 C 172 11, 168 11, 168 13 C 168 15, 175 18, 175 18 C 175 18, 182 15, 182 13 C 182 11, 178 11, 175 14" />
               
               {/* Extra tiny details */}
               <circle cx="50" cy="8" r="1" fill="currentColor" stroke="none" opacity="0.6"/>
               <circle cx="150" cy="8" r="1" fill="currentColor" stroke="none" opacity="0.6"/>
            </svg>
          </div>
        </div>

        {/* Right Side: University Info */}
        <div className="flex flex-col items-center md:items-end gap-1 mt-4 md:mt-0">
          <div className="flex items-center gap-2 text-gold-dark text-xl md:text-2xl font-bold">
            <span>Universidad del Magdalena</span>
            <University className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-lg md:text-xl">
            <span>Negocios Internacionales</span>
            <BookOpen className="w-5 h-5 text-lilac-dark" />
          </div>
        </div>

      </div>
      
      {/* Decorative Elements inside header */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gold opacity-10 rounded-full blur-xl"></div>
      <div className="absolute top-0 left-10 w-32 h-32 bg-lilac opacity-10 rounded-full blur-2xl"></div>
    </header>
  );
};

export default Header;