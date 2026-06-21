import React, { useState } from 'react';
import { SHOWROOMS } from '../data/bikes';
import { Search, MapPin, Phone, Clock, Star, ShieldAlert } from 'lucide-react';

interface ShowroomFinderProps {
  onBookTestRide: (showroomName: string) => void;
}

export const ShowroomFinder: React.FC<ShowroomFinderProps> = ({ onBookTestRide }) => {
  const [pincodeQuery, setPincodeQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Showroom' | 'Service'>('All');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const filteredLocations = SHOWROOMS.filter((loc) => {
    // 1. Pincode filter
    if (pincodeQuery.trim() !== '') {
      if (!loc.pincode.includes(pincodeQuery.trim())) return false;
    }

    // 2. Type filter
    if (filterType === 'Showroom' && loc.isServiceCenter && loc.name.toLowerCase().includes('service')) return false;
    if (filterType === 'Service' && !loc.isServiceCenter) return false;

    return true;
  });

  return (
    <section className="bg-slate-50 text-slate-900 py-24 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <span className="font-anton tracking-wider text-orange-600 text-sm block mb-3 uppercase">
              RETAIL & CARE NETWORK
            </span>
            <h2 className="font-anton text-5xl md:text-8xl uppercase leading-none tracking-tight text-slate-900">
              FIND DEALER
            </h2>
            <p className="font-inter text-slate-500 text-base md:text-lg max-w-xl mt-4 leading-relaxed">
              Explore authorized experience zones and diagnostic service labs near your location.
            </p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch mb-12">
          
          {/* Search Field */}
          <form onSubmit={handleSearch} className="flex relative bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="pl-4 flex items-center text-slate-400">
              <Search className="h-4.5 w-4.5" />
            </div>
            <input
              type="text"
              placeholder="Enter Pincode (e.g. 560001)..."
              value={pincodeQuery}
              onChange={(e) => setPincodeQuery(e.target.value)}
              className="w-full bg-transparent border-0 px-3 py-4 text-xs font-inter text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </form>

          {/* Toggle Type buttons */}
          <div className="bg-white p-1 border border-slate-200 flex grid grid-cols-3 gap-1 rounded-xl shadow-sm">
            {(['All', 'Showroom', 'Service'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`py-2 text-xs font-anton uppercase transition-all duration-200 rounded-lg cursor-pointer ${
                  filterType === type
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* GPS Quick Indicator */}
          <div className="bg-white border border-slate-200 p-4 flex items-center gap-3 rounded-xl shadow-sm">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-600 animate-pulse" />
            <div className="text-[10px] font-inter text-slate-500">
              <span className="font-bold text-slate-800 block uppercase">Location GPS Active</span>
              Displaying Bengaluru metro hubs by default.
            </div>
          </div>

        </div>

        {/* Dynamic Display Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Locations List */}
          <div className="w-full lg:w-3/5 space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc) => (
                <div
                  key={loc.id}
                  className="bg-white border border-slate-200/80 p-6 flex flex-col md:flex-row justify-between gap-6 hover:border-orange-500/50 transition-colors duration-300 rounded-2xl shadow-sm"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`px-2 py-0.5 text-[9px] font-anton tracking-wider uppercase rounded ${
                          loc.isServiceCenter && loc.name.toLowerCase().includes('service') 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {loc.isServiceCenter && loc.name.toLowerCase().includes('service') ? 'SERVICE ONLY' : 'EXPERIENCE CENTER'}
                        </span>
                        <div className="flex items-center text-orange-600 text-xs">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="font-anton ml-1">{loc.rating}</span>
                        </div>
                      </div>
                      <h4 className="font-anton text-xl uppercase tracking-tight text-slate-900 leading-tight">{loc.name}</h4>
                    </div>

                    {/* Meta info */}
                    <div className="space-y-2 text-xs font-inter text-slate-600">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span>{loc.address} (PIN: {loc.pincode})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        <span>{loc.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        <span>{loc.hours}</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking CTA */}
                  <div className="flex flex-col justify-end items-stretch md:items-end gap-3 min-w-[150px]">
                    <span className="text-right font-anton text-xs text-orange-600 tracking-wider block">
                      {loc.distance}
                    </span>
                    {!loc.name.toLowerCase().includes('service') && (
                      <button
                        onClick={() => onBookTestRide(loc.name)}
                        className="w-full py-2 bg-slate-900 text-white font-anton text-xs uppercase rounded-lg hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
                      >
                        BOOK TEST RIDE
                      </button>
                    )}
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(loc.name + " " + loc.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-transparent text-center border border-slate-200 text-slate-600 font-anton text-xs uppercase rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
                    >
                      DIRECTIONS →
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white border border-slate-200 p-12 text-center flex flex-col items-center justify-center rounded-2xl shadow-sm">
                <ShieldAlert className="h-10 w-10 text-red-500 mb-4" />
                <h4 className="font-anton text-xl uppercase text-slate-800 mb-2">No Dealerships Found</h4>
                <p className="font-inter text-slate-400 text-sm max-w-sm">
                  Try clearing your search query or entering standard Bengaluru coordinates (e.g. 560001, 560034).
                </p>
              </div>
            )}
          </div>

          {/* Interactive Map Visualizer */}
          <div className="w-full lg:w-2/5 bg-white border border-slate-200 p-6 flex flex-col justify-between relative min-h-[300px] lg:min-h-auto overflow-hidden rounded-2xl shadow-sm">
            {/* Mock Map Background Grid */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-light" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-light)" />
              </svg>
            </div>

            {/* Custom map pins */}
            <div className="relative z-10 flex-1 flex items-center justify-center h-full">
              <div className="absolute top-1/4 left-1/3 bg-orange-600 text-white text-[9px] font-anton px-2 py-0.5 rounded shadow-sm flex items-center gap-1 animate-bounce">
                <MapPin className="h-3 w-3" /> SR-1
              </div>
              <div className="absolute top-2/3 left-1/4 bg-amber-500 text-white text-[9px] font-anton px-2 py-0.5 rounded shadow-sm flex items-center gap-1 animate-pulse">
                <MapPin className="h-3 w-3" /> SERVICE LAB
              </div>
              <div className="absolute top-1/2 left-2/3 bg-orange-600 text-white text-[9px] font-anton px-2 py-0.5 rounded shadow-sm flex items-center gap-1 animate-bounce" style={{ animationDelay: '0.3s' }}>
                <MapPin className="h-3 w-3" /> SR-2
              </div>
              
              <span className="font-anton text-xs text-slate-200 uppercase tracking-widest pointer-events-none select-none">
                GEOGRAPHIC NETWORK MAP
              </span>
            </div>

            {/* Map footer coordinates */}
            <div className="relative z-10 border-t border-slate-100 pt-4 flex justify-between text-[9px] font-inter text-slate-400 font-medium">
              <span>LAT: 12.9716° N</span>
              <span>LON: 77.5946° E</span>
              <span>ZOOM: 12x</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
