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
      power: '40.2 hp (Equivalent Peak Power)',
      torque: '90 Nm (Instantaneous)',
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
      rto: 5000, // zero or very low RTO for EVs in many Indian states
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
    id: 'r15-v4',
    name: 'Yamaha R15 V4',
    category: 'Mileage',
    ghostText: 'RACING DNA',
    themeColor: '#FFD447',
    heroImage: '/mileage-bike.png',
    price: 182000,
    tagline: 'Born of Racing DNA. Hyper-efficient track aerodynamics.',
    description: 'A pocket-sized track machine featuring Variable Valve Actuation (VVA) that delivers an exceptional 45 km/l along with full aerodynamic fairing and traction control.',
    powerSpec: '18.4 PS @ 10,000 RPM',
    mileageSpec: '45 km/l (Avg)',
    speedSpec: '140 km/h',
    safetyRating: '8.7 / 10',
    colors: [
      { name: 'Racing Blue', hex: '#004A99', image: '/mileage-bike.png' },
      { name: 'Metallic Red', hex: '#BF1E2E', image: '/mileage-bike.png' },
      { name: 'Intensity White', hex: '#FFFFFF', image: '/mileage-bike.png' }
    ],
    accessories: [
      { id: 'r15-cg', name: 'Fairing Sliders', price: 2800, description: 'Fairing protection guard' },
      { id: 'r15-qs', name: 'Quickshifter (Up-Only)', price: 3800, description: 'Smooth upshifts at high RPM' },
      { id: 'r15-sc', name: 'Mesh Rider Seat Cover', price: 750, description: 'Breathable seat cushion mesh' }
    ],
    specs: {
      engine: '155cc Liquid Cooled Single Cylinder SOHC 4V with VVA',
      power: '18.4 PS @ 10,000 RPM',
      torque: '14.2 Nm @ 7,500 RPM',
      topSpeed: '140 km/h',
      acceleration0to60: '3.4 seconds',
      acceleration0to100: '10.1 seconds',
      rideModes: ['Track Mode', 'Street Mode'],
      fuelTank: '11 Liters',
      transmission: '6-Speed with Assist & Slipper Clutch',
      cooling: 'Liquid Cooled'
    },
    safety: {
      rating: '8.7 Score',
      overall: 8.7,
      factors: {
        abs: 9.0,
        tractionControl: 8.8,
        braking: 8.5,
        tyres: 8.6,
        lighting: 8.8,
        stability: 8.5
      }
    },
    mileage: {
      claimed: 50,
      realWorld: 45,
      city: 40,
      highway: 50
    },
    pricing: {
      exShowroom: 182000,
      rto: 18200,
      insuranceZeroDep: 9800,
      insuranceComp: 6800,
      accessoriesBase: 1200,
      warranty: 2000
    },
    maintenance: {
      schedule: [
        { name: 'First Service', timeline: '1,000 km / 1 Month', cost: 1200 },
        { name: 'Second Inspection', timeline: '4,000 km / 4 Months', cost: 800 },
        { name: 'VVA Tuneup & Engine Oil', timeline: '8,000 km / 8 Months', cost: 2400 }
      ],
      annualCost: 3500,
      fiveYearEstimate: 16500
    },
    pricePrediction: {
      currentPrice: 182000,
      expectedDiscount: 3000,
      festivalOffers: '₹2,000 cashback + Free Yamaha merchandise helmet during Diwali',
      marketTrend: 'STABLE',
      bestTimeToBuy: 'October (Festival Season)',
      expectedFuturePrice: 184000
    },
    dimensions: {
      seatHeight: '815 mm',
      groundClearance: '170 mm',
      weight: '141 kg (Kerb)',
      wheelbase: '1325 mm',
      length: '1990 mm',
      width: '725 mm',
      fuelTankCapacity: '11 Liters'
    },
    features: ['Dual-Channel ABS', 'Traction Control System', 'Bluetooth Y-Connect Link', 'VVA (Variable Valve Actuation)', 'Bi-Functional LED Headlight', 'Quick Shifter', 'Assist & Slipper Clutch', 'TFT Style Digital Display']
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
