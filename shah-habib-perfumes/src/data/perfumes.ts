import { Perfume } from '../types';

export const SIGNATURE_PERFUMES: Perfume[] = [
  {
    id: "royal-oud",
    name: "Royal Oud Al-Sultani",
    tagline: "The Crown King of Precious Woods",
    description: "Deep, majestic cambodian oud refined with smoked incense, creamy sandalwood, and warm leather notes.",
    price: 6499,
    originalPrice: 8500,
    category: "Oud",
    notes: {
      top: "Bergamot, Saffron Blossom",
      heart: "Cambodian Oud, Damascus Rose",
      base: "Sandalwood, Incense, Ambergris"
    },
    ingredients: ["Incense", "Oud", "Sandalwood", "Saffron", "Rose"],
    rarity: "Legendary",
    colorGradient: {
      bg1: "from-[#3A2E1E]",
      bg2: "to-[#110D09]",
      liquid: "rgba(212,175,55,0.7)",
      glow: "rgba(184,134,11,0.6)"
    },
    imageUrl: "/src/assets/images/royal_oud_1781284206219.jpg",
    concentration: "Oud Extrait"
  },
  {
    id: "midnight-amber",
    name: "Midnight Amber",
    tagline: "The Velvet Spell of the Dusk",
    description: "A mysterious blend of rich golden amber, warm madagascar vanilla, sensual musk, and tonka bean.",
    price: 4999,
    originalPrice: 6500,
    category: "Amber",
    notes: {
      top: "Sweet Orange, Cinnamon Bark",
      heart: "Gold Amber, Labdanum",
      base: "Madagascar Vanilla, Patchouli, Benzoin"
    },
    ingredients: ["Amber", "Vanilla", "Patchouli", "Cinnamon", "Labdanum"],
    rarity: "Rare",
    colorGradient: {
      bg1: "from-[#4A2C1A]",
      bg2: "to-[#1C0F0A]",
      liquid: "rgba(230,138,0,0.65)",
      glow: "rgba(232,199,102,0.5)"
    },
    imageUrl: "/src/assets/images/midnight_amber_1781284223198.jpg",
    concentration: "Elixir Intense"
  },
  {
    id: "saffron-elixir",
    name: "Saffron Royale",
    tagline: "Golden Threads of Kashmiri Opulence",
    description: "Exotic kashmiri saffron combined with soft violet, structured white birch wood, and raspberry accents.",
    price: 5499,
    originalPrice: 7200,
    category: "Saffron",
    notes: {
      top: "Kashmiri Saffron, Juniper Berry",
      heart: "Black Violet, Crystal Leather",
      base: "Blonde Woods, Raspberry, Vetiver"
    },
    ingredients: ["Kashmiri Saffron", "Leather", "Violet", "Raspberry", "Vetiver"],
    rarity: "Legendary",
    colorGradient: {
      bg1: "from-[#631A15]",
      bg2: "to-[#230502]",
      liquid: "rgba(184,15,10,0.7)",
      glow: "rgba(212,175,55,0.5)"
    },
    imageUrl: "/src/assets/images/saffron_royale_1781284239995.jpg",
    concentration: "Saffron Absolute"
  },
  {
    id: "coastal-breeze",
    name: "Coastal Vetiver",
    tagline: "Pure Aquatic Grandeur",
    description: "An invigorating coastal breeze rich with salty sea air, crushed sage, and wild vetiver roots.",
    price: 3999,
    category: "Aquatic",
    notes: {
      top: "Sea Salt, Grapefruit, Cardamom",
      heart: "Salvia Sage, Jasmine Petals",
      base: "Haitian Vetiver, Cedarwood, Seaweed"
    },
    ingredients: ["Sea Salt", "Sage", "Vetiver", "Cedarwood", "Grapefruit"],
    rarity: "Signatory",
    colorGradient: {
      bg1: "from-[#103254]",
      bg2: "to-[#061524]",
      liquid: "rgba(0,180,216,0.6)",
      glow: "rgba(0,180,216,0.4)"
    },
    imageUrl: "/src/assets/images/coastal_vetiver_1781284270406.jpg",
    concentration: "Cologne Absolute"
  },
  {
    id: "royal-rose",
    name: "Rosa Sultana",
    tagline: "The Velvet Whispers of Ta'if",
    description: "Decadent Ta'if rose dew laced with delicate pink pepper, white musk, and luxury floral amber.",
    price: 4499,
    originalPrice: 5800,
    category: "Floral",
    notes: {
      top: "Pink Pepper, Lychee, Pear",
      heart: "Ta'if Rose Petals, Peony",
      base: "White Musk, Honeycomb, Cashmeran"
    },
    ingredients: ["Ta'if Rose", "White Musk", "Pink Pepper", "Honeycomb", "Peony"],
    rarity: "Rare",
    colorGradient: {
      bg1: "from-[#5F1C42]",
      bg2: "to-[#240618]",
      liquid: "rgba(255,105,180,0.6)",
      glow: "rgba(255,105,180,0.4)"
    },
    imageUrl: "/src/assets/images/rosa_sultana_1781284288984.jpg", // Falls back to beautiful custom CSS renderer of magenta rose tone!
    concentration: "Attar Absolue"
  }
];
