import { useState, ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { Perfume } from '../types';
import { SIGNATURE_PERFUMES } from '../data/perfumes';
import { Check, Flame, Award, Heart, Edit3 } from 'lucide-react';
import PerfumeBottleVisual from './PerfumeBottleVisual';

interface EngravingStudioProps {
  onAddCustomProduct: (perfume: Perfume, engravingText: string, font: 'serif' | 'script' | 'modern') => void;
  onOpenCart: () => void;
}

export default function EngravingStudio({ onAddCustomProduct, onOpenCart }: EngravingStudioProps) {
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume>(SIGNATURE_PERFUMES[0]);
  const [engravingText, setEngravingText] = useState("Habib 1");
  const [fontStyle, setFontStyle] = useState<'serif' | 'script' | 'modern'>('serif');
  const [isAdded, setIsAdded] = useState(false);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    // Limit to 18 characters to prevent layout break on glass label
    if (text.length <= 18) {
      setEngravingText(text);
    }
  };

  const handleAdd = () => {
    if (!engravingText.trim()) return;
    onAddCustomProduct(selectedPerfume, engravingText, fontStyle);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onOpenCart();
    }, 1200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-tr from-navy-base to-navy-dark border border-gold-base/20 rounded-2xl overflow-hidden shadow-2xl relative">
      {/* Decorative corner overlays */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold-base/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-base/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Side: Real-time Live Render Stage */}
        <div className="lg:col-span-5 bg-navy-dark/70 border-b lg:border-b-0 lg:border-r border-white/5 p-8 flex flex-col items-center justify-center min-h-[460px] relative">
          <div className="absolute top-4 left-4 text-[10px] uppercase font-mono tracking-widest text-white/40 flex items-center gap-1.5 select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Calligraphy Atelier
          </div>

          <PerfumeBottleVisual 
            perfume={selectedPerfume}
            engravingText={engravingText}
            engravingFont={fontStyle}
            size="lg"
            interactive={true}
          />

          <div className="mt-6 text-center max-w-[280px]">
            <p className="text-[11px] text-white/50 leading-relaxed font-sans select-none">
              Hover bottle or click the <font className="text-gold-light italic">"Press to Spray"</font> button to release authentic royal formula sparks.
            </p>
          </div>
        </div>

        {/* Right Side: Calibration Deck */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 select-none">
              <span className="p-1.5 bg-gold-base/10 rounded-lg text-gold-base text-xs">
                <Award className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono font-semibold tracking-[0.2em] text-gold-base uppercase">
                Royal Engraving Lab
              </span>
            </div>

            <h3 className="font-serif text-3xl text-white font-bold tracking-wide">
              Bespoke Gold Calligraphy
            </h3>
            <p className="text-sm text-white/60 mt-2 mb-6">
              Personalize your decanter with live hand-etched lettering embedded directly onto the crystal flask. Makes an unparalleled heirloom or elite gift.
            </p>

            {/* Step 1: Select Decanter Flask Formula */}
            <div className="mb-6">
              <label className="text-xs uppercase font-mono text-gold-light/80 tracking-widest block mb-3 select-none">
                1. Select Royal Essence
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {SIGNATURE_PERFUMES.map((perf) => (
                  <button
                    key={perf.id}
                    onClick={() => {
                      setSelectedPerfume(perf);
                      // Set template text if empty
                      if (!engravingText) setEngravingText("Shah Habib");
                    }}
                    className={`p-3 rounded-xl border text-center transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                      selectedPerfume.id === perf.id
                        ? 'border-gold-base bg-gold-base/10 text-white shadow-md'
                        : 'border-white/5 bg-navy-light/20 hover:border-white/20 text-white/70 hover:text-white'
                    }`}
                    id={`engrave-select-${perf.id}`}
                  >
                    <div className="text-xs font-serif font-semibold truncate mb-1">
                      {perf.name.split(" ")[0]} {perf.name.split(" ")[1] || ""}
                    </div>
                    <div className="text-[9px] text-gold-light/60 font-mono truncate">
                      ₹{perf.price.toLocaleString('en-IN')}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Custom Lettering Composition */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2 select-none">
                <label className="text-xs uppercase font-mono text-gold-light/80 tracking-widest block">
                  2. Engrave Inscription
                </label>
                <span className="text-[10px] text-white/30 font-mono">
                  {engravingText.length} / 18 Characters
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={engravingText}
                  onChange={handleTextChange}
                  placeholder="Enter name, initials, or date"
                  className="w-full h-12 bg-navy-dark border border-white/10 focus:border-gold-base rounded-xl px-4 pr-10 text-white font-serif text-base tracking-widest focus:outline-none transition-all duration-300"
                  maxLength={18}
                  id="engraving-input"
                />
                <Edit3 className="absolute right-3.5 top-3.5 w-4 h-4 text-white/30" />
              </div>
            </div>

            {/* Step 3: Typography Style Selection */}
            <div className="mb-8">
              <label className="text-xs uppercase font-mono text-gold-light/80 tracking-widest block mb-2.5 select-none">
                3. Choose Script Font
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setFontStyle('serif')}
                  className={`py-3 px-1.5 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                    fontStyle === 'serif'
                      ? 'border-gold-base bg-gold-base/5 text-gold-light font-medium'
                      : 'border-white/5 bg-navy-light/10 text-white/50 hover:text-white'
                  }`}
                  id="font-serif-btn"
                >
                  <span className="font-serif italic text-sm block">Royal Script</span>
                  <span className="text-[8px] uppercase tracking-widest font-mono opacity-60">Classic Italic</span>
                </button>
                <button
                  onClick={() => setFontStyle('script')}
                  className={`py-3 px-1.5 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                    fontStyle === 'script'
                      ? 'border-gold-base bg-gold-base/5 text-gold-light font-medium'
                      : 'border-white/5 bg-navy-light/10 text-white/50 hover:text-white'
                  }`}
                  id="font-script-btn"
                >
                  <span className="font-serif italic underline decoration-gold-base/20 font-light text-sm block">Atelier Script</span>
                  <span className="text-[8px] uppercase tracking-widest font-mono opacity-60">Fine Calligraphy</span>
                </button>
                <button
                  onClick={() => setFontStyle('modern')}
                  className={`py-3 px-1.5 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                    fontStyle === 'modern'
                      ? 'border-gold-base bg-gold-base/5 text-gold-light font-medium'
                      : 'border-white/5 bg-navy-light/10 text-white/50 hover:text-white'
                  }`}
                  id="font-modern-btn"
                >
                  <span className="font-sans uppercase text-xs tracking-widest font-bold block pt-1 pb-1">Sovereign Block</span>
                  <span className="text-[8px] uppercase tracking-widest font-mono opacity-60">Modern Sans</span>
                </button>
              </div>
            </div>
          </div>

          {/* Checkout/Basket summary bottom */}
          <div className="border-t border-white/5 pt-6 mt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono mb-2 sm:mb-0 select-none">
                <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
                <span>MEMBER PRIVILEGE BENEFIT UNLOCKED</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-white/40 line-through">₹499 Engraving Fee</span>
                <span className="text-sm text-gold-base font-semibold">FREE FOR DIRECT PATRONS</span>
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={isAdded || !engravingText.trim()}
              className={`w-full h-14 rounded-full font-semibold uppercase tracking-widest text-sm shimmer-btn flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-lg shadow-gold-base/10 ${
                isAdded 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-gradient-to-r from-gold-deep to-gold-light text-navy-dark'
              }`}
              id="engrave-submit-btn"
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5 animate-ping" />
                  Bespoke Bottle Added to Bag!
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 fill-navy-dark" />
                  Order Custom Engraved Bottle — ₹{selectedPerfume.price.toLocaleString('en-IN')}
                </>
              )}
            </button>
          </div>
          
        </div>

      </div>
    </div>
  );
}
