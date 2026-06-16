import { useState, useRef } from 'react';
import { Hero } from './components/Hero';
import { BroAI } from './components/BroAI';
import { FeaturedShowcase } from './components/FeaturedShowcase';
import { SmartFinder } from './components/SmartFinder';
import { CompareBikes } from './components/CompareBikes';
import { UpcomingBikes } from './components/UpcomingBikes';
import { ShowroomFinder } from './components/ShowroomFinder';
import { SavedGarage } from './components/SavedGarage';
import { BikeDetails } from './components/BikeDetails';
import { MOTORCYCLES, type Motorcycle } from './data/bikes';
import { Bookmark, Compass, Landmark, Sparkles, MessageCircle, GitCompare, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


// Core application state containing selection pointers and global saved garage registry.
// Checked and verified all parameters are active.
function App() {
  const [selectedBike, setSelectedBike] = useState<Motorcycle | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>(['veloce-1000', 'cyber-s']); // Pre-bookmark 2 by default
  const [showroomPreset, setShowroomPreset] = useState<string>('');

  // Refs for section scrolling
  const broAiRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const finderRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);
  const upcomingRef = useRef<HTMLDivElement>(null);
  const showroomRef = useRef<HTMLDivElement>(null);
  const garageRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleSave = (id: string) => {
    if (savedIds.includes(id)) {
      setSavedIds(prev => prev.filter(x => x !== id));
    } else {
      setSavedIds(prev => [...prev, id]);
    }
  };

  const handleBookTestRideDirect = (showroomName: string) => {
    // Open a bike detail view so they can complete the booking flow
    setShowroomPreset(showroomName);
    const defaultBike = selectedBike || MOTORCYCLES[0];
    setSelectedBike(defaultBike);
  };


  return (
    <div className="relative bg-[#080808] text-white min-h-screen font-inter selection:bg-[#E8FF00] selection:text-black">
      
      {/* Dynamic Floating Quick Navigation Deck */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 bg-black/60 border border-white/10 p-2.5 backdrop-blur-md">
        {[
          { label: 'AI', icon: MessageCircle, action: () => scrollToSection(broAiRef) },
          { label: 'Fleet', icon: Compass, action: () => scrollToSection(featuredRef) },
          { label: 'Filter', icon: Sparkles, action: () => scrollToSection(finderRef) },
          { label: 'Compare', icon: GitCompare, action: () => scrollToSection(compareRef) },
          { label: 'Upcoming', icon: Calendar, action: () => scrollToSection(upcomingRef) },
          { label: 'Retail', icon: Landmark, action: () => scrollToSection(showroomRef) },
          { label: 'Garage', icon: Bookmark, iconColor: 'text-[#E8FF00]', action: () => scrollToSection(garageRef) }
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={item.action}
            className="group relative p-2 bg-transparent text-white/50 hover:text-white hover:bg-neutral-900/40 transition-all flex items-center justify-center"
            title={item.label}
          >
            <item.icon className={`h-4.5 w-4.5 ${item.iconColor || ''}`} />
            <span className="absolute right-12 scale-0 group-hover:scale-100 bg-black border border-white/10 text-[9px] font-anton tracking-wider uppercase px-2 py-1 transition-all duration-200 pointer-events-none whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <Hero 
        onDiscoverClick={() => scrollToSection(broAiRef)} 
      />


      {/* Bro AI Section */}
      <div ref={broAiRef}>
        <BroAI onSelectBike={(bike) => {
          setShowroomPreset('');
          setSelectedBike(bike);
        }} />
      </div>

      {/* Featured Bikes Showcase */}
      <div ref={featuredRef}>
        <FeaturedShowcase onSelectBike={(bike) => {
          setShowroomPreset('');
          setSelectedBike(bike);
        }} />
      </div>

      {/* Smart Bike Finder */}
      <div ref={finderRef}>
        <SmartFinder onSelectBike={(bike) => {
          setShowroomPreset('');
          setSelectedBike(bike);
        }} />
      </div>

      {/* Compare Bikes */}
      <div ref={compareRef}>
        <CompareBikes />
      </div>

      {/* Upcoming Bikes */}
      <div ref={upcomingRef}>
        <UpcomingBikes />
      </div>

      {/* Showrooms Finder */}
      <div ref={showroomRef}>
        <ShowroomFinder onBookTestRide={handleBookTestRideDirect} />
      </div>

      {/* Saved Garage */}
      <div ref={garageRef}>
        <SavedGarage 
          savedIds={savedIds} 
          onRemove={handleToggleSave} 
          onSelectBike={(bike) => {
            setShowroomPreset('');
            setSelectedBike(bike);
          }} 
        />
      </div>

      {/* Immersive Apple-style Details overlay */}
      <AnimatePresence>
        {selectedBike && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BikeDetails 
              bike={selectedBike}
              isSaved={savedIds.includes(selectedBike.id)}
              onToggleSave={handleToggleSave}
              initialShowroomPreset={showroomPreset}
              onClose={() => {
                setSelectedBike(null);
                setShowroomPreset('');
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Premium Footer */}
      <footer className="bg-black text-white/50 border-t border-white/10 py-16 px-6 md:px-12 text-xs font-inter relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <h4 className="font-anton text-white text-2xl tracking-[0.18em] uppercase">BRO BIKE</h4>
            <p className="leading-relaxed text-white/40">
              The next-generation motorcycle discovery platform. Built with cinematic precision and driven by simulated intelligence.
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="font-anton text-white tracking-widest uppercase text-[10px]">SERIES SEGMENTS</h5>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection(featuredRef)} className="hover:text-white transition-colors">SUPER SPORT</button></li>
              <li><button onClick={() => scrollToSection(featuredRef)} className="hover:text-white transition-colors">ADVENTURE TOURING</button></li>
              <li><button onClick={() => scrollToSection(featuredRef)} className="hover:text-white transition-colors">CYBER ELECTRIC</button></li>
              <li><button onClick={() => scrollToSection(featuredRef)} className="hover:text-white transition-colors">HIGHWAY CRUISER</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-anton text-white tracking-widest uppercase text-[10px]">RETAIL SYSTEMS</h5>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection(showroomRef)} className="hover:text-white transition-colors">EXPERIENCE ZONES</button></li>
              <li><button onClick={() => scrollToSection(showroomRef)} className="hover:text-white transition-colors">SERVICE LABS</button></li>
              <li><button onClick={() => scrollToSection(compareRef)} className="hover:text-white transition-colors">EMI CALCULATOR</button></li>
              <li><button onClick={() => scrollToSection(upcomingRef)} className="hover:text-white transition-colors">LAUNCH TRACKER</button></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="font-anton text-white tracking-widest uppercase text-[10px]">NEWSLETTER OUTLET</h5>
            <p className="leading-relaxed text-white/40">Sign up to receive early allocations and invites to physical launch events.</p>
            <div className="flex bg-[#111111] border border-white/10 p-1">
              <input
                type="email"
                placeholder="Enter email address..."
                className="bg-transparent border-0 px-2 py-1.5 w-full focus:outline-none text-[11px]"
              />
              <button className="bg-[#E8FF00] text-black font-anton uppercase text-[10px] tracking-wider px-4">
                SUBSCRIBE
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-[10px]">
          <span>© 2026 BRO BIKE INC. ALL RIGHTS RESERVED. FOR DESIGN DEMO PURPOSES ONLY.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">PRIVACY POLICY</a>
            <a href="#" className="hover:underline">TERMS OF PRESTIGE</a>
            <a href="#" className="hover:underline">COOKIE PREFERENCES</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
