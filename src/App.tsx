import { useState, useRef } from 'react';
import { Hero } from './components/Hero';
import { FeaturedShowcase } from './components/FeaturedShowcase';
import { SmartFinder } from './components/SmartFinder';
import { CompareBikes } from './components/CompareBikes';
import { UpcomingBikes } from './components/UpcomingBikes';
import { ShowroomFinder } from './components/ShowroomFinder';
import { SavedGarage } from './components/SavedGarage';
import { BikeDetails } from './components/BikeDetails';
import { MOTORCYCLES, type Motorcycle } from './data/bikes';
import { Bookmark, Compass, Landmark, Sparkles, GitCompare, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


// Core application state containing selection pointers and global saved garage registry.
// Checked and verified all parameters are active.
function App() {
  const [selectedBike, setSelectedBike] = useState<Motorcycle | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>(['apache-310', 'pulsar-ns400']); // Pre-bookmark 2 by default
  const [showroomPreset, setShowroomPreset] = useState<string>('');
  const [compareIds, setCompareIds] = useState<string[]>([
    MOTORCYCLES[0].id,
    MOTORCYCLES[1].id,
    MOTORCYCLES[2].id,
    ''
  ]);

  // Refs for section scrolling
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

  const handleAddToCompare = (bikeId: string) => {
    if (compareIds.includes(bikeId)) {
      scrollToSection(compareRef);
      return;
    }
    const emptyIndex = compareIds.indexOf('');
    const nextIds = [...compareIds];
    if (emptyIndex !== -1) {
      nextIds[emptyIndex] = bikeId;
    } else {
      nextIds[3] = bikeId;
    }
    setCompareIds(nextIds);
    scrollToSection(compareRef);
  };

  const navItems = [
    { label: 'Fleet', icon: Compass },
    { label: 'Finder', icon: Sparkles },
    { label: 'Compare', icon: GitCompare },
    { label: 'Upcoming', icon: Calendar },
    { label: 'Retail', icon: Landmark },
    { label: 'Garage', icon: Bookmark, iconColor: 'text-orange-600' }
  ];

  const handleNavClick = (label: string) => {
    let targetRef;
    switch (label) {
      case 'Fleet': targetRef = featuredRef; break;
      case 'Finder': targetRef = finderRef; break;
      case 'Compare': targetRef = compareRef; break;
      case 'Upcoming': targetRef = upcomingRef; break;
      case 'Retail': targetRef = showroomRef; break;
      case 'Garage': targetRef = garageRef; break;
      default: return;
    }
    scrollToSection(targetRef);
  };

  return (
    <div className="relative bg-slate-50 text-slate-900 min-h-screen font-inter selection:bg-orange-500 selection:text-white">
      
      {/* Dynamic Floating Quick Navigation Deck (Light Glassmorphism Mode) */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 bg-white/70 border border-slate-200 p-2.5 backdrop-blur-md rounded-2xl shadow-lg">
        {navItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleNavClick(item.label)}
            className="group relative p-2 bg-transparent text-slate-500 hover:text-orange-600 hover:bg-slate-100/50 rounded-xl transition-all flex items-center justify-center"
            title={item.label}
          >
            <item.icon className={`h-4.5 w-4.5 ${item.iconColor || ''}`} />
            <span className="absolute right-12 scale-0 group-hover:scale-100 bg-slate-900 text-white text-[9px] font-anton tracking-wider uppercase px-2 py-1 transition-all duration-200 pointer-events-none whitespace-nowrap rounded">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Hero Section */}
      <Hero 
        onDiscoverClick={() => scrollToSection(finderRef)} 
      />

      {/* Smart Bike Finder (Budget & Brand Selection) */}
      <div ref={finderRef}>
        <SmartFinder 
          onSelectBike={(bike) => {
            setShowroomPreset('');
            setSelectedBike(bike);
          }} 
          onAddToCompare={handleAddToCompare}
        />
      </div>

      {/* Featured Bikes Showcase */}
      <div ref={featuredRef}>
        <FeaturedShowcase 
          onSelectBike={(bike) => {
            setShowroomPreset('');
            setSelectedBike(bike);
          }} 
          onAddToCompare={handleAddToCompare}
        />
      </div>

      {/* Compare Bikes */}
      <div ref={compareRef}>
        <CompareBikes 
          selectedIds={compareIds}
          onSelectBike={(slotIndex, bikeId) => {
            const nextIds = [...compareIds];
            nextIds[slotIndex] = bikeId;
            setCompareIds(nextIds);
          }}
        />
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
            className="fixed inset-0 z-50"
          >
            <BikeDetails 
              key={selectedBike.id}
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

      {/* Cinematic Premium Light-mode styled Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 py-16 px-6 md:px-12 text-xs font-inter relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <h4 className="font-anton text-white text-2xl tracking-[0.18em] uppercase">BRO BIKE</h4>
            <p className="leading-relaxed text-slate-400">
              The next-generation motorcycle discovery platform. Built with cinematic precision and driven by premium design filters.
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="font-anton text-white tracking-widest uppercase text-[10px]">SERIES SEGMENTS</h5>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection(featuredRef)} className="hover:text-orange-500 text-slate-400 transition-colors">SUPER SPORT</button></li>
              <li><button onClick={() => scrollToSection(featuredRef)} className="hover:text-orange-500 text-slate-400 transition-colors">ADVENTURE TOURING</button></li>
              <li><button onClick={() => scrollToSection(featuredRef)} className="hover:text-orange-500 text-slate-400 transition-colors">CYBER ELECTRIC</button></li>
              <li><button onClick={() => scrollToSection(featuredRef)} className="hover:text-orange-500 text-slate-400 transition-colors">HIGHWAY CRUISER</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-anton text-white tracking-widest uppercase text-[10px]">RETAIL SYSTEMS</h5>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection(showroomRef)} className="hover:text-orange-500 text-slate-400 transition-colors">EXPERIENCE ZONES</button></li>
              <li><button onClick={() => scrollToSection(showroomRef)} className="hover:text-orange-500 text-slate-400 transition-colors">SERVICE LABS</button></li>
              <li><button onClick={() => scrollToSection(compareRef)} className="hover:text-orange-500 text-slate-400 transition-colors">EMI CALCULATOR</button></li>
              <li><button onClick={() => scrollToSection(upcomingRef)} className="hover:text-orange-500 text-slate-400 transition-colors">LAUNCH TRACKER</button></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="font-anton text-white tracking-widest uppercase text-[10px]">NEWSLETTER OUTLET</h5>
            <p className="leading-relaxed text-slate-400">Sign up to receive early allocations and invites to physical launch events.</p>
            <div className="flex bg-slate-800 border border-slate-700 p-1 rounded-lg">
              <input
                type="email"
                placeholder="Enter email address..."
                className="bg-transparent border-0 px-3 py-1.5 w-full focus:outline-none text-[11px] text-white placeholder-slate-500"
              />
              <button className="bg-orange-600 text-white font-anton uppercase text-[10px] tracking-wider px-4 py-2 hover:bg-orange-500 rounded-md transition-colors">
                SUBSCRIBE
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10px]">
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
