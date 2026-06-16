import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Motorcycle, MOTORCYCLES } from '../data/bikes';
import { SlidersHorizontal, Eye, Fuel } from 'lucide-react';


interface SmartFinderProps {
  onSelectBike: (bike: Motorcycle) => void;
}

export const SmartFinder: React.FC<SmartFinderProps> = ({ onSelectBike }) => {
  const [budget, setBudget] = useState(600000);
  const [vehicleType, setVehicleType] = useState<'Petrol' | 'Electric' | 'Both'>('Both');
  const [purpose, setPurpose] = useState<string>('All');

  const purposes = [
    { value: 'All', label: 'All Intents' },
    { value: 'Mileage', label: 'Best Mileage' },
    { value: 'Racing', label: 'Racing / Speed' },
    { value: 'Touring', label: 'Touring Comfort' },
    { value: 'Adventure', label: 'Adventure / Off-Road' },
    { value: 'Commute', label: 'Daily Commute' },
    { value: 'Premium', label: 'Prestige & Status' }
  ];

  const filteredBikes = MOTORCYCLES.filter((bike) => {
    // 1. Budget Filter
    if (bike.price > budget) return false;

    // 2. Vehicle Type Filter
    const isElectric = bike.category === 'Electric';
    if (vehicleType === 'Petrol' && isElectric) return false;
    if (vehicleType === 'Electric' && !isElectric) return false;

    // 3. Purpose Filter
    if (purpose !== 'All') {
      if (purpose === 'Mileage' && bike.mileage.claimed < 20 && bike.category !== 'Electric') return false;
      if (purpose === 'Racing' && bike.category !== 'Sport') return false;
      if (purpose === 'Touring' && bike.category !== 'Adventure' && bike.category !== 'Premium') return false;
      if (purpose === 'Adventure' && bike.category !== 'Adventure') return false;
      if (purpose === 'Commute' && bike.category !== 'Mileage' && bike.category !== 'Electric') return false;
      if (purpose === 'Premium' && bike.category !== 'Premium' && bike.category !== 'Sport') return false;
    }

    return true;
  });

  return (
    <section className="bg-[#080808] text-white py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="font-anton tracking-wider text-[#E8FF00] text-sm block mb-3 uppercase">
              SMART ALGORITHM
            </span>
            <h2 className="font-anton text-5xl md:text-8xl uppercase leading-none tracking-tight">
              BIKE FINDER
            </h2>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm font-inter">
            <SlidersHorizontal className="h-4 w-4 text-[#E8FF00]" />
            <span>Refine filters to match your garage profile</span>
          </div>
        </div>

        {/* Filters Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 bg-[#111111] border border-white/10 rounded-none mb-12">
          
          {/* Column 1: Budget Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-anton text-sm tracking-wider uppercase text-white/70">MAX BUDGET</label>
              <span className="font-anton text-lg text-[#E8FF00]">
                {budget === 600000 ? 'No Limit' : `₹${(budget / 100000).toFixed(2)} Lakh`}
              </span>
            </div>
            <input
              type="range"
              min="100000"
              max="600000"
              step="10000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-1.5 bg-black rounded-none appearance-none cursor-pointer accent-[#E8FF00]"
            />
            <div className="flex justify-between text-[10px] font-inter text-white/40">
              <span>₹1.0L</span>
              <span>₹3.5L</span>
              <span>₹6.0L+</span>
            </div>
          </div>

          {/* Column 2: Vehicle Type */}
          <div className="space-y-4">
            <label className="font-anton text-sm tracking-wider uppercase text-white/70 block">ENGINE PROPULSION</label>
            <div className="grid grid-cols-3 gap-2 bg-black p-1 border border-white/15">
              {(['Petrol', 'Electric', 'Both'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setVehicleType(type)}
                  className={`py-2 text-xs font-anton uppercase transition-all duration-200 ${
                    vehicleType === type
                      ? 'bg-[#E8FF00] text-black'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Purpose Tags */}
          <div className="space-y-4">
            <label className="font-anton text-sm tracking-wider uppercase text-white/70 block">RIDING INTENT</label>
            <div className="relative">
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full bg-black border border-white/15 px-4 py-2.5 text-xs font-anton text-white/95 uppercase rounded-none focus:outline-none focus:border-[#E8FF00] appearance-none"
              >
                {purposes.map((p) => (
                  <option key={p.value} value={p.value} className="bg-neutral-900">
                    {p.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/60">
                ▼
              </div>
            </div>
          </div>

        </div>

        {/* Filter Results Display */}
        <div>
          <h3 className="font-anton text-xs tracking-widest text-white/40 uppercase mb-6">
            MATCHING MACHINES ({filteredBikes.length})
          </h3>

          <AnimatePresence mode="popLayout">
            {filteredBikes.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredBikes.map((bike) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={bike.id}
                    className="bg-[#111111] border border-white/10 p-6 flex flex-col justify-between group relative hover:border-[#E8FF00] transition-colors duration-300"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-inter text-[10px] text-white/40 uppercase tracking-widest">
                          {bike.category}
                        </span>
                        <span className="font-anton text-xs text-[#E8FF00] px-2 py-0.5 bg-black">
                          {bike.safetyRating} Safety
                        </span>
                      </div>

                      {/* Motorcycle Image */}
                      <div className="h-44 w-full flex items-center justify-center overflow-hidden mb-4 relative">
                        <img
                          src={bike.heroImage}
                          alt={bike.name}
                          className="max-h-36 object-contain transform group-hover:scale-105 transition-transform duration-300 relative z-10"
                        />
                      </div>


                      {/* Text */}
                      <h4 className="font-anton text-2xl uppercase tracking-tight text-white group-hover:text-[#E8FF00] transition-colors duration-300">
                        {bike.name}
                      </h4>
                      <p className="font-inter text-xs text-white/60 line-clamp-2 mt-1 mb-4">
                        {bike.tagline}
                      </p>
                    </div>

                    {/* Footer Info */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-inter text-white/40 block uppercase">ON-ROAD PRICE</span>
                        <span className="font-anton text-base text-white">
                          ₹{((bike.price + bike.pricing.rto + bike.pricing.insuranceZeroDep) / 100000).toFixed(2)}L
                        </span>
                      </div>
                      
                      <button
                        onClick={() => onSelectBike(bike)}
                        className="p-2 bg-black border border-white/10 text-white hover:bg-[#E8FF00] hover:text-black hover:border-[#E8FF00] transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#111111] border border-white/10 p-12 text-center flex flex-col items-center justify-center"
              >
                <Fuel className="h-10 w-10 text-danger mb-4" />
                <h4 className="font-anton text-2xl uppercase mb-2">No direct matches found</h4>
                <p className="font-inter text-white/50 text-sm max-w-md mb-6 leading-relaxed">
                  Try widening your budget slider or selecting "All Intents" to discover additional options.
                </p>
                <button
                  onClick={() => {
                    setBudget(600000);
                    setVehicleType('Both');
                    setPurpose('All');
                  }}
                  className="px-6 py-2.5 bg-[#E8FF00] text-black font-anton text-xs uppercase hover:bg-white transition-colors duration-200"
                >
                  RESET FILTER MATRIX
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
