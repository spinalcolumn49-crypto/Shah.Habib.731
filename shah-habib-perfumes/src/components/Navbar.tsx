import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Award } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenVIP: () => void;
}

export default function Navbar({ cart, onOpenCart, onOpenVIP }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Shop', href: '#shop' },
    { label: 'Botanical Origins', href: '#scentmap' },
    { label: 'Engraving Lab', href: '#engraving-lab' },
    { label: 'Olfactive Match', href: '#scentfinder' },
    { label: 'Reviews', href: '#reviews' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 w-full select-none ${
        isScrolled 
          ? 'bg-navy-dark/90 backdrop-blur-xl border-b border-gold-base/10 shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
      id="main-nav-bar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo in Cormorant Serif */}
        <a 
          href="#home"
          onClick={(e) => { e.preventDefault(); handleLinkClick('#home'); }}
          className="flex items-center gap-1.5 focus:outline-none"
        >
          <span className="font-serif text-xl sm:text-2xl font-bold text-white tracking-[0.1em] lowercase first-letter:uppercase">
            shah<span className="text-gold-base font-medium">habib</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold-base hidden sm:block"></span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-gold-light transition-all duration-300 cursor-pointer relative group"
              type="button"
            >
              {link.label}
              <span className="absolute bottom-[-6px] left-0 right-0 h-[1.5px] bg-gold-base scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          ))}
        </div>

        {/* Action Suite (Cart + Hamburger + VIP Button) */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Cart triggers */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-white hover:text-gold-base transition-colors duration-300 focus:outline-none cursor-pointer"
            id="nav-cart-trigger"
            aria-label="Open collection bag"
          >
            <ShoppingBag className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
            
            {/* Pulsing badge if items are inside */}
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold-base text-navy-dark font-sans font-bold text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full shadow-md animate-duration-1000">
                {totalItems}
              </span>
            )}
          </button>

          {/* Premium VIP Circle Scroll button */}
          <button
            onClick={onOpenVIP}
            className="hidden sm:flex px-4.5 py-2.5 bg-gradient-to-r from-gold-deep via-gold-base to-gold-light hover:brightness-105 text-navy-dark text-[10px] uppercase tracking-[0.15em] font-bold rounded-full items-center gap-1.5 transition-all duration-300 shadow-md shadow-gold-base/5 cursor-pointer shimmer-btn"
            id="nav-vip-trigger"
            type="button"
          >
            <Award className="w-3.5 h-3.5" />
            Join Royal VIP
          </button>

          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 lg:hidden text-white/80 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-all cursor-pointer focus:outline-none"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Links overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[100%] inset-x-0 bg-navy-base/98 backdrop-blur-3xl border-b border-gold-base/10 px-4 py-6 space-y-4 shadow-xl z-90">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-left py-2 border-b border-white/5 text-xs uppercase tracking-widest text-white/80 hover:text-gold-light transition-all"
                type="button"
              >
                {link.label}
              </button>
            ))}
            
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenVIP();
              }}
              className="w-full py-3 bg-gradient-to-r from-gold-deep to-gold-light text-navy-dark text-xs uppercase font-bold tracking-widest rounded-full flex items-center justify-center gap-2"
              type="button"
            >
              <Award className="w-4 h-4" />
              Join the Royal VIP Circle
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
