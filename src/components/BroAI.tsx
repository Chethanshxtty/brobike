import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, ShieldAlert, BadgeCheck, Wrench } from 'lucide-react';
import { MOTORCYCLES, type Motorcycle } from '../data/bikes';


interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  recommendations?: Motorcycle[];
  reasoning?: string;
  pros?: string[];
  cons?: string[];
  ownershipEstimate?: string;
  riderType?: string;
  isTyping?: boolean;
}

interface BroAIProps {
  onSelectBike: (bike: Motorcycle) => void;
}

export const BroAI: React.FC<BroAIProps> = ({ onSelectBike }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Welcome to BRO AI. Tell me what you're looking for. Type your budget, desired mileage, style, or daily routine, and I will recommend your perfect match."
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const presets = [
    { label: "I have ₹2 lakh", query: "I have ₹2 lakh budget" },
    { label: "Need mileage", query: "Show me bikes with best mileage" },
    { label: "Need electric bike", query: "I want an electric bike" },
    { label: "Need off-road motorcycle", query: "Need a bike for off-road and adventure" }
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (query: string): Partial<Message> => {
    const q = query.toLowerCase();
    
    if (q.includes('2 lakh') || q.includes('lakh') || q.includes('200000') || q.includes('budget') || q.includes('price')) {
      const budgetBikes = MOTORCYCLES.filter(b => b.price <= 200000);
      return {
        text: `Under ₹2 Lakh, we have exactly what you need. The **BRO-EcoPulse 150** fits comfortably at ₹1.2L Ex-showroom (approx ₹1.4L on-road), while the futuristic **BRO-Cyber S** is available at ₹1.85L.`,
        recommendations: budgetBikes,
        reasoning: "These models offer the lowest cost of entry without compromising on tech features like smart digital dashes, phone sync, and ABS.",
        pros: ["Extremely affordable initial purchase", "Lowest ownership and fuel/charging costs", "Lightweight, easy to navigate in dense city traffic"],
        cons: ["Not designed for high speed highway touring", "Lower top speeds compared to premium performance classes"],
        ownershipEstimate: "EcoPulse: ~₹3,500/year service. Cyber S: virtually zero maintenance, charging at ~₹40/charge.",
        riderType: "Urban commuters, students, and eco-conscious riders seeking maximum value."
      };
    }

    if (q.includes('mileage') || q.includes('fuel') || q.includes('efficiency') || q.includes('economy')) {
      const mileageBikes = [
        MOTORCYCLES.find(b => b.id === 'ecopulse-150')!,
        MOTORCYCLES.find(b => b.id === 'cyber-s')!
      ].filter(Boolean);
      return {
        text: `If high mileage is your priority, the **BRO-EcoPulse 150** is our fuel champ offering a record 72 km/l. Alternatively, go fully electric with the **BRO-Cyber S** for a 180 km range on a single charge.`,
        recommendations: mileageBikes,
        reasoning: "Both are designed specifically to optimize energy consumption per kilometer. The EcoPulse uses a highly efficient 155cc single-cylinder FI motor, while the Cyber S uses regenerative braking to recoup power.",
        pros: ["Saves up to ₹45,000/year in fuel costs", "Large tank range on EcoPulse (12L x 72km = 850km+)", "Quiet and smooth power delivery"],
        cons: ["Moderate acceleration and lower horsepower specs"],
        ownershipEstimate: "Monthly fuel/electricity cost under ₹800 (for 30km daily commutes).",
        riderType: "Daily office commuters, long distance delivery riders, and budget-conscious buyers."
      };
    }

    if (q.includes('electric') || q.includes('ev') || q.includes('battery') || q.includes('charging')) {
      const evBike = MOTORCYCLES.filter(b => b.category === 'Electric');
      return {
        text: `The **BRO-Cyber S** is our premier electric vehicle, featuring a 5.2 kWh lithium pack and instant 76 Nm torque from 0 RPM.`,
        recommendations: evBike,
        reasoning: "Designed to replace conventional petrol commuters with an ultra-connected smart bike that receives over-the-air (OTA) feature updates.",
        pros: ["Instant throttle response", "No gears - fully clutchless twist-and-go", "Zero carbon emissions and silent operation"],
        cons: ["90 minutes fast-charge time required", "Highway range decreases at sustained high speeds"],
        ownershipEstimate: "Charging costs around ₹0.22 per km. Scheduled maintenance is less than ₹1,500/year.",
        riderType: "Tech enthusiasts, urban professionals, and early adopters of electric technology."
      };
    }

    if (q.includes('offroad') || q.includes('off-road') || q.includes('adventure') || q.includes('tour') || q.includes('dirt')) {
      const advBike = MOTORCYCLES.filter(b => b.category === 'Adventure');
      return {
        text: `For adventure and off-roading, the **BRO-Terra 850** is built for extreme trails. It features 220mm ground clearance and long-travel suspension.`,
        recommendations: advBike,
        reasoning: "Built with a parallel-twin engine delivering 95 PS of torque and multi-spoke tubeless rims designed to handle impacts.",
        pros: ["Comfortable upright riding ergonomics", "Luggage-ready frame with standard hard mounts", "Dedicated Offroad Pro ride modes"],
        cons: ["Tall seat height (850mm) makes it challenging for shorter riders", "Weighs 212kg which takes skill to handle off-road"],
        ownershipEstimate: "Annual service costs ~₹6,500. Tough chassis minimizes cosmetic damage during drops.",
        riderType: "Weekend explorers, highway tourers, and off-road trail riders."
      };
    }

    if (q.includes('sport') || q.includes('speed') || q.includes('racing') || q.includes('fast') || q.includes('track')) {
      const sportBikes = MOTORCYCLES.filter(b => b.category === 'Sport');
      return {
        text: `For pure speed and tracking, the **BRO-Veloce 1000** is a 165 PS beast that rockets 0-100 km/h in 2.9 seconds.`,
        recommendations: sportBikes,
        reasoning: "Features an inline-4 engine, dual-channel cornering ABS, and a bi-directional quickshifter for quick lap times.",
        pros: ["Breathtaking 299 km/h top speed", "Sharpest race track cornering dynamics", "Intimidating inline-4 exhaust soundtrack"],
        cons: ["Aggressive forward-leaning stance can cause fatigue", "High fuel consumption in city crawls (12 km/l)"],
        ownershipEstimate: "Annual service: ~₹9,500. Premium high-performance tyres require replacement every 12,000 km.",
        riderType: "Adrenaline seekers, track day riders, and experienced enthusiasts."
      };
    }

    // Default Fallback
    return {
      text: `Interesting request! Based on standard parameters, the **BRO-Veloce 1000** leads for performance, **BRO-Terra 850** for touring, and the **BRO-Cyber S** for futuristic smart city commuting.`,
      recommendations: MOTORCYCLES.slice(0, 3),
      reasoning: "We offer tailored solutions spanning sport, adventure, cruiser, and electric classes.",
      pros: ["Industry-leading safety features", "High resale values", "Premium connected instrumentation"],
      cons: ["Each bike is specialized for its exact target riding type"],
      ownershipEstimate: "Varies from ₹1,500/year (Electric) to ₹12,000/year (Premium Cruiser).",
      riderType: "Any passionate motorcycle rider."
    };
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text
    };

    const typingMsg: Message = {
      id: `typing-${Date.now()}`,
      sender: 'ai',
      text: '',
      isTyping: true
    };

    setMessages(prev => [...prev, userMsg, typingMsg]);
    setInputValue('');

    setTimeout(() => {
      const aiData = generateAIResponse(text);
      const readyMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiData.text || '',
        recommendations: aiData.recommendations,
        reasoning: aiData.reasoning,
        pros: aiData.pros,
        cons: aiData.cons,
        ownershipEstimate: aiData.ownershipEstimate,
        riderType: aiData.riderType
      };

      setMessages(prev => prev.filter(m => !m.isTyping).concat(readyMsg));
    }, 1500);
  };

  return (
    <section className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center py-20 px-4 md:px-12 border-t border-white/10 relative">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 items-stretch h-[85vh]">
        
        {/* Left Side: Brand Pitch & Presets */}
        <div className="w-full md:w-2/5 flex flex-col justify-between p-6 bg-[#111111] border border-white/10 rounded-none">
          <div>
            <div className="flex items-center gap-2 text-[#E8FF00] mb-3">
              <Sparkles className="h-5 w-5" />
              <span className="font-anton tracking-wider text-sm uppercase">INTELLIGENT RECOMMENDATION</span>
            </div>
            <h2 className="font-anton text-4xl md:text-6xl uppercase leading-none mb-4">
              BRO AI
            </h2>
            <p className="font-inter text-white/75 text-sm md:text-base leading-relaxed mb-6">
              Skip complex feature sheets. Describe your budget, riding style, commuting route, or range requirements, and let our recommendation engine find the perfect match.
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-inter text-xs text-white/40 uppercase tracking-widest">TAP A PRESET PROMPT</p>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(preset.query)}
                  className="px-4 py-2 border border-white/10 text-xs font-inter text-white/90 bg-black hover:bg-[#E8FF00] hover:text-black hover:border-[#E8FF00] transition-colors duration-200 text-left"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Animated Chat Board */}
        <div className="w-full md:w-3/5 flex flex-col bg-[#111111] border border-white/10 rounded-none overflow-hidden">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-[#E8FF00] animate-pulse" />
              <span className="font-anton text-sm tracking-widest text-white/90">BRO_AI_ASSISTANT v1.2</span>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="h-8 w-8 bg-black border border-white/10 flex items-center justify-center text-[#E8FF00] flex-shrink-0">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  )}

                  <div className="max-w-[85%] space-y-3">
                    {msg.isTyping ? (
                      <div className="bg-black/60 border border-white/10 p-4 text-sm font-inter text-white/60 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#E8FF00] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-[#E8FF00] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-[#E8FF00] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        <span>Analyzing database...</span>
                      </div>
                    ) : (
                      <div className={`p-4 text-sm font-inter leading-relaxed ${
                        msg.sender === 'user' ? 'bg-[#E8FF00] text-black font-medium' : 'bg-black/80 border border-white/10 text-white/90'
                      }`}>
                        {msg.text}
                      </div>
                    )}

                    {/* Rich Response Modules (AI Only) */}
                    {msg.sender === 'ai' && !msg.isTyping && msg.recommendations && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-4"
                      >
                        {/* Recommendations */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                          {msg.recommendations.map(bike => (
                            <div
                              key={bike.id}
                              className="bg-black border border-white/10 p-3 hover:border-[#E8FF00] transition-colors duration-200 cursor-pointer group flex flex-col justify-between"
                              onClick={() => onSelectBike(bike)}
                            >
                              <div>
                                <h4 className="font-anton text-base uppercase text-white group-hover:text-[#E8FF00] transition-colors">
                                  {bike.name}
                                </h4>
                                <p className="font-inter text-xs text-white/50 mt-1">
                                  {bike.tagline}
                                </p>
                              </div>
                              <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/5">
                                <span className="font-anton text-xs text-[#E8FF00]">
                                  ₹{(bike.price / 100000).toFixed(2)} Lakh
                                </span>
                                <span className="font-inter text-[10px] text-white/40 group-hover:text-white transition-colors">
                                  View Details →
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Reasoning & Specs */}
                        {msg.reasoning && (
                          <div className="bg-black/60 border border-white/10 p-4 space-y-3 text-xs font-inter">
                            <div>
                              <span className="font-anton text-[#E8FF00] tracking-wider uppercase text-[10px] block mb-1">REASONING</span>
                              <p className="text-white/80 leading-relaxed">{msg.reasoning}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                              {msg.pros && (
                                <div>
                                  <span className="font-anton text-success tracking-wider uppercase text-[10px] flex items-center gap-1 mb-1">
                                    <BadgeCheck className="h-3 w-3" /> PROS
                                  </span>
                                  <ul className="list-disc pl-4 space-y-1 text-white/70">
                                    {msg.pros.slice(0, 2).map((pro, i) => <li key={i}>{pro}</li>)}
                                  </ul>
                                </div>
                              )}
                              {msg.cons && (
                                <div>
                                  <span className="font-anton text-danger tracking-wider uppercase text-[10px] flex items-center gap-1 mb-1">
                                    <ShieldAlert className="h-3 w-3" /> CONS
                                  </span>
                                  <ul className="list-disc pl-4 space-y-1 text-white/70">
                                    {msg.cons.slice(0, 2).map((con, i) => <li key={i}>{con}</li>)}
                                  </ul>
                                </div>
                              )}
                            </div>

                            {msg.ownershipEstimate && (
                              <div className="pt-2 border-t border-white/5 flex gap-2 items-start">
                                <Wrench className="h-3.5 w-3.5 text-warning flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-anton text-warning tracking-wider uppercase text-[10px] block">OWNERSHIP ESTIMATE</span>
                                  <p className="text-white/70">{msg.ownershipEstimate}</p>
                                </div>
                              </div>
                            )}

                            {msg.riderType && (
                              <div className="pt-2 border-t border-white/5 flex gap-2 items-start">
                                <User className="h-3.5 w-3.5 text-[#E8FF00] flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-anton text-[#E8FF00] tracking-wider uppercase text-[10px] block">IDEAL RIDER TYPE</span>
                                  <p className="text-white/70">{msg.riderType}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="h-8 w-8 bg-[#E8FF00] flex items-center justify-center text-black flex-shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          {/* Form Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="p-4 border-t border-white/10 bg-black/40 flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything, e.g. 'I want a high speed track racer'..."
              className="flex-1 bg-black border border-white/10 px-4 py-3 text-sm font-inter text-white placeholder-white/40 focus:outline-none focus:border-[#E8FF00] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#E8FF00] text-black px-5 flex items-center justify-center hover:bg-white transition-colors duration-200"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};
