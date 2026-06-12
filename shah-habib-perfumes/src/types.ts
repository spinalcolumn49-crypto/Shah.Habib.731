export interface Perfume {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'Oud' | 'Amber' | 'Saffron' | 'Aquatic' | 'Floral';
  notes: {
    top: string;
    heart: string;
    base: string;
  };
  ingredients: string[];
  rarity: 'Legendary' | 'Rare' | 'Signatory';
  colorGradient: {
    bg1: string;
    bg2: string;
    liquid: string;
    glow: string;
  };
  imageUrl: string;
  concentration?: string;
}

export interface CartItem {
  id: string; // Unique, representing combination of product + engraving
  product: Perfume;
  quantity: number;
  engravingText?: string;
  engravingFont?: 'serif' | 'script' | 'modern';
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    vibe: string;
    description: string;
    icon: string;
  }[];
}

export type VIPBenefitTier = 'Sovereign' | 'Emperor' | 'Grand Duke';

export interface VIPUser {
  fullName: string;
  email: string;
  scentVibe: string;
  perkUnlocked: string;
  tier: VIPBenefitTier;
}
