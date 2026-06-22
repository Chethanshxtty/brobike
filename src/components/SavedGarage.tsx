import React from 'react';
import { type Motorcycle, MOTORCYCLES } from '../data/bikes';
import { Heart, Trash2, Eye, TrendingDown, BellRing, Sparkles } from 'lucide-react';
import { handleImageError } from '../utils/imageFallback';

interface SavedGarageProps {
  savedIds: string[];
  onRemove: (id: string) => void;
  onSelectBike: (bike: Motorcycle) => void;
}

export const SavedGarage: React.FC<SavedGarageProps> = ({ savedIds, onRemove, onSelectBike }) => {
  const savedBikes = MOTORCYCLES.filter((b) => savedIds.includes(b.id));

  return (
    <section className="bg-slate-50 text-slate-900 py-24 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="mb-12">
          <span className="font-anton tracking-wider text-orange-600 text-sm block mb-3 uppercase">
            PERSONAL SHOWCASE
          </span>
          <h2 className="font-anton text-5xl md:text-8xl uppercase leading-none tracking-tight text-slate-900">
            SAVED GARAGE
          </h2>
          <p className="font-inter text-slate-500 text-base md:text-lg max-w-xl mt-4 leading-relaxed">
            Monitor pricing fluctuations, manage custom alerts, and review specifications for bookmarked models in your dashboard.
          </p>
        </div>

        {savedBikes.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left side: Bookmarked List */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-anton text-xs tracking-widest text-slate-400 uppercase mb-4">
                BOOKMARKED VEHICLES ({savedBikes.length})
              </h3>

              <div className="space-y-4">
                {savedBikes.map((bike) => (
                  <div
                    key={bike.id}
                    className="bg-white border border-slate-200/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-orange-500/30 transition-colors duration-200 rounded-2xl shadow-sm"
                  >
                    {/* Bike info */}
                    <div className="flex items-center gap-6 w-full sm:w-auto">
                      <div className="h-20 w-24 flex items-center justify-center relative flex-shrink-0 bg-slate-50 rounded-xl">
                        <img
                          src={bike.heroImage}
                          alt={bike.name}
                          onError={(e) => handleImageError(e, bike.category)}
                          className="max-h-16 object-contain relative z-10"
                        />
                      </div>

                      <div>
                        <span className="font-inter text-[9px] text-orange-600 font-bold uppercase tracking-widest block mb-0.5">
                          {bike.brand} • {bike.category}
                        </span>
                        <h4 className="font-anton text-xl uppercase tracking-tight text-slate-900">
                          {bike.name}
                        </h4>
                        <p className="font-inter text-xs text-slate-500">
                          Ex-showroom: ₹{new Intl.NumberFormat('en-IN').format(bike.price)}
                        </p>
                      </div>
                    </div>

                    {/* Price track */}
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                      <div className="text-left sm:text-right">
                        <span className="font-anton text-xs text-green-600 tracking-wider uppercase block">
                          TREND: {bike.pricePrediction.marketTrend}
                        </span>
                        <span className="font-inter text-[10px] text-slate-400 block mt-0.5">
                          {bike.pricePrediction.bestTimeToBuy}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => onSelectBike(bike)}
                          className="p-2.5 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Inspect Vehicle"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onRemove(bike.id)}
                          className="p-2.5 bg-slate-50 border border-slate-200 text-red-500 hover:bg-red-50 hover:text-white hover:border-red-500 rounded-lg transition-colors cursor-pointer"
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
              <h3 className="font-anton text-xs tracking-widest text-slate-400 uppercase mb-4">
                GARAGE INSIGHTS
              </h3>

              <div className="bg-white border border-slate-200 p-6 space-y-6 rounded-2xl shadow-sm">
                <div className="flex gap-3 items-start">
                  <TrendingDown className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-anton text-sm uppercase text-slate-900 tracking-wider">Festival Rebate Active</h4>
                    <p className="font-inter text-xs text-slate-500 leading-relaxed mt-1">
                      Our price prediction algorithm expects discount drops of up to ₹20,000 on premium models during the next festival cycle.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start border-t border-slate-100 pt-4">
                  <BellRing className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-anton text-sm uppercase text-slate-900 tracking-wider">SMS Price Alerts</h4>
                    <p className="font-inter text-xs text-slate-500 leading-relaxed mt-1">
                      Toggle alerts to receive immediate WhatsApp notifications when your bookmarked models see dealership rebates.
                    </p>
                    <button className="mt-3 px-4 py-2 bg-slate-900 text-white font-anton text-[10px] tracking-wider uppercase rounded-lg hover:bg-orange-600 transition-colors cursor-pointer">
                      SUBSCRIBE ALERTS
                    </button>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 border border-orange-100 space-y-2 rounded-xl">
                  <span className="font-anton text-orange-700 tracking-wider uppercase text-[10px] flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-orange-600" /> Quick Comparison Tip
                  </span>
                  <p className="font-inter text-[10px] text-slate-600 leading-relaxed">
                    Compare these saved vehicles side-by-side in the Compare Bikes module by selecting them from the slots.
                  </p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-white border border-slate-200 p-16 text-center flex flex-col items-center justify-center rounded-2xl shadow-sm">
            <Heart className="h-12 w-12 text-slate-200 mb-4" />
            <h3 className="font-anton text-2xl uppercase text-slate-800 mb-2">Your garage is currently empty</h3>
            <p className="font-inter text-slate-400 text-sm max-w-sm mb-6 leading-relaxed">
              Bookmark any motorcycle model from our catalog to monitor on-road costs, accessories, and price predictions in one place.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
