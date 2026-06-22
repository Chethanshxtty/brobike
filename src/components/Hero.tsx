import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOTORCYCLES } from '../data/bikes';
import { handleImageError } from '../utils/imageFallback';

interface HeroProps {
  onDiscoverClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDiscoverClick }) => {
  const [index, setIndex] = useState(0);

  // Take the first 5 bikes for the hero display rotation
  const heroBikes = MOTORCYCLES.slice(0, 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % heroBikes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroBikes.length]);

  const handleNextBike = () => {
    setIndex((prevIndex) => (prevIndex + 1) % heroBikes.length);
  };

  const activeBike = heroBikes[index];

  return (
    <div
      className="relative h-screen w-full overflow-hidden transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{ backgroundColor: activeBike.themeColor + '15' }} // 10% opacity pastel wash background
    >
      {/* Subtle overlay for visual depth */}
      <div className="absolute inset-0 bg-slate-900/[0.02] pointer-events-none" />

      {/* Top Left Branding */}
      <div className="absolute top-8 left-8 z-40">
        <h1 className="font-anton text-2xl tracking-branding text-slate-900 uppercase select-none">
          BRO BIKE
        </h1>
      </div>

      {/* Hero Center Content - Immersive Layout */}
      <div className="relative h-full w-full flex flex-col items-center justify-center pt-12 z-20">
        
        {/* Ghost Typography Behind Motorcycle */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10">
          <AnimatePresence mode="wait">
            <motion.h2
              key={`ghost-${activeBike.id}`}
              initial={{ y: 60, opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
              animate={{ y: 0, opacity: 0.08, scale: 1, filter: 'blur(0px)' }}
              exit={{ y: -60, opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
              transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
              className="font-anton text-slate-800 text-center leading-none uppercase pointer-events-none"
              style={{ fontSize: 'clamp(90px, 20vw, 360px)' }}
            >
              {activeBike.ghostText}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Motorcycle Image Frame */}
        <div className="relative z-20 w-full max-w-[85vw] md:max-w-[70vw] h-[52vh] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={`img-${activeBike.id}`}
              src={activeBike.heroImage}
              alt={activeBike.name}
              initial={{ scale: 0.8, y: 35, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ scale: 1.15, y: -30, opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
              onClick={handleNextBike}
              onError={(e) => handleImageError(e, activeBike.category)}
              className="max-h-[50vh] md:max-h-[52vh] object-contain cursor-pointer transition-transform duration-500 hover:scale-[1.03] select-none pointer-events-auto"
            />
          </AnimatePresence>
        </div>

        {/* Bike Name & Category directly below the motorcycle */}
        <div className="relative z-20 text-center mt-6 h-[18vh] flex flex-col justify-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${activeBike.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-1.5"
            >
              <h2 className="font-anton text-slate-900 text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight select-none">
                {activeBike.name}
              </h2>
              <span className="font-inter text-xs text-slate-500 tracking-[0.12em] uppercase block select-none">
                {activeBike.brand} • {activeBike.category} Motorcycle
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Bottom Right CTA */}
      <div className="absolute bottom-12 right-8 md:right-12 z-30">
        <button
          onClick={onDiscoverClick}
          className="group relative flex items-center gap-2 font-anton text-xl md:text-2xl text-slate-900 hover:text-orange-600 transition-colors duration-300 py-2 cursor-pointer"
        >
          <span className="relative z-10 flex items-center gap-2">
            DISCOVER BIKES <span className="inline-block transform group-hover:translate-x-2 transition-transform duration-300">→</span>
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all duration-300" />
        </button>
      </div>

    </div>
  );
};
