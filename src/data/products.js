export const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    title: "Apex ANC Wireless Headphones Pro",
    category: "Audio",
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.8,
    reviewCount: 142,
    badge: "Bestseller",
    inStock: true,
    stockCount: 25,
    colors: ["Midnight Black", "Platinum Silver", "Deep Navy"],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80",
    description: "Engineered with industry-leading Active Noise Cancellation, custom 40mm beryllium drivers, and 45-hour battery life. Ultra-plush memory foam cushions ensure all-day comfort.",
    specs: {
      "Battery Life": "Up to 45 Hours",
      "Noise Cancellation": "Dual-chip Hybrid ANC",
      "Connectivity": "Bluetooth 5.3 & 3.5mm Aux",
      "Weight": "254 grams",
      "Fast Charging": "10 min for 5 hours"
    },
    reviews: [
      { id: "r1", user: "Alex Mercer", rating: 5, comment: "Incredible soundstage and ANC. Blocks out entire train rides.", date: "2026-09-15" },
      { id: "r2", user: "Elena Rostova", rating: 4, comment: "Super comfy, premium build. Mic quality on calls is crystal clear.", date: "2026-09-20" }
    ]
  },
  {
    id: "prod-2",
    title: "Vortex OLED Smart Watch Ultra",
    category: "Wearables",
    price: 389.00,
    originalPrice: 429.00,
    rating: 4.9,
    reviewCount: 98,
    badge: "New",
    inStock: true,
    stockCount: 18,
    colors: ["Titanium Gray", "Starlight", "Onyx"],
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80",
    description: "Aerospace-grade titanium case featuring an always-on 2.1-inch sapphire glass AMOLED display. Comprehensive ECG, SpO2, and dual-frequency GPS tracking.",
    specs: {
      "Display": "2.1-inch Always-on AMOLED (1000 nits)",
      "Battery": "Up to 4 days typical use",
      "Water Resistance": "50m (5 ATM swimproof)",
      "Sensors": "Optical HR, ECG, SpO2, Skin Temp",
      "Compatibility": "iOS & Android"
    },
    reviews: [
      { id: "r3", user: "Michael Chang", rating: 5, comment: "Battery genuinely lasts 4 full days with workouts. GPS locks in 3 seconds.", date: "2026-09-18" }
    ]
  },
  {
    id: "prod-3",
    title: "Chronos Mechanical RGB Keyboard",
    category: "Gaming",
    price: 139.50,
    originalPrice: 169.99,
    rating: 4.7,
    reviewCount: 215,
    badge: "Sale",
    inStock: true,
    stockCount: 42,
    colors: ["Matte Black", "Arctic White"],
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&q=80",
    description: "Custom hot-swappable linear mechanical switches, sound-dampening silicone gasket mount, per-key RGB lighting, and CNC anodized aluminum chassis.",
    specs: {
      "Layout": "75% Compact Tenkeyless",
      "Switches": "Pre-lubed Gateron Yellow Pro",
      "Connectivity": "Tri-mode (2.4G / BT / USB-C)",
      "Keycaps": "Double-shot PBT Cherry Profile",
      "Battery": "4000mAh (Up to 200 hours)"
    },
    reviews: [
      { id: "r4", user: "Dave K.", rating: 5, comment: "The sound profile is so deep and creamy. No rattle on spacebar.", date: "2026-09-02" }
    ]
  },
  {
    id: "prod-4",
    title: "Lumix Quantum 4K Action Drone",
    category: "Cameras",
    price: 749.00,
    originalPrice: 849.00,
    rating: 4.6,
    reviewCount: 64,
    badge: "Featured",
    inStock: true,
    stockCount: 8,
    colors: ["Graphite", "Rescue Orange"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=700&q=80",
    description: "Ultra-compact folding drone equipped with a 1-inch CMOS sensor, 4K/60fps HDR video, 3-axis mechanical gimbal, and 360° omnidirectional obstacle sensing.",
    specs: {
      "Camera": "1-inch CMOS 20MP (4K/60fps)",
      "Max Flight Time": "38 Minutes",
      "Transmission Range": "12 km HD OcuSync",
      "Wind Resistance": "Level 6 (12 m/s)",
      "Weight": "249g (No registration needed)"
    },
    reviews: [
      { id: "r5", user: "Sarah Jenkins", rating: 5, comment: "Flies like a dream even in coastal breeze. Footage is razor sharp.", date: "2026-08-25" }
    ]
  },
  {
    id: "prod-5",
    title: "Pulse Pro Ergonomic Wireless Mouse",
    category: "Accessories",
    price: 89.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviewCount: 180,
    badge: "",
    inStock: true,
    stockCount: 50,
    colors: ["Charcoal", "Cloud Gray", "Forest Green"],
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=700&q=80",
    description: "Sculpted ergonomic design crafted to reduce wrist strain. Features hyper-fast MagSpeed scrolling, 8K DPI glass sensor, and seamless multi-device flow.",
    specs: {
      "Sensor": "Darkfield 8000 DPI Precision",
      "Buttons": "7 Programmable Keys + Gesture Button",
      "Battery": "Up to 70 days per full charge",
      "Connection": "Logi Bolt & Bluetooth",
      "Weight": "141 grams"
    },
    reviews: [
      { id: "r6", user: "Samir Patel", rating: 4, comment: "Saved my wrist from repetitive strain. Scrolling through sheets is effortless.", date: "2026-09-12" }
    ]
  },
  {
    id: "prod-6",
    title: "Horizon 27-inch 4K Studio Monitor",
    category: "Electronics",
    price: 529.00,
    originalPrice: 599.00,
    rating: 4.8,
    reviewCount: 88,
    badge: "Bestseller",
    inStock: true,
    stockCount: 14,
    colors: ["Space Gray", "Silver"],
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700&q=80",
    description: "Color-accurate IPS panel boasting 99% DCI-P3 wide color gamut, HDR400 certification, 90W USB-C power delivery, and an ergonomic pivot stand.",
    specs: {
      "Resolution": "3840 x 2160 (4K UHD)",
      "Refresh Rate": "75Hz Adaptive Sync",
      "Color Accuracy": "Delta E < 2, 99% DCI-P3",
      "Ports": "USB-C (90W PD), 2x HDMI 2.1, DisplayPort 1.4",
      "Stand": "Height, Tilt, Swivel, Pivot adjustable"
    },
    reviews: [
      { id: "r7", user: "Clara Brooks", rating: 5, comment: "Colors match my MacBook display identically. One cable charges my laptop.", date: "2026-08-30" }
    ]
  },
  {
    id: "prod-7",
    title: "Aura 360 Spatial Smart Speaker",
    category: "Audio",
    price: 179.00,
    originalPrice: 199.00,
    rating: 4.4,
    reviewCount: 110,
    badge: "",
    inStock: true,
    stockCount: 30,
    colors: ["Obsidian", "Warm Fabric Sand"],
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=700&q=80",
    description: "Room-filling 360-degree acoustic clarity powered by five directional tweeters and down-firing subwoofer. Supports AirPlay 2, Spotify Connect, and voice control.",
    specs: {
      "Drivers": "5 Directional Tweeters + 5.25\" Subwoofer",
      "Audio Support": "Dolby Atmos Spatial Audio, Lossless FLAC",
      "Connectivity": "Wi-Fi 6, Bluetooth 5.2, Optical Input",
      "Power": "120W Peak Output",
      "Smart Home": "Matter & AirPlay 2 Compatible"
    },
    reviews: [
      { id: "r8", user: "Marcus Vance", rating: 4, comment: "Crisp highs and warm low end. Fills my entire open concept living room.", date: "2026-09-08" }
    ]
  },
  {
    id: "prod-8",
    title: "NeoPad Pro 11-inch M3 Tablet",
    category: "Electronics",
    price: 699.00,
    originalPrice: 799.00,
    rating: 4.9,
    reviewCount: 312,
    badge: "Hot",
    inStock: true,
    stockCount: 11,
    colors: ["Space Black", "Starlight Silver"],
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=700&q=80",
    description: "Next-generation Liquid Retina display with 120Hz ProMotion. Extreme responsiveness for creatives, programmers, and gamers with magnetic stylus charging.",
    specs: {
      "Chipset": "Octa-core 3nm Neural Processor",
      "Storage": "256GB High-Speed NVMe",
      "Cameras": "12MP Ultra-wide with Center Stage",
      "Battery": "10 Hours all-day web & video",
      "Weight": "466 grams"
    },
    reviews: [
      { id: "r9", user: "Jordan Reed", rating: 5, comment: "Fastest tablet I've ever tested. 120Hz scrolling is buttery smooth.", date: "2026-09-24" }
    ]
  },
  {
    id: "prod-9",
    title: "Solace USB-C 100W GaN Fast Charger",
    category: "Accessories",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.7,
    reviewCount: 260,
    badge: "Sale",
    inStock: true,
    stockCount: 65,
    colors: ["Matte White", "Space Black"],
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=700&q=80",
    description: "Gallium Nitride (GaN III) architecture delivers 100W fast power in a package 45% smaller than standard bricks. Charges 4 devices concurrently.",
    specs: {
      "Total Wattage": "100W Max Delivery",
      "Ports": "3x USB-C (PD 3.0), 1x USB-A (QC 4.0)",
      "Safety": "ActiveShield 2.0 Temperature Monitor",
      "Input": "100-240V 50/60Hz Global",
      "Plug Type": "Foldable US/EU/UK pins"
    },
    reviews: [
      { id: "r10", user: "Tanya M.", rating: 5, comment: "Replaced 3 bulky bricks when traveling. Charges my laptop and phone at once.", date: "2026-09-14" }
    ]
  },
  {
    id: "prod-10",
    title: "Apex Carbon Travel Tripod",
    category: "Cameras",
    price: 219.00,
    originalPrice: 249.00,
    rating: 4.6,
    reviewCount: 74,
    badge: "",
    inStock: false,
    stockCount: 0,
    colors: ["Carbon Weave"],
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700&q=80",
    description: "Ultralight 8-layer carbon fiber construction. Extends up to 160cm yet packs down to 38cm, with an integrated Arca-Swiss ball head and phone mount.",
    specs: {
      "Material": "8-Layer Toray Carbon Fiber",
      "Max Height": "160 cm (63 inches)",
      "Folded Length": "38 cm",
      "Max Payload": "12 kg (26.4 lbs)",
      "Weight": "1.25 kg"
    },
    reviews: [
      { id: "r11", user: "Gavin Cole", rating: 4, comment: "Extremely rigid for its weight. Fits inside my daypack with room to spare.", date: "2026-08-19" }
    ]
  },
  {
    id: "prod-11",
    title: "Lumina Smart Ambient Light Bar Duo",
    category: "Home Tech",
    price: 119.00,
    originalPrice: 139.00,
    rating: 4.7,
    reviewCount: 153,
    badge: "Popular",
    inStock: true,
    stockCount: 22,
    colors: ["Matte Black"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700&q=80",
    description: "Syncs with screen contents or audio rhythm with 16 million colors and customizable dynamic flow scenes. Mount behind monitors or place on desk stands.",
    specs: {
      "Color Spectrum": "16 Million RGBIC Colors",
      "Sync Modes": "Audio Rhythm, Screen Mirror, Scene Modes",
      "Control": "App, Desktop App, Voice Assistant",
      "Mounting": "Desk Stands & 3M Curved Monitor Brackets",
      "Lifespan": "50,000 Hours"
    },
    reviews: [
      { id: "r12", user: "Liam O'Connor", rating: 5, comment: "Totally transforms night gaming and movie watching sessions.", date: "2026-09-22" }
    ]
  },
  {
    id: "prod-12",
    title: "Strata Active Smart Water Bottle",
    category: "Wearables",
    price: 64.99,
    originalPrice: 79.99,
    rating: 4.3,
    reviewCount: 89,
    badge: "",
    inStock: true,
    stockCount: 35,
    colors: ["Frosted Teal", "Matte Obsidian", "Blush Pink"],
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700&q=80",
    description: "Self-cleaning bottle with built-in UV-C sterilization LED in the cap. Tracks daily hydration via Bluetooth and displays water temperature on an OLED touch cap.",
    specs: {
      "Capacity": "650 ml / 22 oz",
      "Insulation": "Double-wall vacuum (24h cold / 12h hot)",
      "Sterilization": "280nm UV-C (99.99% bio-contaminant elimination)",
      "Battery": "Magnetic USB, lasts up to 30 days",
      "Material": "Food-grade 18/8 Stainless Steel"
    },
    reviews: [
      { id: "r13", user: "Chloe Nguyen", rating: 4, comment: "The hourly glow reminder actually keeps me drinking water at my desk.", date: "2026-09-11" }
    ]
  }
];

export const CATEGORIES = ["All", "Audio", "Wearables", "Gaming", "Cameras", "Accessories", "Electronics", "Home Tech"];

export const TEST_ACCOUNTS = {
  customer: {
    email: "testuser@superqa.com",
    password: "password123",
    name: "Alex QA Runner",
    role: "customer"
  },
  admin: {
    email: "admin@superqa.com",
    password: "adminpassword",
    name: "Sarah SuperAdmin",
    role: "admin"
  }
};

export const PROMO_CODES = {
  SUPERQA20: { code: "SUPERQA20", discountPercent: 20, description: "20% SuperQA Special Discount" },
  FREESHIP: { code: "FREESHIP", freeShipping: true, description: "100% Free Shipping Voucher" },
  WELCOME10: { code: "WELCOME10", discountPercent: 10, description: "10% Welcome Discount" }
};
