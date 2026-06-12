import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Perfume } from '../types';

interface PerfumeBottleVisualProps {
  perfume: Perfume;
  engravingText?: string;
  engravingFont?: 'serif' | 'script' | 'modern';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export default function PerfumeBottleVisual({
  perfume,
  engravingText,
  engravingFont = 'serif',
  className = '',
  size = 'md',
  interactive = true,
}: PerfumeBottleVisualProps) {
  const [isSpraying, setIsSpraying] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; opacity: number }[]>([]);

  // Trigger mist particles
  const triggerSpray = () => {
    setIsSpraying(true);
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 120, // spray spread
      y: -50 - Math.random() * 80,    // spray height
      opacity: 0.9,
    }));
    setParticles(newParticles);
    
    setTimeout(() => {
      setIsSpraying(false);
    }, 800);
  };

  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles([]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [particles]);

  // Handle dimensions
  const scaleClass = {
    sm: 'w-[140px] h-[200px]',
    md: 'w-[200px] h-[280px]',
    lg: 'w-[250px] h-[350px]'
  };

  const engravingFontClass = {
    serif: 'font-serif italic text-gold-base tracking-widest',
    script: 'font-serif font-light text-gold-light tracking-wide italic leading-none underline decoration-gold-base/30 underline-offset-4',
    modern: 'font-sans uppercase text-xs tracking-[0.25em] text-white font-medium',
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      
      {/* Interactive Spray button icon above bottle */}
      {interactive && (
        <button
          onClick={triggerSpray}
          className="absolute -top-12 px-3 py-1 bg-navy-light/95 border border-gold-base/50 text-gold-light text-xs uppercase tracking-widest rounded-full flex items-center gap-1.5 hover:bg-gold-base hover:text-navy-dark transition-all duration-300 shadow-md cursor-pointer group scale-90 md:scale-100"
          type="button"
          title="Click to release scent"
          id={`spray-btn-${perfume.id}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-light group-hover:bg-navy-dark animate-ping"></span>
          Press to Spray
        </button>
      )}

      {/* Spray Mist Particle Container */}
      <div className="absolute top-0 left-1/2 -translate-x-[50%] z-30 pointer-events-none">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: -20, opacity: 1, scale: 0.2 }}
              animate={{
                x: p.x,
                y: p.y,
                opacity: 0,
                scale: Math.random() * 2 + 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-gold-light to-gold-cream/40 filter blur-[1px]"
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Main Perfume Bottle Layout */}
      <div 
        className={`relative ${scaleClass[size]} transition-transform duration-500 hover:scale-105 select-none`}
        style={{ perspective: '800px' }}
      >
        {/* Dynamic back glowing aura */}
        <div 
          className="absolute inset-[10%] rounded-full opacity-40 blur-[40px] pointer-events-none transition-all duration-1000"
          style={{ 
            background: perfume.colorGradient.glow,
            boxShadow: `0 0 60px 20px ${perfume.colorGradient.glow}`
          }}
        />

        {/* Chrome Gold Sprayer & Cap */}
        <div className="absolute -top-[14%] left-1/2 -translate-x-1/2 w-[35%] h-[15%] z-20 flex flex-col items-center">
          {/* Top Crown Seal */}
          <div className="w-[45%] h-[20%] bg-gradient-to-r from-gold-deep via-gold-light to-gold-deep rounded-t shadow-sm border-b border-navy-dark/10" />
          {/* Heavy Cap Body */}
          <div className="w-full h-[80%] bg-gradient-to-r from-gold-deep via-gold-light to-gold-deep rounded-sm shadow-md border-x border-gold-cream/30 relative overflow-hidden">
            {/* Gloss Highlight line */}
            <div className="absolute top-0 bottom-0 left-[20%] w-[10%] bg-white/25 blur-[1px]" />
            {/* Fine Royal Horizontal Ribbing */}
            <div className="absolute inset-x-0 top-1/3 h-[1px] bg-navy-dark/30" />
            <div className="absolute inset-x-0 top-2/3 h-[1px] bg-navy-dark/30" />
          </div>
          {/* Internal spray neck */}
          <div className="w-[70%] h-[15%] bg-gradient-to-r from-neutral-400 to-neutral-200 border-b border-navy-dark" />
        </div>

        {/* Heavy Glass Bottle Body */}
        <div 
          className="absolute inset-0 rounded-[18px] md:rounded-[24px] border border-gold-base/40 bg-gradient-to-br from-white/10 via-white/5 to-black/40 backdrop-blur-[6px] shadow-2xl flex flex-col items-center justify-between py-6 overflow-hidden"
          style={{
            boxShadow: `
              inset 0 0 35px rgba(255,255,255,0.1),
              inset -10px 0 25px rgba(0,0,0,0.5),
              0 25px 50px -12px rgba(0, 0, 0, 0.7)
            `
          }}
        >
          {/* Real-world high-fidelity perfume photography */}
          {perfume.imageUrl && (
            <img 
              src={perfume.imageUrl} 
              alt={perfume.name} 
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.8] contrast-[1.15] transition-all duration-700 pointer-events-none rounded-[18px] md:rounded-[24px] z-0"
            />
          )}

          {/* Glowing perfume liquid filled level */}
          <motion.div 
            className="absolute bottom-1 inset-x-1 rounded-b-[16px] md:rounded-b-[22px] pointer-events-none mix-blend-color-dodge z-0"
            initial={{ height: '70%' }}
            animate={{ height: isSpraying ? '68%' : '70%' }}
            transition={{ type: 'spring', stiffness: 100 }}
            style={{ 
              background: `linear-gradient(180deg, transparent 0%, ${perfume.colorGradient.liquid} 85%)`,
              opacity: 0.35
            }}
          />

          {/* Internal Spray Straw */}
          <div className="absolute top-0 bottom-3 w-[1.5px] bg-white/15 left-1/2 -translate-x-1/2 pointer-events-none z-10" />

          {/* Golden Shoulder Ribbon Overlay */}
          <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-gold-base/20 to-transparent pointer-events-none z-10" />

          {/* Bottle Reflections / Shine */}
          <div className="absolute top-1 bottom-1 left-2 w-[4px] bg-white/10 rounded-full pointer-events-none filter blur-[0.5px] z-10" />
          <div className="absolute top-2 bottom-2 right-2 w-[2px] bg-white/5 rounded-full pointer-events-none z-10" />

          {/* ----------------- Front Label ----------------- */}
          <div className="relative z-10 w-[82%] h-[55%] mt-auto mb-auto my-auto bg-gradient-to-b from-navy-base/85 to-navy-dark/95 border border-gold-base/50 backdrop-blur-[4px] rounded-lg shadow-xl p-3 flex flex-col items-center justify-center text-center">
            {/* Fine Royal Inner Border */}
            <div className="absolute inset-1 border border-gold-base/20 rounded-md pointer-events-none" />

            {/* Crest Emblem */}
            <div className="text-gold-light/95 mb-1 select-none">
              <svg className="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24">
                <path d="M12 2L9 7h6l-3-5zm0 20c4.42 0 8-3.58 8-8V9H4v5c0 4.42 3.58 8 8 8zm-6-9h12v1c0 3.31-2.69 6-6 6s-6-2.69-6-6v-1z" />
              </svg>
            </div>

            {/* Brand Title */}
            <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-gold-base font-semibold leading-tight select-none">
              Shah Habib
            </h4>

            {/* Perfume Name */}
            <h5 className="font-serif text-xs italic text-white/90 font-light mt-1 tracking-wider leading-tight">
              {perfume.name.replace("Shah Habib", "").replace("Al-Sultani", "").trim()}
            </h5>

            {/* Dynamic Custom Engraving Block */}
            <div className="w-full mt-3 pt-2.5 border-t border-gold-base/15 flex flex-col items-center justify-center min-h-[36px]">
              {engravingText ? (
                <div className="animate-pulse">
                  <span className={`text-xs block ${engravingFontClass[engravingFont]}`}>
                    {engravingText}
                  </span>
                  <span className="text-[7px] uppercase tracking-widest text-[#B8860B]/80 font-mono mt-0.5 block select-none">
                    Engraved in Gold
                  </span>
                </div>
              ) : (
                <span className="text-[9px] uppercase tracking-widest text-white/35 font-mono select-none">
                  Customizable Label
                </span>
              )}
            </div>

            {/* Concentration */}
            <div className="mt-2 text-[8px] uppercase tracking-[0.25em] text-gold-light/60 font-mono select-none">
              {perfume.concentration || "Eau De Parfum"}
            </div>
          </div>

          {/* Liquid Ripple/Wave effect (bottom decorative) */}
          <div className="absolute bottom-2 inset-x-0 text-center text-[9px] uppercase tracking-[0.3em] font-mono text-gold-base/40 pointer-events-none select-none">
            {perfume.rarity}
          </div>
        </div>
      </div>
    </div>
  );
}
