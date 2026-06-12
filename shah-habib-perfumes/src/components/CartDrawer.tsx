import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Gift } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onChangeQty: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onChangeQty,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  
  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  
  // Luxury offers
  const shippingThreshold = 3000;
  const isShippingFree = subtotal >= shippingThreshold || subtotal === 0;
  const shippingCost = isShippingFree ? 0 : 250;
  
  const finalTotal = subtotal + shippingCost;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-150 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
          />

          {/* Drawer Inner Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[440px] bg-gradient-to-b from-navy-base to-navy-dark border-l border-gold-base/20 z-200 flex flex-col shadow-2xl h-full"
            id="cart-drawer-panel"
          >
            {/* Header section */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between select-none">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-gold-base" />
                <h3 className="font-serif text-xl text-white font-medium">Your Royal Collection</h3>
                <span className="text-xs bg-gold-base/15 text-gold-light px-2.5 py-0.5 rounded-full font-semibold font-mono">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 px-2 border border-white/5 bg-navy-light/40 hover:bg-gold-base hover:text-navy-dark rounded-full transition-all duration-300 text-white cursor-pointer"
                id="close-cart-btn"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List section */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="h-[250px] flex flex-col items-center justify-center text-center p-6 select-none">
                  <div className="w-16 h-16 rounded-full bg-gold-base/5 border border-gold-base/25 flex items-center justify-center text-gold-base mb-4">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-lg text-white font-medium">Bespoke Bag is Empty</h4>
                  <p className="text-sm text-white/50 mt-1 max-w-[280px]">
                    Browse our crown formulations or customize a flask to begin your scent legacy.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-navy-dark/40 border border-white/5 rounded-xl flex gap-4 items-start relative group"
                  >
                    {/* Bottle preview mini container */}
                    <div className="w-16 h-20 rounded-lg bg-gradient-to-b from-navy-light/40 to-navy-dark border border-gold-base/25 flex items-center justify-center relative flex-shrink-0">
                      {/* Mini colored liquid core representation */}
                      <div 
                        className="absolute bottom-1 inset-x-1.5 rounded-b-md"
                        style={{ 
                          height: '65%', 
                          background: `linear-gradient(180deg, transparent 0%, ${item.product.colorGradient.liquid} 90%)`,
                          opacity: 0.6
                        }}
                      />
                      {/* Perfume Cap */}
                      <div className="absolute top-2 w-[35%] h-[12%] bg-gradient-to-r from-gold-deep via-gold-base to-gold-deep rounded-sm" />
                      <span className="font-serif text-[10px] text-gold-base/80 uppercase font-bold relative z-10 select-none">SH</span>
                    </div>

                    {/* Details block */}
                    <div className="flex-1 min-w-0">
                      <font className="text-white font-medium text-sm block truncate pr-5">
                        {item.product.name}
                      </font>
                      <span className="text-[11px] text-gold-light italic block mt-0.5 select-none">
                        {item.product.category} Royal Concentrate
                      </span>

                      {/* Calligraphy annotation details if customized */}
                      {item.engravingText && (
                        <div className="mt-1.5 p-1 px-2.5 bg-gold-base/5 border border-gold-base/20 rounded-md inline-block">
                          <span className="text-[9px] text-[#D4AF37] block font-mono">
                            ENGRAVING: <strong className="font-serif italic tracking-wide">“{item.engravingText}”</strong>
                          </span>
                        </div>
                      )}

                      {/* Quantity & Adjustment Controls */}
                      <div className="flex items-center gap-1.5 mt-3 select-none">
                        <font className="text-xs text-white/40 font-mono mr-1">Qty</font>
                        <button
                          onClick={() => onChangeQty(item.id, -1)}
                          className="w-6 h-6 rounded-md bg-navy-light/50 border border-white/5 hover:border-gold-base text-white hover:text-navy-dark hover:bg-gold-base flex items-center justify-center text-xs transition-all duration-300 cursor-pointer"
                          type="button"
                          id={`qty-minus-${item.id}`}
                        >
                          −
                        </button>
                        <span className="text-xs text-white font-mono font-bold min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onChangeQty(item.id, 1)}
                          className="w-6 h-6 rounded-md bg-navy-light/50 border border-white/5 hover:border-gold-base text-white hover:text-navy-dark hover:bg-gold-base flex items-center justify-center text-xs transition-all duration-300 cursor-pointer"
                          type="button"
                          id={`qty-plus-${item.id}`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price and removal */}
                    <div className="flex flex-col items-end justify-between self-stretch flex-shrink-0 select-none">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 text-white/40 hover:text-rose-400 rounded transition-colors cursor-pointer"
                        title="Remove product"
                        id={`remove-${item.id}`}
                        type="button"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="text-right mt-auto">
                        <span className="text-xs text-white/40 block">Price</span>
                        <span className="text-sm font-serif text-gold-base font-bold">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Complimentary Gift Box Banner */}
              {cart.length > 0 && (
                <div className="p-3 bg-gradient-to-r from-gold-base/5 to-transparent border border-gold-base/10 rounded-xl flex items-center gap-3 select-none">
                  <div className="p-2 bg-gold-base/15 rounded-lg text-gold-base">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-white font-medium block">Complementary Samples Added</span>
                    <span className="text-[10px] text-white/55 block">Includes 2 luxury tester vials + signature silk wrapping</span>
                  </div>
                </div>
              )}
            </div>

            {/* Subtotal & Action Cabinet Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-navy-dark/60 select-none">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs text-white/55">
                    <span>Valuation subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs text-white/55">
                    <span>Insured luxury courier delivery</span>
                    {shippingCost === 0 ? (
                      <span className="text-emerald-400 font-medium">Free insured transit</span>
                    ) : (
                      <span>₹{shippingCost.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                  <div className="pt-2 border-t border-white/5 flex justify-between items-baseline">
                    <span className="text-sm font-medium text-white uppercase tracking-wider">Estimated Total</span>
                    <span className="font-serif text-2xl text-gold-base font-bold">
                      ₹{finalTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full h-14 bg-gradient-to-r from-gold-deep via-gold-base to-gold-light hover:brightness-105 text-navy-dark font-semibold text-sm tracking-widest uppercase rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-gold-base/15 cursor-pointer shimmer-btn"
                  id="checkout-trigger-btn"
                  type="button"
                >
                  Confirm Imperial Order
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-white/40 uppercase tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-base" />
                  <span>Secure Insured Checkout Escrow</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
