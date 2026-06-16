import React, { useState, useEffect } from 'react';
import { UPCOMING_BIKES } from '../data/bikes';
import { Calendar, BellRing, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


export const UpcomingBikes: React.FC = () => {
  const [notifiedId, setNotifiedId] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [successId, setSuccessId] = useState<string | null>(null);

  // Countdown calculations - ticks every second to compute days, hours, minutes, and seconds dynamically
  const [timeRemaining, setTimeRemaining] = useState<{ [key: string]: { days: number; hours: number; minutes: number; seconds: number } }>({});

  useEffect(() => {
    const calculateTime = () => {

      const updated: typeof timeRemaining = {};
      UPCOMING_BIKES.forEach(bike => {
        // Mock a future timestamp by adding countdownDays
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + bike.countdownDays);
        targetDate.setHours(12, 0, 0, 0);

        const difference = targetDate.getTime() - new Date().getTime();
        if (difference > 0) {
          updated[bike.id] = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          };
        } else {
          updated[bike.id] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });
      setTimeRemaining(updated);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNotifySubmit = (e: React.FormEvent, bikeId: string) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    setSuccessId(bikeId);
    setNotifiedId(null);
    setEmailInput('');

    setTimeout(() => {
      setSuccessId(null);
    }, 4000);
  };

  return (
    <section className="bg-[#080808] text-white py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-anton tracking-wider text-[#E8FF00] text-sm block mb-3 uppercase">
            NEXT GEN LAUNCHES
          </span>
          <h2 className="font-anton text-5xl md:text-8xl uppercase leading-none tracking-tight">
            UPCOMING FLEET
          </h2>
          <p className="font-inter text-white/50 text-base md:text-lg max-w-xl mt-4 leading-relaxed">
            Preview our next-generation concepts and super sport builds scheduled for assembly later this year. Keep track of release dates.
          </p>
        </div>

        {/* Showcase list */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {UPCOMING_BIKES.map((bike) => {
            const time = timeRemaining[bike.id] || { days: 0, hours: 0, minutes: 0, seconds: 0 };
            return (
              <div
                key={bike.id}
                className="bg-[#111111] border border-white/10 p-6 flex flex-col justify-between relative rounded-none hover:border-white/20 transition-all duration-300"
              >
                {/* Visual Backdrop Category */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-2 py-0.5 bg-black text-[#E8FF00] font-anton text-[9px] tracking-widest uppercase">
                    CONCEPT PREVIEW
                  </span>
                </div>

                {/* Bike snapshot preview */}
                <div className="mb-6">
                  <div className="h-44 w-full flex items-center justify-center relative mb-6">
                    <img
                      src={bike.image}
                      alt={bike.name}
                      className="max-h-32 object-contain filter grayscale contrast-125 opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 transform hover:scale-105"
                    />
                  </div>

                  
                  <h3 className="font-anton text-2xl uppercase tracking-tight text-white mb-2">
                    {bike.name}
                  </h3>

                  <div className="space-y-2 text-xs font-inter text-white/70">
                    <div className="flex justify-between">
                      <span className="text-white/40">Expected Price</span>
                      <span className="font-anton text-[#E8FF00]">{bike.expectedPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Launch Schedule</span>
                      <span className="font-medium flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" /> {bike.expectedLaunchDate}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-white/5">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-1">ANTICIPATED SPECS</span>
                      <p className="text-white/80 leading-relaxed font-normal">{bike.expectedSpecs}</p>
                    </div>
                  </div>
                </div>

                {/* Dynamic Countdown clocks */}
                <div className="bg-black/60 p-4 border border-white/5 text-center mb-6">
                  <span className="font-anton text-white/40 text-[9px] tracking-widest uppercase block mb-2">COUNTDOWN TO RELEASE</span>
                  <div className="grid grid-cols-4 gap-2 text-white">
                    <div>
                      <span className="font-anton text-xl block leading-none">{String(time.days).padStart(2, '0')}</span>
                      <span className="text-[8px] font-inter text-white/40 uppercase tracking-widest">DAYS</span>
                    </div>
                    <div>
                      <span className="font-anton text-xl block leading-none">{String(time.hours).padStart(2, '0')}</span>
                      <span className="text-[8px] font-inter text-white/40 uppercase tracking-widest">HRS</span>
                    </div>
                    <div>
                      <span className="font-anton text-xl block leading-none">{String(time.minutes).padStart(2, '0')}</span>
                      <span className="text-[8px] font-inter text-white/40 uppercase tracking-widest">MINS</span>
                    </div>
                    <div>
                      <span className="font-anton text-xl block leading-none text-[#E8FF00]">{String(time.seconds).padStart(2, '0')}</span>
                      <span className="text-[8px] font-inter text-white/40 uppercase tracking-widest">SECS</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {successId === bike.id ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-success/20 border border-success/30 text-success p-3 text-center text-xs font-inter flex items-center justify-center gap-2"
                      >
                        <ShieldCheck className="h-4.5 w-4.5" /> Registered for Launch Alert!
                      </motion.div>
                    ) : notifiedId === bike.id ? (
                      <motion.form
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        onSubmit={(e) => handleNotifySubmit(e, bike.id)}
                        className="flex gap-2"
                      >
                        <input
                          type="email"
                          required
                          placeholder="Your email address..."
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          className="flex-1 bg-black border border-white/10 px-3 py-2 text-xs font-inter text-white placeholder-white/35 focus:outline-none focus:border-[#E8FF00]"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#E8FF00] text-black font-anton text-xs uppercase hover:bg-white transition-colors"
                        >
                          SUBMIT
                        </button>
                      </motion.form>
                    ) : (
                      <button
                        onClick={() => setNotifiedId(bike.id)}
                        className="w-full py-3 bg-black border border-white/10 text-white font-anton text-xs uppercase hover:bg-[#E8FF00] hover:text-black hover:border-[#E8FF00] transition-colors flex items-center justify-center gap-2"
                      >
                        <BellRing className="h-3.5 w-3.5" /> NOTIFY ME ON LAUNCH
                      </button>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
