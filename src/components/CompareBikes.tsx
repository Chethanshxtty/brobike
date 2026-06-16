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
    // Best Comfort (Cruiser stance)
    if (bike.id === 'imperial-1200') {
      highlights.push('Best Comfort');
    }
    // Best Features (High TFT dashboard & quickshifter options)
    if (bike.id === 'veloce-1000' || bike.id === 'imperial-1200') {
      highlights.push('Best Features');
    }

    return highlights;
  };

  return (
    <section className="bg-[#080808] text-white py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-anton tracking-wider text-[#E8FF00] text-sm block mb-3 uppercase">
            SIDE-BY-SIDE MATRIX
          </span>
          <h2 className="font-anton text-5xl md:text-8xl uppercase leading-none tracking-tight">
            COMPARE BIKES
          </h2>
          <p className="font-inter text-white/50 text-base md:text-lg max-w-xl mt-4 leading-relaxed">
            Directly compare specifications, pricing, and ownership profiles. Our dashboard details specific performance advantages without declaring arbitrary winners.
          </p>
        </div>

        {/* Dynamic Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {[0, 1, 2, 3].map((slotIdx) => {
            const bike = comparedBikes[slotIdx];
            return (
              <div
                key={slotIdx}
                className="bg-[#111111] border border-white/10 p-6 flex flex-col justify-between relative rounded-none hover:border-white/25 transition-colors duration-300"
              >
                
                {/* Selector Header */}
                <div className="mb-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-inter text-[10px] text-white/40 uppercase tracking-widest">
                      COMPARISON SLOT {slotIdx + 1}
                    </span>
                    {bike && (
                      <button
                        onClick={() => handleSelectBike(slotIdx, '')}
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  <select
                    value={bike?.id || ''}
                    onChange={(e) => handleSelectBike(slotIdx, e.target.value)}
                    className="w-full bg-black border border-white/15 px-3 py-2 text-xs font-anton text-white uppercase rounded-none focus:outline-none focus:border-[#E8FF00] appearance-none"
                  >
                    <option value="" className="bg-neutral-900">-- SELECT VEHICLE --</option>
                    {MOTORCYCLES.map((m) => (
                      <option
                        key={m.id}
                        value={m.id}
                        disabled={selectedIds.includes(m.id) && m.id !== bike?.id}
                        className="bg-neutral-900"
                      >
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                {bike ? (
                  <div className="flex-1 flex flex-col justify-between">
                    
                    {/* Bike Snapshot */}
                    <div className="mb-6">
                      <div className="h-36 w-full flex items-center justify-center relative mb-4">
                        <img
                          src={bike.heroImage}
                          alt={bike.name}
                          className="max-h-28 object-contain relative z-10"
                        />
                      </div>

                      <h3 className="font-anton text-2xl uppercase tracking-tight text-white">
                        {bike.name}
                      </h3>
                      <p className="font-inter text-xs text-white/50 line-clamp-1 mt-0.5">
                        {bike.tagline}
                      </p>
                    </div>

                    {/* Highlights Badges */}
                    <div className="mb-6 flex flex-wrap gap-1.5 min-h-[36px]">
                      {getHighlights(bike).map((hl, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-black border border-[#E8FF00]/40 text-[#E8FF00] text-[9px] font-anton tracking-wider uppercase flex items-center gap-1"
                        >
                          <Sparkles className="h-2.5 w-2.5" /> {hl}
                        </span>
                      ))}
                    </div>

                    {/* Specification Stack */}
                    <div className="space-y-3.5 border-t border-white/10 pt-4 text-xs font-inter mb-6">
                      <div>
                        <span className="text-[9px] text-white/40 uppercase tracking-widest block">PROPULSION TYPE</span>
                        <span className="font-semibold text-white/90">{bike.category}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-white/40 uppercase tracking-widest block">ENGINE / MOTOR</span>
                        <span className="font-semibold text-white/90 line-clamp-1">{bike.specs.engine.split('Liquid')[0]}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-white/40 uppercase tracking-widest block">POWER OUTPUT</span>
                        <span className="font-semibold text-white/90">{bike.specs.power.split('@')[0]}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-white/40 uppercase tracking-widest block">MAX SPEED</span>
                        <span className="font-semibold text-white/90">{bike.specs.topSpeed}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-white/40 uppercase tracking-widest block">REAL WORLD EFFICIENCY</span>
                        <span className="font-semibold text-white/90">
                          {bike.mileage.realWorld} {bike.category === 'Electric' ? 'km (Range)' : 'km/l (Petrol)'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-white/40 uppercase tracking-widest block">SAFETY SCORE</span>
                        <span className="font-semibold text-white/90">{bike.safetyRating}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-white/40 uppercase tracking-widest block">EX-SHOWROOM PRICE</span>
                        <span className="font-anton text-sm text-[#E8FF00] tracking-wider mt-0.5 block">
                          ₹{new Intl.NumberFormat('en-IN').format(bike.price)}
                        </span>
                      </div>
                    </div>

                    {/* Features checklist (summary of dynamic matches) */}
                    <div className="border-t border-white/5 pt-4 space-y-2 text-[10px] text-white/60">
                      <div className="flex items-center justify-between">
                        <span>Bi-directional Quickshifter</span>
                        {bike.features.includes('Bi-directional Quick Shifter') ? (
                          <Check className="h-3.5 w-3.5 text-success" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-danger" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Electronic Cruise Control</span>
                        {bike.features.includes('Cruise Control') || bike.features.includes('Electronic Cruise Control') ? (
                          <Check className="h-3.5 w-3.5 text-success" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-danger" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Integrated Bluetooth Nav</span>
                        {bike.features.includes('Bluetooth Connectivity') || bike.features.includes('Bluetooth Call/Music Control') || bike.features.includes('Bluetooth Infotainment Engine') ? (
                          <Check className="h-3.5 w-3.5 text-success" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-danger" />
                        )}
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/10 bg-black/20">
                    <GitCompare className="h-8 w-8 text-white/20 mb-3" />
                    <p className="font-inter text-xs text-white/40 max-w-[150px]">
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
