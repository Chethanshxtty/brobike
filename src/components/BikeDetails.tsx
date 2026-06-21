import React, { useState, useEffect } from 'react';
import { type Motorcycle, SHOWROOMS } from '../data/bikes';
import { X, Heart, Calculator, Award, TrendingDown, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BikeDetailsProps {
  bike: Motorcycle;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  initialShowroomPreset?: string;
}

export const BikeDetails: React.FC<BikeDetailsProps> = ({ 
  bike, 
  onClose, 
  isSaved, 
  onToggleSave,
  initialShowroomPreset 
}) => {
  // Selected customizer state
  const [selectedColor, setSelectedColor] = useState(bike.colors[0]);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  
  // Pricing Location state
  const [pincode, setPincode] = useState('');
  const [savedPincode, setSavedPincode] = useState('560001'); // Bengaluru Default
  const [showPincodeInput, setShowPincodeInput] = useState(false);

  // EMI Calculator Inputs
  const [downPayment, setDownPayment] = useState(50000);
  const [loanDuration, setLoanDuration] = useState(36); // Months
  const [interestRate, setInterestRate] = useState(9.5); // %

  // Mileage Cost Calculator Inputs
  const [dailyDistance, setDailyDistance] = useState(40); // km
  const [fuelPrice, setFuelPrice] = useState(103); // Rs
  const [ownershipYears, setOwnershipYears] = useState(5);

  // Booking Flow state
  const [bookingShowroom, setBookingShowroom] = useState(initialShowroomPreset || SHOWROOMS[0].name);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('11:00 AM');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Synchronize initial values if bike changes
  useEffect(() => {
    setSelectedColor(bike.colors[0]);
    setSelectedAccessories([]);
    setDownPayment(Math.round(bike.price * 0.2)); // 20% down default
    if (initialShowroomPreset) {
      setBookingShowroom(initialShowroomPreset);
    }
  }, [bike, initialShowroomPreset]);

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setSavedPincode(pincode);
      setShowPincodeInput(false);
    }
  };

  // Accessories cost sum
  const accessoriesCost = selectedAccessories.reduce((sum, id) => {
    const acc = bike.accessories.find(a => a.id === id);
    return sum + (acc ? acc.price : 0);
  }, 0);

  // Pricing calculations
  const exShowroom = bike.price;
  const rtoCharges = bike.pricing.rto;
  const insuranceCost = bike.pricing.insuranceZeroDep;
  const totalOnRoadPrice = exShowroom + rtoCharges + insuranceCost + accessoriesCost + bike.pricing.warranty;

  // EMI Calculator Outputs
  const loanPrincipal = Math.max(0, totalOnRoadPrice - downPayment);
  const r = (interestRate / 100) / 12;
  const emi = loanPrincipal > 0 
    ? Math.round(loanPrincipal * r * Math.pow(1 + r, loanDuration) / (Math.pow(1 + r, loanDuration) - 1))
    : 0;
  const totalAmountPayable = (emi * loanDuration) + downPayment;
  const totalInterest = Math.max(0, totalAmountPayable - totalOnRoadPrice);

  // Mileage cost output
  const isElectric = bike.category === 'Electric';
  const yearlyDistance = dailyDistance * 365;
  const monthlyFuelCost = isElectric 
    ? Math.round((yearlyDistance / 12) * 0.22) // charging cost per km
    : Math.round((yearlyDistance / 12) / bike.mileage.realWorld * fuelPrice);

  const yearlyFuelCost = monthlyFuelCost * 12;
  const totalPeriodCost = yearlyFuelCost * ownershipYears;
  
  // EV Savings calculation vs standard petrol
  const petrolComparisonCost = Math.round((yearlyDistance / bike.mileage.realWorld) * fuelPrice * ownershipYears);
  const evSavings = isElectric ? Math.max(0, petrolComparisonCost - totalPeriodCost) : 0;

  const toggleAccessory = (id: string) => {
    if (selectedAccessories.includes(id)) {
      setSelectedAccessories(prev => prev.filter(x => x !== id));
    } else {
      setSelectedAccessories(prev => [...prev, id]);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate) return;
    const code = 'BB-' + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(code);
    setBookingSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 overflow-y-auto backdrop-blur-sm flex justify-end">
      
      {/* Immersive Scrollable Left Side: Showcase Specs (Light Mode Sheets) */}
      <div className="w-full lg:w-3/5 p-6 md:p-12 space-y-16 overflow-y-auto no-scrollbar bg-slate-50 text-slate-900">
        
        {/* Navigation & Close */}
        <div className="flex justify-between items-center pb-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="font-anton text-xs text-orange-600 tracking-widest uppercase px-2 py-0.5 bg-orange-50 border border-orange-200 rounded">
              {bike.brand} • {bike.category}
            </span>
            <span className="text-[10px] font-inter text-slate-400 font-bold uppercase tracking-widest">
              PRODUCT SPECIFICATIONS
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900 hover:border-slate-350 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Hero Title & Visualizer */}
        <div className="space-y-6">
          <h2 className="font-anton text-5xl md:text-8xl uppercase tracking-tight leading-none text-slate-900">
            {bike.name}
          </h2>
          <p className="font-inter text-slate-500 text-base md:text-lg leading-relaxed max-w-xl">
            {bike.tagline} {bike.description}
          </p>

          <div className="h-[45vh] w-full flex items-center justify-center relative bg-white border border-slate-200 overflow-hidden rounded-2xl shadow-sm group">
            {/* Color Indicator */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full border border-slate-300" style={{ backgroundColor: selectedColor.hex }} />
              <span className="font-anton text-[10px] tracking-widest text-slate-500 uppercase">
                {selectedColor.name} ACTIVE
              </span>
            </div>

            <div 
              className="absolute inset-0 opacity-10 scale-90 rounded-full blur-[80px]"
              style={{ backgroundColor: bike.themeColor }}
            />
            
            <img
              src={bike.heroImage}
              alt={bike.name}
              className="max-h-[35vh] object-contain relative z-10 transform group-hover:scale-103 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Color variants selector */}
        <div className="space-y-4">
          <span className="font-anton text-xs tracking-widest text-slate-400 uppercase block font-semibold">INTERACTIVE COLORWAY</span>
          <div className="flex flex-wrap gap-3">
            {bike.colors.map((col, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedColor(col)}
                className={`flex items-center gap-2.5 px-4 py-2.5 border rounded-xl transition-all duration-200 cursor-pointer ${
                  selectedColor.name === col.name 
                    ? 'border-orange-500 bg-orange-50 text-orange-700 font-bold' 
                    : 'border-slate-200 bg-white text-slate-600 hover:text-slate-800 hover:border-slate-300'
                }`}
              >
                <span className="h-3.5 w-3.5 rounded-full border border-slate-350" style={{ backgroundColor: col.hex }} />
                <span className="font-anton text-xs uppercase tracking-wide">{col.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Performance Spec Section */}
        <div className="space-y-6 pt-8 border-t border-slate-200">
          <h3 className="font-anton text-2xl uppercase tracking-wider text-orange-600">
            PERFORMANCE ENGINE
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { label: 'Engine/Motor', value: bike.specs.engine },
              { label: 'Max Power', value: bike.specs.power },
              { label: 'Max Torque', value: bike.specs.torque },
              { label: 'Top Speed', value: bike.specs.topSpeed },
              { label: '0-60 km/h', value: bike.specs.acceleration0to60 },
              { label: '0-100 km/h', value: bike.specs.acceleration0to100 },
              { label: 'Cooling Method', value: bike.specs.cooling },
              { label: 'Fuel/Pack Capacity', value: bike.specs.fuelTank },
              { label: 'Transmission', value: bike.specs.transmission }
            ].map((spec, i) => (
              <div key={i} className="bg-white p-4 border border-slate-200 shadow-sm rounded-xl space-y-1">
                <span className="font-inter text-[9px] text-slate-400 font-bold uppercase tracking-widest block">{spec.label}</span>
                <span className="font-anton text-sm text-slate-800 block uppercase line-clamp-2">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid Icons */}
        <div className="space-y-6 pt-8 border-t border-slate-200">
          <h3 className="font-anton text-2xl uppercase tracking-wider text-orange-600">
            INTEGRATED FEATURES
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { label: 'ABS Braking', key: 'ABS' },
              { label: 'Traction Control', key: 'Traction Control' },
              { label: 'Bluetooth Sync', key: 'Bluetooth' },
              { label: 'GPS Navigation', key: 'Navigation' },
              { label: 'Full LED Lights', key: 'LED' },
              { label: 'Cruise Control', key: 'Cruise Control' },
              { label: 'Ride Modes', key: 'Ride Modes' },
              { label: 'Quick Shifter', key: 'Quick Shifter' },
              { label: 'USB Charging', key: 'USB' },
              { label: 'Color TFT Panel', key: 'TFT' }
            ].map((feat, i) => {
              const matches = bike.features.some(f => f.toLowerCase().includes(feat.key.toLowerCase()));
              return (
                <div 
                  key={i} 
                  className={`p-3 border text-center flex flex-col justify-center items-center h-20 transition-all rounded-xl ${
                    matches 
                      ? 'border-orange-200 bg-orange-50 text-orange-700 font-semibold shadow-sm' 
                      : 'border-slate-100 bg-slate-50 text-slate-300'
                  }`}
                >
                  <span className="font-anton text-[10px] tracking-wider uppercase leading-tight">{feat.label}</span>
                  <span className="font-inter text-[8px] uppercase tracking-widest mt-1 block">
                    {matches ? 'AVAILABLE' : 'N/A'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mileage & Range Bar Charts */}
        <div className="space-y-6 pt-8 border-t border-slate-200">
          <h3 className="font-anton text-2xl uppercase tracking-wider text-orange-600">
            MILEAGE ANALYTICS
          </h3>
          <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm space-y-4">
            {[
              { label: 'Claimed Standard', value: bike.mileage.claimed },
              { label: 'Real World Commute', value: bike.mileage.realWorld },
              { label: 'Heavy City Traffic', value: bike.mileage.city },
              { label: 'Highway Cruising', value: bike.mileage.highway }
            ].map((chart, i) => {
              const maxVal = isElectric ? 200 : 80;
              const pct = (chart.value / maxVal) * 100;
              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-inter font-medium">
                    <span className="text-slate-500">{chart.label}</span>
                    <span className="font-anton text-orange-600">{chart.value} {isElectric ? 'km' : 'km/l'}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-600 transition-all duration-1000"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Safety Score Meter */}
        <div className="space-y-6 pt-8 border-t border-slate-200">
          <h3 className="font-anton text-2xl uppercase tracking-wider text-orange-600">
            SAFETY SCORES & BREAKDOWN
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-100 border border-slate-200 rounded-xl p-6 flex flex-col justify-center items-center text-center">
              <Award className="h-8 w-8 text-orange-600 mb-3" />
              <span className="font-inter text-[10px] text-slate-400 uppercase tracking-widest font-bold block">SAFETY SCORE</span>
              <h4 className="font-anton text-4xl text-slate-800 tracking-tight mt-1">{bike.safetyRating.split('/')[0]}</h4>
              <p className="font-inter text-[9px] text-orange-600 mt-2 uppercase tracking-widest font-bold">Road Conditions Validated</p>
            </div>

            <div className="md:col-span-2 bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-3">
              {[
                { label: 'Dual-Channel ABS System', score: bike.safety.factors.abs },
                { label: 'Active Traction Control', score: bike.safety.factors.tractionControl },
                { label: 'Disc Braking Bite', score: bike.safety.factors.braking },
                { label: 'High-Grip Radial Tyres', score: bike.safety.factors.tyres },
                { label: 'Adaptive LED Lighting', score: bike.safety.factors.lighting },
                { label: 'High Speed Stability', score: bike.safety.factors.stability }
              ].map((fact, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-inter">
                  <span className="text-slate-500 font-medium">{fact.label}</span>
                  <div className="flex items-center gap-3 w-1/2 justify-end">
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-600" style={{ width: `${fact.score * 10}%` }} />
                    </div>
                    <span className="font-anton text-slate-800 w-6 text-right">{(fact.score).toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* EMI Calculator */}
        <div className="space-y-6 pt-8 border-t border-slate-200">
          <div className="flex items-center gap-2 text-orange-600">
            <Calculator className="h-6 w-6" />
            <h3 className="font-anton text-2xl uppercase tracking-wider">
              EMI ESTIMATOR
            </h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              
              {/* Downpayment Slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-inter text-xs font-medium">
                  <span className="text-slate-500">Down Payment</span>
                  <span className="font-anton text-orange-600">₹{new Intl.NumberFormat('en-IN').format(downPayment)}</span>
                </div>
                <input 
                  type="range"
                  min="20000"
                  max={Math.round(totalOnRoadPrice * 0.8)}
                  step="5000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg accent-orange-600 appearance-none cursor-pointer"
                />
              </div>

              {/* Tenure Slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-inter text-xs font-medium">
                  <span className="text-slate-500">Tenure (Months)</span>
                  <span className="font-anton text-orange-600">{loanDuration} Months</span>
                </div>
                <input 
                  type="range"
                  min="12"
                  max="60"
                  step="12"
                  value={loanDuration}
                  onChange={(e) => setLoanDuration(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg accent-orange-600 appearance-none cursor-pointer"
                />
              </div>

              {/* Interest Slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-inter text-xs font-medium">
                  <span className="text-slate-500">Annual Interest Rate</span>
                  <span className="font-anton text-orange-600">{interestRate}%</span>
                </div>
                <input 
                  type="range"
                  min="6.0"
                  max="15.0"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg accent-orange-600 appearance-none cursor-pointer"
                />
              </div>

            </div>

            {/* Calculations display */}
            <div className="bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between space-y-4 rounded-xl">
              <div>
                <span className="font-inter text-[9px] text-slate-400 font-bold uppercase tracking-widest block">MONTHLY PAYMENT</span>
                <span className="font-anton text-4xl text-orange-600 block mt-1">₹{new Intl.NumberFormat('en-IN').format(emi)} / mo</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs font-inter font-medium">
                <div>
                  <span className="text-slate-400 block">Loan Principal</span>
                  <span className="text-slate-800">₹{new Intl.NumberFormat('en-IN').format(loanPrincipal)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Total Interest</span>
                  <span className="text-slate-800">₹{new Intl.NumberFormat('en-IN').format(totalInterest)}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 text-xs font-inter flex justify-between font-bold">
                <span className="text-slate-500 font-semibold">Total Amount Payable</span>
                <span className="text-slate-800">₹{new Intl.NumberFormat('en-IN').format(totalAmountPayable)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mileage Cost Calculator */}
        <div className="space-y-6 pt-8 border-t border-slate-200">
          <h3 className="font-anton text-2xl uppercase tracking-wider text-orange-600">
            {isElectric ? 'EV CHARGING COST & SAVINGS' : 'MILEAGE COST CALCULATOR'}
          </h3>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              
              {/* Daily distance slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-inter text-xs font-medium">
                  <span className="text-slate-500">Daily Riding Distance</span>
                  <span className="font-anton text-slate-800">{dailyDistance} km</span>
                </div>
                <input 
                  type="range"
                  min="10"
                  max="150"
                  step="5"
                  value={dailyDistance}
                  onChange={(e) => setDailyDistance(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg accent-orange-600 appearance-none cursor-pointer"
                />
              </div>

              {/* Fuel Price slider */}
              {!isElectric && (
                <div className="space-y-2">
                  <div className="flex justify-between font-inter text-xs font-medium">
                    <span className="text-slate-500">Fuel Price (per Liter)</span>
                    <span className="font-anton text-slate-800">₹{fuelPrice}</span>
                  </div>
                  <input 
                    type="range"
                    min="90"
                    max="120"
                    step="1"
                    value={fuelPrice}
                    onChange={(e) => setFuelPrice(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg accent-orange-600 appearance-none cursor-pointer"
                  />
                </div>
              )}

              {/* Ownership span slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-inter text-xs font-medium">
                  <span className="text-slate-500">Years of Ownership</span>
                  <span className="font-anton text-slate-800">{ownershipYears} Years</span>
                </div>
                <input 
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={ownershipYears}
                  onChange={(e) => setOwnershipYears(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg accent-orange-600 appearance-none cursor-pointer"
                />
              </div>

            </div>

            {/* Calculations display */}
            <div className="bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between space-y-4 rounded-xl">
              <div>
                <span className="font-inter text-[9px] text-slate-400 font-bold uppercase tracking-widest block">
                  {isElectric ? 'ELECTRICITY CHARGE BILL' : 'FUEL EXPENDITURE BILL'}
                </span>
                <span className="font-anton text-3xl text-slate-800 block mt-1">
                  ₹{new Intl.NumberFormat('en-IN').format(monthlyFuelCost)} / month
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs font-inter font-medium">
                <div>
                  <span className="text-slate-400 block">Yearly Bill</span>
                  <span className="text-slate-800">₹{new Intl.NumberFormat('en-IN').format(yearlyFuelCost)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">{ownershipYears}-Year Total Cost</span>
                  <span className="font-anton text-orange-600 text-sm">₹{new Intl.NumberFormat('en-IN').format(totalPeriodCost)}</span>
                </div>
              </div>
              
              {isElectric && (
                <div className="pt-2 border-t border-green-200 text-xs font-inter flex justify-between text-green-700 bg-green-50/50 p-2.5 rounded-lg">
                  <span>EV Savings compared to Petrol</span>
                  <span className="font-anton tracking-wider">₹{new Intl.NumberFormat('en-IN').format(evSavings)} Saved</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Maintenance Log & 5 Year Ownership Estimate */}
        <div className="space-y-6 pt-8 border-t border-slate-200">
          <div className="flex justify-between items-center">
            <h3 className="font-anton text-2xl uppercase tracking-wider text-orange-600">
              MAINTENANCE & RELIABILITY
            </h3>
            <span className="font-anton text-xs text-slate-400 uppercase font-semibold">
              5-Year Service: ₹{new Intl.NumberFormat('en-IN').format(bike.maintenance.fiveYearEstimate)}
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h4 className="font-anton text-xs tracking-wider text-slate-400 uppercase font-semibold">SCHEDULED MILESTONES</h4>
            <div className="space-y-3">
              {bike.maintenance.schedule.map((sch, i) => (
                <div key={i} className="flex justify-between items-center text-xs font-inter border-b border-slate-100 pb-2 last:border-b-0">
                  <div>
                    <span className="font-semibold text-slate-800 block">{sch.name}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">{sch.timeline}</span>
                  </div>
                  <span className="font-anton text-slate-800">₹{new Intl.NumberFormat('en-IN').format(sch.cost)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price Prediction */}
        <div className="space-y-6 pt-8 border-t border-slate-200">
          <h3 className="font-anton text-2xl uppercase tracking-wider text-orange-600">
            PRICE PREDICTION
          </h3>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="font-inter text-[9px] text-slate-400 font-bold uppercase tracking-widest block animate-pulse">MARKET TREND</span>
              <span className="font-anton text-lg text-orange-600 flex items-center gap-1.5 uppercase mt-1">
                <TrendingDown className="h-4 w-4" /> {bike.pricePrediction.marketTrend}
              </span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="font-inter text-[9px] text-slate-400 font-bold uppercase tracking-widest block">FESTIVAL OUTLOOK</span>
              <p className="font-inter text-[10px] text-slate-600 mt-1 leading-snug font-medium">{bike.pricePrediction.festivalOffers}</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="font-inter text-[9px] text-slate-400 font-bold uppercase tracking-widest block">RECOMMENDED BUYING WINDOW</span>
              <span className="font-anton text-sm text-slate-800 block uppercase mt-1">{bike.pricePrediction.bestTimeToBuy}</span>
            </div>
          </div>
        </div>

        {/* Dimensions Sheet Grid */}
        <div className="space-y-6 pt-8 border-t border-slate-200">
          <h3 className="font-anton text-2xl uppercase tracking-wider text-orange-600">
            DIMENSIONS & WEIGHTS
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Seat Height', value: bike.dimensions.seatHeight },
              { label: 'Ground Clearance', value: bike.dimensions.groundClearance },
              { label: 'Kerb Weight', value: bike.dimensions.weight },
              { label: 'Wheelbase', value: bike.dimensions.wheelbase },
              { label: 'Total Length', value: bike.dimensions.length },
              { label: 'Total Width', value: bike.dimensions.width },
              { label: 'Fuel/Charge Cap', value: bike.dimensions.fuelTankCapacity }
            ].map((dim, i) => (
              <div key={i} className="bg-slate-50 p-4 border border-slate-200 rounded-xl shadow-sm">
                <span className="font-inter text-[9px] text-slate-400 font-bold uppercase tracking-widest block">{dim.label}</span>
                <span className="font-anton text-sm text-slate-800 block uppercase mt-0.5">{dim.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Right Side: Customizer & Purchase Action Desk */}
      <div className="w-full lg:w-2/5 p-6 md:p-12 bg-slate-100 border-l border-slate-200 overflow-y-auto sticky top-0 h-screen flex flex-col justify-between">
        
        <div className="space-y-8">
          {/* Header metadata summary */}
          <div className="flex justify-between items-start pt-6 lg:pt-0">
            <div>
              <span className="font-inter text-[10px] text-slate-400 font-bold uppercase tracking-widest block">SERIES FLEET</span>
              <h3 className="font-anton text-3xl uppercase tracking-tight text-slate-900 leading-none">{bike.name}</h3>
            </div>
            
            <button 
              onClick={() => onToggleSave(bike.id)}
              className={`p-2.5 border rounded-xl transition-all cursor-pointer ${
                isSaved 
                  ? 'bg-red-50 border-red-200 text-red-500' 
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Heart className={`h-4.5 w-4.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Color Switcher */}
          <div className="space-y-3">
            <span className="font-anton text-xs tracking-wider uppercase text-slate-500 font-semibold">COLOR OPTIONS</span>
            <div className="grid grid-cols-3 gap-2">
              {bike.colors.map((col, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(col)}
                  className={`p-2.5 text-left border rounded-xl flex flex-col justify-between h-16 transition-all cursor-pointer ${
                    selectedColor.name === col.name 
                      ? 'border-orange-500 bg-white text-orange-600 shadow-sm' 
                      : 'border-slate-200 bg-transparent text-slate-500 hover:border-slate-350'
                  }`}
                >
                  <span className="h-3.5 w-3.5 rounded-full border border-slate-300" style={{ backgroundColor: col.hex }} />
                  <span className="font-anton text-[9px] uppercase tracking-wide truncate block">{col.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Customizer Accessories List */}
          <div className="space-y-3">
            <span className="font-anton text-xs tracking-wider uppercase text-slate-500 font-semibold">BIKE ACCESSORY CONFIGURATOR</span>
            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin">
              {bike.accessories.map((acc) => {
                const active = selectedAccessories.includes(acc.id);
                return (
                  <div
                    key={acc.id}
                    onClick={() => toggleAccessory(acc.id)}
                    className={`p-3 border rounded-xl flex justify-between items-center cursor-pointer transition-all ${
                      active 
                        ? 'border-orange-500 bg-orange-50 text-slate-900 shadow-sm' 
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <span className="font-anton text-xs uppercase block text-slate-800">{acc.name}</span>
                      <span className="font-inter text-[9px] text-slate-400 block mt-0.5 font-medium">{acc.description}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-anton text-xs text-orange-600 block">₹{new Intl.NumberFormat('en-IN').format(acc.price)}</span>
                      <span className="font-inter text-[8px] text-slate-400 font-bold uppercase mt-0.5 block">
                        {active ? 'ADDED' : 'ADD'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PIN-Code / On-road validation */}
          <div className="space-y-3 pt-6 border-t border-slate-200">
            <div className="flex justify-between items-center">
              <span className="font-anton text-xs tracking-wider uppercase text-slate-500 font-semibold">ON-ROAD PRICING IN</span>
              <button 
                onClick={() => setShowPincodeInput(!showPincodeInput)}
                className="text-[10px] font-anton tracking-wider text-orange-600 uppercase hover:underline cursor-pointer"
              >
                PIN: {savedPincode} [CHANGE]
              </button>
            </div>

            <AnimatePresence>
              {showPincodeInput && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handlePincodeSubmit}
                  className="flex gap-2 mb-3"
                >
                  <input
                    type="text"
                    maxLength={6}
                    required
                    placeholder="Enter 6-digit Pincode..."
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 bg-white border border-slate-200 px-3 py-2 text-xs font-inter text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 rounded-xl"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-orange-600 text-white font-anton text-xs uppercase rounded-xl hover:bg-slate-900 cursor-pointer"
                  >
                    APPLY
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Calculations Deck */}
            <div className="bg-white border border-slate-200 p-4 space-y-2.5 text-xs font-inter rounded-xl shadow-sm">
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Ex-showroom Base</span>
                <span className="font-semibold text-slate-800">₹{new Intl.NumberFormat('en-IN').format(exShowroom)}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>RTO Registration Fee</span>
                <span className="font-semibold text-slate-800">₹{new Intl.NumberFormat('en-IN').format(rtoCharges)}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Zero-Dep Insurance (5 Yrs)</span>
                <span className="font-semibold text-slate-800">₹{new Intl.NumberFormat('en-IN').format(insuranceCost)}</span>
              </div>
              {accessoriesCost > 0 && (
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Custom Add-ons</span>
                  <span className="font-semibold text-orange-600">₹{new Intl.NumberFormat('en-IN').format(accessoriesCost)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Extended Warranty</span>
                <span className="font-semibold text-slate-800">₹{new Intl.NumberFormat('en-IN').format(bike.pricing.warranty)}</span>
              </div>
              
              <div className="pt-2.5 border-t border-slate-100 flex justify-between font-anton text-sm">
                <span className="text-slate-800">ON-ROAD PRICE</span>
                <span className="text-orange-600 tracking-wider">₹{new Intl.NumberFormat('en-IN').format(totalOnRoadPrice)}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Action button deck */}
        <div className="space-y-3 pt-6 lg:pt-0">
          
          <AnimatePresence mode="wait">
            {bookingSubmitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-green-50 border border-green-200 text-green-700 p-6 text-center space-y-3 rounded-2xl shadow-sm"
              >
                <Smile className="h-8 w-8 mx-auto text-green-600" />
                <h4 className="font-anton text-lg uppercase">TEST RIDE SECURED!</h4>
                <p className="font-inter text-[10px] text-green-700 leading-relaxed">
                  Your reservation is confirmed at **{bookingShowroom}** on **{bookingDate}** around **{bookingTime}**. 
                  Verification PIN: <span className="font-anton text-orange-600">{bookingCode}</span>. Bring your license!
                </p>
                <button
                  onClick={() => setBookingSubmitted(false)}
                  className="font-anton text-[10px] uppercase underline text-slate-500 hover:text-orange-600 cursor-pointer"
                >
                  Book another test
                </button>
              </motion.div>
            ) : (
              <div className="bg-white border border-slate-200 p-5 space-y-4 rounded-2xl shadow-sm">
                <span className="font-anton text-xs tracking-wider text-slate-500 uppercase block font-semibold">BOOK AN IMMEDIATE TEST RIDE</span>
                
                <form onSubmit={handleBookingSubmit} className="space-y-3 text-xs font-inter">
                  
                  {/* Select Showroom */}
                  <div>
                    <label className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-1">CHOOSE DEALERSHIP</label>
                    <select
                      value={bookingShowroom}
                      onChange={(e) => setBookingShowroom(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 text-xs focus:outline-none rounded-lg cursor-pointer"
                    >
                      {SHOWROOMS.map(sr => (
                        <option key={sr.id} value={sr.name}>{sr.name} ({sr.distance})</option>
                      ))}
                    </select>
                  </div>

                  {/* Pick date & time */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-1">SELECT DATE</label>
                      <input 
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 text-xs focus:outline-none rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-1">SELECT TIME</label>
                      <select 
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 text-xs focus:outline-none rounded-lg cursor-pointer"
                      >
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:30 AM">11:30 AM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:30 PM">4:30 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Book Ride Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-orange-600 text-white font-anton text-sm uppercase rounded-xl hover:bg-slate-900 transition-colors duration-200 mt-2 cursor-pointer shadow-sm shadow-orange-500/15"
                  >
                    CONFIRM RESERVATION
                  </button>

                </form>
              </div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
};
