export interface Plant {
  id: string;
  name: string;
  botanicalName: string;
  price: number;
  image: string;
  category: ('indoor' | 'low-light' | 'pet-friendly' | 'easy-care')[];
  light: 'low' | 'medium' | 'bright';
  watering: 'low' | 'medium' | 'high';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  careInstructions: string[];
  growingConditions: {
    temperature: string;
    humidity: string;
    soil: string;
    size: string;
  };
  seasonalTips: {
    spring: string;
    summer: string;
    autumn: string;
    winter: string;
  };
  tags: string[];
}

export const plants: Plant[] = [
  {
    id: 'monstera-deliciosa',
    name: 'Monstera Deliciosa',
    botanicalName: 'Monstera deliciosa',
    price: 45,
    image: '🌿',
    category: ['indoor', 'easy-care'],
    light: 'bright',
    watering: 'medium',
    difficulty: 'beginner',
    description: 'The iconic Swiss Cheese Plant with its distinctive split leaves. A statement piece that thrives indoors and brings tropical energy to any space.',
    careInstructions: [
      'Water when top 2 inches of soil feel dry',
      'Wipe leaves monthly to remove dust',
      'Provide a moss pole for climbing support',
      'Rotate quarterly for even growth',
      'Fertilize monthly during growing season'
    ],
    growingConditions: {
      temperature: '65-85°F (18-29°C)',
      humidity: '60-80%',
      soil: 'Well-draining potting mix with perlite',
      size: 'Up to 8ft indoors'
    },
    seasonalTips: {
      spring: 'Repot if roots are circling. Begin regular fertilizing schedule.',
      summer: 'Monitor for new leaf unfurling. Increase humidity during hot days.',
      autumn: 'Reduce fertilizing. Move away from cold drafts near windows.',
      winter: 'Water less frequently. Provide supplemental lighting if needed.'
    },
    tags: ['tropical', 'statement', 'climbing', 'air-purifying']
  },
  {
    id: 'snake-plant',
    name: 'Snake Plant',
    botanicalName: 'Dracaena trifasciata',
    price: 28,
    image: '🌱',
    category: ['indoor', 'low-light', 'pet-friendly', 'easy-care'],
    light: 'low',
    watering: 'low',
    difficulty: 'beginner',
    description: 'Nearly indestructible and architecturally striking. Snake plants filter air while you sleep and thrive on neglect.',
    careInstructions: [
      'Water only when soil is completely dry',
      'Tolerates any light condition',
      'Avoid overwatering — root rot is the main killer',
      'Wipe leaves occasionally',
      'Rarely needs repotting'
    ],
    growingConditions: {
      temperature: '55-85°F (13-29°C)',
      humidity: 'Any level tolerated',
      soil: 'Cactus/succulent mix preferred',
      size: '1-4ft depending on variety'
    },
    seasonalTips: {
      spring: 'Check for pups (baby plants) to divide and share.',
      summer: 'Water every 2-3 weeks. Can move outdoors in shade.',
      autumn: 'Begin reducing water frequency.',
      winter: 'Water monthly at most. Keep in any light condition.'
    },
    tags: ['air-purifying', 'bedroom', 'neglect-tolerant', 'architectural']
  },
  {
    id: 'pothos',
    name: 'Golden Pothos',
    botanicalName: 'Epipremnum aureum',
    price: 18,
    image: '🍃',
    category: ['indoor', 'low-light', 'easy-care'],
    light: 'low',
    watering: 'medium',
    difficulty: 'beginner',
    description: 'The perfect trailing plant for beginners. Golden Pothos cascades beautifully from shelves and tolerates a wide range of conditions.',
    careInstructions: [
      'Water when top inch of soil is dry',
      'Leaves will droop when thirsty — great visual cue',
      'Trim leggy stems to encourage bushiness',
      'Propagate easily in water from cuttings',
      'Tolerates low light but variegation fades'
    ],
    growingConditions: {
      temperature: '60-85°F (15-29°C)',
      humidity: '40-60%',
      soil: 'Standard potting mix',
      size: 'Trails up to 10ft'
    },
    seasonalTips: {
      spring: 'Prune and propagate cuttings. Resume fertilizing.',
      summer: 'Growth peaks — trim to maintain shape.',
      autumn: 'Last chance for propagation before dormancy.',
      winter: 'Reduce watering. Move to brighter spot for winter.'
    },
    tags: ['trailing', 'propagation', 'shelf', 'beginner-favorite']
  },
  {
    id: 'fiddle-leaf-fig',
    name: 'Fiddle Leaf Fig',
    botanicalName: 'Ficus lyrata',
    price: 65,
    image: '🌳',
    category: ['indoor'],
    light: 'bright',
    watering: 'medium',
    difficulty: 'intermediate',
    description: 'The design-world darling with large, violin-shaped leaves. Demands consistent care but rewards with dramatic, sculptural beauty.',
    careInstructions: [
      'Water on a consistent schedule — same day each week',
      'Needs bright, indirect light (near south/west window)',
      'Do not move once settled — hates change',
      'Wipe leaves weekly for maximum light absorption',
      'Watch for brown spots indicating over/under watering'
    ],
    growingConditions: {
      temperature: '60-75°F (15-24°C)',
      humidity: '50-65%',
      soil: 'Well-draining indoor potting mix',
      size: 'Up to 10ft indoors'
    },
    seasonalTips: {
      spring: 'Best time for repotting. Expect new growth flushes.',
      summer: 'Monitor watering closely in heat. Rotate for even growth.',
      autumn: 'Reduce watering slightly. Watch for leaf drop from temperature changes.',
      winter: 'Supplemental grow light recommended. Avoid cold drafts.'
    },
    tags: ['statement', 'sculptural', 'designer-favorite', 'tropical']
  },
  {
    id: 'peace-lily',
    name: 'Peace Lily',
    botanicalName: 'Spathiphyllum wallisii',
    price: 32,
    image: '🤍',
    category: ['indoor', 'low-light'],
    light: 'low',
    watering: 'high',
    difficulty: 'beginner',
    description: 'Elegant white blooms rise above glossy dark leaves. One of the best flowering plants for low-light spaces and a natural air purifier.',
    careInstructions: [
      'Keep soil consistently moist but not waterlogged',
      'Dramatic wilting when thirsty — bounces back quickly after watering',
      'Tolerates low light but blooms more in medium light',
      'Mist leaves regularly for humidity',
      'Remove spent flowers at the base'
    ],
    growingConditions: {
      temperature: '65-80°F (18-27°C)',
      humidity: '50-60%',
      soil: 'Rich, well-draining potting mix',
      size: '1-4ft'
    },
    seasonalTips: {
      spring: 'Divide if overcrowded. Begin fertilizing monthly.',
      summer: 'Peak blooming season. Keep well-watered.',
      autumn: 'Reduce fertilizer. Continue regular watering.',
      winter: 'May rest from blooming — this is normal. Reduce water slightly.'
    },
    tags: ['flowering', 'air-purifying', 'office', 'elegant']
  },
  {
    id: 'spider-plant',
    name: 'Spider Plant',
    botanicalName: 'Chlorophytum comosum',
    price: 15,
    image: '🌾',
    category: ['indoor', 'pet-friendly', 'easy-care'],
    light: 'medium',
    watering: 'medium',
    difficulty: 'beginner',
    description: 'Cheerful arching leaves produce adorable baby plantlets. Completely safe for pets and one of NASA\'s top air-purifying plants.',
    careInstructions: [
      'Water when top inch of soil is dry',
      'Produce "spiderettes" that can be potted separately',
      'Brown leaf tips indicate fluoride in water — use filtered water',
      'Tolerates some direct morning sun',
      'Easy to divide and share with friends'
    ],
    growingConditions: {
      temperature: '55-80°F (13-27°C)',
      humidity: '40-60%',
      soil: 'Standard well-draining potting mix',
      size: '1-2ft wide, trails 2-3ft'
    },
    seasonalTips: {
      spring: 'Repot and divide crowded plants. Resume fertilizing.',
      summer: 'Produce most babies in summer. Pot up spiderettes.',
      autumn: 'Bring outdoor plants inside before frost.',
      winter: 'Reduce watering. Maintain in bright indirect light.'
    },
    tags: ['pet-safe', 'hanging', 'propagation', 'air-purifying']
  },
  {
    id: 'rubber-plant',
    name: 'Rubber Plant',
    botanicalName: 'Ficus elastica',
    price: 38,
    image: '🌿',
    category: ['indoor', 'low-light'],
    light: 'medium',
    watering: 'medium',
    difficulty: 'beginner',
    description: 'Bold, glossy leaves in deep green or burgundy. A robust ficus that makes a strong architectural statement without the fuss of its cousin, the Fiddle Leaf Fig.',
    careInstructions: [
      'Water when top 2 inches of soil are dry',
      'Wipe leaves monthly for shine and health',
      'Tolerates lower light than most ficus',
      'Prune to control height and encourage branching',
      'White sap is irritating — wear gloves when pruning'
    ],
    growingConditions: {
      temperature: '60-80°F (15-27°C)',
      humidity: '40-60%',
      soil: 'Well-draining potting mix',
      size: 'Up to 8ft indoors'
    },
    seasonalTips: {
      spring: 'Prune for shape. New growth emerges from cut points.',
      summer: 'Active growth period. Fertilize monthly.',
      autumn: 'Reduce watering as growth slows.',
      winter: 'Water sparingly. Keep away from heating vents.'
    },
    tags: ['architectural', 'glossy', 'burgundy', 'robust']
  },
  {
    id: 'calathea',
    name: 'Calathea Orbifolia',
    botanicalName: 'Calathea orbifolia',
    price: 42,
    image: '🌿',
    category: ['indoor', 'pet-friendly'],
    light: 'medium',
    watering: 'high',
    difficulty: 'intermediate',
    description: 'Stunning round leaves with silver-green stripes. Leaves fold up at night in a prayer-like motion. A living sculpture that demands humidity and attention.',
    careInstructions: [
      'Keep soil consistently moist — never fully dry',
      'Requires high humidity (60%+) or frequent misting',
      'Use filtered or rainwater — sensitive to chemicals',
      'Brown crispy edges indicate low humidity',
      'No direct sun — leaves will scorch'
    ],
    growingConditions: {
      temperature: '65-80°F (18-27°C)',
      humidity: '60-80%',
      soil: 'Peat-based mix with perlite',
      size: '2-3ft tall and wide'
    },
    seasonalTips: {
      spring: 'Increase humidity as temperatures rise. Resume fertilizing.',
      summer: 'Peak humidity needs. Group with other plants for microclimate.',
      autumn: 'Watch for edge browning as indoor heating starts.',
      winter: 'Use humidifier. Keep away from cold windows and heaters.'
    },
    tags: ['prayer-plant', 'striped', 'humidity-loving', 'pet-safe']
  },
  {
    id: 'zz-plant',
    name: 'ZZ Plant',
    botanicalName: 'Zamioculcas zamiifolia',
    price: 35,
    image: '✨',
    category: ['indoor', 'low-light', 'easy-care'],
    light: 'low',
    watering: 'low',
    difficulty: 'beginner',
    description: 'Glossy, coin-shaped leaves on upright stems. Thrives on neglect and low light. The perfect plant for offices, corners, and forgetful plant parents.',
    careInstructions: [
      'Water every 2-3 weeks — less is more',
      'Tolerates very low light conditions',
      'Yellow leaves = overwatering',
      'Rhizomes store water (like a potato underground)',
      'Slow grower — rarely needs repotting'
    ],
    growingConditions: {
      temperature: '60-75°F (15-24°C)',
      humidity: 'Any level tolerated',
      soil: 'Well-draining cactus/succulent mix',
      size: '2-3ft tall'
    },
    seasonalTips: {
      spring: 'May produce new shoots from soil level. Very slow growth.',
      summer: 'Water every 2 weeks. Can tolerate some indirect sun.',
      autumn: 'Reduce to monthly watering.',
      winter: 'Water every 3-4 weeks. Thrives on neglect.'
    },
    tags: ['indestructible', 'office', 'glossy', 'dark-corner']
  },
  {
    id: 'boston-fern',
    name: 'Boston Fern',
    botanicalName: 'Nephrolepis exaltata',
    price: 25,
    image: '🌿',
    category: ['indoor', 'pet-friendly'],
    light: 'medium',
    watering: 'high',
    difficulty: 'intermediate',
    description: 'Lush, cascading fronds that purify air and add lush greenery. A classic hanging plant that loves humidity and consistent moisture.',
    careInstructions: [
      'Keep soil consistently moist',
      'Mist daily or use a humidity tray',
      'Brown fronds indicate low humidity — remove them',
      'Hang in bright indirect light',
      'Soak pot in water if soil becomes very dry'
    ],
    growingConditions: {
      temperature: '60-75°F (15-24°C)',
      humidity: '60-80%',
      soil: 'Rich, peat-based potting mix',
      size: 'Trails 2-3ft'
    },
    seasonalTips: {
      spring: 'Trim old fronds. Resume fertilizing biweekly.',
      summer: 'Can hang outdoors in shade. Water frequently.',
      autumn: 'Bring inside before frost. Increase indoor humidity.',
      winter: 'Use humidifier. Keep away from heating vents.'
    },
    tags: ['hanging', 'lush', 'air-purifying', 'pet-safe']
  },
  {
    id: 'aloe-vera',
    name: 'Aloe Vera',
    botanicalName: 'Aloe barbadensis miller',
    price: 20,
    image: '🌵',
    category: ['easy-care'],
    light: 'bright',
    watering: 'low',
    difficulty: 'beginner',
    description: 'Medicinal succulent with healing gel inside its fleshy leaves. Loves bright sun and forgetful watering. A kitchen essential for minor burns.',
    careInstructions: [
      'Water deeply but infrequently — every 3 weeks',
      'Needs bright direct or very bright indirect light',
      'Ensure excellent drainage — no standing water',
      'Pups form around base — divide and share',
      'Gel from leaves can soothe minor burns'
    ],
    growingConditions: {
      temperature: '55-80°F (13-27°C)',
      humidity: 'Low — prefers dry air',
      soil: 'Cactus/succulent mix with extra perlite',
      size: '1-2ft tall and wide'
    },
    seasonalTips: {
      spring: 'Repot pups. Move to sunniest window.',
      summer: 'Can live outdoors in full sun. Water every 2 weeks.',
      autumn: 'Bring inside before temperatures drop below 50°F.',
      winter: 'Water monthly. Keep in brightest possible spot.'
    },
    tags: ['medicinal', 'kitchen', 'succulent', 'sun-loving']
  },
  {
    id: 'philodendron',
    name: 'Heartleaf Philodendron',
    botanicalName: 'Philodendron hederaceum',
    price: 22,
    image: '💚',
    category: ['indoor', 'low-light', 'easy-care'],
    light: 'low',
    watering: 'medium',
    difficulty: 'beginner',
    description: 'Heart-shaped leaves trail gracefully from shelves and hanging planters. Often confused with pothos but with softer, matte leaves and different care needs.',
    careInstructions: [
      'Water when top inch of soil is dry',
      'Tolerates lower light than pothos',
      'Prune to encourage bushier growth',
      'Easy to propagate from stem cuttings',
      'Yellow leaves may indicate overwatering'
    ],
    growingConditions: {
      temperature: '65-85°F (18-29°C)',
      humidity: '40-60%',
      soil: 'Well-draining potting mix',
      size: 'Trails 3-4ft'
    },
    seasonalTips: {
      spring: 'Prune and propagate. Resume monthly fertilizing.',
      summer: 'Active growth — trim to shape. Water consistently.',
      autumn: 'Last propagation window. Reduce fertilizer.',
      winter: 'Water less. Keep in moderate light.'
    },
    tags: ['trailing', 'heart-shaped', 'easy', 'classic']
  }
];

export const categories = [
  { id: 'all', name: 'All Plants', icon: '🌱' },
  { id: 'indoor', name: 'Indoor Plants', icon: '🏠' },
  { id: 'low-light', name: 'Low Light', icon: '🌙' },
  { id: 'pet-friendly', name: 'Pet Friendly', icon: '🐾' },
  { id: 'easy-care', name: 'Easy Care', icon: '✨' }
];

export const lightOptions = [
  { value: 'low', label: 'Low Light', description: 'North-facing windows, shaded corners' },
  { value: 'medium', label: 'Medium Light', description: 'East-facing windows, bright rooms' },
  { value: 'bright', label: 'Bright Light', description: 'South/west windows, direct sun nearby' }
];

export const wateringOptions = [
  { value: 'low', label: 'Low', description: 'Every 2-3 weeks' },
  { value: 'medium', label: 'Medium', description: 'Weekly' },
  { value: 'high', label: 'High', description: '2-3 times per week' }
];

export const difficultyOptions = [
  { value: 'beginner', label: 'Beginner', description: 'Forgiving and resilient' },
  { value: 'intermediate', label: 'Intermediate', description: 'Needs some attention' },
  { value: 'advanced', label: 'Advanced', description: 'Requires experience' }
];
