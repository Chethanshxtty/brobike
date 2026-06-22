import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Motorcycle, MOTORCYCLES } from '../data/bikes';
import { Eye, Landmark, Compass, Award } from 'lucide-react';
import { handleImageError } from '../utils/imageFallback';

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
  'Royal Enfield',
  'Bajaj',
  'TVS',
  'Hero MotoCorp',
  'Ola Electric',
  'Ather Energy',
  'Ultraviolette'
];

export const SmartFinder: React.FC<SmartFinderProps> = ({ onSelectBike }) => {
  const [budgetLimit, setBudgetLimit] = useState<number>(5.0); // Defaults to 5.0 Lakh (Show All)
  const [customInput, setCustomInput] = useState<string>('');
  const [brandFilterMode, setBrandFilterMode] = useState<'all' | 'custom'>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('Royal Enfield');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Derive the active budget limit in Rupees
  const activeBudget = budgetLimit >= 5.0
    ? 9900000 // Unlimited / Show All
    : budgetLimit * 100000;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setBudgetLimit(val);
    setCustomInput(val >= 5.0 ? '' : val.toFixed(2));
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setCustomInput(val);
      if (val === '') {
        setBudgetLimit(5.0);
      } else {
        const parsed = parseFloat(val);
        if (!isNaN(parsed) && parsed > 0) {
          setBudgetLimit(parsed);
        }
      }
    }
  };

  const handlePresetSelect = (value: number) => {
    const lakhVal = value / 100000;
    setBudgetLimit(lakhVal);
    setCustomInput(lakhVal.toFixed(2));
  };

  const clearFilters = () => {
    setBudgetLimit(5.0);
    setCustomInput('');
    setBrandFilterMode('all');
    setSelectedBrand('Royal Enfield');
    setCategoryFilter('All');
  };

  // Filter only Indian company bikes matching budget and brand selections
  const filteredBikes = MOTORCYCLES.filter((bike) => {
    // 1. Brand check
    if (brandFilterMode === 'custom' && bike.brand !== selectedBrand) {
      return false;
    }

    // 2. Budget check (comparing ex-showroom base price)
    if (bike.price > activeBudget) {
      return false;
    }

    // 3. Category check
    if (categoryFilter !== 'All' && bike.category !== categoryFilter) {
      return false;
    }

    return true;
  }).sort((a, b) => a.price - b.price); // Default sorted from cheapest price to more expensive

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
            <label className="font-anton text-xs tracking-wider uppercase text-slate-500 block">
              1. SELECT OR ENTER BUDGET LIMIT
            </label>
            
            {/* Range Slider + Inputs */}
            <div className="space-y-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-anton text-slate-400 uppercase tracking-widest block font-semibold">BUDGET RANGE FILTER</span>
                  <div className="flex items-baseline gap-2">
                    {budgetLimit >= 5.0 ? (
                      <span className="font-anton text-2xl text-slate-900 uppercase">
                        All Budgets (Cheapest to Expensive)
                      </span>
                    ) : (
                      <>
                        <span className="text-slate-500 font-inter text-xs">Up to</span>
                        <span className="font-anton text-2xl text-slate-900 uppercase">
                          ₹{budgetLimit.toFixed(2)} Lakh
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Custom Input Box */}
                <div className="flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 rounded-xl w-full sm:w-auto sm:min-w-[180px]">
                  <span className="text-[10px] font-anton text-slate-400 uppercase">Enter Lakh:</span>
                  <input
                    type="text"
                    placeholder="e.g. 2.25"
                    value={customInput}
                    onChange={handleCustomInputChange}
                    className="bg-transparent border-0 w-full focus:outline-none text-xs font-anton text-slate-800"
                  />
                </div>
              </div>

              {/* Styled Slider */}
              <div className="relative pt-2">
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.05"
                  value={budgetLimit}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <div className="flex justify-between text-[9px] font-anton text-slate-400 uppercase tracking-wider mt-2.5 px-0.5">
                  <span>₹1.0 Lakh</span>
                  <span>₹2.0 L</span>
                  <span>₹3.0 L</span>
                  <span>₹4.0 L</span>
                  <span>₹5.0+ Lakh (Max)</span>
                </div>
              </div>

              {/* Snap Presets */}
              <div className="space-y-2.5">
                <span className="text-[9px] font-anton text-slate-400 uppercase tracking-widest block font-semibold">QUICK SNAP LIMITS</span>
                <div className="flex flex-wrap gap-2">
                  {BUDGET_PRESETS.map((preset) => {
                    const lakhVal = preset.value / 100000;
                    const isActive = Math.abs(budgetLimit - lakhVal) < 0.01;
                    return (
                      <button
                        key={preset.value}
                        onClick={() => handlePresetSelect(preset.value)}
                        className={`px-3 py-1.5 text-[10px] font-anton uppercase rounded-lg border transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-orange-600 border-orange-600 text-white shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-355 hover:bg-slate-50'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Indian Companies List */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <label className="font-anton text-xs tracking-wider uppercase text-slate-500 block">
              2. CHOOSE MANUFACTURER (INDIAN BRANDS)
            </label>

            {/* Premium Dual-state Mode Toggler */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl max-w-[280px] relative">
              <button
                onClick={() => setBrandFilterMode('all')}
                className={`flex-1 py-2 text-xs font-anton uppercase rounded-xl relative transition-colors duration-300 z-10 cursor-pointer text-center ${
                  brandFilterMode === 'all' ? 'text-white' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                All Brands
                {brandFilterMode === 'all' && (
                  <motion.div
                    layoutId="activeBrandMode"
                    className="absolute inset-0 bg-slate-900 rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
              <button
                onClick={() => setBrandFilterMode('custom')}
                className={`flex-1 py-2 text-xs font-anton uppercase rounded-xl relative transition-colors duration-300 z-10 cursor-pointer text-center ${
                  brandFilterMode === 'custom' ? 'text-white' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Choose Brands
                {brandFilterMode === 'custom' && (
                  <motion.div
                    layoutId="activeBrandMode"
                    className="absolute inset-0 bg-slate-900 rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            </div>

            {/* Individual Brand Buttons (smooth fade drop-down) */}
            <AnimatePresence>
              {brandFilterMode === 'custom' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden pt-2"
                >
                  <div className="flex flex-wrap gap-2.5">
                    {INDIAN_COMPANIES.map((brand) => {
                      const isActive = selectedBrand === brand;
                      return (
                        <button
                          key={brand}
                          onClick={() => setSelectedBrand(brand)}
                          className={`px-4 py-2.5 text-xs font-anton uppercase border rounded-xl transition-all duration-200 cursor-pointer ${
                            isActive
                              ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-350 hover:bg-slate-50'
                          }`}
                        >
                          {brand}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Row 3: Category Filters */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <label className="font-anton text-xs tracking-wider uppercase text-slate-500 block">
              3. CHOOSE CATEGORY
            </label>
            <div className="flex flex-wrap gap-2.5">
              {['All', 'Sport', 'Adventure', 'Electric', 'Premium', 'Mileage'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2.5 text-xs font-anton uppercase border rounded-xl transition-all duration-200 cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-orange-600 border-orange-600 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-355 hover:bg-slate-50'
                  }`}
                >
                  {cat === 'All' ? '🌐 All Categories' : cat}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Deck */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-anton text-xs tracking-widest text-slate-400 uppercase">
              MATCHING MACHINES ({filteredBikes.length})
            </h3>
            {(brandFilterMode !== 'all' || budgetLimit < 5.0 || categoryFilter !== 'All') && (
              <button
                onClick={clearFilters}
                className="text-xs font-anton text-orange-600 hover:underline uppercase cursor-pointer"
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
                            onError={(e) => handleImageError(e, bike.category)}
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
