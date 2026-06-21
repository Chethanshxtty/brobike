import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Motorcycle, MOTORCYCLES } from '../data/bikes';
import { Eye, Landmark, Compass, Award } from 'lucide-react';

interface SmartFinderProps {
  onSelectBike: (bike: Motorcycle) => void;
}

const BUDGET_PRESETS = [
  { label: '1.5 Lakh', value: 150000 },
  { label: '2.0 Lakh', value: 200000 },
  { label: '2.5 Lakh', value: 250000 },
  { label: '3.0 Lakh', value: 300000 },
  { label: '3.5 Lakh', value: 350000 },
  { label: '4.0 Lakh', value: 400000 }
];

const INDIAN_COMPANIES = [
  'All Brands',
  'Royal Enfield',
  'Bajaj',
  'TVS',
  'Hero MotoCorp',
  'Ola Electric',
  'Ather Energy',
  'Ultraviolette'
];

export const SmartFinder: React.FC<SmartFinderProps> = ({ onSelectBike }) => {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [customBudget, setCustomBudget] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('All Brands');

  // Derive the active budget limit
  const activeBudget = customBudget !== '' 
    ? parseFloat(customBudget) * 100000 // Convert Lakh to absolute rupee if it has a decimal
    : (selectedPreset || 9900000); // Defaults to high number if none

  const handlePresetSelect = (value: number) => {
    setSelectedPreset(value);
    setCustomBudget((value / 100000).toFixed(1)); // Sync custom budget input in Lakh units
  };

  const handleCustomBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setCustomBudget(val);
      // Check if it matches a preset
      const numericVal = parseFloat(val) * 100000;
      const foundPreset = BUDGET_PRESETS.find(p => p.value === numericVal);
      if (foundPreset) {
        setSelectedPreset(foundPreset.value);
      } else {
        setSelectedPreset(null);
      }
    }
  };

  const clearFilters = () => {
    setSelectedPreset(null);
    setCustomBudget('');
    setSelectedBrand('All Brands');
  };

  // Filter only Indian company bikes matching budget and brand selections
  const filteredBikes = MOTORCYCLES.filter((bike) => {
    // 1. Brand check
    if (selectedBrand !== 'All Brands' && bike.brand !== selectedBrand) {
      return false;
    }

    // 2. Budget check (comparing ex-showroom base price)
    if (bike.price > activeBudget) {
      return false;
    }

    return true;
  });

  // EMI Calculator Helper: 20% down payment, 9.5% interest, 36 months
  const calculateEMI = (exShowroomPrice: number, rto: number, insurance: number, warranty: number) => {
    const totalOnRoadPrice = exShowroomPrice + rto + insurance + warranty;
    const downPayment = Math.round(totalOnRoadPrice * 0.2);
    const loanPrincipal = Math.max(0, totalOnRoadPrice - downPayment);
    const annualInterestRate = 9.5;
    const loanDurationMonths = 36;
    
    const r = (annualInterestRate / 100) / 12;
    if (loanPrincipal <= 0) return 0;
    
    const emi = Math.round(
      loanPrincipal * r * Math.pow(1 + r, loanDurationMonths) / 
      (Math.pow(1 + r, loanDurationMonths) - 1)
    );
    return emi;
  };

  return (
    <section className="bg-slate-50 text-slate-900 py-20 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="font-anton tracking-wider text-orange-600 text-sm block mb-2 uppercase">
              INDIAN GARAGE CATALOG
            </span>
            <h2 className="font-anton text-4xl md:text-7xl uppercase leading-none tracking-tight text-slate-900">
              FIND YOUR BIKE
            </h2>
            <p className="font-inter text-slate-500 text-sm md:text-base max-w-xl mt-3 leading-relaxed">
              Select or enter your target budget in Lakhs, choose an Indian motorcycle manufacturer, and compare real-world mileage and estimated EMI side-by-side.
            </p>
          </div>
        </div>

        {/* Filter Panel (Sleek and Trendy Light Container) */}
        <div className="bg-white border border-slate-200 p-8 shadow-sm rounded-2xl mb-12 space-y-8">
          
          {/* Row 1: Budget Controls */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <label className="font-anton text-xs tracking-wider uppercase text-slate-500">
                1. SELECT OR ENTER BUDGET LIMIT
              </label>
              {activeBudget !== 9900000 && (
                <span className="font-anton text-sm text-orange-600">
                  Showing bikes up to ₹{(activeBudget / 100000).toFixed(2)} Lakh
                </span>
              )}
            </div>
            
            {/* Presets Chips + Text Input */}
            <div className="flex flex-wrap items-center gap-3">
              {BUDGET_PRESETS.map((preset) => {
                const isActive = selectedPreset === preset.value;
                return (
                  <button
                    key={preset.value}
                    onClick={() => handlePresetSelect(preset.value)}
                    className={`px-4 py-2 text-xs font-anton uppercase rounded-full border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-orange-600 border-orange-600 text-white shadow-sm shadow-orange-500/20'
                        : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/60'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}

              <button
                onClick={() => {
                  setSelectedPreset(null);
                  setCustomBudget('');
                }}
                className={`px-4 py-2 text-xs font-anton uppercase rounded-full border transition-all duration-200 cursor-pointer ${
                  selectedPreset === null && customBudget === ''
                    ? 'bg-orange-600 border-orange-600 text-white shadow-sm shadow-orange-500/20'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                Show All
              </button>

              {/* Custom Input Box */}
              <div className="flex items-center gap-2 border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-full min-w-[200px] ml-auto">
                <span className="text-[10px] font-anton text-slate-400 uppercase">Custom (Lakh):</span>
                <input
                  type="text"
                  placeholder="e.g. 2.25"
                  value={customBudget}
                  onChange={handleCustomBudgetChange}
                  className="bg-transparent border-0 w-full focus:outline-none text-xs font-anton text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Indian Companies List */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <label className="font-anton text-xs tracking-wider uppercase text-slate-500 block">
              2. CHOOSE MANUFACTURER (INDIAN BRANDS)
            </label>
            <div className="flex flex-wrap gap-2.5">
              {INDIAN_COMPANIES.map((brand) => {
                const isActive = selectedBrand === brand;
                return (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-4 py-2 text-xs font-anton uppercase border rounded-xl transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {brand === 'All Brands' ? '🇮🇳 All Indian Brands' : brand}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Results Deck */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-anton text-xs tracking-widest text-slate-400 uppercase">
              MATCHING MACHINES ({filteredBikes.length})
            </h3>
            {(selectedBrand !== 'All Brands' || customBudget !== '' || selectedPreset !== null) && (
              <button
                onClick={clearFilters}
                className="text-xs font-anton text-orange-600 hover:underline uppercase"
              >
                Clear Filters ×
              </button>
            )}
          </div>

          <AnimatePresence mode="popLayout">
            {filteredBikes.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredBikes.map((bike) => {
                  const estimatedEMI = calculateEMI(
                    bike.price,
                    bike.pricing.rto,
                    bike.pricing.insuranceZeroDep,
                    bike.pricing.warranty
                  );

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3 }}
                      key={bike.id}
                      className="bg-white border border-slate-200/80 p-6 flex flex-col justify-between group relative shadow-sm hover:shadow-md hover:border-orange-500/50 rounded-2xl transition-all duration-300"
                    >
                      <div>
                        {/* Badges Header */}
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-inter text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            {bike.brand} • {bike.category}
                          </span>
                          <span className="font-anton text-[10px] text-slate-800 px-2 py-0.5 bg-slate-100 rounded">
                            {bike.safetyRating} Safety
                          </span>
                        </div>

                        {/* Motorcycle Product Shot */}
                        <div className="h-44 w-full flex items-center justify-center overflow-hidden mb-4 relative bg-slate-50/50 rounded-xl">
                          <div 
                            className="absolute inset-0 opacity-5 scale-90 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-10"
                            style={{ backgroundColor: bike.themeColor }}
                          />
                          <img
                            src={bike.heroImage}
                            alt={bike.name}
                            className="max-h-36 object-contain transform group-hover:scale-105 transition-transform duration-500 relative z-10"
                          />
                        </div>

                        {/* Text Content */}
                        <h4 className="font-anton text-2xl uppercase tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors duration-300">
                          {bike.name}
                        </h4>
                        <p className="font-inter text-xs text-slate-500 line-clamp-2 mt-1 mb-4 leading-relaxed">
                          {bike.tagline}
                        </p>

                        {/* Key Indian specs: Mileage & EMI */}
                        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-6 text-xs font-inter">
                          <div className="flex items-center gap-2">
                            <Compass className="h-4 w-4 text-orange-600 flex-shrink-0" />
                            <div>
                              <span className="text-[9px] text-slate-400 block uppercase font-medium">Real Mileage</span>
                              <span className="font-anton text-slate-800 text-[13px]">
                                {bike.mileage.realWorld} {bike.category === 'Electric' ? 'km (Range)' : 'km/l'}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                            <Landmark className="h-4 w-4 text-orange-600 flex-shrink-0" />
                            <div>
                              <span className="text-[9px] text-slate-400 block uppercase font-medium">Estimated EMI</span>
                              <span className="font-anton text-slate-800 text-[13px]">
                                ₹{new Intl.NumberFormat('en-IN').format(estimatedEMI)}/mo
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* On-Road Price & Actions */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wide">EX-SHOWROOM PRICE</span>
                          <span className="font-anton text-lg text-slate-800">
                            ₹{(bike.price / 100000).toFixed(2)} Lakh
                          </span>
                        </div>
                        
                        <button
                          onClick={() => onSelectBike(bike)}
                          className="px-4 py-2 bg-slate-900 text-white font-anton text-xs uppercase rounded-lg hover:bg-orange-600 hover:shadow-sm transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" /> Details
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white border border-slate-200 p-12 text-center flex flex-col items-center justify-center rounded-2xl shadow-sm"
              >
                <Award className="h-10 w-10 text-slate-300 mb-4" />
                <h4 className="font-anton text-2xl uppercase text-slate-800 mb-2">No matching bikes found</h4>
                <p className="font-inter text-slate-400 text-sm max-w-md mb-6 leading-relaxed">
                  Try increasing your budget limit or choosing a different manufacturer to explore the complete catalog.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-orange-600 text-white font-anton text-xs uppercase rounded-full hover:bg-slate-900 transition-colors duration-200 cursor-pointer"
                >
                  RESET SEARCH FILTERS
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
