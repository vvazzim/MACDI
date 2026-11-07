export const CATEGORIES = [
  { id: 'lait', name_fr: 'Lait & Fromages', name_ar: 'حليب و أجبان', icon: '🥛', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'huiles', name_fr: 'Huile, Sucre & Semoule', name_ar: 'زيت، سكر و سميد', icon: '🛢️', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'pates', name_fr: 'Pâtes & Conserves', name_ar: 'عجائن و مصبرات', icon: '🥫', color: 'bg-red-50 text-red-700 border-red-200' },
  { id: 'boissons', name_fr: 'Eaux & Boissons', name_ar: 'مياه و مشروبات', icon: '💧', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { id: 'cafe', name_fr: 'Café & Petit-déj', name_ar: 'قهوة و فطور', icon: '☕', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: 'fruits_legumes', name_fr: 'Légumes & Fruits', name_ar: 'خضر و فواكه', icon: '🥔', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
];

export const PRODUCTS = [
  {
    id: 'prod_soummam_1l',
    category_id: 'lait',
    name_fr: 'Lait Soummam UHT 1L',
    name_ar: 'حليب صومام 1 لتر',
    brand: 'Soummam',
    packaging: 'Brique 1L',
    image: '🥛',
    ref_price: 110,
    tags: ['lait', 'soummam', '1l', 'brique', 'حليب']
  },
  {
    id: 'prod_elio_5l',
    category_id: 'huiles',
    name_fr: 'Huile de Table Elio 5L',
    name_ar: 'زيت المائدة إيليو 5 لتر',
    brand: 'Elio',
    packaging: 'Bidon 5L',
    image: '🛢️',
    ref_price: 620,
    tags: ['huile', 'elio', '5l', 'bidon', 'zit', 'زيت']
  },
  {
    id: 'prod_cevital_sucre',
    category_id: 'huiles',
    name_fr: 'Sucre Blanc Cevital 1Kg',
    name_ar: 'سكر سيفيتال 1 كلغ',
    brand: 'Cevital',
    packaging: 'Paquet 1Kg',
    image: '🍚',
    ref_price: 95,
    tags: ['sucre', 'cevital', '1kg', 'seker', 'سكر']
  },
  {
    id: 'prod_sim_semoule',
    category_id: 'huiles',
    name_fr: 'Semoule Moyenne Sim 1Kg',
    name_ar: 'سميد متوسط سيم 1 كلغ',
    brand: 'Sim',
    packaging: 'Sachet 1Kg',
    image: '🌾',
    ref_price: 85,
    tags: ['semoule', 'sim', 'smid', '1kg', 'سميد']
  },
  {
    id: 'prod_benamor_tomate',
    category_id: 'pates',
    name_fr: 'Tomate Amor Benamor 800g',
    name_ar: 'طماطم مصبرة عمور بن عمور 800 غ',
    brand: 'Amor Benamor',
    packaging: 'Boîte 800g',
    image: '🥫',
    ref_price: 280,
    tags: ['tomate', 'benamor', '800g', 'conserve', 'tomatich', 'طماطم']
  },
  {
    id: 'prod_mama_couscous',
    category_id: 'pates',
    name_fr: 'Couscous Moyen Mama 1Kg',
    name_ar: 'كسكس متوسط ماما 1 كلغ',
    brand: 'Mama',
    packaging: 'Paquet 1Kg',
    image: '🍲',
    ref_price: 120,
    tags: ['couscous', 'mama', '1kg', 'taam', 'كسكس']
  },
  {
    id: 'prod_extra_spaghetti',
    category_id: 'pates',
    name_fr: 'Spaghetti N°5 Extra 500g',
    name_ar: 'سباغيتي إكسترا 500 غ',
    brand: 'Extra Benhamadi',
    packaging: 'Sachet 500g',
    image: '🍝',
    ref_price: 65,
    tags: ['pates', 'spaghetti', 'extra', '500g', 'عجائن']
  },
  {
    id: 'prod_berbere_fromage',
    category_id: 'lait',
    name_fr: 'Fromage Berbère 16 Portions',
    name_ar: 'جبن بربير 16 قطعة',
    brand: 'Berbère',
    packaging: 'Boîte 16p',
    image: '🧀',
    ref_price: 195,
    tags: ['fromage', 'berbere', '16 portions', 'formaj', 'جبن']
  },
  {
    id: 'prod_selecto_1l',
    category_id: 'boissons',
    name_fr: 'Hamoud Selecto 1L',
    name_ar: 'حمود بوعلام سيلكتو 1 لتر',
    brand: 'Hamoud Boualem',
    packaging: 'Bouteille 1L',
    image: '🍾',
    ref_price: 100,
    tags: ['selecto', 'hamoud', 'gazouz', '1l', 'سيلكتو']
  },
  {
    id: 'prod_lalla_khedidja',
    category_id: 'boissons',
    name_fr: 'Eau Minérale Lalla Khedidja 1.5L',
    name_ar: 'ماء معدني لالة خديجة 1.5 لتر',
    brand: 'Lalla Khedidja',
    packaging: 'Bouteille 1.5L',
    image: '💧',
    ref_price: 40,
    tags: ['eau', 'lalla khedidja', '1.5l', 'maa', 'ماء']
  },
  {
    id: 'prod_famico_cafe',
    category_id: 'cafe',
    name_fr: 'Café Moulu Famico 250g',
    name_ar: 'قهوة مطحونة فاميكو 250 غ',
    brand: 'Famico',
    packaging: 'Paquet 250g',
    image: '☕',
    ref_price: 250,
    tags: ['cafe', 'famico', '250g', 'kahwa', 'قهوة']
  },
  {
    id: 'prod_oeufs_plateau',
    category_id: 'lait',
    name_fr: 'Plateau d\'Œufs Frais 30 Pièces',
    name_ar: 'بلاطو بيض طازج 30 حبة',
    brand: 'Élevage Local',
    packaging: 'Plateau 30',
    image: '🥚',
    ref_price: 540,
    tags: ['oeufs', 'plateau', '30 pieces', 'biid', 'بيض']
  },
  {
    id: 'prod_batata_1kg',
    category_id: 'fruits_legumes',
    name_fr: 'Pommes de Terre Locales 1Kg',
    name_ar: 'بطاطا محلية 1 كلغ',
    brand: 'Production Locale',
    packaging: '1Kg',
    image: '🥔',
    ref_price: 80,
    tags: ['pomme de terre', 'batata', 'legumes', '1kg', 'بطاطا']
  }
];

export const STORES = [
  {
    id: 'store_01',
    name: 'Superette El Baraka',
    name_ar: 'سوبرماركت البركة',
    type: 'Superette',
    wilaya: 'Alger (16)',
    commune: 'Bab Ezzouar',
    address: 'Cité 8 Mai 1945, face arrêt Tramway',
    lat: 36.7188,
    lng: 3.1865,
    phone: '0550 12 34 56'
  },
  {
    id: 'store_02',
    name: 'Uno Hypermarché Bab Ezzouar',
    name_ar: 'أونو هايبرماركت باب الزوار',
    type: 'Hypermarché',
    wilaya: 'Alger (16)',
    commune: 'Bab Ezzouar',
    address: 'Centre Commercial Bab Ezzouar, Niveau 0',
    lat: 36.7132,
    lng: 3.1931,
    phone: '021 24 50 00'
  },
  {
    id: 'store_03',
    name: 'Alimentation Générale El Hidhab',
    name_ar: 'تغذية عامة الهضاب',
    type: 'Hanout de quartier',
    wilaya: 'Alger (16)',
    commune: 'Kouba',
    address: 'Avenue des Frères Abdeslami, Garidi',
    lat: 36.7265,
    lng: 3.0825,
    phone: '0555 88 99 00'
  },
  {
    id: 'store_04',
    name: 'Superette Le Printemps',
    name_ar: 'سوبرماركت الربيع',
    type: 'Superette',
    wilaya: 'Alger (16)',
    commune: 'Alger Centre',
    address: 'Rue Didouche Mourad, Place Audin',
    lat: 36.7681,
    lng: 3.0538,
    phone: '021 63 11 22'
  },
  {
    id: 'store_05',
    name: 'Fleur de Lys Superette',
    name_ar: 'سوبرماركت زهرة الزنبق',
    type: 'Superette',
    wilaya: 'Alger (16)',
    commune: 'Hydra',
    address: 'Boulevard Sidi Yahia, Hydra',
    lat: 36.7410,
    lng: 3.0320,
    phone: '023 48 90 12'
  },
  {
    id: 'store_06',
    name: 'Grossiste & Détail El Chahid',
    name_ar: 'تاجر جملة وتجزئة الشهيد',
    type: 'Grossiste',
    wilaya: 'Alger (16)',
    commune: 'El Harrach',
    address: 'Marché couvert d\'El Harrach',
    lat: 36.7210,
    lng: 3.1340,
    phone: '0661 44 55 66'
  },
  {
    id: 'store_07',
    name: 'Superette Al-Amine',
    name_ar: 'سوبرماركت الأمين',
    type: 'Superette',
    wilaya: 'Blida (09)',
    commune: 'Boufarik',
    address: 'Centre Ville, près de la gare de Boufarik',
    lat: 36.5742,
    lng: 2.9135,
    phone: '025 47 18 20'
  },
  {
    id: 'store_08',
    name: 'Superette Ouled Yaïch',
    name_ar: 'سوبرماركت أولاد يعيش',
    type: 'Superette',
    wilaya: 'Blida (09)',
    commune: 'Ouled Yaïch',
    address: 'Boulevard Principal, Ouled Yaïch',
    lat: 36.4912,
    lng: 2.8520,
    phone: '025 31 22 44'
  }
];

export const INITIAL_PRICES = [
  // Lait Soummam 1L
  {
    id: 'pr_1',
    product_id: 'prod_soummam_1l',
    store_id: 'store_01',
    price_dzd: 105,
    is_promo: false,
    promo_expires: null,
    upvotes: 24,
    downvotes: 1,
    verified_by_store: false,
    updated_at: 'Il y a 2 heures'
  },
  {
    id: 'pr_2',
    product_id: 'prod_soummam_1l',
    store_id: 'store_02',
    price_dzd: 110,
    is_promo: false,
    promo_expires: null,
    upvotes: 19,
    downvotes: 2,
    verified_by_store: true,
    updated_at: 'Aujourd\'hui 10h'
  },
  {
    id: 'pr_3',
    product_id: 'prod_soummam_1l',
    store_id: 'store_03',
    price_dzd: 115,
    is_promo: false,
    promo_expires: null,
    upvotes: 8,
    downvotes: 1,
    verified_by_store: false,
    updated_at: 'Hier'
  },
  {
    id: 'pr_4',
    product_id: 'prod_soummam_1l',
    store_id: 'store_04',
    price_dzd: 125,
    is_promo: false,
    promo_expires: null,
    upvotes: 5,
    downvotes: 3,
    verified_by_store: false,
    updated_at: 'Il y a 3 jours'
  },
  {
    id: 'pr_5',
    product_id: 'prod_soummam_1l',
    store_id: 'store_06',
    price_dzd: 95,
    is_promo: true,
    promo_note: '⚡ Offre Spéciale : 95 DA jusqu\'à vendredi !',
    promo_expires: 'Vendredi 18h',
    upvotes: 42,
    downvotes: 0,
    verified_by_store: true,
    updated_at: 'Ce matin 08h'
  },
  {
    id: 'pr_6',
    product_id: 'prod_soummam_1l',
    store_id: 'store_07',
    price_dzd: 100,
    is_promo: false,
    promo_expires: null,
    upvotes: 14,
    downvotes: 1,
    verified_by_store: false,
    updated_at: 'Hier 16h'
  },

  // Huile Elio 5L
  {
    id: 'pr_7',
    product_id: 'prod_elio_5l',
    store_id: 'store_01',
    price_dzd: 620,
    is_promo: false,
    upvotes: 31,
    downvotes: 2,
    verified_by_store: false,
    updated_at: 'Ce matin'
  },
  {
    id: 'pr_8',
    product_id: 'prod_elio_5l',
    store_id: 'store_02',
    price_dzd: 635,
    is_promo: false,
    upvotes: 22,
    downvotes: 3,
    verified_by_store: true,
    updated_at: 'Hier'
  },
  {
    id: 'pr_9',
    product_id: 'prod_elio_5l',
    store_id: 'store_06',
    price_dzd: 600,
    is_promo: true,
    promo_note: 'Prix de gros au détail (Max 2 par client)',
    promo_expires: 'Ce samedi',
    upvotes: 56,
    downvotes: 1,
    verified_by_store: true,
    updated_at: 'Aujourd\'hui'
  },
  {
    id: 'pr_10',
    product_id: 'prod_elio_5l',
    store_id: 'store_07',
    price_dzd: 610,
    is_promo: false,
    upvotes: 12,
    downvotes: 0,
    verified_by_store: false,
    updated_at: 'Il y a 2 jours'
  },

  // Sucre Cevital 1Kg
  {
    id: 'pr_11',
    product_id: 'prod_cevital_sucre',
    store_id: 'store_01',
    price_dzd: 95,
    is_promo: false,
    upvotes: 18,
    downvotes: 0,
    verified_by_store: false,
    updated_at: 'Aujourd\'hui'
  },
  {
    id: 'pr_12',
    product_id: 'prod_cevital_sucre',
    store_id: 'store_04',
    price_dzd: 100,
    is_promo: false,
    upvotes: 9,
    downvotes: 1,
    verified_by_store: false,
    updated_at: 'Hier'
  },

  // Tomate Amor Benamor 800g
  {
    id: 'pr_13',
    product_id: 'prod_benamor_tomate',
    store_id: 'store_01',
    price_dzd: 275,
    is_promo: false,
    upvotes: 15,
    downvotes: 1,
    verified_by_store: false,
    updated_at: 'Ce matin'
  },
  {
    id: 'pr_14',
    product_id: 'prod_benamor_tomate',
    store_id: 'store_05',
    price_dzd: 310,
    is_promo: false,
    upvotes: 7,
    downvotes: 2,
    verified_by_store: false,
    updated_at: 'Il y a 3 jours'
  },
  {
    id: 'pr_15',
    product_id: 'prod_benamor_tomate',
    store_id: 'store_06',
    price_dzd: 265,
    is_promo: true,
    promo_note: 'Promo arrivage frais !',
    promo_expires: 'Jeudi',
    upvotes: 28,
    downvotes: 0,
    verified_by_store: true,
    updated_at: 'Aujourd\'hui'
  }
];

export const COMMUNE_PRESETS = [
  { name: 'Bab Ezzouar (Alger)', lat: 36.7188, lng: 3.1865 },
  { name: 'Kouba (Alger)', lat: 36.7265, lng: 3.0825 },
  { name: 'Alger Centre / Didouche', lat: 36.7681, lng: 3.0538 },
  { name: 'Hydra / Sidi Yahia', lat: 36.7410, lng: 3.0320 },
  { name: 'El Harrach (Alger)', lat: 36.7210, lng: 3.1340 },
  { name: 'Boufarik (Blida)', lat: 36.5742, lng: 2.9135 },
  { name: 'Blida Centre', lat: 36.4703, lng: 2.8277 }
];
