import React, { useState } from 'react';
import { MOTORCYCLES, type Motorcycle } from '../data/bikes';
import { GitCompare, Sparkles, Check, X } from 'lucide-react';

export const CompareBikes: React.FC = () => {
  // Pre-load slots with the first three bikes by default, leaving the fourth empty
  const [selectedIds, setSelectedIds] = useState<string[]>([
    MOTORCYCLES[0].id,
    MOTORCYCLES[1].id,
    MOTORCYCLES[2].id,
    ''
  ]);

  const handleSelectBike = (slotIndex: number, bikeId: string) => {
    const nextIds = [...selectedIds];
    nextIds[slotIndex] = bikeId;
    setSelectedIds(nextIds);
  };

  const getComparedBikes = () => {
    return selectedIds.map(id => MOTORCYCLES.find(b => b.id === id)).filter(Boolean) as Motorcycle[];
  };

  const comparedBikes = getComparedBikes();

  // Highlight calculations based on compared subset
  const getHighlights = (bike: Motorcycle) => {
    const highlights: string[] = [];
    if (comparedBikes.length <= 1) return highlights;

    const prices = comparedBikes.map(b => b.price);
    const powers = comparedBikes.map(b => parseFloat(b.specs.power.match(/\d+/)?.[0] || '0'));
    const mileages = comparedBikes.map(b => b.mileage.claimed);
    const serviceCosts = comparedBikes.map(b => b.maintenance.annualCost);

    // Best Value (Lowest Price)
    if (bike.price === Math.min(...prices)) {
      highlights.push('Best Value');
    }
    // Best Performance (Highest Power)
    const bikePower = parseFloat(bike.specs.power.match(/\d+/)?.[0] || '0');
    if (bikePower === Math.max(...powers) && bike.category !== 'Mileage') {
      highlights.push('Best Performance');
    }
    // Best Mileage (Highest Claimed Mileage/Range)
    if (bike.mileage.claimed === Math.max(...mileages)) {
      highlights.push(bike.category === 'Electric' ? 'Best Range' : 'Best Mileage');
    }
    // Best Service Cost (Lowest Annual Maintenance)
    if (bike.maintenance.annualCost === Math.min(...serviceCosts)) {
      highlights.push('Best Service Cost');
    }
    // Best Touring (Adventure or Cruiser Category)
    if (bike.category === 'Adventure' || bike.category === 'Premium') {
      highlights.push('Best Touring');
    }

    return highlights;
  };

  return (
    <section className="bg-slate-50 text-slate-900 py-24 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-anton tracking-wider text-orange-600 text-sm block mb-3 uppercase">
            SIDE-BY-SIDE MATRIX
          </span>
          <h2 className="font-anton text-5xl md:text-8xl uppercase leading-none tracking-tight text-slate-900">
            COMPARE BIKES
          </h2>
          <p className="font-inter text-slate-500 text-base md:text-lg max-w-xl mt-4 leading-relaxed">
            Directly compare specifications, pricing, and ownership profiles. Detail specific performance advantages without declaring arbitrary winners.
          </p>
        </div>

        {/* Dynamic Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {[0, 1, 2, 3].map((slotIdx) => {
            const bike = comparedBikes[slotIdx];
            return (
              <div
                key={slotIdx}
                className="bg-white border border-slate-200 p-6 flex flex-col justify-between relative rounded-2xl shadow-sm hover:border-orange-500/30 transition-colors duration-300"
              >
                
                {/* Selector Header */}
                <div className="mb-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-inter text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                      COMPARISON SLOT {slotIdx + 1}
                    </span>
                    {bike && (
                      <button
                        onClick={() => handleSelectBike(slotIdx, '')}
                        className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <select
                      value={bike?.id || ''}
                      onChange={(e) => handleSelectBike(slotIdx, e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-xs font-anton text-slate-800 uppercase rounded-xl focus:outline-none focus:border-orange-500 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-white">-- SELECT VEHICLE --</option>
                      {MOTORCYCLES.map((m) => (
                        <option
                          key={m.id}
                          value={m.id}
                          disabled={selectedIds.includes(m.id) && m.id !== bike?.id}
                          className="bg-white"
                        >
                          {m.name} ({m.brand})
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                      ▼
                    </div>
                  </div>
                </div>

                {bike ? (
                  <div className="flex-1 flex flex-col justify-between">
                    
                    {/* Bike Snapshot */}
                    <div className="mb-6">
                      <div className="h-36 w-full flex items-center justify-center relative mb-4 bg-slate-50/50 rounded-xl">
                        <img
                          src={bike.heroImage}
                          alt={bike.name}
                          className="max-h-28 object-contain relative z-10"
                        />
                      </div>

                      <h3 className="font-anton text-2xl uppercase tracking-tight text-slate-900 leading-snug">
                        {bike.name}
                      </h3>
                      <p className="font-inter text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {bike.tagline}
                      </p>
                    </div>

                    {/* Highlights Badges */}
                    <div className="mb-6 flex flex-wrap gap-1.5 min-h-[36px]">
                      {getHighlights(bike).map((hl, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-700 text-[9px] font-anton tracking-wider uppercase flex items-center gap-1 rounded"
                        >
                          <Sparkles className="h-2.5 w-2.5 text-orange-600" /> {hl}
                        </span>
                      ))}
                    </div>

                    {/* Specification Stack */}
                    <div className="space-y-3.5 border-t border-slate-100 pt-4 text-xs font-inter mb-6">
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-medium">PROPULSION TYPE</span>
                        <span className="font-semibold text-slate-800">{bike.brand} • {bike.category}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-medium">ENGINE / MOTOR</span>
                        <span className="font-semibold text-slate-800 line-clamp-1">{bike.specs.engine.split('Liquid')[0]}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-medium">POWER OUTPUT</span>
                        <span className="font-semibold text-slate-800">{bike.specs.power.split('@')[0]}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-medium">MAX SPEED</span>
                        <span className="font-semibold text-slate-800">{bike.specs.topSpeed}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-medium">REAL WORLD EFFICIENCY</span>
                        <span className="font-semibold text-slate-800">
                          {bike.mileage.realWorld} {bike.category === 'Electric' ? 'km (Range)' : 'km/l (Petrol)'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-medium">SAFETY SCORE</span>
                        <span className="font-semibold text-slate-800">{bike.safetyRating}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-medium">EX-SHOWROOM PRICE</span>
                        <span className="font-anton text-base text-orange-600 tracking-wider mt-0.5 block">
                          ₹{new Intl.NumberFormat('en-IN').format(bike.price)}
                        </span>
                      </div>
                    </div>

                    {/* Features checklist (summary of dynamic matches) */}
                    <div className="border-t border-slate-100 pt-4 space-y-2 text-[10px] text-slate-500">
                      <div className="flex items-center justify-between">
                        <span>Bi-directional Quickshifter</span>
                        {bike.features.some(f => f.toLowerCase().includes('quick shifter') || f.toLowerCase().includes('quickshifter')) ? (
                          <Check className="h-3.5 w-3.5 text-green-600" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-red-500" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Electronic Cruise Control</span>
                        {bike.features.some(f => f.toLowerCase().includes('cruise control')) ? (
                          <Check className="h-3.5 w-3.5 text-green-600" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-red-500" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Integrated Bluetooth Nav</span>
                        {bike.features.some(f => f.toLowerCase().includes('bluetooth') || f.toLowerCase().includes('navigation')) ? (
                          <Check className="h-3.5 w-3.5 text-green-600" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-red-500" />
                        )}
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-200 bg-slate-50/50 rounded-xl min-h-[350px]">
                    <GitCompare className="h-8 w-8 text-slate-300 mb-3" />
                    <p className="font-inter text-xs text-slate-400 max-w-[150px] leading-relaxed">
                      Select a bike from the dropdown list to compare specifications
                    </p>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
