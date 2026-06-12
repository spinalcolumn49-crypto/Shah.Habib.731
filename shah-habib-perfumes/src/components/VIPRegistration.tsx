import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ShieldCheck, Mail, User, Sparkles, Key, Check, Gift, HelpCircle } from 'lucide-react';
import { VIPUser, VIPBenefitTier } from '../types';

interface VIPRegistrationProps {
  onRegisterSuccess: (user: VIPUser) => void;
}

export default function VIPRegistration({ onRegisterSuccess }: VIPRegistrationProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    scentVibe: 'Oud'
  });
  
  const [isRegistered, setIsRegistered] = useState(false);
  const [isVaultOpening, setIsVaultOpening] = useState(false);
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const [unlockedReward, setUnlockedReward] = useState({
    title: '',
    perk: '',
    code: '',
  });

  const rewards = [
    { title: "Sovereign Scepter Benefit", perk: "Complimentary Solid Scent Balm + Free Engravings", code: "SOVEREIGNBALM" },
    { title: "Grand Emperor's Voucher", perk: "₹1,000 Off your bespoke crown collection", code: "EMPEROR1000" },
    { title: "Atelier Scent-Tier Perk", perk: "Complimentary Lacquered Rosewood Presentation Case", code: "ROSEWOODCASE" }
  ];

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) return;

    setIsRegistered(true);
    // Draw a random luxury benefit reward
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    setUnlockedReward(randomReward);

    const createdUser: VIPUser = {
      fullName: formData.fullName,
      email: formData.email,
      scentVibe: formData.scentVibe,
      perkUnlocked: randomReward.perk,
      tier: 'Sovereign' as VIPBenefitTier
    };
    
    onRegisterSuccess(createdUser);
  };

  const openVault = () => {
    setIsVaultOpening(true);
    setTimeout(() => {
      setVaultUnlocked(true);
      setIsVaultOpening(false);
    }, 1800);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-navy-base to-navy-dark border border-gold-base/20 rounded-2xl overflow-hidden shadow-2xl relative">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold-deep via-gold-base to-gold-light" />
      
      <div className="grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Side: Editorial Perks Breakdown */}
        <div className="md:col-span-5 bg-navy-dark p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between select-none">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-base/10 rounded-full border border-gold-base/30 text-[10px] uppercase font-mono tracking-widest text-gold-light mb-6">
              <Award className="w-3.5 h-3.5" />
              Sovereign Guild Charter
            </div>
            
            <h3 className="font-serif text-2xl md:text-3xl text-white font-bold leading-tight">
              The Shah Habib <br/>Royal Circle
            </h3>
            <p className="text-xs text-white/55 mt-2 leading-relaxed">
              Step beyond the ordinary. Become a recognized patron of our ancient perfume house and enjoy unprecedented luxury benefits.
            </p>

            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-2.5">
                <span className="text-gold-base font-serif text-sm font-bold pt-0.5">I.</span>
                <div className="text-xs">
                  <font className="text-white font-medium block">Complimentary Decanter Customisation</font>
                  <font className="text-white/50 block">Complimentary gold calligraphy engraving permanently unlocked on all orders.</font>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-gold-base font-serif text-sm font-bold pt-0.5">II.</span>
                <div className="text-xs">
                  <font className="text-white font-medium block">Rare Batch Pre-Sales</font>
                  <font className="text-white/50 block">Gain digital invitations to preview and sample ultra-limited harvests of Ta'if Rose and aged Cambodian Oud.</font>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-gold-base font-serif text-sm font-bold pt-0.5">III.</span>
                <div className="text-xs">
                  <font className="text-white font-medium block">Quarterly Guild Box Perks</font>
                  <font className="text-white/50 block">Receive complimentary curation packs including fresh formula sample vials.</font>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest">
            <ShieldCheck className="w-5 h-5 text-gold-base" />
            <span>Guaranteed privacy · No unsolicited junk</span>
          </div>
        </div>

        {/* Right Side: Interactive Registration Form & Mini-Game Stage */}
        <div className="md:col-span-7 p-6 md:p-10 flex flex-col justify-center min-h-[440px]">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Membership Registration Form */}
            {!isRegistered && (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleRegister}
                className="space-y-5"
              >
                <div>
                  <h4 className="font-serif text-xl text-white font-medium tracking-wide">
                    Request Royal Accession
                  </h4>
                  <p className="text-xs text-white/50 mt-1">
                    Fill the scroll below to discover your complimentary welcome gift.
                  </p>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-gold-light/80 font-mono font-semibold block">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="e.g. Sultan Al-Mughal"
                      className="w-full h-11 bg-navy-dark/80 border border-white/10 hover:border-gold-base/30 focus:border-gold-base rounded-xl px-4 pl-10 text-white text-sm focus:outline-none transition-all duration-300 font-sans"
                      id="signup-name-input"
                    />
                    <User className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-white/30" />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-gold-light/80 font-mono font-semibold block">
                    Secured Digital Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="e.g. sultan@kingdom.com"
                      className="w-full h-11 bg-navy-dark/80 border border-white/10 hover:border-gold-base/30 focus:border-gold-base rounded-xl px-4 pl-10 text-white text-sm focus:outline-none transition-all duration-300 font-sans"
                      id="signup-email-input"
                    />
                    <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-white/30" />
                  </div>
                </div>

                {/* Preferred Scent Path */}
                <div className="space-y-1.5 select-none">
                  <label className="text-[10px] uppercase tracking-widest text-gold-light/80 font-mono font-semibold block">
                    Favoured Olfactive Path
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Ouds & Woodsy', 'Rich Ambers', 'Spicy Saffron', 'Fresh Aquatic', 'Soft Florals'].map((path) => (
                      <button
                        key={path}
                        type="button"
                        onClick={() => setFormData({...formData, scentVibe: path})}
                        className={`p-2.5 rounded-xl border text-xs text-left transition-all duration-300 cursor-pointer ${
                          formData.scentVibe === path
                            ? 'border-gold-base bg-gold-base/10 text-white font-medium'
                            : 'border-white/5 bg-navy-light/10 text-white/55 hover:text-white'
                        }`}
                        id={`scent-preference-${path.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        {path}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA Submit Scroll */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-gold-deep via-gold-base to-gold-light text-navy-dark font-semibold text-xs tracking-widest uppercase rounded-full flex items-center justify-center gap-2 hover:brightness-105 transition-all duration-300 cursor-pointer shadow-lg shadow-gold-base/10 shimmer-btn"
                    id="member-submit-btn"
                  >
                    <Sparkles className="w-4 h-4 animate-spin-slow" />
                    Enter the Royal Circle
                  </button>
                </div>
              </motion.form>
            )}

            {/* Step 2: Vault Unlock Phase (Puzzler Mini-Game) */}
            {isRegistered && !vaultUnlocked && (
              <motion.div
                key="vault"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center p-4 select-none"
              >
                {/* Visual Lock / Chest representation */}
                <motion.div
                  animate={isVaultOpening ? { 
                    rotate: [0, -3, 3, -3, 3, 0], 
                    scale: [1, 1.05, 1.05, 1],
                    y: [0, -4, 4, -4, 4, 0]
                  } : {}}
                  transition={{ repeat: Infinity, duration: 0.4 }}
                  className="w-24 h-24 rounded-2xl bg-gradient-to-b from-navy-light to-navy-dark border border-gold-base/40 flex items-center justify-center text-gold-base shadow-2xl relative mb-6"
                >
                  <Key className={`w-10 h-10 transition-transform duration-700 ${isVaultOpening ? 'rotate-90 animate-pulse' : ''}`} />
                  <div className="absolute inset-2 border border-gold-base/15 rounded-xl pointer-events-none" />
                </motion.div>

                <h4 className="font-serif text-xl text-white font-medium">VIP Guild Key Accepted!</h4>
                <p className="text-xs text-white/50 mt-1.5 max-w-[320px] mb-6">
                  Verify your entry gift! Your digital Sovereign Key has been minted. Tap the trigger to unlock your hidden chest.
                </p>

                <button
                  onClick={openVault}
                  disabled={isVaultOpening}
                  className="px-8 h-12 bg-gradient-to-r from-gold-base to-gold-light text-navy-dark rounded-full text-xs font-semibold uppercase tracking-widest hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg shimmer-btn"
                  id="vault-trigger-btn"
                  type="button"
                >
                  {isVaultOpening ? "Opening Royal Vault..." : "Unlock Vault Secret"}
                </button>
              </motion.div>
            )}

            {/* Step 3: Vault Open - Reveal Prize */}
            {vaultUnlocked && (
              <motion.div
                key="prizerevealed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-4 flex flex-col items-center select-none"
              >
                {/* Vault Glowburst */}
                <div className="w-16 h-16 rounded-full bg-gold-base/15 border border-gold-base/40 flex items-center justify-center text-gold-base mb-5 relative">
                  <Gift className="w-7 h-7" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                </div>

                <h4 className="font-serif text-2xl text-gold-base font-bold">Vault Unlocked successfully!</h4>
                <p className="text-xs text-white/55 mt-1 max-w-[340px]">
                  Welcome, <span className="text-white font-medium">{formData.fullName}</span>! Master Perfumers have assigned you the following member privilege:
                </p>

                {/* Promo Card box */}
                <div className="w-full bg-navy-dark/95 border border-gold-base/30 rounded-xl p-5 my-6 relative overflow-hidden max-w-[360px]">
                  {/* Decorative edge strips */}
                  <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gold-base" />
                  
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#B8860B] font-semibold block mb-1">
                    {unlockedReward.title}
                  </span>
                  
                  <h5 className="text-sm font-semibold text-white leading-snug">
                    {unlockedReward.perk}
                  </h5>

                  {/* Promo Code Copy section */}
                  <div className="mt-4 flex items-center justify-between bg-navy-base border border-white/5 p-2 rounded-lg">
                    <span className="font-mono text-sm tracking-wider text-gold-light uppercase pl-2 select-all">
                      {unlockedReward.code}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(unlockedReward.code);
                        alert(`Coupon code ${unlockedReward.code} copied to clipboard! Apply it at secure billing.`);
                      }}
                      className="px-3 py-1 bg-gold-base text-navy-dark text-[10px] font-bold uppercase rounded-md hover:bg-gold-light transition-colors cursor-pointer"
                      id="copy-prize-code-btn"
                      type="button"
                    >
                      Copy Code
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-white/40 uppercase tracking-wider">
                  <Check className="w-3.5 h-3.5 text-gold-base" />
                  <span>Promo applied to session · Enjoy free premium delivery</span>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
