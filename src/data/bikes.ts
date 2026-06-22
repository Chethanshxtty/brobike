/* Simulated local backend database and catalog parameters */
export interface Accessory {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface ColorOption {
  name: string;
  hex: string;
  image: string;
}

export interface Specification {
  engine: string;
  power: string;
  torque: string;
  topSpeed: string;
  acceleration0to60: string;
  acceleration0to100: string;
  rideModes: string[];
  fuelTank: string;
  transmission: string;
  cooling: string;
}

export interface SafetyScore {
  rating: string;
  overall: number;
  factors: {
    abs: number;
    tractionControl: number;
    braking: number;
    tyres: number;
    lighting: number;
    stability: number;
  };
}

export interface MileageDetails {
  claimed: number;
  realWorld: number;
  city: number;
  highway: number;
}

export interface Pricing {
  exShowroom: number;
  rto: number;
  insuranceZeroDep: number;
  insuranceComp: number;
  accessoriesBase: number;
  warranty: number;
}

export interface MaintenanceItem {
  name: string;
  timeline: string;
  cost: number;
}

export interface PricePrediction {
  currentPrice: number;
  expectedDiscount: number;
  festivalOffers: string;
  marketTrend: 'UPWARD' | 'STABLE' | 'DOWNWARD';
  bestTimeToBuy: string;
  expectedFuturePrice: number;
}

export interface Motorcycle {
  id: string;
  brand: 'TVS' | 'Royal Enfield' | 'Ultraviolette' | 'Bajaj' | 'Hero MotoCorp' | 'Ola Electric' | 'Ather Energy';
  name: string;
  category: 'Sport' | 'Adventure' | 'Electric' | 'Premium' | 'Mileage';
  ghostText: string;
  themeColor: string;
  heroImage: string;
  price: number;
  tagline: string;
  description: string;
  powerSpec: string;
  mileageSpec: string;
  speedSpec: string;
  safetyRating: string;
  colors: ColorOption[];
  accessories: Accessory[];
  specs: Specification;
  safety: SafetyScore;
  mileage: MileageDetails;
  pricing: Pricing;
  maintenance: {
    schedule: MaintenanceItem[];
    annualCost: number;
    fiveYearEstimate: number;
  };
  pricePrediction: PricePrediction;
  dimensions: {
    seatHeight: string;
    groundClearance: string;
    weight: string;
    wheelbase: string;
    length: string;
    width: string;
    fuelTankCapacity: string;
  };
  features: string[];
}

export interface UpcomingMotorcycle {
  id: string;
  name: string;
  expectedPrice: string;
  expectedLaunchDate: string;
  expectedSpecs: string;
  image: string;
  countdownDays: number;
}

export interface Showroom {
  id: string;
  name: string;
  address: string;
  pincode: string;
  distance: string;
  phone: string;
  hours: string;
  isServiceCenter: boolean;
  rating: number;
}

export const MOTORCYCLES: Motorcycle[] = [
  {
    id: 'apache-310',
    brand: 'TVS',
    name: 'TVS Apache RTR 310',
    category: 'Sport',
    ghostText: 'RESTLESS PLAY',
    themeColor: '#FF5C5C',
    heroImage: '/sport-bike.png',
    price: 242990,
    tagline: 'Restless play. Track-inspired styling and aggressive street presence.',
    description: 'An aggressive naked streetfighter loaded with segment-first technology including climate-controlled seats, dynamic stability control, and high cornering speeds.',
    powerSpec: '35.6 PS @ 9,700 RPM',
    mileageSpec: '30 km/l (Avg)',
    speedSpec: '150 km/h',
    safetyRating: '9.0 / 10',
    colors: [
      { name: 'Fury Yellow', hex: '#FFD300', image: '/sport-bike.png' },
      { name: 'Arsenal Black', hex: '#1C1C1C', image: '/sport-bike.png' },
      { name: 'Steel Blue', hex: '#2B4A6F', image: '/sport-bike.png' }
    ],
    accessories: [
      { id: 'ap-cg', name: 'Premium Frame Sliders', price: 3200, description: 'Crash protection structure' },
      { id: 'ap-vs', name: 'Visor Shield', price: 1800, description: 'Wind deflection visor' },
      { id: 'ap-qs', name: 'Quickshifter Upgrade', price: 8500, description: 'Clutchless quick shifts' },
      { id: 'ap-tp', name: 'Tank Pad Grip', price: 950, description: 'Traction control pad' }
    ],
    specs: {
      engine: '312.12cc Liquid Cooled Single Cylinder DOHC',
      power: '35.6 PS @ 9,700 RPM',
      torque: '28.7 Nm @ 6,650 RPM',
      topSpeed: '150 km/h',
      acceleration0to60: '2.81 seconds',
      acceleration0to100: '7.19 seconds',
      rideModes: ['Urban', 'Rain', 'Sport', 'Track', 'Supermoto'],
      fuelTank: '11 Liters',
      transmission: '6-Speed with Assist & Slipper Clutch',
      cooling: 'Liquid Cooled with Oil Cooler'
    },
    safety: {
      rating: '9.0 Score',
      overall: 9.0,
      factors: {
        abs: 9.2,
        tractionControl: 8.8,
        braking: 9.0,
        tyres: 9.0,
        lighting: 9.2,
        stability: 9.0
      }
    },
    mileage: {
      claimed: 35,
      realWorld: 30,
      city: 26,
      highway: 34
    },
    pricing: {
      exShowroom: 242990,
      rto: 24300,
      insuranceZeroDep: 14500,
      insuranceComp: 9200,
      accessoriesBase: 2500,
      warranty: 3500
    },
    maintenance: {
      schedule: [
        { name: 'First Service (Break-in)', timeline: '1,000 km / 1 Month', cost: 2200 },
        { name: 'General Tune-up', timeline: '5,000 km / 6 Months', cost: 1400 },
        { name: 'Full Service & Fluids', timeline: '10,000 km / 1 Year', cost: 4200 },
        { name: 'Brake Pads & Spark Plug', timeline: '15,000 km / 18 Months', cost: 3200 }
      ],
      annualCost: 5500,
      fiveYearEstimate: 28000
    },
    pricePrediction: {
      currentPrice: 242990,
      expectedDiscount: 6000,
      festivalOffers: '₹5,000 cashback + Free 3-year warranty at TVS dealerships',
      marketTrend: 'STABLE',
      bestTimeToBuy: 'October (Dussehra/Diwali)',
      expectedFuturePrice: 246000
    },
    dimensions: {
      seatHeight: '800 mm',
      groundClearance: '180 mm',
      weight: '169 kg (Kerb)',
      wheelbase: '1358 mm',
      length: '1991 mm',
      width: '831 mm',
      fuelTankCapacity: '11 Liters'
    },
    features: ['Cornering ABS', 'Traction Control', 'Bluetooth Connectivity', 'Turn-by-Turn Navigation', 'Full LED Lighting', 'Cruise Control', 'Climate Controlled Seat', 'Bi-directional Quick Shifter', 'USB charging', '5-inch Color TFT Display']
  },
  {
    id: 'himalayan-450',
    brand: 'Royal Enfield',
    name: 'Royal Enfield Himalayan 450',
    category: 'Adventure',
    ghostText: 'BUILT FOR ALL ROADS',
    themeColor: '#6BBF7A',
    heroImage: '/adventure-bike.png',
    price: 285000,
    tagline: 'Built for all roads. Built for no roads.',
    description: 'Featuring the Sherpa 450 engine, this is Royal Enfield’s first liquid-cooled motorcycle. Purpose-built for rough tracks, high passes, and trans-continental expeditions.',
    powerSpec: '40 PS @ 8,000 RPM',
    mileageSpec: '28 km/l (Avg)',
    speedSpec: '151 km/h',
    safetyRating: '9.3 / 10',
    colors: [
      { name: 'Kaza Brown', hex: '#8B7E74', image: '/adventure-bike.png' },
      { name: 'Slate Salt', hex: '#D2D2D2', image: '/adventure-bike.png' },
      { name: 'Hanle Black', hex: '#1E1E1E', image: '/adventure-bike.png' }
    ],
    accessories: [
      { id: 'him-tb', name: 'Aluminium Panniers (Set)', price: 24000, description: 'Rugged side luggage panniers' },
      { id: 'him-sb', name: 'Engine Crash Guards', price: 4500, description: 'Heavy-duty steel tube guard' },
      { id: 'him-al', name: 'Radiator Guard', price: 1800, description: 'Mesh debris protective screen' },
      { id: 'him-eg', name: 'Aluminium Bash Plate', price: 3500, description: 'Sturdy underbelly defense' }
    ],
    specs: {
      engine: '452cc Liquid Cooled Single Cylinder DOHC',
      power: '40.02 PS @ 8,000 RPM',
      torque: '40 Nm @ 5,500 RPM',
      topSpeed: '151 km/h',
      acceleration0to60: '2.5 seconds',
      acceleration0to100: '6.4 seconds',
      rideModes: ['Performance (ABS On)', 'Performance (ABS Off)', 'Eco (ABS On)', 'Eco (ABS Off)'],
      fuelTank: '17 Liters',
      transmission: '6-Speed with Slip & Assist Clutch',
      cooling: 'Liquid Cooled'
    },
    safety: {
      rating: '9.3 Score',
      overall: 9.3,
      factors: {
        abs: 9.6,
        tractionControl: 8.5,
        braking: 9.2,
        tyres: 9.4,
        lighting: 9.0,
        stability: 9.5
      }
    },
    mileage: {
      claimed: 32,
      realWorld: 28,
      city: 24,
      highway: 32
    },
    pricing: {
      exShowroom: 285000,
      rto: 28500,
      insuranceZeroDep: 16500,
      insuranceComp: 10800,
      accessoriesBase: 3800,
      warranty: 4200
    },
    maintenance: {
      schedule: [
        { name: 'First Service', timeline: '500 km / 45 Days', cost: 2800 },
        { name: 'General Inspection', timeline: '5,000 km / 6 Months', cost: 1200 },
        { name: 'Annual Service & Oil Change', timeline: '10,000 km / 1 Year', cost: 4800 },
        { name: 'Suspension Check & Air Filter', timeline: '15,000 km / 18 Months', cost: 3500 }
      ],
      annualCost: 5800,
      fiveYearEstimate: 29500
    },
    pricePrediction: {
      currentPrice: 285000,
      expectedDiscount: 5000,
      festivalOffers: 'Free booking priority + complimentary RSA during Dussehra',
      marketTrend: 'UPWARD',
      bestTimeToBuy: 'January (Year-end stock clearances)',
      expectedFuturePrice: 292000
    },
    dimensions: {
      seatHeight: '825 mm',
      groundClearance: '230 mm',
      weight: '196 kg (Kerb)',
      wheelbase: '1510 mm',
      length: '2245 mm',
      width: '852 mm',
      fuelTankCapacity: '17 Liters'
    },
    features: ['Switchable Dual-Channel ABS', 'Ride-by-Wire Throttle', 'Bluetooth Connection', 'Google Maps Navigation Casting', 'Full LED Headlamp', 'USB-C charging port', 'Spoked Rims', 'Circular TFT Color Display']
  },
  {
    id: 'f77-mach2',
    brand: 'Ultraviolette',
    name: 'Ultraviolette F77 Mach 2',
    category: 'Electric',
    ghostText: 'AVIATION ON WHEELS',
    themeColor: '#6EB5FF',
    heroImage: '/electric-bike.png',
    price: 299000,
    tagline: 'Electric aviation on two wheels. Instant torque.',
    description: 'India’s premier electric sport bike featuring advanced 10-level regenerative braking, active console controls, and fighter-jet ergonomics.',
    powerSpec: '30 kW Peak Power',
    mileageSpec: '211 km Range',
    speedSpec: '155 km/h',
    safetyRating: '9.4 / 10',
    colors: [
      { name: 'Lightning Silver', hex: '#D9D9D9', image: '/electric-bike.png' },
      { name: 'Laser Red', hex: '#FF003C', image: '/electric-bike.png' },
      { name: 'Shadow Black', hex: '#0F0F0F', image: '/electric-bike.png' }
    ],
    accessories: [
      { id: 'f77-fc', name: 'Boost Fast Charger', price: 12500, description: 'Charges 0-80% in 1 hour' },
      { id: 'f77-cg', name: 'Aerodynamic Wheel Cover', price: 4200, description: 'Rear wheel aero shell' },
      { id: 'f77-vs', name: 'Jet-Screen Visor', price: 2500, description: 'Aviation style visor screen' }
    ],
    specs: {
      engine: 'High Performance PMSM (30 kW / 40.2 hp)',
      power: '40.2 hp (Equivalent)',
      torque: '90 Nm (Instant)',
      topSpeed: '155 km/h',
      acceleration0to60: '2.8 seconds',
      acceleration0to100: '7.5 seconds',
      rideModes: ['Glide', 'Combat', 'Ballistic'],
      fuelTank: '7.1 kWh IP67 Battery Pack',
      transmission: 'Direct Drive Single Reduction',
      cooling: 'Air Cooled with Thermal Flight Controller'
    },
    safety: {
      rating: '9.4 Score',
      overall: 9.4,
      factors: {
        abs: 9.5,
        tractionControl: 9.6,
        braking: 9.5,
        tyres: 9.2,
        lighting: 9.4,
        stability: 9.2
      }
    },
    mileage: {
      claimed: 211,
      realWorld: 185,
      city: 190,
      highway: 140
    },
    pricing: {
      exShowroom: 299000,
      rto: 5000,
      insuranceZeroDep: 12500,
      insuranceComp: 8500,
      accessoriesBase: 2000,
      warranty: 5000
    },
    maintenance: {
      schedule: [
        { name: 'First Diagnostics Check', timeline: '2,000 km / 2 Months', cost: 800 },
        { name: 'Annual Software & Brake Fluid', timeline: '10,000 km / 1 Year', cost: 1800 },
        { name: 'Battery Health Scan & Suspension', timeline: '20,000 km / 2 Years', cost: 2500 }
      ],
      annualCost: 2000,
      fiveYearEstimate: 11000
    },
    pricePrediction: {
      currentPrice: 299000,
      expectedDiscount: 10000,
      festivalOffers: '₹10,000 subsidy discounts + Free charger upgrade',
      marketTrend: 'DOWNWARD',
      bestTimeToBuy: 'Immediate (Before subsidy revisions)',
      expectedFuturePrice: 289000
    },
    dimensions: {
      seatHeight: '800 mm',
      groundClearance: '160 mm',
      weight: '197 kg (Kerb)',
      wheelbase: '1340 mm',
      length: '2010 mm',
      width: '744 mm',
      fuelTankCapacity: '7.1 kWh Battery'
    },
    features: ['Dynamic Traction Control (4 levels)', 'Regenerative Braking (10 levels)', 'Smart LTE Connectivity', 'FOTA Updates', 'All LED Lighting', 'Hill Hold Assist', 'Flight Dashboard Infotainment', 'Reverse Mode', '5-inch TFT Connected Screen']
  },
  {
    id: 'pulsar-ns400',
    brand: 'Bajaj',
    name: 'Bajaj Pulsar NS400Z',
    category: 'Premium',
    ghostText: 'THE BIGGEST PULSAR',
    themeColor: '#B07DFF',
    heroImage: '/premium-bike.png',
    price: 185000,
    tagline: 'The biggest Pulsar yet. Naked brute torque and value.',
    description: 'Unmatched value proposal in the sub-400cc class, delivering pure roadster performance and premium features at an accessible entry price.',
    powerSpec: '40 PS @ 8,800 RPM',
    mileageSpec: '28 km/l (Avg)',
    speedSpec: '154 km/h',
    safetyRating: '8.8 / 10',
    colors: [
      { name: 'Brooklyn Black', hex: '#1A1A1A', image: '/premium-bike.png' },
      { name: 'Pewter Grey', hex: '#5E6065', image: '/premium-bike.png' },
      { name: 'Pearl Metallic White', hex: '#F0F0F0', image: '/premium-bike.png' }
    ],
    accessories: [
      { id: 'ns-cg', name: 'Nylon Frame Sliders', price: 2200, description: 'Engine side guard panels' },
      { id: 'ns-sc', name: 'Comfort Seat Upgrade', price: 1500, description: 'Dual density foam seat' },
      { id: 'ns-tp', name: 'Pulsar Tank Pad', price: 800, description: 'Custom Pulsar branding protector' }
    ],
    specs: {
      engine: '373cc Liquid Cooled Single Cylinder DOHC 4V',
      power: '40 PS @ 8,800 RPM',
      torque: '35 Nm @ 6,500 RPM',
      topSpeed: '154 km/h',
      acceleration0to60: '2.6 seconds',
      acceleration0to100: '6.6 seconds',
      rideModes: ['Road', 'Rain', 'Sport', 'Off-Road'],
      fuelTank: '12 Liters',
      transmission: '6-Speed with Slipper Clutch',
      cooling: 'Liquid Cooled'
    },
    safety: {
      rating: '8.8 Score',
      overall: 8.8,
      factors: {
        abs: 9.0,
        tractionControl: 8.5,
        braking: 8.8,
        tyres: 8.6,
        lighting: 9.0,
        stability: 8.8
      }
    },
    mileage: {
      claimed: 30,
      realWorld: 28,
      city: 23,
      highway: 31
    },
    pricing: {
      exShowroom: 185000,
      rto: 18500,
      insuranceZeroDep: 10500,
      insuranceComp: 7200,
      accessoriesBase: 1500,
      warranty: 2500
    },
    maintenance: {
      schedule: [
        { name: 'First Service', timeline: '1,000 km / 1 Month', cost: 1800 },
        { name: 'General Tuneup', timeline: '5,000 km / 6 Months', cost: 900 },
        { name: 'Major Service', timeline: '10,000 km / 1 Year', cost: 3500 }
      ],
      annualCost: 4500,
      fiveYearEstimate: 22500
    },
    pricePrediction: {
      currentPrice: 185000,
      expectedDiscount: 4000,
      festivalOffers: '₹3,000 cash back + Free standard tank bag during Dussehra',
      marketTrend: 'STABLE',
      bestTimeToBuy: 'October (Festival Launches)',
      expectedFuturePrice: 187000
    },
    dimensions: {
      seatHeight: '807 mm',
      groundClearance: '157 mm',
      weight: '174 kg (Kerb)',
      wheelbase: '1344 mm',
      length: '1985 mm',
      width: '820 mm',
      fuelTankCapacity: '12 Liters'
    },
    features: ['Dual-Channel ABS', 'Switchable Traction Control', 'Ride-by-wire Throttle', 'Bluetooth Smart Navigation', 'Projector LED Headlamp', 'USB charging socket', 'Digital Instrumentation Console']
  },
  {
    id: 'karizma-xmr',
    brand: 'Hero MotoCorp',
    name: 'Hero Karizma XMR',
    category: 'Sport',
    ghostText: 'THE LEGEND RETURNS',
    themeColor: '#FF9F1C',
    heroImage: '/sport-bike.png',
    price: 179900,
    tagline: 'The legend returns. Dynamic performance and aerodynamic bodywork.',
    description: 'Hero MotoCorp’s flagship sports bike featuring a powerful DOHC liquid-cooled engine, slip-and-assist clutch, and modern aggressive styling.',
    powerSpec: '25.5 PS @ 9,250 RPM',
    mileageSpec: '35 km/l (Avg)',
    speedSpec: '143 km/h',
    safetyRating: '8.6 / 10',
    colors: [
      { name: 'Iconic Yellow', hex: '#FFBC0A', image: '/sport-bike.png' },
      { name: 'Turbo Red', hex: '#D62246', image: '/sport-bike.png' },
      { name: 'Matte Phantom Black', hex: '#212529', image: '/sport-bike.png' }
    ],
    accessories: [
      { id: 'kz-cg', name: 'Slider Crash Protection', price: 2100, description: 'Engine side guard panels' },
      { id: 'kz-sc', name: 'Smoked Visor', price: 1200, description: 'Dark aerodynamic windshield' }
    ],
    specs: {
      engine: '210cc Liquid Cooled Single Cylinder DOHC 4V',
      power: '25.5 PS @ 9,250 RPM',
      torque: '20.4 Nm @ 7,250 RPM',
      topSpeed: '143 km/h',
      acceleration0to60: '3.2 seconds',
      acceleration0to100: '8.4 seconds',
      rideModes: ['Sports Mode'],
      fuelTank: '11 Liters',
      transmission: '6-Speed with Assist & Slipper Clutch',
      cooling: 'Liquid Cooled'
    },
    safety: {
      rating: '8.6 Score',
      overall: 8.6,
      factors: {
        abs: 8.8,
        tractionControl: 7.8,
        braking: 8.5,
        tyres: 8.5,
        lighting: 8.8,
        stability: 8.5
      }
    },
    mileage: {
      claimed: 38,
      realWorld: 35,
      city: 32,
      highway: 39
    },
    pricing: {
      exShowroom: 179900,
      rto: 18000,
      insuranceZeroDep: 10200,
      insuranceComp: 7000,
      accessoriesBase: 1200,
      warranty: 2000
    },
    maintenance: {
      schedule: [
        { name: 'First Service', timeline: '1,000 km / 1 Month', cost: 1400 },
        { name: 'General tuneup', timeline: '5,000 km / 6 Months', cost: 800 },
        { name: 'Full Service', timeline: '10,000 km / 1 Year', cost: 2800 }
      ],
      annualCost: 3800,
      fiveYearEstimate: 19000
    },
    pricePrediction: {
      currentPrice: 179900,
      expectedDiscount: 3500,
      festivalOffers: '₹2,500 cashback for booking in Diwali',
      marketTrend: 'STABLE',
      bestTimeToBuy: 'October (Dussehra/Diwali)',
      expectedFuturePrice: 181500
    },
    dimensions: {
      seatHeight: '810 mm',
      groundClearance: '160 mm',
      weight: '163.5 kg (Kerb)',
      wheelbase: '1351 mm',
      length: '2068 mm',
      width: '760 mm',
      fuelTankCapacity: '11 Liters'
    },
    features: ['Dual-Channel ABS', 'Bluetooth Navigation Casting', 'Segment First Adjustable Windshield', 'Full LED Lighting', 'LCD Console with Turn-by-Turn GPS']
  },
  {
    id: 'classic-350',
    brand: 'Royal Enfield',
    name: 'Royal Enfield Classic 350',
    category: 'Premium',
    ghostText: 'TIMELESS CLASSIC',
    themeColor: '#7A6B58',
    heroImage: '/premium-bike.png',
    price: 193080,
    tagline: 'Timeless icon. Unmistakable classic thump and vintage design.',
    description: 'The definitive retro-classic cruiser rebuilt on the modern J-series engine platform. Smooth power delivery, heavy flywheel thump, and historic design cues.',
    powerSpec: '20.2 BHP @ 6,100 RPM',
    mileageSpec: '35 km/l (Avg)',
    speedSpec: '114 km/h',
    safetyRating: '8.7 / 10',
    colors: [
      { name: 'Halcyon Green', hex: '#2F4F3F', image: '/premium-bike.png' },
      { name: 'Chrome Red', hex: '#8B0000', image: '/premium-bike.png' },
      { name: 'Gunmetal Grey', hex: '#696969', image: '/premium-bike.png' }
    ],
    accessories: [
      { id: 're-ls', name: 'Touring Rider Seat', price: 3500, description: 'Dual density foam touring seat' },
      { id: 're-eg', name: 'Airfly Engine Guard', price: 4200, description: 'Crash protection bars' }
    ],
    specs: {
      engine: '349cc Air-Oil Cooled J-Series Single Cylinder SOHC',
      power: '20.2 BHP @ 6,100 RPM',
      torque: '27 Nm @ 4,000 RPM',
      topSpeed: '114 km/h',
      acceleration0to60: '5.2 seconds',
      acceleration0to100: '15.4 seconds',
      rideModes: ['Standard Cruiser Mode'],
      fuelTank: '13 Liters',
      transmission: '5-Speed Constant Mesh',
      cooling: 'Air-Oil Cooled'
    },
    safety: {
      rating: '8.7 Score',
      overall: 8.7,
      factors: {
        abs: 8.9,
        tractionControl: 7.0,
        braking: 8.6,
        tyres: 8.8,
        lighting: 8.0,
        stability: 9.0
      }
    },
    mileage: {
      claimed: 37,
      realWorld: 35,
      city: 32,
      highway: 38
    },
    pricing: {
      exShowroom: 193080,
      rto: 19300,
      insuranceZeroDep: 11000,
      insuranceComp: 7800,
      accessoriesBase: 1500,
      warranty: 2500
    },
    maintenance: {
      schedule: [
        { name: 'First Service', timeline: '500 km / 45 Days', cost: 1600 },
        { name: 'Tune-up', timeline: '5,000 km / 6 Months', cost: 1000 },
        { name: 'Annual Service & Oils', timeline: '10,000 km / 1 Year', cost: 3200 }
      ],
      annualCost: 4200,
      fiveYearEstimate: 21000
    },
    pricePrediction: {
      currentPrice: 193080,
      expectedDiscount: 2000,
      festivalOffers: 'Complimentary helmet + roadside assistance during Dussehra',
      marketTrend: 'STABLE',
      bestTimeToBuy: 'January',
      expectedFuturePrice: 196000
    },
    dimensions: {
      seatHeight: '805 mm',
      groundClearance: '170 mm',
      weight: '195 kg (Kerb)',
      wheelbase: '1390 mm',
      length: '2145 mm',
      width: '785 mm',
      fuelTankCapacity: '13 Liters'
    },
    features: ['Dual-Channel ABS', 'Retro Analogue Console with LCD Pod', 'Royal Enfield Tripper Navigator Option', 'Electric Start', 'Authentic Metal Styling Bodywork']
  },
  {
    id: 'hunter-350',
    brand: 'Royal Enfield',
    name: 'Royal Enfield Hunter 350',
    category: 'Mileage',
    ghostText: 'METRO ROADSTER',
    themeColor: '#4A90E2',
    heroImage: '/mileage-bike.png',
    price: 149900,
    tagline: 'Lightweight roadster. Urban agility and neo-retro layout.',
    description: 'An agile 350cc roadster built for tight city commutes. Features light handling, smaller wheels, lower seat height, and punchy J-series performance.',
    powerSpec: '20.2 BHP @ 6,100 RPM',
    mileageSpec: '36 km/l (Avg)',
    speedSpec: '114 km/h',
    safetyRating: '8.4 / 10',
    colors: [
      { name: 'Dapper Blue', hex: '#2A5C91', image: '/mileage-bike.png' },
      { name: 'Rebel Red', hex: '#C22C2C', image: '/mileage-bike.png' },
      { name: 'Dapper Ash', hex: '#63666A', image: '/mileage-bike.png' }
    ],
    accessories: [
      { id: 're-hg', name: 'Compact Engine Guard', price: 2900, description: 'Black powder coated engine guard' },
      { id: 're-tp', name: 'Bar End Mirrors', price: 5500, description: 'Billet aluminium bar end styling mirrors' }
    ],
    specs: {
      engine: '349cc Air-Oil Cooled J-Series Single Cylinder SOHC',
      power: '20.2 BHP @ 6,100 RPM',
      torque: '27 Nm @ 4,000 RPM',
      topSpeed: '114 km/h',
      acceleration0to60: '4.9 seconds',
      acceleration0to100: '15.0 seconds',
      rideModes: ['Standard Mode'],
      fuelTank: '13 Liters',
      transmission: '5-Speed Constant Mesh',
      cooling: 'Air-Oil Cooled'
    },
    safety: {
      rating: '8.4 Score',
      overall: 8.4,
      factors: {
        abs: 8.5,
        tractionControl: 6.5,
        braking: 8.5,
        tyres: 8.6,
        lighting: 7.8,
        stability: 8.5
      }
    },
    mileage: {
      claimed: 38,
      realWorld: 36,
      city: 34,
      highway: 40
    },
    pricing: {
      exShowroom: 149900,
      rto: 15000,
      insuranceZeroDep: 9200,
      insuranceComp: 6500,
      accessoriesBase: 1000,
      warranty: 1800
    },
    maintenance: {
      schedule: [
        { name: 'First Service', timeline: '500 km / 45 Days', cost: 1400 },
        { name: 'Tuneup', timeline: '5,000 km / 6 Months', cost: 800 },
        { name: 'Annual Service', timeline: '10,000 km / 1 Year', cost: 2800 }
      ],
      annualCost: 3800,
      fiveYearEstimate: 18000
    },
    pricePrediction: {
      currentPrice: 149900,
      expectedDiscount: 2500,
      festivalOffers: 'Low interest financing of 6.99% for Diwali sales',
      marketTrend: 'STABLE',
      bestTimeToBuy: 'October',
      expectedFuturePrice: 152000
    },
    dimensions: {
      seatHeight: '790 mm',
      groundClearance: '150.5 mm',
      weight: '181 kg (Kerb)',
      wheelbase: '1370 mm',
      length: '2055 mm',
      width: '800 mm',
      fuelTankCapacity: '13 Liters'
    },
    features: ['Dual-Channel ABS', 'Digi-Analog Instrument Cluster', 'Alloy Wheels with Tubeless Tyres', 'USB Charger Port', 'Short Roadster Custom Exhaust']
  },
  {
    id: 'pulsar-ns200',
    brand: 'Bajaj',
    name: 'Bajaj Pulsar NS200',
    category: 'Sport',
    ghostText: 'THE NAKED SPORT',
    themeColor: '#D33F49',
    heroImage: '/sport-bike.png',
    price: 158270,
    tagline: 'Pure street fighter. Rev-happy perimeter frame performance.',
    description: 'The defining segment starter featuring a high-revving liquid-cooled 4V engine, perimeter frame, and sport suspension for aggressive handling.',
    powerSpec: '24.5 PS @ 9,750 RPM',
    mileageSpec: '35 km/l (Avg)',
    speedSpec: '136 km/h',
    safetyRating: '8.5 / 10',
    colors: [
      { name: 'Cocktail Wine Red', hex: '#9E1B24', image: '/sport-bike.png' },
      { name: 'Ebony Black', hex: '#1C1C1C', image: '/sport-bike.png' },
      { name: 'Pewter Grey', hex: '#777B7E', image: '/sport-bike.png' }
    ],
    accessories: [
      { id: 'ns-cg200', name: 'Leg Guard Set', price: 1100, description: 'Steel tubes protect engine sides' },
      { id: 'ns-sc200', name: 'Carbon fiber tank protector', price: 500, description: 'Scratch cover sticker' }
    ],
    specs: {
      engine: '199.5cc Liquid Cooled Single Cylinder SOHC 4V Triple Spark',
      power: '24.5 PS @ 9,750 RPM',
      torque: '18.74 Nm @ 8,000 RPM',
      topSpeed: '136 km/h',
      acceleration0to60: '3.8 seconds',
      acceleration0to100: '9.8 seconds',
      rideModes: ['Default Performance Mode'],
      fuelTank: '12 Liters',
      transmission: '6-Speed Constant Mesh',
      cooling: 'Liquid Cooled'
    },
    safety: {
      rating: '8.5 Score',
      overall: 8.5,
      factors: {
        abs: 8.7,
        tractionControl: 6.0,
        braking: 8.6,
        tyres: 8.4,
        lighting: 8.2,
        stability: 8.5
      }
    },
    mileage: {
      claimed: 37,
      realWorld: 35,
      city: 32,
      highway: 38
    },
    pricing: {
      exShowroom: 158270,
      rto: 15800,
      insuranceZeroDep: 9500,
      insuranceComp: 6800,
      accessoriesBase: 900,
      warranty: 1800
    },
    maintenance: {
      schedule: [
        { name: 'First Service', timeline: '750 km / 30 Days', cost: 1200 },
        { name: 'General Tuneup', timeline: '4,000 km / 4 Months', cost: 700 },
        { name: 'Yearly tuneup', timeline: '10,000 km / 1 Year', cost: 2600 }
      ],
      annualCost: 3500,
      fiveYearEstimate: 16500
    },
    pricePrediction: {
      currentPrice: 158270,
      expectedDiscount: 3000,
      festivalOffers: '₹2,000 cash back + Free engine checkup card',
      marketTrend: 'STABLE',
      bestTimeToBuy: 'October',
      expectedFuturePrice: 160000
    },
    dimensions: {
      seatHeight: '805 mm',
      groundClearance: '168 mm',
      weight: '158 kg (Kerb)',
      wheelbase: '1363 mm',
      length: '2017 mm',
      width: '804 mm',
      fuelTankCapacity: '12 Liters'
    },
    features: ['Dual-Channel ABS', 'Upside Down (USD) Front Forks', 'Fully Digital Bluetooth Dashboard', 'Perimeter Frame Structure', 'Underbelly Exhaust']
  },
  {
    id: 'chetak-electric',
    brand: 'Bajaj',
    name: 'Bajaj Chetak Premium',
    category: 'Electric',
    ghostText: 'FUTURE CLASSIC',
    themeColor: '#F5B041',
    heroImage: '/electric-bike.png',
    price: 115000,
    tagline: 'Timeless styling. All-metal body steel structure.',
    description: 'Bajaj’s iconic legacy reinvented for the electric era. Elegant sheet metal body, retro silhouette, smart phone pairing, and 126 km certified range.',
    powerSpec: '4.2 kW Peak Power',
    mileageSpec: '126 km Range',
    speedSpec: '73 km/h',
    safetyRating: '8.8 / 10',
    colors: [
      { name: 'Brooklyn Black', hex: '#1C1C1C', image: '/electric-bike.png' },
      { name: 'Indigo Metallic', hex: '#1B2A4A', image: '/electric-bike.png' },
      { name: 'Hazelnut Cream', hex: '#DFD5C6', image: '/electric-bike.png' }
    ],
    accessories: [
      { id: 'ch-fc', name: 'Smart Fast Charger', price: 9500, description: 'Charges 0-80% in 3 hours' },
      { id: 'ch-bg', name: 'Body Guards Structure', price: 3500, description: 'Full perimeter stainless steel wrap guards' }
    ],
    specs: {
      engine: 'High efficiency BLDC Hub Motor (4.2 kW)',
      power: '5.6 hp (Equivalent)',
      torque: '20 Nm (Instant)',
      topSpeed: '73 km/h',
      acceleration0to60: '5.5 seconds',
      acceleration0to100: 'N/A',
      rideModes: ['Eco', 'Sports', 'Reverse'],
      fuelTank: '3.2 kWh Lithium-Ion battery pack',
      transmission: 'Direct Drive',
      cooling: 'Air Cooled'
    },
    safety: {
      rating: '8.8 Score',
      overall: 8.8,
      factors: {
        abs: 8.5,
        tractionControl: 8.0,
        braking: 8.8,
        tyres: 9.0,
        lighting: 9.0,
        stability: 9.0
      }
    },
    mileage: {
      claimed: 126,
      realWorld: 115,
      city: 120,
      highway: 90
    },
    pricing: {
      exShowroom: 115000,
      rto: 2000,
      insuranceZeroDep: 6500,
      insuranceComp: 4500,
      accessoriesBase: 1000,
      warranty: 3000
    },
    maintenance: {
      schedule: [
        { name: 'First Diagnostics Service', timeline: '3,000 km / 3 Months', cost: 500 },
        { name: 'Annual Software Diagnostics', timeline: '12,000 km / 1 Year', cost: 1200 }
      ],
      annualCost: 1200,
      fiveYearEstimate: 6000
    },
    pricePrediction: {
      currentPrice: 115000,
      expectedDiscount: 8000,
      festivalOffers: '₹7,500 state electricity board incentives during Navratri',
      marketTrend: 'DOWNWARD',
      bestTimeToBuy: 'Immediate',
      expectedFuturePrice: 108000
    },
    dimensions: {
      seatHeight: '780 mm',
      groundClearance: '160 mm',
      weight: '133 kg (Kerb)',
      wheelbase: '1330 mm',
      length: '1894 mm',
      width: '725 mm',
      fuelTankCapacity: '3.2 kWh IP67 Battery'
    },
    features: ['Combined Braking System (CBS)', 'Hill Hold Assist', 'All LED Retro Lighting System', 'Full Metal Body Sheet Metal Panels', 'Connected Smartphone Navigation TFT Screen']
  },
  {
    id: 'raider-125',
    brand: 'TVS',
    name: 'TVS Raider 125',
    category: 'Mileage',
    ghostText: 'THE SMART COMMUTER',
    themeColor: '#F4D03F',
    heroImage: '/mileage-bike.png',
    price: 95219,
    tagline: 'Wicked Commuter. High efficiency and advanced digital dashboard.',
    description: 'Award-winning commuter bike featuring first-in-segment TFT screen with voice commands, high fuel economy, sporty layout, and dynamic handling.',
    powerSpec: '11.38 PS @ 7,500 RPM',
    mileageSpec: '67 km/l (Avg)',
    speedSpec: '99 km/h',
    safetyRating: '8.2 / 10',
    colors: [
      { name: 'Fiery Yellow', hex: '#FFBC00', image: '/mileage-bike.png' },
      { name: 'Wicked Black', hex: '#1C1C1C', image: '/mileage-bike.png' },
      { name: 'Striking Red', hex: '#E74C3C', image: '/mileage-bike.png' }
    ],
    accessories: [
      { id: 'tv-cg', name: 'Engine Belly Pan', price: 950, description: 'Underbelly protection panel' },
      { id: 'tv-sc', name: 'Rider Cushion Cover', price: 450, description: 'Soft mesh ventilation cover' }
    ],
    specs: {
      engine: '124.8cc Air-Oil Cooled Single Cylinder 3V SOHC',
      power: '11.38 PS @ 7,500 RPM',
      torque: '11.2 Nm @ 6,000 RPM',
      topSpeed: '99 km/h',
      acceleration0to60: '5.9 seconds',
      acceleration0to100: 'N/A',
      rideModes: ['Eco Mode', 'Power Mode'],
      fuelTank: '10 Liters',
      transmission: '5-Speed Constant Mesh',
      cooling: 'Air-Oil Cooled'
    },
    safety: {
      rating: '8.2 Score',
      overall: 8.2,
      factors: {
        abs: 8.0,
        tractionControl: 5.0,
        braking: 8.2,
        tyres: 8.2,
        lighting: 8.5,
        stability: 8.0
      }
    },
    mileage: {
      claimed: 71,
      realWorld: 67,
      city: 62,
      highway: 70
    },
    pricing: {
      exShowroom: 95219,
      rto: 9500,
      insuranceZeroDep: 6200,
      insuranceComp: 4500,
      accessoriesBase: 800,
      warranty: 1200
    },
    maintenance: {
      schedule: [
        { name: 'First Service', timeline: '750 km / 30 Days', cost: 800 },
        { name: 'General Service', timeline: '3,000 km / 3 Months', cost: 500 },
        { name: 'Annual Tuneup', timeline: '9,000 km / 1 Year', cost: 1800 }
      ],
      annualCost: 2400,
      fiveYearEstimate: 11000
    },
    pricePrediction: {
      currentPrice: 95219,
      expectedDiscount: 1500,
      festivalOffers: 'Zero down payment schemes during Diwali',
      marketTrend: 'STABLE',
      bestTimeToBuy: 'October',
      expectedFuturePrice: 96500
    },
    dimensions: {
      seatHeight: '780 mm',
      groundClearance: '180 mm',
      weight: '123 kg (Kerb)',
      wheelbase: '1300 mm',
      length: '2070 mm',
      width: '785 mm',
      fuelTankCapacity: '10 Liters'
    },
    features: ['Sync Braking System (SBT)', 'SmartXonnect 5-inch TFT Dashboard', 'Voice Assist Commands', 'Underseat Utility Storage', 'Inteligo Auto Start-Stop Tech']
  },
  {
    id: 'iqube-electric',
    brand: 'TVS',
    name: 'TVS iQube S',
    category: 'Electric',
    ghostText: 'CONNECTED MOBILITY',
    themeColor: '#70D6FF',
    heroImage: '/electric-bike.png',
    price: 138000,
    tagline: 'Smart scooter. Comfortable family layout and connected app ecosystem.',
    description: 'TVS’s practical electric scooter designed for families. Generous floorboard space, large digital console, and robust real world range.',
    powerSpec: '4.4 kW Peak Power',
    mileageSpec: '100 km Range',
    speedSpec: '78 km/h',
    safetyRating: '8.6 / 10',
    colors: [
      { name: 'Mercury Grey', hex: '#B2B5B2', image: '/electric-bike.png' },
      { name: 'Mint Blue', hex: '#A8DADC', image: '/electric-bike.png' },
      { name: 'Lucid Yellow', hex: '#FDF0D5', image: '/electric-bike.png' }
    ],
    accessories: [
      { id: 'iq-fc', name: 'TVS iQube Wall Charger', price: 8500, description: 'Home installation wallbox' },
      { id: 'iq-bg', name: 'Steel Safety Guards', price: 2800, description: 'Stainless steel side wrap guards' }
    ],
    specs: {
      engine: 'High efficiency Hub Motor (4.4 kW Peak)',
      power: '5.9 hp (Equivalent)',
      torque: '33 Nm (Instant)',
      topSpeed: '78 km/h',
      acceleration0to60: '5.1 seconds',
      acceleration0to100: 'N/A',
      rideModes: ['Eco', 'Power'],
      fuelTank: '3.4 kWh Lithium-Ion battery pack',
      transmission: 'Direct Drive',
      cooling: 'Air Cooled'
    },
    safety: {
      rating: '8.6 Score',
      overall: 8.6,
      factors: {
        abs: 8.2,
        tractionControl: 7.5,
        braking: 8.5,
        tyres: 8.8,
        lighting: 9.0,
        stability: 9.0
      }
    },
    mileage: {
      claimed: 100,
      realWorld: 90,
      city: 92,
      highway: 75
    },
    pricing: {
      exShowroom: 138000,
      rto: 2200,
      insuranceZeroDep: 7200,
      insuranceComp: 5000,
      accessoriesBase: 1200,
      warranty: 3200
    },
    maintenance: {
      schedule: [
        { name: 'First Diagnostics Check', timeline: '2,500 km / 2 Months', cost: 400 },
        { name: 'Annual Software Update', timeline: '10,000 km / 1 Year', cost: 1100 }
      ],
      annualCost: 1100,
      fiveYearEstimate: 5500
    },
    pricePrediction: {
      currentPrice: 138000,
      expectedDiscount: 6000,
      festivalOffers: '₹5,000 direct dealer cashback for year-end allocations',
      marketTrend: 'STABLE',
      bestTimeToBuy: 'December',
      expectedFuturePrice: 139500
    },
    dimensions: {
      seatHeight: '770 mm',
      groundClearance: '150 mm',
      weight: '118 kg (Kerb)',
      wheelbase: '1300 mm',
      length: '1805 mm',
      width: '645 mm',
      fuelTankCapacity: '3.4 kWh IP67 Battery'
    },
    features: ['Combined Braking System (CBS)', '7-inch TFT Full Color Display', 'Turn-by-turn App Navigation', 'Geofencing & Anti-theft Alerts', 'Spacious 32-Liter Underseat Storage']
  },
  {
    id: 'xpulse-200',
    brand: 'Hero MotoCorp',
    name: 'Hero XPulse 200 4V',
    category: 'Adventure',
    ghostText: 'ADVENTURE ANYWHERE',
    themeColor: '#2ECC71',
    heroImage: '/adventure-bike.png',
    price: 145780,
    tagline: 'Lightweight off-roader. High travel suspension and spoked wheels.',
    description: 'accessible adventure tourer. Features long-travel front suspension, high ground clearance, dual-purpose block tyres, and spoked wheels.',
    powerSpec: '19.1 PS @ 8,500 RPM',
    mileageSpec: '40 km/l (Avg)',
    speedSpec: '115 km/h',
    safetyRating: '8.9 / 10',
    colors: [
      { name: 'Techno Blue', hex: '#1B4F72', image: '/adventure-bike.png' },
      { name: 'Sports Red', hex: '#C0392B', image: '/adventure-bike.png' },
      { name: 'Matte Nexus Blue', hex: '#566573', image: '/adventure-bike.png' }
    ],
    accessories: [
      { id: 'xp-bp', name: 'Rally Sump Guard', price: 1800, description: 'Aluminium engine bash plate' },
      { id: 'xp-lh', name: 'Touring Luggage Plate', price: 2200, description: 'Rear top rack base plate' }
    ],
    specs: {
      engine: '199.6cc Oil Cooled Single Cylinder 4V SOHC',
      power: '19.1 PS @ 8,500 RPM',
      torque: '17.35 Nm @ 6,500 RPM',
      topSpeed: '115 km/h',
      acceleration0to60: '4.2 seconds',
      acceleration0to100: '12.5 seconds',
      rideModes: ['Road Mode', 'Off-road Mode'],
      fuelTank: '13 Liters',
      transmission: '5-Speed Constant Mesh',
      cooling: 'Oil Cooled'
    },
    safety: {
      rating: '8.9 Score',
      overall: 8.9,
      factors: {
        abs: 9.0,
        tractionControl: 6.0,
        braking: 8.8,
        tyres: 9.2,
        lighting: 8.5,
        stability: 9.0
      }
    },
    mileage: {
      claimed: 42,
      realWorld: 40,
      city: 36,
      highway: 44
    },
    pricing: {
      exShowroom: 145780,
      rto: 14600,
      insuranceZeroDep: 8900,
      insuranceComp: 6200,
      accessoriesBase: 1000,
      warranty: 1800
    },
    maintenance: {
      schedule: [
        { name: 'First Service', timeline: '500 km / 45 Days', cost: 1100 },
        { name: 'General Check', timeline: '4,000 km / 4 Months', cost: 600 },
        { name: 'Annual Service & Oils', timeline: '8,000 km / 1 Year', cost: 2400 }
      ],
      annualCost: 3200,
      fiveYearEstimate: 15500
    },
    pricePrediction: {
      currentPrice: 145780,
      expectedDiscount: 2000,
      festivalOffers: 'Free roadside assistance package for Diwali bookings',
      marketTrend: 'STABLE',
      bestTimeToBuy: 'October',
      expectedFuturePrice: 147500
    },
    dimensions: {
      seatHeight: '825 mm',
      groundClearance: '220 mm',
      weight: '158 kg (Kerb)',
      wheelbase: '1410 mm',
      length: '2222 mm',
      width: '850 mm',
      fuelTankCapacity: '13 Liters'
    },
    features: ['Single-Channel ABS with modes', 'Upswept Exhaust Pipe', 'Dual Purpose Block Tyres', 'LCD Console with Bluetooth GPS Nav', 'High travel telescopic suspension']
  },
  {
    id: 'ola-s1-pro',
    brand: 'Ola Electric',
    name: 'Ola S1 Pro Gen 2',
    category: 'Electric',
    ghostText: 'HIGH SPEED EV',
    themeColor: '#9B5DE5',
    heroImage: '/electric-bike.png',
    price: 129999,
    tagline: 'Premium tech cruiser. Instant performance and huge touchscreen console.',
    description: 'Ola’s high output electric scooter. Features cruise control, keyless digital unlock, internal music speakers, and an impressive range.',
    powerSpec: '11 kW Peak Motor',
    mileageSpec: '195 km Range',
    speedSpec: '120 km/h',
    safetyRating: '9.0 / 10',
    colors: [
      { name: 'Stellar Blue', hex: '#2A9D8F', image: '/electric-bike.png' },
      { name: 'Midnight Blue', hex: '#1D3557', image: '/electric-bike.png' },
      { name: 'Matt Black', hex: '#1C1C1C', image: '/electric-bike.png' }
    ],
    accessories: [
      { id: 'ol-sc', name: 'Buddy Step Guard', price: 1990, description: 'Stainless steel side pillion footrest' },
      { id: 'ol-fc', name: 'Hypercharge Subscription', price: 3000, description: 'Access to Ola Hypercharger fast grid network' }
    ],
    specs: {
      engine: 'High efficiency Mid-Drive motor (11 kW Peak)',
      power: '14.7 hp (Equivalent)',
      torque: '58 Nm (Instant)',
      topSpeed: '120 km/h',
      acceleration0to60: '4.3 seconds',
      acceleration0to100: 'N/A',
      rideModes: ['Eco', 'Normal', 'Sports', 'Hyper'],
      fuelTank: '4.0 kWh Lithium-Ion battery pack',
      transmission: 'Belt Drive',
      cooling: 'Air Cooled'
    },
    safety: {
      rating: '9.0 Score',
      overall: 9.0,
      factors: {
        abs: 8.8,
        tractionControl: 8.5,
        braking: 9.0,
        tyres: 9.0,
        lighting: 9.2,
        stability: 9.0
      }
    },
    mileage: {
      claimed: 195,
      realWorld: 143,
      city: 150,
      highway: 110
    },
    pricing: {
      exShowroom: 129999,
      rto: 2000,
      insuranceZeroDep: 7000,
      insuranceComp: 4800,
      accessoriesBase: 1200,
      warranty: 3500
    },
    maintenance: {
      schedule: [
        { name: 'Diagnostics Service', timeline: '5,000 km / 6 Months', cost: 400 },
        { name: 'Software Scan & Service', timeline: '15,000 km / 18 Months', cost: 1000 }
      ],
      annualCost: 800,
      fiveYearEstimate: 4000
    },
    pricePrediction: {
      currentPrice: 129999,
      expectedDiscount: 7000,
      festivalOffers: 'Free Ola Hypercharger access for 1 year during Diwali promotions',
      marketTrend: 'DOWNWARD',
      bestTimeToBuy: 'October',
      expectedFuturePrice: 122999
    },
    dimensions: {
      seatHeight: '805 mm',
      groundClearance: '160 mm',
      weight: '116 kg (Kerb)',
      wheelbase: '1359 mm',
      length: '1860 mm',
      width: '710 mm',
      fuelTankCapacity: '4.0 kWh IP67 Battery'
    },
    features: ['Combined Braking System (CBS)', '7-inch Touchscreen Console', 'Integrated Party Mode Speakers', 'Electronic Cruise Control', 'Digital Keyless NFC Entry', 'Reverse Mode Assist']
  },
  {
    id: 'ather-450x',
    brand: 'Ather Energy',
    name: 'Ather 450X Gen 4',
    category: 'Electric',
    ghostText: 'THE SMART ATHLETE',
    themeColor: '#27AE60',
    heroImage: '/electric-bike.png',
    price: 140600,
    tagline: 'Sports electric scooter. Ultra sharp handling and warp speed acceleration.',
    description: 'India’s benchmark sports scooter featuring an aluminum spaceframe, Google maps casting on a color touchscreen, and aggressive agile handling.',
    powerSpec: '6.4 kW PMSM Motor',
    mileageSpec: '110 km Range',
    speedSpec: '90 km/h',
    safetyRating: '9.2 / 10',
    colors: [
      { name: 'Space Grey', hex: '#4A5568', image: '/electric-bike.png' },
      { name: 'Salt White', hex: '#F7FAFC', image: '/electric-bike.png' },
      { name: 'Still Green', hex: '#1C3A27', image: '/electric-bike.png' }
    ],
    accessories: [
      { id: 'at-tp', name: 'Tire Pressure Monitor System', price: 4999, description: 'Sensors sync with dashboard screen' },
      { id: 'at-sc', name: 'Ather Protective Wrap', price: 1500, description: 'Custom wrap protects side body panels' }
    ],
    specs: {
      engine: 'High performance PMSM Motor (6.4 kW Peak)',
      power: '8.5 hp (Equivalent)',
      torque: '26 Nm (Instant)',
      topSpeed: '90 km/h',
      acceleration0to60: '3.3 seconds',
      acceleration0to100: 'N/A',
      rideModes: ['SmartEco', 'Eco', 'Ride', 'Sport', 'Warp'],
      fuelTank: '3.7 kWh Lithium-Ion battery pack',
      transmission: 'Direct Drive Belt',
      cooling: 'Air Cooled'
    },
    safety: {
      rating: '9.2 Score',
      overall: 9.2,
      factors: {
        abs: 9.0,
        tractionControl: 8.8,
        braking: 9.4,
        tyres: 9.4,
        lighting: 9.0,
        stability: 9.5
      }
    },
    mileage: {
      claimed: 110,
      realWorld: 90,
      city: 92,
      highway: 75
    },
    pricing: {
      exShowroom: 140600,
      rto: 2000,
      insuranceZeroDep: 7400,
      insuranceComp: 5200,
      accessoriesBase: 1500,
      warranty: 3500
    },
    maintenance: {
      schedule: [
        { name: 'Diagnostic Health Scan', timeline: '5,000 km / 6 Months', cost: 500 },
        { name: 'Software Scan & Belt Tune', timeline: '10,000 km / 1 Year', cost: 1200 }
      ],
      annualCost: 1200,
      fiveYearEstimate: 6000
    },
    pricePrediction: {
      currentPrice: 140600,
      expectedDiscount: 5000,
      festivalOffers: 'Free Ather Grid public fast charging access for 1 year',
      marketTrend: 'STABLE',
      bestTimeToBuy: 'October',
      expectedFuturePrice: 143000
    },
    dimensions: {
      seatHeight: '780 mm',
      groundClearance: '150 mm',
      weight: '111.6 kg (Kerb)',
      wheelbase: '1295 mm',
      length: '1837 mm',
      width: '734 mm',
      fuelTankCapacity: '3.7 kWh IP67 Battery'
    },
    features: ['Combined Disk Braking System (CBS)', 'Google Maps Touch Navigation', 'Warp Mode instant launch performance', 'Aluminum Spaceframe structure', 'NFC Keyless lock', 'Emergency Brake Warning light']
  }
];

export const UPCOMING_BIKES: UpcomingMotorcycle[] = [
  {
    id: 'himalayan-650',
    name: 'Royal Enfield Himalayan 650',
    expectedPrice: '₹4,10,000',
    expectedLaunchDate: 'October 2026',
    expectedSpecs: '648cc parallel-twin Sherpa-style frame, spoked tubeless rims',
    image: '/adventure-bike.png',
    countdownDays: 110
  },
  {
    id: 'ktm-390adv-2026',
    name: 'KTM 390 Adventure R (Next-Gen)',
    expectedPrice: '₹3,75,000',
    expectedLaunchDate: 'November 2026',
    expectedSpecs: 'New chassis, adjustable WP apex suspension, cruise control',
    image: '/adventure-bike.png',
    countdownDays: 145
  },
  {
    id: 'ather-diesel',
    name: 'Ather Apex Roadster',
    expectedPrice: '₹2,10,000',
    expectedLaunchDate: 'January 2027',
    expectedSpecs: 'High output mid-drive motor, 150 km/h top speed, radar alert',
    image: '/electric-bike.png',
    countdownDays: 205
  }
];

export const SHOWROOMS: Showroom[] = [
  {
    id: 'sr-1',
    name: 'BRO BIKE Experience Center — Downtown Bangalore',
    address: '102, Prestige Plaza, MG Road, Bangalore',
    pincode: '560001',
    distance: '1.2 km away',
    phone: '+91 98765 43210',
    hours: '10:00 AM - 8:00 PM',
    isServiceCenter: true,
    rating: 4.9
  },
  {
    id: 'sr-2',
    name: 'BRO BIKE Hub — Koramangala Bangalore',
    address: '45, 80 Feet Road, 4th Block, Koramangala, Bangalore',
    pincode: '560034',
    distance: '4.8 km away',
    phone: '+91 98765 43211',
    hours: '10:00 AM - 8:30 PM',
    isServiceCenter: true,
    rating: 4.8
  },
  {
    id: 'sr-3',
    name: 'BRO BIKE Service Lab — Whitefield Bangalore',
    address: 'Plot 12, EPIP Zone, Whitefield Industrial Area, Bangalore',
    pincode: '560066',
    distance: '12.5 km away',
    phone: '+91 98765 43212',
    hours: '9:00 AM - 6:00 PM',
    isServiceCenter: true,
    rating: 4.7
  },
  {
    id: 'sr-4',
    name: 'BRO BIKE Express Outlet — Indiranagar Bangalore',
    address: '789, 100 Feet Road, Indiranagar, Bangalore',
    pincode: '560038',
    distance: '3.1 km away',
    phone: '+91 98765 43213',
    hours: '10:00 AM - 9:00 PM',
    isServiceCenter: false,
    rating: 4.9
  }
];
