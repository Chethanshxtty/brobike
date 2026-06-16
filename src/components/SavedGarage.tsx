import React from 'react';
import { type Motorcycle, MOTORCYCLES } from '../data/bikes';
import { Heart, Trash2, Eye, TrendingDown, BellRing, Sparkles } from 'lucide-react';


interface SavedGarageProps {
  savedIds: string[];
  onRemove: (id: string) => void;
  onSelectBike: (bike: Motorcycle) => void;
}

export const SavedGarage: React.FC<SavedGarageProps> = ({ savedIds, onRemove, onSelectBike }) => {
  const savedBikes = MOTORCYCLES.filter((b) => savedIds.includes(b.id));

  return (
    <section className="bg-[#080808] text-white py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="mb-12">
          <span className="font-anton tracking-wider text-[#E8FF00] text-sm block mb-3 uppercase">
            PERSONAL SHOWCASE
          </span>
          <h2 className="font-anton text-5xl md:text-8xl uppercase leading-none tracking-tight">
            SAVED GARAGE
          </h2>
          <p className="font-inter text-white/50 text-base md:text-lg max-w-xl mt-4 leading-relaxed">
            Monitor pricing fluctuations, manage custom alerts, and review specifications for bookmarked models in your dynamic dashboard.
          </p>
        </div>

        {savedBikes.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left side: Bookmarked List */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-anton text-xs tracking-widest text-white/40 uppercase mb-4">
                BOOKMARKED VEHICLES ({savedBikes.length})
              </h3>

              <div className="space-y-4">
                {savedBikes.map((bike) => (
                  <div
                    key={bike.id}
                    className="bg-black/30 backdrop-blur-md border border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-[#E8FF00]/40 transition-colors duration-200"
                  >
                    {/* Bike info */}
                    <div className="flex items-center gap-6 w-full sm:w-auto">
                      <div className="h-20 w-24 flex items-center justify-center relative flex-shrink-0">
                        <img
                          src={bike.heroImage}
                          alt={bike.name}
                          className="max-h-16 object-contain relative z-10"
                        />
                      </div>

                      <div>
                        <span className="font-inter text-[9px] text-[#E8FF00] uppercase tracking-widest block mb-0.5">
                          {bike.category}
                        </span>
                        <h4 className="font-anton text-xl uppercase tracking-tight text-white">
                          {bike.name}
                        </h4>
                        <p className="font-inter text-xs text-white/50">
                          Ex-showroom: ₹{new Intl.NumberFormat('en-IN').format(bike.price)}
                        </p>
                      </div>
                    </div>

                    {/* Price track */}
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                      <div className="text-right">
                        <span className="font-anton text-xs text-success tracking-wider uppercase block">
                          TREND: {bike.pricePrediction.marketTrend}
                        </span>
                        <span className="font-inter text-[10px] text-white/40 block mt-0.5">
                          {bike.pricePrediction.bestTimeToBuy}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => onSelectBike(bike)}
                          className="p-2.5 bg-black border border-white/10 text-white hover:bg-[#E8FF00] hover:text-black hover:border-[#E8FF00] transition-colors"
                          title="Inspect Vehicle"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onRemove(bike.id)}
                          className="p-2.5 bg-black border border-white/10 text-danger hover:bg-danger hover:text-white hover:border-danger transition-colors"
                          title="Remove bookmark"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Price Tracker widget */}
            <div className="space-y-6">
              <h3 className="font-anton text-xs tracking-widest text-white/40 uppercase mb-4">
                GARAGE INSIGHTS
              </h3>

              <div className="bg-black/30 backdrop-blur-md border border-white/10 p-6 space-y-6">
                <div className="flex gap-3 items-start">
                  <TrendingDown className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-anton text-sm uppercase text-white tracking-wider">Festival Rebate Active</h4>
                    <p className="font-inter text-xs text-white/60 leading-relaxed mt-1">
                      Our price prediction algorithm expects discount drops of up to ₹20,000 on premium models during the next festival cycle.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start border-t border-white/10 pt-4">
                  <BellRing className="h-5 w-5 text-[#E8FF00] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-anton text-sm uppercase text-white tracking-wider">SMS Price Alerts</h4>
                    <p className="font-inter text-xs text-white/60 leading-relaxed mt-1">
                      Toggle alerts to receive immediate WhatsApp notifications when your bookmarked models see dealership rebates.
                    </p>
                    <button className="mt-3 px-4 py-1.5 bg-black border border-[#E8FF00]/40 text-[#E8FF00] font-anton text-[10px] tracking-wider uppercase hover:bg-[#E8FF00] hover:text-black hover:border-[#E8FF00] transition-colors">
                      SUBSCRIBE ALERTS
                    </button>
                  </div>
                </div>

                <div className="bg-black/60 p-4 border border-white/5 space-y-2">
                  <span className="font-anton text-[#E8FF00] tracking-wider uppercase text-[10px] flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Quick Comparison Tip
                  </span>
                  <p className="font-inter text-[10px] text-white/50 leading-relaxed">
                    Compare these saved vehicles side-by-side in the Compare Bikes module by selecting them from the slots.
                  </p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-black/30 backdrop-blur-md border border-white/10 p-16 text-center flex flex-col items-center justify-center">
            <Heart className="h-12 w-12 text-white/20 mb-4 animate-pulse" />
            <h3 className="font-anton text-2xl uppercase mb-2">Your garage is currently empty</h3>
            <p className="font-inter text-white/50 text-sm max-w-sm mb-6">
              Bookmark any motorcycle model from our catalog to monitor on-road costs, accessories, and price predictions in one place.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
