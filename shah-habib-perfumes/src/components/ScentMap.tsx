import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Compass, Landmark, Wind, Droplets } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  scientific: string;
  origin: string;
  coordinates: string;
  character: string;
  narrative: string;
  icon: any;
}

export default function ScentMap() {
  const [activeId, setActiveId] = useState('oud');

  const ingredients: Ingredient[] = [
    {
      id: "oud",
      name: "Wild Cambodian Oud",
      scientific: "Aquilaria Crassna Resin",
      origin: "Kompong Speu, Cambodia",
      coordinates: "11.4583° N, 104.5204° E",
      character: "Dark, animalic, deep woodsy smoky warmth",
      narrative: "Often called 'liquid gold', our legendary oud resin is extracted from ancient wild trees. Its profile shifts slowly over decades, providing an eternal baseline that anchors our premium Royal Oud perfume.",
      icon: Compass
    },
    {
      id: "saffron",
      name: "Kashmiri Saffron Blossoms",
      scientific: "Crocus Sativus Stigmas",
      origin: "Pampore Highlands, Kashmir",
      coordinates: "34.0206° N, 74.9312° E",
      character: "Bittersweet, fiery spicy, dry saffron honey",
      narrative: "Harvested entirely by hand during a fleeting two-week window in autumn. It requires over 150,000 crimson threads to yield a single kilogram of pure raw extract, imparting the signature opulent warmth of Kashmiri Saffron.",
      icon: Landmark
    },
    {
      id: "rose",
      name: "Mountain Ta'if Rose",
      scientific: "Rosa Damascena Taif",
      origin: "Al-Hada Highlands, Saudi Arabia",
      coordinates: "21.3656° N, 40.2797° E",
      character: "Velvety pink dew, intense honeyed floral spice",
      narrative: "Deep in the high-altitude terraced mountain valleys, roses are plucked at dawn before the midday sun evaporate their precious volatile oils. It has a high-register green metallic freshness unmatched in any classic rose.",
      icon: Droplets
    },
    {
      id: "vanilla",
      name: "Madagascar Bourbon Orchid",
      scientific: "Vanilla Planifolia",
      origin: "Sava Region, Madagascar",
      coordinates: "14.2710° S, 50.1500° E",
      character: "Rich sweet balsamic, smoky timber, soft musk",
      narrative: "Hand-pollinated by traditional farmers, these precious pods are vacuum cured and dried for six long months. Our premium aging produces vanillin crystals that smell deeply organic, resinous, and intoxicatingly real.",
      icon: Wind
    }
  ];

  const activeIngObj = ingredients.find(i => i.id === activeId) || ingredients[0];

  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-navy-base to-[#08152c] border border-gold-base/15 rounded-2xl overflow-hidden shadow-2xl relative select-none">
      
      {/* Decorative compass wheel backdrop */}
      <div className="absolute right-[-10%] bottom-[-10%] w-[400px] h-[400px] rounded-full border border-gold-base/5 flex items-center justify-center animate-spin-slow pointer-events-none">
        <div className="w-[85%] h-[85%] rounded-full border border-gold-base/5" />
        <div className="w-[70%] h-[70%] rounded-full border border-gold-base/5" />
      </div>

      <div className="p-6 md:p-10 relative z-10">
        
        {/* Header section */}
        <div className="text-center mb-8 md:mb-12">
          <span className="text-xs uppercase font-mono text-gold-base tracking-[0.25em] font-semibold">
            The Botanical Atlas
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-white font-bold tracking-wide mt-2">
            Origins of Precious Essences
          </h3>
          <p className="text-xs md:text-sm text-white/55 max-w-2xl mx-auto mt-2 leading-relaxed">
            Our scents carry geographic histories. Traverse the map of our ethical botanical sourcing and explore the organic chemistry behind each spray.
          </p>
        </div>

        {/* Master layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sourcing Tabs Navigation Left */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] uppercase font-mono text-white/40 tracking-widest block mb-4">
              Select Botanical Ingredient
            </span>
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {ingredients.map((ing) => {
                const IconComp = ing.icon;
                return (
                  <button
                    key={ing.id}
                    onClick={() => setActiveId(ing.id)}
                    className={`flex items-center gap-3 w-full p-4 rounded-xl text-left border transition-all duration-300 flex-shrink-0 lg:flex-shrink cursor-pointer focus:outline-none ${
                      activeId === ing.id
                        ? 'border-gold-base/40 bg-gold-base/5 text-white'
                        : 'border-white/5 bg-navy-light/10 text-white/50 hover:text-white hover:bg-navy-light/20'
                    }`}
                    id={`map-tab-${ing.id}`}
                  >
                    <span className={`p-2 rounded-lg ${activeId === ing.id ? 'bg-gold-base text-navy-dark' : 'bg-white/5 text-white/60'}`}>
                      <IconComp className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="font-serif text-sm font-semibold block">{ing.name.split(" ").slice(1).join(" ") || ing.name}</span>
                      <span className="text-[10px] text-white/40 block font-mono mt-0.5">{ing.origin.split(",")[1]?.trim() || "Wild Harvest"}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Profile View Card Right */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-navy-dark/70 border border-white/5 p-6 md:p-8 rounded-xl relative overflow-hidden"
              >
                {/* Background overlay grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {/* Top Coordinates Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 mb-6 relative z-10">
                  <div className="flex items-center gap-2 mb-2 sm:mb-0">
                    <MapPin className="w-5 h-5 text-gold-base animate-pulse" />
                    <div>
                      <span className="text-xs font-mono font-semibold tracking-wider text-gold-light uppercase">{activeIngObj.origin}</span>
                      <span className="text-[10px] text-white/40 block font-mono leading-none mt-0.5">{activeIngObj.coordinates}</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono uppercase bg-gold-base/10 rounded px-2.5 py-1 text-gold-light border border-gold-base/20 inline-block align-self-start">
                    Ethical Curation Assurance
                  </div>
                </div>

                {/* Botanical Profile */}
                <div className="relative z-10">
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#B8860B] block">Botanical Nomenclature</span>
                    <h4 className="font-serif text-2xl font-bold text-white tracking-wide italic mt-0.5">
                      {activeIngObj.name}
                    </h4>
                    <span className="text-[10px] font-mono text-white/40 block italic mt-0.5">
                      {activeIngObj.scientific}
                    </span>
                  </div>

                  <p className="text-sm text-white/75 leading-relaxed mb-6">
                    {activeIngObj.narrative}
                  </p>

                  {/* Scientific/Scent analysis summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-navy-base/60 p-4 rounded-lg border border-white/5">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 block font-mono">Olfactive Classification</span>
                      <span className="text-xs font-medium text-white">{activeIngObj.character}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 block font-mono">Est. Concentration Ratio</span>
                      <span className="text-xs font-medium text-white">15-18% Pure Essential Distillate</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
