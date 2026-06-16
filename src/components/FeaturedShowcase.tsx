import React from 'react';
import { motion } from 'framer-motion';
import { type Motorcycle, MOTORCYCLES } from '../data/bikes';
import { Compass, Eye, ShieldCheck, Zap } from 'lucide-react';


interface FeaturedShowcaseProps {
  onSelectBike: (bike: Motorcycle) => void;
}

export const FeaturedShowcase: React.FC<FeaturedShowcaseProps> = ({ onSelectBike }) => {
  return (
    <section className="bg-[#080808] text-white py-24 border-t border-white/10">
      
      {/* Intro Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <span className="font-anton tracking-wider text-[#E8FF00] text-sm block mb-3 uppercase">
          CURATED FLEET
        </span>
        <h2 className="font-anton text-5xl md:text-8xl uppercase leading-none tracking-tight">
          THE FEATURED MACHINES
        </h2>
        <p className="font-inter text-white/50 text-base md:text-lg max-w-xl mt-4 leading-relaxed">
          Five distinct engineering masterpieces designed to redefine their categories. Hover, inspect, and select your ride.
        </p>
      </div>

      {/* Grid of full width sections */}
      <div className="space-y-36">
        {MOTORCYCLES.map((bike, idx) => {
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
                      className="px-2 py-0.5 text-xs font-anton tracking-wider text-black uppercase"
                      style={{ backgroundColor: bike.themeColor }}
                    >
                      {bike.category}
                    </span>
                    <span className="text-white/40 font-inter text-xs tracking-widest uppercase">
                      SERIES MODEL
                    </span>
                  </div>

                  <h3 className="font-anton text-5xl md:text-7xl uppercase leading-none tracking-tight">
                    {bike.name}
                  </h3>

                  <p className="font-inter text-white/70 text-sm md:text-base leading-relaxed">
                    {bike.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-6 py-4 border-y border-white/10">
                    <div className="flex items-start gap-2.5">
                      <Zap className="h-4.5 w-4.5 text-[#E8FF00] mt-1" />
                      <div>
                        <span className="font-inter text-[10px] text-white/40 uppercase tracking-widest block">POWER</span>
                        <span className="font-anton text-lg text-white block uppercase mt-0.5">{bike.specs.power.split('@')[0]}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Compass className="h-4.5 w-4.5 text-[#E8FF00] mt-1" />
                      <div>
                        <span className="font-inter text-[10px] text-white/40 uppercase tracking-widest block">TOP SPEED</span>
                        <span className="font-anton text-lg text-white block uppercase mt-0.5">{bike.specs.topSpeed}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="h-4.5 w-4.5 text-[#E8FF00] mt-1" />
                      <div>
                        <span className="font-inter text-[10px] text-white/40 uppercase tracking-widest block">SAFETY SCORE</span>
                        <span className="font-anton text-lg text-white block uppercase mt-0.5">{bike.safetyRating}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="h-4.5 w-4.5 text-[#E8FF00] font-anton text-xs font-bold text-center mt-1 flex items-center justify-center border border-[#E8FF00] rounded-none">
                        KM
                      </span>
                      <div>
                        <span className="font-inter text-[10px] text-white/40 uppercase tracking-widest block">MILEAGE/RANGE</span>
                        <span className="font-anton text-lg text-white block uppercase mt-0.5">{bike.mileageSpec.split(' ')[0]} {bike.category === 'Electric' ? 'km' : 'km/l'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      onClick={() => onSelectBike(bike)}
                      className="flex-1 sm:flex-none px-8 py-3.5 bg-[#E8FF00] text-black font-anton text-base uppercase hover:bg-white transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Eye className="h-4 w-4" /> VIEW SPEC DETAILS
                    </button>
                    
                    <div className="flex items-center">
                      <span className="font-inter text-xs text-white/40 mr-2 uppercase">STARTING FROM</span>
                      <span className="font-anton text-xl text-white">
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
                <motion.img
                  initial={{ opacity: 0, scale: 0.85, y: 35 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.05, rotate: isEven ? 1 : -1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  src={bike.heroImage}
                  alt={bike.name}
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
