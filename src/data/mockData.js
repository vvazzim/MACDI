export const CATEGORIES = [
  { id: 'lait', name_fr: 'Lait & Produits Laitiers', name_ar: 'حليب و أجبان', icon: '🥛', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'huiles', name_fr: 'Huile, Sucre & Farine', name_ar: 'زيوت، سكر و سميد', icon: '🛢️', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'pates', name_fr: 'Pâtes, Riz & Légumineuses', name_ar: 'عجائن و بقوليات', icon: '🍝', color: 'bg-red-50 text-red-700 border-red-200' },
  { id: 'conserves', name_fr: 'Conserves & Sauces', name_ar: 'معلبات و مصبرات', icon: '🥫', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'boissons', name_fr: 'Eaux & Boissons', name_ar: 'مياه و مشروبات', icon: '💧', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { id: 'cafe', name_fr: 'Café & Petit-déjeuner', name_ar: 'قهوة و فطور', icon: '☕', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: 'fruits_legumes', name_fr: 'Fruits & Légumes Frais', name_ar: 'خضر و فواكه', icon: '🥔', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
];

export const PRODUCTS = [
  // 1. Lait & Produits Laitiers
  {
    id: 'prod_soummam_1l',
    category_id: 'lait',
    name_fr: 'Lait Soummam UHT 1L Demi-Écrémé',
    name_ar: 'حليب صومام نصف دسم 1 لتر',
    brand: 'Soummam',
    packaging: 'Brique 1L',
    image: '🥛',
    ref_price: 110,
    tags: ['lait', 'soummam', '1l', 'brique', 'حليب']
  },
  {
    id: 'prod_candia_1l',
    category_id: 'lait',
    name_fr: 'Lait Candia Silhouette 1L',
    name_ar: 'حليب كانديا سيلويت 1 لتر',
    brand: 'Candia',
    packaging: 'Brique 1L',
    image: '🥛',
    ref_price: 125,
    tags: ['candia', 'lait', 'silhouette', '1l']
  },
  {
    id: 'prod_berbere_fromage',
    category_id: 'lait',
    name_fr: 'Fromage Fondu Berbère 16 Portions',
    name_ar: 'جبن بربير 16 قطعة',
    brand: 'Berbère',
    packaging: 'Boîte 16p',
    image: '🧀',
    ref_price: 195,
    tags: ['fromage', 'berbere', '16 portions', 'formaj', 'جبن']
  },
  {
    id: 'prod_tartino_fromage',
    category_id: 'lait',
    name_fr: 'Fromage en Portions Tartino 16p',
    name_ar: 'جبن تارتينو 16 قطعة',
    brand: 'Tartino',
    packaging: 'Boîte 16p',
    image: '🧀',
    ref_price: 185,
    tags: ['tartino', 'fromage', '16 portions']
  },
  {
    id: 'prod_lavache_fromage',
    category_id: 'lait',
    name_fr: 'La Vache Qui Rit 16 Portions',
    name_ar: 'جبن لافاش كيري 16 قطعة',
    brand: 'Bel Algérie',
    packaging: 'Boîte 16p',
    image: '🧀',
    ref_price: 260,
    tags: ['vache qui rit', 'lavachekiri', '16 portions']
  },
  {
    id: 'prod_yaourt_soummam_fraise',
    category_id: 'lait',
    name_fr: 'Yaourt Brassé Fort Soummam Fraise 100g',
    name_ar: 'ياغورت صومام فراولة 100غ',
    brand: 'Soummam',
    packaging: 'Pot 100g',
    image: '🍓',
    ref_price: 25,
    tags: ['yaourt', 'soummam', 'fort', 'fraise', 'ياغورت']
  },
  {
    id: 'prod_yaourt_activia',
    category_id: 'lait',
    name_fr: 'Yaourt Danone Activia Nature 110g',
    name_ar: 'ياغورت دانون أكتيفيا طبيعي',
    brand: 'Danone',
    packaging: 'Pot 110g',
    image: '🍶',
    ref_price: 35,
    tags: ['danone', 'activia', 'yaourt']
  },

  // 2. Huiles, Sucres & Céréales
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
    id: 'prod_afia_5l',
    category_id: 'huiles',
    name_fr: 'Huile Sans Cholestérol Afia 5L',
    name_ar: 'زيت عافية 5 لتر',
    brand: 'Afia',
    packaging: 'Bidon 5L',
    image: '🛢️',
    ref_price: 640,
    tags: ['huile', 'afia', '5l']
  },
  {
    id: 'prod_fleurial_5l',
    category_id: 'huiles',
    name_fr: 'Huile Végétale Fleurial 5L',
    name_ar: 'زيت فلوريال 5 لتر',
    brand: 'Cevital',
    packaging: 'Bidon 5L',
    image: '🛢️',
    ref_price: 630,
    tags: ['fleurial', 'huile', 'cevital', '5l']
  },
  {
    id: 'prod_cevital_sucre',
    category_id: 'huiles',
    name_fr: 'Sucre Blanc Cristallisé Cevital 1Kg',
    name_ar: 'سكر سيفيتال أبيض 1 كلغ',
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
    id: 'prod_mama_semoule',
    category_id: 'huiles',
    name_fr: 'Semoule Extra Fine Mama 1Kg',
    name_ar: 'دقيق ممتاز ماما 1 كلغ',
    brand: 'Mama',
    packaging: 'Paquet 1Kg',
    image: '🌾',
    ref_price: 90,
    tags: ['mama', 'semoule', 'fine', '1kg']
  },
  {
    id: 'prod_sim_farine',
    category_id: 'huiles',
    name_fr: 'Farine Extra Sim 1Kg',
    name_ar: 'فرينة ممتازة سيم 1 كلغ',
    brand: 'Sim',
    packaging: 'Sachet 1Kg',
    image: '🥖',
    ref_price: 60,
    tags: ['farine', 'sim', '1kg', 'فرينة']
  },

  // 3. Pâtes, Riz & Légumineuses
  {
    id: 'prod_mama_couscous',
    category_id: 'pates',
    name_fr: 'Couscous Moyen Traditionnel Mama 1Kg',
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
    name_fr: 'Spaghetti N°5 Extra Benhamadi 500g',
    name_ar: 'سباغيتي إكسترا بن حمادي 500غ',
    brand: 'Extra Benhamadi',
    packaging: 'Sachet 500g',
    image: '🍝',
    ref_price: 65,
    tags: ['pates', 'spaghetti', 'extra', '500g', 'عجائن']
  },
  {
    id: 'prod_sim_coquillettes',
    category_id: 'pates',
    name_fr: 'Pâtes Coquillettes Sim 500g',
    name_ar: 'عجائن رسومات سيم 500غ',
    brand: 'Sim',
    packaging: 'Sachet 500g',
    image: '🍜',
    ref_price: 60,
    tags: ['coquillettes', 'pates', 'sim', '500g']
  },
  {
    id: 'prod_riz_safina',
    category_id: 'pates',
    name_fr: 'Riz Blanc Étuve Safina 1Kg',
    name_ar: 'أرز أبيض سفينة 1 كلغ',
    brand: 'Safina',
    packaging: 'Paquet 1Kg',
    image: '🍚',
    ref_price: 140,
    tags: ['riz', 'safina', '1kg', 'ارز']
  },
  {
    id: 'prod_lentilles_1kg',
    category_id: 'pates',
    name_fr: 'Lentilles Vertes Locales 1Kg',
    name_ar: 'عدس محلي 1 كلغ',
    brand: 'Marché Local',
    packaging: 'Sachet 1Kg',
    image: '🥣',
    ref_price: 190,
    tags: ['lentilles', '1kg', 'ades', 'عدس']
  },
  {
    id: 'prod_pois_chiche_1kg',
    category_id: 'pates',
    name_fr: 'Pois Chiches Secs Calibre Gros 1Kg',
    name_ar: 'حمص حب جاف 1 كلغ',
    brand: 'Marché Local',
    packaging: 'Sachet 1Kg',
    image: '🧆',
    ref_price: 240,
    tags: ['pois chiche', 'homos', '1kg', 'حمص']
  },

  // 4. Conserves & Sauces
  {
    id: 'prod_benamor_tomate',
    category_id: 'conserves',
    name_fr: 'Tomate Amor Benamor Double Concentré 800g',
    name_ar: 'طماطم مصبرة عمور بن عمور 800غ',
    brand: 'Amor Benamor',
    packaging: 'Boîte 800g',
    image: '🥫',
    ref_price: 280,
    tags: ['tomate', 'benamor', '800g', 'conserve', 'tomatich', 'طماطم']
  },
  {
    id: 'prod_izda_tomate',
    category_id: 'conserves',
    name_fr: 'Double Concentré de Tomate Izda 800g',
    name_ar: 'طماطم مصبرة إيزدا 800غ',
    brand: 'Izda',
    packaging: 'Boîte 800g',
    image: '🥫',
    ref_price: 260,
    tags: ['izda', 'tomate', '800g']
  },
  {
    id: 'prod_harissa_capbon',
    category_id: 'conserves',
    name_fr: 'Harissa Traditionnelle Berbère 380g',
    name_ar: 'هريسة حارة تقليدية 380غ',
    brand: 'Cap Bon / Berbère',
    packaging: 'Boîte 380g',
    image: '🌶️',
    ref_price: 110,
    tags: ['harissa', 'piment', 'هريسة']
  },
  {
    id: 'prod_thon_maratun',
    category_id: 'conserves',
    name_fr: 'Thon Entier à l\'Huile Végétale Maratun 160g',
    name_ar: 'طونة ماراتون بالزيت 160غ',
    brand: 'Maratun',
    packaging: 'Boîte 160g',
    image: '🐟',
    ref_price: 220,
    tags: ['thon', 'maratun', 'huile', 'طون']
  },

  // 5. Eaux & Boissons
  {
    id: 'prod_lalla_khedidja',
    category_id: 'boissons',
    name_fr: 'Eau Minérale Naturelle Lalla Khedidja 1.5L',
    name_ar: 'ماء معدني لالة خديجة 1.5 لتر',
    brand: 'Lalla Khedidja',
    packaging: 'Bouteille 1.5L',
    image: '💧',
    ref_price: 40,
    tags: ['eau', 'lalla khedidja', '1.5l', 'maa', 'ماء']
  },
  {
    id: 'prod_saida_1_5l',
    category_id: 'boissons',
    name_fr: 'Eau Minérale Naturelle Saïda 1.5L',
    name_ar: 'ماء سعيدة 1.5 لتر',
    brand: 'Saïda',
    packaging: 'Bouteille 1.5L',
    image: '💧',
    ref_price: 40,
    tags: ['saida', 'eau', '1.5l']
  },
  {
    id: 'prod_guedila_1_5l',
    category_id: 'boissons',
    name_fr: 'Eau Minérale Pure Guedila 1.5L',
    name_ar: 'ماء قديلا 1.5 لتر',
    brand: 'Guedila',
    packaging: 'Bouteille 1.5L',
    image: '💧',
    ref_price: 40,
    tags: ['guedila', 'eau', '1.5l']
  },
  {
    id: 'prod_selecto_1l',
    category_id: 'boissons',
    name_fr: 'Hamoud Boualem Selecto Bouteille 1L',
    name_ar: 'حمود بوعلام سيلكتو 1 لتر',
    brand: 'Hamoud Boualem',
    packaging: 'Bouteille 1L',
    image: '🍾',
    ref_price: 100,
    tags: ['selecto', 'hamoud', 'gazouz', '1l', 'سيلكتو']
  },
  {
    id: 'prod_hamoud_blanche_1l',
    category_id: 'boissons',
    name_fr: 'Hamoud Boualem Blanche Citron 1L',
    name_ar: 'حمود بوعلام بيضاء ليمون 1 لتر',
    brand: 'Hamoud Boualem',
    packaging: 'Bouteille 1L',
    image: '🍋',
    ref_price: 100,
    tags: ['hamoud', 'blanche', 'citron', '1l']
  },
  {
    id: 'prod_ramy_cocktail_1l',
    category_id: 'boissons',
    name_fr: 'Jus Ramy Cocktail Tropical 1L',
    name_ar: 'عصير رامي كوكتيل 1 لتر',
    brand: 'Ramy',
    packaging: 'Brique 1L',
    image: '🧃',
    ref_price: 130,
    tags: ['ramy', 'jus', 'cocktail', '1l', 'عصير']
  },
  {
    id: 'prod_rouiba_orange_1l',
    category_id: 'boissons',
    name_fr: 'Jus Rouiba Orange Nectar 1L',
    name_ar: 'عصير رويبة برتقال 1 لتر',
    brand: 'Rouiba',
    packaging: 'Brique 1L',
    image: '🍊',
    ref_price: 140,
    tags: ['rouiba', 'jus', 'orange', '1l']
  },

  // 6. Café & Petit-déjeuner
  {
    id: 'prod_famico_cafe',
    category_id: 'cafe',
    name_fr: 'Café Moulu Torréfié Famico 250g',
    name_ar: 'قهوة مطحونة فاميكو 250غ',
    brand: 'Famico',
    packaging: 'Paquet 250g',
    image: '☕',
    ref_price: 250,
    tags: ['cafe', 'famico', '250g', 'kahwa', 'قهوة']
  },
  {
    id: 'prod_bonal_cafe',
    category_id: 'cafe',
    name_fr: 'Café Moulu Bonal Express 250g',
    name_ar: 'قهوة بونال إكسبريس 250غ',
    brand: 'Bonal',
    packaging: 'Paquet 250g',
    image: '☕',
    ref_price: 260,
    tags: ['bonal', 'cafe', '250g']
  },
  {
    id: 'prod_bimo_biscuits',
    category_id: 'cafe',
    name_fr: 'Biscuits Secs Bimo Original 160g',
    name_ar: 'بسكويت بيمو الأصلي',
    brand: 'Bimo',
    packaging: 'Paquet 160g',
    image: '🍪',
    ref_price: 65,
    tags: ['bimo', 'biscuit', 'petit dej']
  },
  {
    id: 'prod_confiture_fraise',
    category_id: 'cafe',
    name_fr: 'Confiture de Fraise Mansourah 450g',
    name_ar: 'معجون الفراولة منصورة 450غ',
    brand: 'Mansourah',
    packaging: 'Bocal 450g',
    image: '🍯',
    ref_price: 190,
    tags: ['confiture', 'fraise', 'maarjoune', 'معجون']
  },

  // 7. Frais & Marché Quotidien
  {
    id: 'prod_oeufs_plateau',
    category_id: 'fruits_legumes',
    name_fr: 'Plateau d\'Œufs Frais Calibre Gros (30 Pièces)',
    name_ar: 'بلاطو بيض طازج 30 حبة كبار',
    brand: 'Élevage Local',
    packaging: 'Plateau 30',
    image: '🥚',
    ref_price: 540,
    tags: ['oeufs', 'plateau', '30 pieces', 'biid', 'بيض']
  },
  {
    id: 'prod_batata_1kg',
    category_id: 'fruits_legumes',
    name_fr: 'Pommes de Terre Locales Sélection 1Kg',
    name_ar: 'بطاطا محلية استهلاك 1 كلغ',
    brand: 'Production Locale (Mascara/Ain Defla)',
    packaging: '1Kg',
    image: '🥔',
    ref_price: 80,
    tags: ['pomme de terre', 'batata', 'legumes', '1kg', 'بطاطا']
  },
  {
    id: 'prod_tomate_fraiche_1kg',
    category_id: 'fruits_legumes',
    name_fr: 'Tomates Fraîches Salade 1Kg',
    name_ar: 'طماطم طازجة محلية 1 كلغ',
    brand: 'Production Locale',
    packaging: '1Kg',
    image: '🍅',
    ref_price: 110,
    tags: ['tomates', 'fraiches', '1kg']
  },
  {
    id: 'prod_oignons_1kg',
    category_id: 'fruits_legumes',
    name_fr: 'Oignons Secs Locaux 1Kg',
    name_ar: 'بصل جاف محلي 1 كلغ',
    brand: 'Production Locale',
    packaging: '1Kg',
    image: '🧅',
    ref_price: 60,
    tags: ['oignons', 'bassel', '1kg', 'بصل']
  }
];

// 25+ Comprehensive Stores covering Alger, Blida, Tipaza & Surrounding Markets
export const STORES = [
  // Alger Est (Bab Ezzouar, El Harrach, Rouiba, Bordj El Kiffan, Ain Taya)
  {
    id: 'store_01',
    name: 'Superette El Baraka',
    name_ar: 'سوبرماركت البركة',
    type: 'Superette',
    source: 'Terrain & Web',
    wilaya: 'Alger (16)',
    commune: 'Bab Ezzouar',
    address: 'Cité 8 Mai 1945, face arrêt Tramway',
    lat: 36.7188,
    lng: 3.1865,
    phone: '0550 12 34 56'
  },
  {
    id: 'store_02',
    name: 'Uno Hypermarché - Bab Ezzouar',
    name_ar: 'أونو هايبرماركت باب الزوار',
    type: 'Hypermarché',
    source: 'Coursesnet / Uno',
    wilaya: 'Alger (16)',
    commune: 'Bab Ezzouar',
    address: 'Centre Commercial Bab Ezzouar, Niveau 0',
    lat: 36.7132,
    lng: 3.1931,
    phone: '021 24 50 00'
  },
  {
    id: 'store_06',
    name: 'Grossiste & Détail El Chahid',
    name_ar: 'تاجر جملة وتجزئة الشهيد',
    type: 'Grossiste',
    source: 'Marché de Gros',
    wilaya: 'Alger (16)',
    commune: 'El Harrach',
    address: 'Marché couvert d\'El Harrach, Rue de Belfort',
    lat: 36.7210,
    lng: 3.1340,
    phone: '0661 44 55 66'
  },
  {
    id: 'store_15',
    name: 'Superette Le Palmier Rouiba',
    name_ar: 'سوبرماركت رويبة سنتر',
    type: 'Superette',
    source: 'Coursesnet',
    wilaya: 'Alger (16)',
    commune: 'Rouiba',
    address: 'Avenue Colonel Amirouche, Rouiba Centre',
    lat: 36.7380,
    lng: 3.2840,
    phone: '023 85 14 15'
  },
  {
    id: 'store_16',
    name: 'Superette Verte Bordj El Kiffan',
    name_ar: 'سوبرماركت برج الكيفان',
    type: 'Superette',
    source: 'Superette DZ',
    wilaya: 'Alger (16)',
    commune: 'Bordj El Kiffan',
    address: 'Boulevard du Bord de Mer, Bateaux Cassés',
    lat: 36.7510,
    lng: 3.1920,
    phone: '0552 90 80 70'
  },

  // Alger Centre & Sud (Kouba, Alger Centre, Hydra, Bir Mourad Raïs, Belcourt, El Biar)
  {
    id: 'store_03',
    name: 'Alimentation Générale El Hidhab',
    name_ar: 'تغذية عامة الهضاب',
    type: 'Hanout de quartier',
    source: 'Relevé Terrain',
    wilaya: 'Alger (16)',
    commune: 'Kouba',
    address: 'Avenue des Frères Abdeslami, Garidi 2',
    lat: 36.7265,
    lng: 3.0825,
    phone: '0555 88 99 00'
  },
  {
    id: 'store_04',
    name: 'Superette Le Printemps',
    name_ar: 'سوبرماركت الربيع',
    type: 'Superette',
    source: 'Superette DZ',
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
    type: 'Superette Premium',
    source: 'Relevé Web',
    wilaya: 'Alger (16)',
    commune: 'Hydra',
    address: 'Boulevard Sidi Yahia, Hydra',
    lat: 36.7410,
    lng: 3.0320,
    phone: '023 48 90 12'
  },
  {
    id: 'store_09',
    name: 'Superette Safina Bir Mourad Raïs',
    name_ar: 'سوبرماركت سفينة بئر مراد رايس',
    type: 'Superette',
    source: 'Coursesnet',
    wilaya: 'Alger (16)',
    commune: 'Bir Mourad Raïs',
    address: 'Place de la Concorde, BMR',
    lat: 36.7340,
    lng: 3.0545,
    phone: '021 54 20 10'
  },
  {
    id: 'store_17',
    name: 'Marché Couvert Ali Mellah',
    name_ar: 'سوق علي ملاح 1 ماي',
    type: 'Marché Populaire',
    source: 'Marché Central',
    wilaya: 'Alger (16)',
    commune: 'Sidi M\'Hamed',
    address: 'Place du 1er Mai, Champ de Manœuvre',
    lat: 36.7560,
    lng: 3.0570,
    phone: 'Marché central'
  },
  {
    id: 'store_18',
    name: 'Superette Belcourt - Hassiba',
    name_ar: 'سوبرماركت بلوزداد حيبة',
    type: 'Superette',
    source: 'Terrain',
    wilaya: 'Alger (16)',
    commune: 'Belouizdad',
    address: 'Rue Hassiba Ben Bouali, Belcourt',
    lat: 36.7515,
    lng: 3.0640,
    phone: '0560 33 44 55'
  },
  {
    id: 'store_19',
    name: 'Superette El Biar Balcon',
    name_ar: 'سوبرماركت الأبيار',
    type: 'Superette',
    source: 'Superette DZ',
    wilaya: 'Alger (16)',
    commune: 'El Biar',
    address: 'Place Kennedy, El Biar Centre',
    lat: 36.7710,
    lng: 3.0290,
    phone: '023 27 10 00'
  },

  // Alger Ouest (Dely Ibrahim, Chéraga, Bab El Oued, Ain Benian, Zéralda)
  {
    id: 'store_10',
    name: 'Marché Populaire Bab El Oued',
    name_ar: 'سوق باب الواد الشعبي',
    type: 'Marché Libre',
    source: 'Marché Populaire',
    wilaya: 'Alger (16)',
    commune: 'Bab El Oued',
    address: 'Boulevard Colonel Lotfi, Triolet',
    lat: 36.7890,
    lng: 3.0510,
    phone: 'Marché libre'
  },
  {
    id: 'store_13',
    name: 'Superette Dely Ibrahim Bois des Cars',
    name_ar: 'سوبرماركت دالي ابراهيم',
    type: 'Superette',
    source: 'Superette DZ',
    wilaya: 'Alger (16)',
    commune: 'Dely Ibrahim',
    address: 'Route Nationale 41, Bois des Cars 2',
    lat: 36.7520,
    lng: 2.9860,
    phone: '023 25 18 19'
  },
  {
    id: 'store_20',
    name: 'Superette Chéraga Bouchaoui',
    name_ar: 'سوبرماركت الشراقة بوشاوي',
    type: 'Superette',
    source: 'Coursesnet',
    wilaya: 'Alger (16)',
    commune: 'Chéraga',
    address: 'Route de Bouchaoui, Chéraga',
    lat: 36.7620,
    lng: 2.9550,
    phone: '023 36 40 50'
  },
  {
    id: 'store_21',
    name: 'Alimentation Générale Zéralda Centre',
    name_ar: 'تغذية عامة زرالدة',
    type: 'Hanout de quartier',
    source: 'Terrain',
    wilaya: 'Alger (16)',
    commune: 'Zéralda',
    address: 'Boulevard du 1er Novembre, Zéralda',
    lat: 36.7120,
    lng: 2.8420,
    phone: '0555 12 88 99'
  },
  {
    id: 'store_22',
    name: 'Superette Ain Benian La Madrague',
    name_ar: 'سوبرماركت عين بنيان الجميلة',
    type: 'Superette',
    source: 'Terrain',
    wilaya: 'Alger (16)',
    commune: 'Ain Benian',
    address: 'Port de La Madrague, Ain Benian',
    lat: 36.8020,
    lng: 2.9240,
    phone: '023 10 45 60'
  },

  // Sud Alger (Ain Naadja, Bachdjerrah, Baraki, Birtouta)
  {
    id: 'store_11',
    name: 'Superette Le Palmier - Ain Naadja',
    name_ar: 'سوبرماركت النخلة عين النعجة',
    type: 'Superette',
    source: 'Relevé Web',
    wilaya: 'Alger (16)',
    commune: 'Gué de Constantine',
    address: 'Cité 720 Logements, Ain Naadja',
    lat: 36.7080,
    lng: 3.0720,
    phone: '0558 77 66 55'
  },
  {
    id: 'store_12',
    name: 'Hanout Cité Chahid Bachdjerrah',
    name_ar: 'دكان باش جراح',
    type: 'Hanout de quartier',
    source: 'Terrain',
    wilaya: 'Alger (16)',
    commune: 'Bachdjerrah',
    address: 'Face station Métro Bachdjerrah',
    lat: 36.7150,
    lng: 3.1090,
    phone: '0770 11 22 33'
  },
  {
    id: 'store_23',
    name: 'Grossiste Alimentaire Baraki',
    name_ar: 'تاجر جملة براقي',
    type: 'Grossiste',
    source: 'Marché de Gros',
    wilaya: 'Alger (16)',
    commune: 'Baraki',
    address: 'Zone d\'activité de Baraki',
    lat: 36.6640,
    lng: 3.0980,
    phone: '0662 10 20 30'
  },

  // Wilaya de Blida (09) - Boufarik, Blida Centre, Ouled Yaïch, Beni Mered
  {
    id: 'store_07',
    name: 'Superette Al-Amine',
    name_ar: 'سوبرماركت الأمين',
    type: 'Superette',
    source: 'Relevé Terrain',
    wilaya: 'Blida (09)',
    commune: 'Boufarik',
    address: 'Centre Ville, près de la gare de Boufarik',
    lat: 36.5742,
    lng: 2.9135,
    phone: '025 47 18 20'
  },
  {
    id: 'store_14',
    name: 'Marché Couvert Central de Boufarik',
    name_ar: 'السوق المغطى المركزي بوفاريك',
    type: 'Marché Libre',
    source: 'Marché Populaire',
    wilaya: 'Blida (09)',
    commune: 'Boufarik',
    address: 'Place du Marché aux Oranges, Boufarik',
    lat: 36.5780,
    lng: 2.9110,
    phone: 'Marché ouvert tous les matins'
  },
  {
    id: 'store_08',
    name: 'Superette Ouled Yaïch',
    name_ar: 'سوبرماركت أولاد يعيش',
    type: 'Superette',
    source: 'Relevé Terrain',
    wilaya: 'Blida (09)',
    commune: 'Ouled Yaïch',
    address: 'Boulevard Principal, Ouled Yaïch',
    lat: 36.4912,
    lng: 2.8520,
    phone: '025 31 22 44'
  },
  {
    id: 'store_24',
    name: 'Superette Bab Edzair Blida Centre',
    name_ar: 'سوبرماركت باب الجزائر البليدة',
    type: 'Superette',
    source: 'Terrain',
    wilaya: 'Blida (09)',
    commune: 'Blida',
    address: 'Place du 1er Novembre, Place d\'Armes',
    lat: 36.4715,
    lng: 2.8285,
    phone: '025 21 80 90'
  },
  {
    id: 'store_25',
    name: 'Marché aux Fruits & Légumes Beni Mered',
    name_ar: 'سوق الخضر والفواكه بني مراد',
    type: 'Marché Libre',
    source: 'Producteurs',
    wilaya: 'Blida (09)',
    commune: 'Beni Mered',
    address: 'Route Nationale 1, Beni Mered',
    lat: 36.5180,
    lng: 2.8640,
    phone: 'Marché direct producteurs'
  }
];

export const INITIAL_PRICES = [
  // Lait Soummam 1L
  {
    id: 'pr_1',
    product_id: 'prod_soummam_1l',
    store_id: 'store_06',
    price_dzd: 95,
    is_promo: true,
    promo_note: '⚡ Offre Spéciale Grossiste : 95 DA',
    promo_expires: 'Ce vendredi',
    source: 'Grossiste El Harrach',
    upvotes: 42,
    downvotes: 0,
    verified_by_store: true,
    updated_at: 'Ce matin 08h'
  },
  {
    id: 'pr_2',
    product_id: 'prod_soummam_1l',
    store_id: 'store_01',
    price_dzd: 105,
    is_promo: false,
    promo_expires: null,
    source: 'Coursesnet',
    upvotes: 24,
    downvotes: 1,
    verified_by_store: false,
    updated_at: 'Il y a 2 heures'
  },
  {
    id: 'pr_3',
    product_id: 'prod_soummam_1l',
    store_id: 'store_02',
    price_dzd: 110,
    is_promo: false,
    promo_expires: null,
    source: 'Uno Hypermarché',
    upvotes: 19,
    downvotes: 2,
    verified_by_store: true,
    updated_at: 'Aujourd\'hui 10h'
  },
  {
    id: 'pr_4',
    product_id: 'prod_soummam_1l',
    store_id: 'store_07',
    price_dzd: 100,
    is_promo: false,
    promo_expires: null,
    source: 'Relevé Boufarik',
    upvotes: 14,
    downvotes: 1,
    verified_by_store: false,
    updated_at: 'Hier 16h'
  },
  {
    id: 'pr_5',
    product_id: 'prod_soummam_1l',
    store_id: 'store_04',
    price_dzd: 120,
    is_promo: false,
    promo_expires: null,
    source: 'Superette DZ',
    upvotes: 6,
    downvotes: 2,
    verified_by_store: false,
    updated_at: 'Il y a 1 jour'
  },

  // Huile Elio 5L
  {
    id: 'pr_6',
    product_id: 'prod_elio_5l',
    store_id: 'store_06',
    price_dzd: 595,
    is_promo: true,
    promo_note: 'Prix grossiste au détail',
    promo_expires: 'Ce samedi',
    source: 'Marché de Gros',
    upvotes: 56,
    downvotes: 1,
    verified_by_store: true,
    updated_at: 'Aujourd\'hui'
  },
  {
    id: 'pr_7',
    product_id: 'prod_elio_5l',
    store_id: 'store_01',
    price_dzd: 620,
    is_promo: false,
    source: 'Superette DZ',
    upvotes: 31,
    downvotes: 2,
    verified_by_store: false,
    updated_at: 'Ce matin'
  },
  {
    id: 'pr_8',
    product_id: 'prod_elio_5l',
    store_id: 'store_02',
    price_dzd: 630,
    is_promo: false,
    source: 'Uno Hypermarché',
    upvotes: 22,
    downvotes: 3,
    verified_by_store: true,
    updated_at: 'Hier'
  },

  // Sucre Cevital 1Kg
  {
    id: 'pr_9',
    product_id: 'prod_cevital_sucre',
    store_id: 'store_01',
    price_dzd: 90,
    is_promo: false,
    source: 'Coursesnet',
    upvotes: 18,
    downvotes: 0,
    verified_by_store: false,
    updated_at: 'Aujourd\'hui'
  },
  {
    id: 'pr_10',
    product_id: 'prod_cevital_sucre',
    store_id: 'store_04',
    price_dzd: 100,
    is_promo: false,
    source: 'Didouche Alger',
    upvotes: 9,
    downvotes: 1,
    verified_by_store: false,
    updated_at: 'Hier'
  },

  // Tomate Amor Benamor 800g
  {
    id: 'pr_11',
    product_id: 'prod_benamor_tomate',
    store_id: 'store_06',
    price_dzd: 260,
    is_promo: true,
    promo_note: 'Arrivage frais Amor Benamor',
    promo_expires: 'Jeudi',
    source: 'Grossiste El Harrach',
    upvotes: 28,
    downvotes: 0,
    verified_by_store: true,
    updated_at: 'Aujourd\'hui'
  },
  {
    id: 'pr_12',
    product_id: 'prod_benamor_tomate',
    store_id: 'store_01',
    price_dzd: 275,
    is_promo: false,
    source: 'Coursesnet',
    upvotes: 15,
    downvotes: 1,
    verified_by_store: false,
    updated_at: 'Ce matin'
  }
];

export const COMMUNE_PRESETS = [
  { name: 'Bab Ezzouar (Alger Est)', lat: 36.7188, lng: 3.1865 },
  { name: 'Kouba (Alger Sud)', lat: 36.7265, lng: 3.0825 },
  { name: 'Alger Centre / Didouche', lat: 36.7681, lng: 3.0538 },
  { name: 'Hydra / Sidi Yahia', lat: 36.7410, lng: 3.0320 },
  { name: 'El Harrach (Marché de Gros)', lat: 36.7210, lng: 3.1340 },
  { name: 'Dely Ibrahim / Chéraga', lat: 36.7520, lng: 2.9860 },
  { name: 'Bab El Oued / Casbah', lat: 36.7890, lng: 3.0510 },
  { name: 'Rouiba / Bordj El Kiffan', lat: 36.7380, lng: 3.2840 },
  { name: 'Boufarik (Blida)', lat: 36.5742, lng: 2.9135 },
  { name: 'Blida Centre', lat: 36.4715, lng: 2.8285 }
];
