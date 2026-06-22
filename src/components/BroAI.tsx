import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, ShieldAlert, BadgeCheck, Wrench, Trash2 } from 'lucide-react';
import { MOTORCYCLES, type Motorcycle } from '../data/bikes';

let messageCounter = 0;
const getUniqueId = (prefix: string) => {
  messageCounter += 1;
  return `${prefix}-${messageCounter}-${Math.random().toString(36).substring(2, 9)}`;
};

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
        text: `Under ₹2 Lakh, we have several outstanding models. The **TVS Raider 125** is incredibly budget-friendly at ₹95k ex-showroom, while the **Hero Karizma XMR** and **Bajaj Pulsar NS400Z** offer immense value at ₹1.79L and ₹1.85L respectively.`,
        recommendations: budgetBikes,
        reasoning: "These models offer the lowest cost of entry without compromising on tech features like smart digital dashes, phone sync, and ABS.",
        pros: ["Extremely affordable initial purchase", "Lowest ownership and fuel/charging costs", "Lightweight, easy to navigate in dense city traffic"],
        cons: ["Lower engine capacity on entry models", "Moderate top speeds on basic commuter classes"],
        ownershipEstimate: "Annual maintenance ranges between ₹2,400 to ₹4,500 depending on model.",
        riderType: "Urban commuters, students, and riders seeking premium features at an accessible price."
      };
    }

    if (q.includes('mileage') || q.includes('fuel') || q.includes('efficiency') || q.includes('economy')) {
      const mileageBikes = MOTORCYCLES.filter(b => b.mileage.realWorld >= 35 || b.category === 'Electric');
      return {
        text: `If fuel economy is your priority, the **TVS Raider 125** is the efficiency champion delivering 67 km/l real-world mileage. For fully electric commuting, the **Ola S1 Pro Gen 2** offers a range of up to 143 km real-world.`,
        recommendations: mileageBikes,
        reasoning: "These models optimize running costs. The petrol models feature low-displacement fuel-injected engines, while the electric models use regenerative braking to maximize range.",
        pros: ["Saves significantly on daily commuting costs", "Extensive riding range on a single refuel/charge", "Smooth and eco-friendly city driving profiles"],
        cons: ["More relaxed power output specifications", "Electric models require charging down-time"],
        ownershipEstimate: "Monthly energy/fuel cost is minimal, typically under ₹800 to ₹1,200.",
        riderType: "Daily city commuters, office riders, and efficiency-focused buyers."
      };
    }

    if (q.includes('electric') || q.includes('ev') || q.includes('battery') || q.includes('charging')) {
      const evBike = MOTORCYCLES.filter(b => b.category === 'Electric');
      return {
        text: `We offer a premium electric lineup led by the high-performance **Ultraviolette F77 Mach 2** (30 kW peak power) and smart family options like the **Ather 450X Gen 4** and **Ola S1 Pro Gen 2**.`,
        recommendations: evBike,
        reasoning: "These electric models feature advanced software, over-the-air (OTA) updates, touchscreens, and silent direct-drive performance.",
        pros: ["Instant electric torque", "Clutchless twist-and-go operation", "Extremely low operating and maintenance costs"],
        cons: ["Requires battery recharging time", "Reduced range at sustained high highway speeds"],
        ownershipEstimate: "Electricity charge bills around ₹0.22 per km. Scheduled servicing costs under ₹1,500/year.",
        riderType: "Tech-savvy urban professionals and early adopters of green EV technology."
      };
    }

    if (q.includes('offroad') || q.includes('off-road') || q.includes('adventure') || q.includes('tour') || q.includes('dirt')) {
      const advBike = MOTORCYCLES.filter(b => b.category === 'Adventure');
      return {
        text: `For rough terrain and exploration, the **Royal Enfield Himalayan 450** (Sherpa liquid-cooled engine) and the lightweight **Hero XPulse 200 4V** are highly capable off-road partners.`,
        recommendations: advBike,
        reasoning: "Equipped with long-travel front suspension, high ground clearance, dual-purpose tyres, and spoked wheel layouts for trail duty.",
        pros: ["Comfortable upright riding postures", "High-ground clearance to clear major obstacles", "Tough, impact-resistant chassis architecture"],
        cons: ["Higher seat heights (up to 825mm)", "Heavier weight profiles compared to city streetfighters"],
        ownershipEstimate: "Annual service costs average ₹3,200 to ₹5,800. Sturdy crash guards minimize drop damage.",
        riderType: "Off-road explorers, weekend tourers, and adventure enthusiasts."
      };
    }

    if (q.includes('sport') || q.includes('speed') || q.includes('racing') || q.includes('fast') || q.includes('track')) {
      const sportBikes = MOTORCYCLES.filter(b => b.category === 'Sport');
      return {
        text: `For adrenaline and aggressive riding, the **TVS Apache RTR 310** features class-leading stability tech, complemented by the perimeter-frame **Bajaj Pulsar NS200** and aerodynamic **Hero Karizma XMR**.`,
        recommendations: sportBikes,
        reasoning: "These streetfighters utilize liquid-cooled DOHC engines, high-revving gearing, and perimeter chassis designs for cornering agility.",
        pros: ["High cornering speeds and quick throttle response", "Aggressive naked or fully faired styling aesthetics", "Performance features like quickshifters and slipper clutches"],
        cons: ["Sporty forward-leaning posture can cause fatigue", "Lower fuel economy compared to standard commuters"],
        ownershipEstimate: "Annual tuning and oil servicing averages ₹3,500 to ₹5,500.",
        riderType: "Track enthusiasts, sporty street riders, and performance seekers."
      };
    }

    // Default Fallback
    return {
      text: `Interesting request! Based on standard parameters, the **TVS Apache RTR 310** leads for performance, **Royal Enfield Himalayan 450** for touring, and the **Ultraviolette F77 Mach 2** for electric innovation.`,
      recommendations: MOTORCYCLES.slice(0, 3),
      reasoning: "We offer tailored solutions spanning sport, adventure, cruiser, and electric classes.",
      pros: ["Industry-leading safety features", "High resale values", "Premium connected instrumentation"],
      cons: ["Each bike is specialized for its exact target riding type"],
      ownershipEstimate: "Varies from ₹1,200/year (Electric) to ₹5,800/year (Adventure touring).",
      riderType: "Any passionate motorcycle rider."
    };
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: getUniqueId('user'),
      sender: 'user',
      text
    };

    const typingMsg: Message = {
      id: getUniqueId('typing'),
      sender: 'ai',
      text: '',
      isTyping: true
    };

    setMessages(prev => [...prev, userMsg, typingMsg]);
    setInputValue('');

    setTimeout(() => {
      const aiData = generateAIResponse(text);
      const readyMsg: Message = {
        id: getUniqueId('ai'),
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

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: "Welcome to BRO AI. Tell me what you're looking for. Type your budget, desired mileage, style, or daily routine, and I will recommend your perfect match."
      }
    ]);
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
            {messages.length > 1 && (
              <button
                onClick={handleResetChat}
                className="flex items-center gap-1.5 text-[10px] font-anton text-white/50 hover:text-[#E8FF00] transition-colors uppercase tracking-wider cursor-pointer"
                title="Reset Conversation"
              >
                <Trash2 className="h-3.5 w-3.5" /> Clear Chat
              </button>
            )}
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
