import React from 'react';
import { motion } from 'framer-motion';
import { type Motorcycle, MOTORCYCLES } from '../data/bikes';
import { Compass, Eye, ShieldCheck, Zap, GitCompare } from 'lucide-react';
import { handleImageError } from '../utils/imageFallback';

interface FeaturedShowcaseProps {
  onSelectBike: (bike: Motorcycle) => void;
  onAddToCompare?: (bikeId: string) => void;
}

export const FeaturedShowcase: React.FC<FeaturedShowcaseProps> = ({ onSelectBike, onAddToCompare }) => {
  // Select top 3 distinct bikes to feature in the Showcase section
  const featuredBikes = MOTORCYCLES.slice(0, 3);

  return (
    <section className="bg-white text-slate-900 py-24 border-t border-slate-200">
      
      {/* Intro Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <span className="font-anton tracking-wider text-orange-600 text-sm block mb-3 uppercase">
          CURATED FLEET
        </span>
        <h2 className="font-anton text-5xl md:text-8xl uppercase leading-none tracking-tight text-slate-900">
          THE FEATURED MODELS
        </h2>
        <p className="font-inter text-slate-500 text-base md:text-lg max-w-xl mt-4 leading-relaxed">
          Engineering masterpieces built by premier Indian manufacturers. Hover, inspect, and select your ride.
        </p>
      </div>

      {/* Grid of full width sections */}
      <div className="space-y-36">
        {featuredBikes.map((bike, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={bike.id}
              className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 md:gap-20"
            >
              
              {/* Product Info Block */}
              <div className={`w-full md:w-1/2 flex flex-col justify-center ${
                isEven ? 'order-1' : 'order-1 md:order-2'
              }`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 text-xs font-anton tracking-wider text-white uppercase rounded"
                      style={{ backgroundColor: bike.themeColor }}
                    >
                      {bike.brand}
                    </span>
                    <span className="text-slate-400 font-inter text-xs tracking-widest uppercase">
                      {bike.category} SERIES
                    </span>
                  </div>

                  <h3 className="font-anton text-5xl md:text-7xl uppercase leading-none tracking-tight text-slate-900">
                    {bike.name}
                  </h3>

                  <p className="font-inter text-slate-600 text-sm md:text-base leading-relaxed">
                    {bike.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-6 py-4 border-y border-slate-200">
                    <div className="flex items-start gap-2.5">
                      <Zap className="h-4.5 w-4.5 text-orange-600 mt-1" />
                      <div>
                        <span className="font-inter text-[10px] text-slate-400 uppercase tracking-widest block font-semibold">POWER</span>
                        <span className="font-anton text-lg text-slate-800 block uppercase mt-0.5">{bike.specs.power.split('@')[0]}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Compass className="h-4.5 w-4.5 text-orange-600 mt-1" />
                      <div>
                        <span className="font-inter text-[10px] text-slate-400 uppercase tracking-widest block font-semibold">TOP SPEED</span>
                        <span className="font-anton text-lg text-slate-800 block uppercase mt-0.5">{bike.specs.topSpeed}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="h-4.5 w-4.5 text-orange-600 mt-1" />
                      <div>
                        <span className="font-inter text-[10px] text-slate-400 uppercase tracking-widest block font-semibold">SAFETY SCORE</span>
                        <span className="font-anton text-lg text-slate-800 block uppercase mt-0.5">{bike.safetyRating.split('/')[0]}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="h-4.5 w-4.5 text-orange-600 font-anton text-xs font-bold text-center mt-1 flex items-center justify-center border border-orange-600 rounded">
                        KM
                      </span>
                      <div>
                        <span className="font-inter text-[10px] text-slate-400 uppercase tracking-widest block font-semibold">MILEAGE/RANGE</span>
                        <span className="font-anton text-lg text-slate-800 block uppercase mt-0.5">{bike.mileageSpec.split(' ')[0]} {bike.category === 'Electric' ? 'km' : 'km/l'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      onClick={() => onSelectBike(bike)}
                      className="px-6 py-3.5 bg-orange-600 text-white font-anton text-sm uppercase rounded-xl hover:bg-slate-900 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-orange-500/10"
                    >
                      <Eye className="h-4 w-4" /> VIEW DETAILS
                    </button>
                    
                    <button
                      onClick={() => onAddToCompare && onAddToCompare(bike.id)}
                      className="px-6 py-3.5 bg-transparent border border-slate-200 text-slate-700 font-anton text-sm uppercase rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <GitCompare className="h-4 w-4" /> COMPARE
                    </button>

                    <div className="flex items-center ml-auto">
                      <span className="font-inter text-[10px] text-slate-400 mr-2 block font-semibold uppercase">STARTING AT</span>
                      <span className="font-anton text-xl text-slate-800">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(bike.price)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Large Product Photography */}
              <div className={`w-full md:w-1/2 flex items-center justify-center relative group ${
                isEven ? 'order-2' : 'order-2 md:order-1'
              }`}>
                <div 
                  className="absolute w-72 h-72 rounded-full blur-[80px] opacity-10 transition-opacity group-hover:opacity-20 pointer-events-none"
                  style={{ backgroundColor: bike.themeColor }}
                />
                <motion.img
                  initial={{ opacity: 0, scale: 0.85, y: 35 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.05, rotate: isEven ? 1 : -1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  src={bike.heroImage}
                  alt={bike.name}
                  onError={(e) => handleImageError(e, bike.category)}
                  className="max-h-[350px] md:max-h-[480px] object-contain relative z-10 cursor-pointer"
                />
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};
