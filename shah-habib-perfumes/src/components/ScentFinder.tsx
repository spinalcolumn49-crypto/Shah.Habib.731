import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Perfume } from '../types';
import { SIGNATURE_PERFUMES } from '../data/perfumes';
import { Sparkles, ArrowRight, RefreshCw, ShoppingBag } from 'lucide-react';
import PerfumeBottleVisual from './PerfumeBottleVisual';

interface ScentFinderProps {
  onAddToCart: (perfume: Perfume) => void;
  onOpenCart: () => void;
}

interface Option {
  text: string;
  category: 'Oud' | 'Amber' | 'Saffron' | 'Aquatic' | 'Floral';
  description: string;
  icon: string;
}

export default function ScentFinder({ onAddToCart, onOpenCart }: ScentFinderProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<('Oud' | 'Amber' | 'Saffron' | 'Aquatic' | 'Floral')[]>([]);
  const [matchedPerfume, setMatchedPerfume] = useState<Perfume | null>(null);

  const stepsData = [
    {
      id: 1,
      title: "Select your desired aura",
      subtitle: "Which energy do you wish to manifest to the world?",
      options: [
        { text: "Majestic, powerful & commanding", category: "Oud" as const, description: "Command respect with rare oriental woods", icon: "👑" },
        { text: "Sensual, intimate & warm", category: "Amber" as const, description: "Draw them closer with sweet golden resins", icon: "✨" },
        { text: "Bold, mystical & artistic", category: "Saffron" as const, description: "A dramatic statement of fiery crimson spices", icon: "🔥" },
        { text: "Fresh, airy & limitless", category: "Aquatic" as const, description: "Invigorating sea salt and wild vetiver roots", icon: "🌊" },
        { text: "Gentle, velvety & romantic", category: "Floral" as const, description: "An elegant, dew-kissed tapestry of precious blooms", icon: "🌸" },
      ]
    },
    {
      id: 2,
      title: "Choose your sanctuary",
      subtitle: "Where do you feel most aligned with your inner self?",
      options: [
        { text: "A royal palace chamber clad in rich silks", category: "Oud" as const, description: "Steeped in history and absolute luxury", icon: "🏰" },
        { text: "A cozy golden library beside a crackling hearth", category: "Amber" as const, description: "Warm timber, old leather books, and comfort", icon: "📚" },
        { text: "An ancient bazaar of glowing spice lanterns", category: "Saffron" as const, description: "Intense aromas of cardamom, saffron, and silk", icon: "🐫" },
        { text: "A sweeping white marble cliff-side over looking the sea", category: "Aquatic" as const, description: "Pure Mediterranean azure waves and salted wind", icon: "🏝️" },
        { text: "An imperial secret garden under the moonlight", category: "Floral" as const, description: "Blossoming white jasmine and deep damascus roses", icon: "🌙" },
      ]
    },
    {
      id: 3,
      title: "Determine your presence strength",
      subtitle: "How visibly do you want your scent trail to linger?",
      options: [
        { text: "Infallible sillage: bold and unforgettable", category: "Oud" as const, description: "Leaves an eternal signature behind in any room", icon: "🌌" },
        { text: "Medium & lingering: an intimate intrigue", category: "Amber" as const, description: "Enchanting those who step directly into your circle", icon: "💫" },
        { text: "Vibrant & modern: spicy, spirited and chic", category: "Saffron" as const, description: "Radiates unique character with exotic freshness", icon: "⚡" },
        { text: "Fresh & cleansing: bright, clean, and breezy", category: "Aquatic" as const, description: "An sparkling splash that rejuvenates the senses", icon: "☀️" },
        { text: "Romantic & classic: timeless elegant refinement", category: "Floral" as const, description: "A powdery, sophisticated embrace of luxury flora", icon: "🏺" },
      ]
    }
  ];

  const handleSelect = (category: 'Oud' | 'Amber' | 'Saffron' | 'Aquatic' | 'Floral') => {
    const updatedAnswers = [...answers, category];
    setAnswers(updatedAnswers);

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Calculate match
      calculateMatch(updatedAnswers);
    }
  };

  const calculateMatch = (finalAnswers: ('Oud' | 'Amber' | 'Saffron' | 'Aquatic' | 'Floral')[]) => {
    // Count frequencies
    const counts: Record<string, number> = {};
    finalAnswers.forEach(ans => {
      counts[ans] = (counts[ans] || 0) + 1;
    });

    // Find highest frequency category
    let bestCategory: 'Oud' | 'Amber' | 'Saffron' | 'Aquatic' | 'Floral' = 'Oud';
    let maxCount = 0;
    
    Object.entries(counts).forEach(([cat, cnt]) => {
      if (cnt > maxCount) {
        maxCount = cnt;
        bestCategory = cat as 'Oud' | 'Amber' | 'Saffron' | 'Aquatic' | 'Floral';
      }
    });

    // Match first item from list belonging to category
    const matches = SIGNATURE_PERFUMES.filter(p => p.category === bestCategory);
    setMatchedPerfume(matches[0] || SIGNATURE_PERFUMES[0]);
    setStep(4); // Result screen
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers([]);
    setMatchedPerfume(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-navy-base to-navy-dark border border-gold-base/20 rounded-2xl overflow-hidden shadow-2xl relative">
      {/* Golden accent bar */}
      <div className="h-1 bg-gradient-to-r from-gold-deep via-gold-base to-gold-light" />
      
      <div className="p-6 md:p-10">
        
        {/* Progress Bar */}
        {step <= 3 && (
          <div className="mb-8 select-none">
            <div className="flex justify-between items-center text-xs text-gold-light/60 uppercase tracking-[0.2em] mb-2">
              <span>Scent Assessment Diagnostics</span>
              <span>Step {step} of 3</span>
            </div>
            <div className="h-1 w-full bg-navy-light/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-gold-deep to-gold-light transition-all duration-500 ease-out"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Dynamic step transitions */}
        <AnimatePresence mode="wait">
          {step <= 3 ? (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <h3 className="font-serif text-2xl md:text-3xl text-white font-medium tracking-wide text-center">
                {stepsData[step - 1].title}
              </h3>
              <p className="text-gold-light/70 text-sm md:text-base mb-8 text-center max-w-xl">
                {stepsData[step - 1].subtitle}
              </p>

              {/* Option Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
                {stepsData[step - 1].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt.category)}
                    className="flex flex-col items-center justify-between p-5 bg-navy-light/30 border border-white/5 hover:border-gold-base/50 hover:bg-gold-base/[0.03] active:bg-gold-base/[0.08] rounded-xl text-center transition-all duration-300 relative group cursor-pointer h-full"
                    id={`quiz-opt-${step}-${i}`}
                  >
                    <div className="absolute inset-px bg-gradient-to-b from-white/[0.02] to-transparent rounded-xl pointer-events-none" />
                    <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 select-none">
                      {opt.icon}
                    </span>
                    <div className="flex-1 flex flex-col justify-center">
                      <font className="text-sm font-medium text-white mb-2 group-hover:text-gold-light transition-colors leading-snug">
                        {opt.text}
                      </font>
                      <span className="text-xs text-white/40 leading-normal">
                        {opt.description}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            // Step 4: The Scent Matching Reveal Screen
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              {/* Bottle Showcase Left */}
              <div className="md:col-span-5 flex flex-col items-center justify-center bg-navy-dark/40 py-6 px-4 rounded-xl border border-white/5">
                {matchedPerfume && (
                  <>
                    <PerfumeBottleVisual 
                      perfume={matchedPerfume} 
                      size="md"
                      interactive={true}
                    />
                    <div className="mt-4 px-3 py-1 bg-gold-base/10 rounded-full border border-gold-base/30 text-[10px] uppercase font-mono tracking-widest text-gold-light select-none">
                      Perfect {matchedPerfume.rarity} Formula Match
                    </div>
                  </>
                )}
              </div>

              {/* Match Details Right */}
              <div className="md:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2 select-none">
                  <Sparkles className="w-5 h-5 text-gold-base animate-pulse" />
                  <span className="text-xs tracking-[0.25em] text-gold-base uppercase font-mono font-semibold">
                    Signature Alignment Discovered
                  </span>
                </div>

                <h3 className="font-serif text-3xl md:text-4xl text-white font-bold leading-tight">
                  {matchedPerfume?.name}
                </h3>
                
                <h4 className="text-base text-gold-light italic font-medium mt-1 mb-4">
                  “{matchedPerfume?.tagline}”
                </h4>

                <p className="text-sm text-white/80 leading-relaxed mb-6">
                  {matchedPerfume?.description} With top notes of <strong className="text-gold-light font-medium">{matchedPerfume?.notes.top}</strong>, blending gracefully into a majestic heart of <strong className="text-gold-light font-medium">{matchedPerfume?.notes.heart}</strong>, and anchoring on <span className="text-gold-light">{matchedPerfume?.notes.base}</span>.
                </p>

                {/* Scent Traits List */}
                <div className="grid grid-cols-2 gap-3 mb-6 bg-navy-dark/60 p-4 rounded-lg border border-white/5">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 block font-mono">Top Note Accent</span>
                    <span className="text-xs font-semibold text-white">{matchedPerfume?.notes.top.split(',')[0]}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 block font-mono">Heart Essence</span>
                    <span className="text-xs font-semibold text-white">{matchedPerfume?.notes.heart.split(',')[0]}</span>
                  </div>
                  {matchedPerfume?.originalPrice && (
                    <div className="col-span-2 border-t border-white/5 pt-2 mt-1">
                      <span className="text-[10px] uppercase tracking-widest text-gold-base font-mono">Special Match Price</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-serif text-gold-light">₹{matchedPerfume.price.toLocaleString('en-IN')}</span>
                        <span className="text-xs text-white/40 line-through">₹{matchedPerfume.originalPrice.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Match Action Suite */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      if (matchedPerfume) {
                        onAddToCart(matchedPerfume);
                        onOpenCart();
                      }
                    }}
                    className="flex-1 shimmer-btn h-12 bg-gradient-to-r from-gold-deep via-gold-base to-gold-light text-navy-dark font-medium text-sm tracking-widest uppercase rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-gold-base/15 cursor-pointer"
                    type="button"
                    id="add-match-cart-btn"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Acquire Signatureボトル
                  </button>
                  
                  <button
                    onClick={resetQuiz}
                    className="h-12 border border-white/10 hover:border-gold-base/40 bg-white/5 hover:bg-white/10 px-6 rounded-full flex items-center justify-center gap-2 text-white/80 hover:text-white transition-all duration-300 text-xs tracking-widest uppercase cursor-pointer"
                    type="button"
                    id="retake-quiz-btn"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Retake Quiz
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
