import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Award, 
  ChevronDown, 
  CheckCircle,
  HelpCircle,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  ShoppingBag,
  Info,
  Layers,
  Heart,
  Droplet
} from 'lucide-react';

import { Perfume, CartItem, VIPUser } from './types';
import { SIGNATURE_PERFUMES } from './data/perfumes';
import Navbar from './components/Navbar';
import PerfumeBottleVisual from './components/PerfumeBottleVisual';
import ScentFinder from './components/ScentFinder';
import EngravingStudio from './components/EngravingStudio';
import ScentMap from './components/ScentMap';
import VIPRegistration from './components/VIPRegistration';
import CartDrawer from './components/CartDrawer';

export default function App() {
  // --- STATE ---
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [heroPerfume, setHeroPerfume] = useState<Perfume>(SIGNATURE_PERFUMES[0]);
  const [vipUser, setVipUser] = useState<VIPUser | null>(null);
  
  // Accordion active index
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Toast notifications
  const [toast, setToast] = useState({ message: '', visible: false });

  // Initialize cart from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('shahHabibCart');
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    }
  }, []);

  // Save cart to local storage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('shahHabibCart', JSON.stringify(newCart));
    } catch (e) {
      console.error("Failed to save cart to storage", e);
    }
  };

  // Toast controller helper
  const showNotification = (msg: string) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 2500);
  };

  // --- ACTIONS ---
  
  // Add standard perfume to cart
  const handleAddToCart = (perfume: Perfume) => {
    const itemId = `standard-${perfume.id}`;
    const existing = cart.find(i => i.id === itemId);

    let updated: CartItem[];
    if (existing) {
      updated = cart.map(i => i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i);
    } else {
      updated = [...cart, { id: itemId, product: perfume, quantity: 1 }];
    }

    saveCart(updated);
    showNotification(`Added ${perfume.name} to your collection!`);
  };

  // Add customized/engraved bottle
  const handleAddCustomProduct = (perfume: Perfume, engravingText: string, font: 'serif' | 'script' | 'modern') => {
    const itemId = `custom-${perfume.id}-${font}-${engravingText.replace(/\s+/g, '')}`;
    const existing = cart.find(i => i.id === itemId);

    let updated: CartItem[];
    if (existing) {
      updated = cart.map(i => i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i);
    } else {
      updated = [...cart, { 
        id: itemId, 
        product: perfume, 
        quantity: 1, 
        engravingText, 
        engravingFont: font 
      }];
    }

    saveCart(updated);
    showNotification(`Bespoke bottle engraving configured and added to bag.`);
  };

  const handleChangeQty = (itemId: string, delta: number) => {
    const updated = cart.map(item => {
      if (item.id === itemId) {
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[];

    saveCart(updated);
  };

  const handleRemoveItem = (itemId: string) => {
    const updated = cart.filter(item => item.id !== itemId);
    saveCart(updated);
    showNotification("Item removed from your bag.");
  };

  const handleCheckout = () => {
    alert("Crown transaction processed successfully! Your luxury courier credentials will be delivered to your inbox shortly.");
    saveCart([]);
    setIsCartOpen(false);
  };

  const handleRegisterSuccess = (user: VIPUser) => {
    setVipUser(user);
    showNotification(`Welcome to the Guild, ${user.fullName}! Royal perks applied.`);
  };

  // Scroll to customized id element
  const navigateToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // faqs list
  const faqs = [
    {
      q: "How does the gold calligraphy customisation work?",
      a: "Our master calligraphers hand-carve your lettering onto the glass flank. The engraving is then filled with liquid gold-leaf dust that fuses with the glass, resulting in a permanent, shimmering design that will never peel or tarnish."
    },
    {
      q: "Where are the signature oils distilled?",
      a: "We source pure, rare botanical ingredients (organic Cambodian Oud, mountain Ta'if roses, and Kashmiri saffron) and distill them at our custom organic lab under low-temperature gas extraction. This preserves delicate scent chemicals that industrial pressure cookers destroy."
    },
    {
      q: "How long does the fragrance last on skin or clothing?",
      a: "Each formula belongs to the 'Concentrée' Eau de Parfum category, holding between 15% and 22% concentrated organic distillates. On typical skin types, sillage persists for 8 to 12 hours, while woodsy base notes from Oud or Amber can linger on textiles for several days."
    },
    {
      q: "Which fragrance should I select as a gift?",
      a: "If the recipient prefers grand commanding woodsy scents, choose Royal Oud. For warm, cozy evening wear, Midnight Amber is ideal. Saffron Royale suits artistic, bold personalities. If unsure, take our interactive Olfactive Match quiz for a tailored analysis."
    }
  ];

  return (
    <div className="min-h-screen bg-navy-dark text-[#F1F5F9] font-sans antialiased relative overflow-x-hidden selection:bg-gold-base selection:text-navy-dark">
      
      {/* 1. Header/Navbar */}
      <Navbar 
        cart={cart} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenVIP={() => navigateToSection('membership')} 
      />

      {/* 2. Absolute Ambient Mesh behind Hero */}
      <div className="absolute top-0 inset-x-0 h-[100vh] pointer-events-none select-none overflow-hidden z-0">
        {/* Dynamic color spots shifting with hero perfume */}
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full filter blur-[120px] opacity-15 transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-1000"
          style={{ background: heroPerfume.colorGradient.glow }}
        />
        <div 
          className="absolute top-2/3 right-1/4 w-[400px] h-[400px] rounded-full filter blur-[100px] opacity-10 transform translate-x-1/2 transition-colors duration-1000"
          style={{ background: '#D4AF37' }}
        />
        {/* Classic static gold line behind */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.015] pointer-events-none" />
      </div>

      {/* 3. HERO: Olfactive Playground */}
      <header className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden z-10" id="home">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Details */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left relative z-10">
            
            {/* Crown tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-base/10 rounded-full border border-gold-base/20 text-[10px] uppercase font-mono tracking-widest text-gold-base">
              <Sparkles className="w-3.5 h-3.5 text-gold-base animate-pulse" />
              Crown Perfume Atelier
            </div>

            {/* Title with editorial design */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-semibold leading-[1.08] tracking-tight">
              We Don't Sell Perfume.<br/>We Bottle <span className="text-gold-base font-medium italic underline decoration-gold-base/30 underline-offset-8">Ancestral Legacies</span>.
            </h1>

            {/* Captivating details */}
            <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              We design premium Concentrée formulas infused with wild Cambodian Oud, hand-picked Kashmiri Saffron, and mountain Ta'if Rose. Every bottle is hand-poured in small batches, customized with gold calligraphy, and delivered in secure wax-sealed cases.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 select-none">
              <button
                onClick={() => navigateToSection('shop')}
                className="w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-gold-deep via-gold-base to-gold-light text-navy-dark font-semibold text-xs tracking-widest uppercase rounded-full flex items-center justify-center gap-2 hover:brightness-105 transition-all duration-300 shadow-lg shadow-gold-base/10 cursor-pointer shimmer-btn"
                id="hero-shop-btn"
              >
                Acquire Decanter
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => navigateToSection('scentfinder')}
                className="w-full sm:w-auto h-12 px-8 border border-white/10 hover:border-gold-base bg-white/5 hover:bg-gold-base/5 rounded-full text-xs font-semibold text-white hover:text-gold-light tracking-widest uppercase transition-all duration-300 cursor-pointer"
                id="hero-quiz-btn"
              >
                Olfactive Match Quiz
              </button>
            </div>

            {/* Interactive Hero Atmosphere selector */}
            <div className="pt-8 border-t border-white/5 space-y-3.5">
              <span className="text-[10px] uppercase font-mono text-white/40 tracking-widest block text-center lg:text-left">
                Play — Tune Hero Atmosphere Aura
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 select-none">
                {SIGNATURE_PERFUMES.map((perf) => (
                  <button
                    key={perf.id}
                    onClick={() => setHeroPerfume(perf)}
                    className={`py-1.5 px-3.5 rounded-full border text-[10px] font-mono uppercase tracking-widest transition-all duration-500 cursor-pointer ${
                      heroPerfume.id === perf.id
                        ? 'border-gold-base bg-gold-base/10 text-gold-light'
                        : 'border-white/5 bg-navy-light/10 text-white/50 hover:text-white hover:bg-navy-light/20'
                    }`}
                    id={`atmosphere-selector-btn-${perf.id}`}
                  >
                    {perf.category}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Hero Interactive 3D Model Spot */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[420px]">
            {/* Spinning background geometric wheel */}
            <div className="absolute w-[360px] h-[360px] md:w-[480px] md:h-[480px] rounded-full border border-gold-base/5 pointer-events-none animate-spin-slow">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -top-1 w-2.5 h-2.5 rounded-full bg-gold-base shadow-lg shadow-gold-base" />
            </div>

            {/* Live active atmosphere container */}
            <AnimatePresence mode="wait">
              <motion.div
                key={heroPerfume.id}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="flex flex-col items-center justify-center"
              >
                <PerfumeBottleVisual 
                  perfume={heroPerfume} 
                  size="lg"
                  interactive={true}
                />
                
                {/* Active formulation info box */}
                <span className="mt-6 px-3 py-1 bg-navy-dark/95 border border-white/5 rounded-full text-[10px] font-mono text-white/50 uppercase tracking-widest tracking-wide flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: heroPerfume.colorGradient.liquid }} />
                  {heroPerfume.name}
                </span>
              </motion.div>
            </AnimatePresence>
            
          </div>

        </div>
      </header>

      {/* 4. SIGNATURE COLLECTION SHOWCASE (Store Grid) */}
      <section className="py-24 border-t border-white/5 bg-navy-dark/20 relative" id="shop">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 select-none">
            <span className="text-xs uppercase font-mono text-gold-base tracking-[0.25em] font-semibold">
              Signature Harvest
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold tracking-wide mt-2">
              The Sovereign Collection
            </h2>
            <p className="text-xs sm:text-sm text-white/55 mt-2 leading-relaxed">
              Explore our master-distilled creations. Every formula undergoes rigorous maturing for 120 days inside solid steel barrels prior to glass decanting, intensifying depth and ensuring persistent sillage.
            </p>
          </div>

          {/* Product Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SIGNATURE_PERFUMES.map((perfume) => (
              <div 
                key={perfume.id}
                className="bg-gradient-to-br from-navy-base to-navy-dark border border-white/5 hover:border-gold-base/35 rounded-2xl p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:shadow-black/40 group relative overflow-hidden"
              >
                {/* Rarity absolute bubble */}
                <div className="absolute top-4 left-4 bg-navy-dark/90 border border-white/10 px-3 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-mono text-gold-base z-10 select-none">
                  {perfume.rarity}
                </div>

                {/* Scent structure trigger icon (top right info hover bubble) */}
                <div className="absolute top-4 right-4 text-white/35 hover:text-gold-light cursor-help group-hover:scale-105 transition-all z-10" title="Botanical Structure Details">
                  <Info className="w-4.5 h-4.5" />
                </div>

                {/* Visual Flask area */}
                <div className="bg-navy-dark/40 py-8 px-4 rounded-xl border border-white/[0.02] flex items-center justify-center mb-6 relative">
                  <PerfumeBottleVisual 
                    perfume={perfume} 
                    size="sm"
                    interactive={false}
                  />
                </div>

                {/* Info and detail lines */}
                <div>
                  <div className="flex items-baseline justify-between select-none">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#B8860B]">
                      {perfume.category} Formula
                    </span>
                    {perfume.originalPrice && (
                      <span className="text-[9px] text-[#B8860B] font-mono uppercase bg-gold-base/5 px-2 py-0.5 rounded border border-gold-base/15">
                        Special Benefit applied
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-serif text-2xl text-white font-bold tracking-wide mt-1">
                    {perfume.name}
                  </h3>
                  
                  <p className="text-xs text-white/55 mt-2 font-serif italic mb-4 leading-normal">
                    “{perfume.tagline}”
                  </p>

                  <p className="text-xs text-white/70 leading-relaxed line-clamp-2">
                    {perfume.description}
                  </p>

                  {/* Accordion detail note layers */}
                  <div className="mt-4 pt-3 border-t border-white/5 space-y-1 bg-navy-base/20 p-2 text-[10px] font-mono text-white/50">
                    <div className="flex justify-between"><span>TOP NOTES</span><span className="text-white truncate max-w-[150px]">{perfume.notes.top}</span></div>
                    <div className="flex justify-between"><span>HEART LEVEL</span><span className="text-white truncate max-w-[150px]">{perfume.notes.heart}</span></div>
                    <div className="flex justify-between"><span>ANCHOR BASE</span><span className="text-white truncate max-w-[150px]">{perfume.notes.base}</span></div>
                  </div>
                </div>

                {/* Buying section */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between select-none">
                  <div className="flex flex-col">
                    {perfume.originalPrice && (
                      <span className="text-[10px] text-white/40 line-through">
                        ₹{perfume.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    <span className="text-lg font-serif text-gold-base font-bold">
                      ₹{perfume.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigateToSection('engraving-lab');
                        // Pre-scroll trigger studio
                      }}
                      className="p-2.5 rounded-full border border-white/10 hover:border-gold-base hover:bg-gold-base/5 text-white/80 hover:text-gold-light transition-colors cursor-pointer"
                      title="Custom Engraving calligraphy"
                      id={`custom-link-${perfume.id}`}
                    >
                      <Layers className="w-4.5 h-4.5" />
                    </button>
                    
                    <button
                      onClick={() => handleAddToCart(perfume)}
                      className="px-5 h-10 bg-gradient-to-r from-gold-deep to-gold-light hover:brightness-105 text-navy-dark text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1 cursor-pointer shimmer-btn"
                      id={`quick-buy-${perfume.id}`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Acquire
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE SCENT MATCHING QUIZ */}
      <section className="py-24 bg-navy-dark border-t border-white/5" id="scentfinder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 select-none">
            <span className="text-xs uppercase font-mono text-gold-base tracking-[0.25em] font-semibold">
              Olfactive Diagnosis
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold tracking-wide mt-2">
              Discover Your Scent Core
            </h2>
            <p className="text-xs sm:text-sm text-white/55 mt-2leading-relaxed">
              Answer 3 brief lifestyle queries. Our algorithmic chemistry calibrates your matching botanical elements to identify the exact sillage profile aligned with your energetic presence.
            </p>
          </div>

          <ScentFinder 
            onAddToCart={handleAddToCart} 
            onOpenCart={() => setIsCartOpen(true)} 
          />
        </div>
      </section>

      {/* 6. BOTANICAL ATLAS SOURCES (ScentMap) */}
      <section className="py-24 border-t border-white/5 bg-navy-dark/20 relative overflow-hidden" id="scentmap">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScentMap />
        </div>
      </section>

      {/* 7. BESPOKE GOLD CALLIGRAPHY ENGRAVING LAB */}
      <section className="py-24 border-t border-white/5 bg-navy-dark" id="engraving-lab">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 select-none">
            <span className="text-xs uppercase font-mono text-gold-base tracking-[0.25em] font-semibold">
              Bespoke Flask Artistry
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold tracking-wide mt-2">
              The Custom Calligraphy Lab
            </h2>
            <p className="text-xs sm:text-sm text-white/55 mt-2 leading-relaxed">
              Design a permanent gold heirloom. Choose your preferred bottle formula, type your inscription, and command direct gold calligraphy. Free config benefit applied for state patrons.
            </p>
          </div>

          <EngravingStudio 
            onAddCustomProduct={handleAddCustomProduct} 
            onOpenCart={() => setIsCartOpen(true)} 
          />
        </div>
      </section>

      {/* 8. SOCIAL PROOF & EDITORIAL REVIEWS */}
      <section className="py-24 border-t border-white/5 bg-navy-dark/45" id="reviews">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 select-none">
            <span className="text-xs uppercase font-mono text-gold-base tracking-[0.25em] font-semibold">
              Patron Verifications
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold tracking-wide mt-2">
              Olfactive Chronicles of the Guild
            </h2>
            <p className="text-xs sm:text-sm text-white/55 mt-2 leading-relaxed">
              Real testimonials from verify collectors and connoisseurs of fine traditional oriental sillage.
            </p>
          </div>

          {/* Testimonial cards bento style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Review 1 */}
            <div className="p-8 bg-gradient-to-br from-navy-base to-navy-dark border border-white/5 rounded-2xl relative">
              <div className="text-gold-light/40 font-serif text-[60px] leading-none absolute top-4 left-6 select-none">“</div>
              <div className="relative pt-6">
                <div className="flex gap-1 text-gold-base text-xs mb-4 select-none">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-sm text-white/80 font-serif font-light leading-relaxed italic">
                  "The sillage duration on Royal Oud Al-Sultani is incredible. I applied a microscopic dab to my woolen blazer and could trace the deep resin accents three days later on the closet rail. Extremely authentic."
                </p>
                
                <div className="mt-6 flex items-center gap-3 select-none">
                  <div className="w-10 h-10 rounded-full bg-gold-base/10 border border-gold-base/30 flex items-center justify-center text-gold-light font-serif font-bold text-sm">
                    HS
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Haroon S. Malik</span>
                    <span className="text-[10px] text-white/45 block font-mono">Verified Guild Collector</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="p-8 bg-gradient-to-br from-navy-base to-navy-dark border border-gold-base/20 rounded-2xl relative">
              <div className="text-gold-light/40 font-serif text-[60px] leading-none absolute top-4 left-6 select-none">“</div>
              <div className="relative pt-6">
                <div className="flex gap-1 text-gold-base text-xs mb-4 select-none">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-sm text-white/80 font-serif font-light leading-relaxed italic">
                  "We purchased two custom engraved bottles of Saffron Royale for our silver marriage anniversary. The live gold font engraving turned out exceptionally beautiful on the glass. A luxury experience from start to finish."
                </p>
                
                <div className="mt-6 flex items-center gap-3 select-none">
                  <div className="w-10 h-10 rounded-full bg-gold-base/10 border border-gold-base/30 flex items-center justify-center text-gold-light font-serif font-bold text-sm">
                    AK
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Ananya K. Roy</span>
                    <span className="text-[10px] text-white/45 block font-mono">Collector Member</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="p-8 bg-gradient-to-br from-navy-base to-navy-dark border border-white/5 rounded-2xl relative">
              <div className="text-gold-light/40 font-serif text-[60px] leading-none absolute top-4 left-6 select-none">“</div>
              <div className="relative pt-6">
                <div className="flex gap-1 text-gold-base text-xs mb-4 select-none">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-sm text-white/80 font-serif font-light leading-relaxed italic">
                  "Coastal Vetiver feels completely aquatic and high-end. It radiates sea spray and grapefruit warmth without any chemical residue. This has instantly replaced my luxury blue bottle collection."
                </p>
                
                <div className="mt-6 flex items-center gap-3 select-none">
                  <div className="w-10 h-10 rounded-full bg-gold-base/10 border border-gold-base/30 flex items-center justify-center text-gold-light font-serif font-bold text-sm">
                    DR
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Dr. Devendra R.</span>
                    <span className="text-[10px] text-white/45 block font-mono">Patron Associate</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 9. VIP CONVERSION GATE (The Golden Guild Sign-up Form) */}
      <section className="py-24 border-t border-white/5 bg-gradient-to-b from-navy-dark to-[#050d18]" id="membership">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VIPRegistration onRegisterSuccess={handleRegisterSuccess} />
        </div>
      </section>

      {/* 10. LUXURY ACCORDION FAQS */}
      <section className="py-24 border-t border-white/5 bg-[#050d18]" id="faqs">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-12 select-none">
            <span className="text-xs uppercase font-mono text-gold-base tracking-[0.25em] font-semibold">
              Curated Clarifications
            </span>
            <h2 className="font-serif text-3xl text-white font-bold mt-2">
              Frequently Queried Secrets
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="border border-white/5 bg-navy-base/40 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-white hover:text-gold-light transition-colors cursor-pointer select-none focus:outline-none"
                  type="button"
                  id={`faq-btn-${idx}`}
                >
                  <span className="font-serif text-base sm:text-lg font-medium pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gold-base transition-transform duration-500 flex-shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="p-5 pt-0 text-xs sm:text-sm text-white/60 leading-relaxed border-t border-white/[0.02]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. FOOTER PORTAL */}
      <footer className="bg-[#030810] pt-16 pb-8 border-t border-white/5 text-white/55 text-xs font-light select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          
          {/* Logo & Brand statement */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-2xl font-bold text-white tracking-[0.12em]">
              shah<span className="text-gold-base font-normal">habib</span>
            </span>
            <p className="text-xs leading-relaxed max-w-sm">
              Distillers of precious Cambodian Oud, Kashmiri Saffron, and Al-Hada mountain dews. We honor pure ancient extraction methods to formulate high-sillage, complex olfactory masterpieces.
            </p>
            {/* Social handles */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-navy-light/40 border border-white/5 hover:border-gold-base flex items-center justify-center text-white/70 hover:text-gold-light transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-navy-light/40 border border-white/5 hover:border-gold-base flex items-center justify-center text-white/70 hover:text-gold-light transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-navy-light/40 border border-white/5 hover:border-gold-base flex items-center justify-center text-white/70 hover:text-gold-light transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Sinks Links */}
          <div className="md:col-span-2.5 space-y-3">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-white tracking-wider font-semibold">
              The Collection
            </h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigateToSection('shop')} className="hover:text-gold-light transition-colors cursor-pointer text-left" type="button">Royal Oud Al-Sultani</button></li>
              <li><button onClick={() => navigateToSection('shop')} className="hover:text-gold-light transition-colors cursor-pointer text-left" type="button">Midnight Amber</button></li>
              <li><button onClick={() => navigateToSection('shop')} className="hover:text-gold-light transition-colors cursor-pointer text-left" type="button">Saffron Royale</button></li>
              <li><button onClick={() => navigateToSection('shop')} className="hover:text-gold-light transition-colors cursor-pointer text-left" type="button">Coastal Vetiver</button></li>
            </ul>
          </div>

          {/* Atelier info */}
          <div className="md:col-span-2.5 space-y-3">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-white tracking-wider font-semibold">
              The Atelier
            </h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigateToSection('engraving-lab')} className="hover:text-gold-light transition-colors cursor-pointer text-left" type="button">Engagement Lab</button></li>
              <li><button onClick={() => navigateToSection('scentmap')} className="hover:text-gold-light transition-colors cursor-pointer text-left" type="button">Botanical Atlas Map</button></li>
              <li><button onClick={() => navigateToSection('scentfinder')} className="hover:text-gold-light transition-colors cursor-pointer text-left" type="button">Personality Match</button></li>
              <li><button onClick={() => navigateToSection('membership')} className="hover:text-gold-light transition-colors cursor-pointer text-left" type="button font-semibold">VIP Royal Circle Membership</button></li>
            </ul>
          </div>

          {/* Secure Courier detail */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-white tracking-wider font-semibold">
              Support
            </h4>
            <ul className="space-y-2 text-white/50">
              <li>Secure Insured Delivery</li>
              <li>Olfactive Guarantee Return</li>
              <li>Atelier bulk inquiries</li>
              <li>support@shahhabib.com</li>
            </ul>
          </div>

        </div>

        {/* Outer footer strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/35">
          <span>© 2026 Shah Habib House of Sillage. Handcrafted with royal heritage. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer hover:underline transition-all">VIP Charter Policies</span>
            <span className="hover:text-white cursor-pointer hover:underline transition-all font-semibold">Souverain Escrow billing</span>
          </div>
        </div>
      </footer>

      {/* 12. SIDE SLIDE CABINETS -- SHOPPING BAG DRAWER */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* 13. FLOATING GORGEOUS COURIER NOTIFICATIONS (TOASTS) */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 35, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 35, x: '-50%' }}
            className="fixed bottom-6 left-1/2 -translate-x-[50%] px-6 py-3.5 bg-gradient-to-r from-gold-deep to-gold-light text-navy-dark font-semibold text-xs tracking-widest uppercase rounded-full shadow-2xl shadow-gold-base/30 flex items-center gap-2.5 z-250 select-none"
            id="toast-notification-widget"
          >
            <CheckCircle className="w-4 h-4 text-navy-dark" />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

