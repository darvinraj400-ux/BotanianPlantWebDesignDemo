import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, X, Plus, Minus, ChevronRight, Leaf, Sun, Droplets, Star, ArrowLeft, Menu, Search, Filter } from 'lucide-react';
import { plants, categories, Plant, lightOptions, wateringOptions, difficultyOptions } from './data/plants';
import { useStore } from './hooks/useStore';

// Store context
const StoreContext = createContext<ReturnType<typeof useStore> | null>(null);
function useStoreContext() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('StoreContext missing');
  return ctx;
}

// ============ BOTANICAL DIVIDER ============
function BotanicalDivider({ variant = 'leaf' }: { variant?: 'leaf' | 'vine' | 'dots' }) {
  if (variant === 'vine') {
    return (
      <div className="section-divider" aria-hidden="true">
        <svg width="200" height="24" viewBox="0 0 200 24" className="text-sage-300">
          <path d="M0 12 Q50 0 100 12 Q150 24 200 12" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="6" r="3" fill="currentColor" opacity="0.5" />
          <circle cx="100" cy="12" r="3" fill="currentColor" opacity="0.7" />
          <circle cx="150" cy="18" r="3" fill="currentColor" opacity="0.5" />
        </svg>
      </div>
    );
  }
  if (variant === 'dots') {
    return (
      <div className="section-divider" aria-hidden="true">
        <span className="w-1.5 h-1.5 rounded-full bg-sage-300" />
        <span className="w-2 h-2 rounded-full bg-sage-400" />
        <Leaf className="w-5 h-5 text-sage-400" />
        <span className="w-2 h-2 rounded-full bg-sage-400" />
        <span className="w-1.5 h-1.5 rounded-full bg-sage-300" />
      </div>
    );
  }
  return (
    <div className="section-divider" aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-sage-200" />
      <Leaf className="w-5 h-5 text-sage-400" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-sage-200" />
    </div>
  );
}

// ============ NAVIGATION ============
function Navigation({ activeSection, setActiveSection }: { activeSection: string; setActiveSection: (s: string) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useStoreContext();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'catalog', label: 'Shop' },
    { id: 'care-guide', label: 'Care Guide' },
    { id: 'questionnaire', label: 'Plant Match' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-50/90 backdrop-blur-md border-b border-cream-200" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <button
            onClick={() => setActiveSection('home')}
            className="flex items-center gap-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-sage-300 rounded-lg px-2"
            aria-label="Fern & Fable home"
          >
            <Leaf className="w-6 h-6 text-sage-600" />
            <span className="font-display text-lg sm:text-xl font-semibold text-earth-800">Fern & Fable</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-4 py-2 rounded-full font-sans text-sm transition-all duration-200 min-h-[44px]
                  ${activeSection === item.id
                    ? 'bg-sage-100 text-sage-700 font-medium'
                    : 'text-earth-600 hover:bg-cream-200'
                  }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => setActiveSection('favorites')}
              className={`px-4 py-2 rounded-full font-sans text-sm transition-all duration-200 min-h-[44px]
                ${activeSection === 'favorites'
                  ? 'bg-sage-100 text-sage-700 font-medium'
                  : 'text-earth-600 hover:bg-cream-200'
                }`}
            >
              <Heart className="w-4 h-4 inline-block mr-1" />
              Favorites
            </button>
          </div>

          {/* Cart + Mobile menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSection('basket')}
              className="relative p-2 rounded-full hover:bg-cream-200 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-sage-300"
              aria-label={`Shopping basket with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5 text-earth-700" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-sage-600 text-white text-xs font-sans font-medium rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-full hover:bg-cream-200 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-sage-300"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-cream-200 bg-cream-50 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveSection(item.id); setMobileOpen(false); }}
                  className={`block w-full text-left px-4 py-3 rounded-xl font-sans text-sm transition-all min-h-[44px]
                    ${activeSection === item.id
                      ? 'bg-sage-100 text-sage-700 font-medium'
                      : 'text-earth-600 hover:bg-cream-200'
                    }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => { setActiveSection('favorites'); setMobileOpen(false); }}
                className="block w-full text-left px-4 py-3 rounded-xl font-sans text-sm text-earth-600 hover:bg-cream-200 transition-all min-h-[44px]"
              >
                Favorites
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ============ HERO SECTION ============
function HeroSection({ onShopNow }: { onShopNow: () => void }) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background botanical pattern */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leaves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 10 Q60 25 50 50 Q40 25 50 10Z" fill="currentColor" className="text-sage-700" />
              <path d="M15 60 Q25 70 15 85 Q5 70 15 60Z" fill="currentColor" className="text-sage-700" />
              <path d="M75 65 Q85 75 75 90 Q65 75 75 65Z" fill="currentColor" className="text-sage-700" />
              <circle cx="30" cy="30" r="1.5" fill="currentColor" className="text-sage-600" />
              <circle cx="80" cy="40" r="1" fill="currentColor" className="text-sage-600" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaves)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="font-sans text-xs sm:text-sm tracking-widest text-sage-600 uppercase mb-4 block"
            >
              ✦ Botanical Lifestyle ✦
            </motion.span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-earth-900 leading-[1.1] mb-6">
              Bring the
              <span className="block text-sage-600 italic">outside in</span>
            </h1>
            <p className="font-sans text-sm sm:text-base lg:text-lg text-earth-600 leading-relaxed mb-8 max-w-lg">
              Curated houseplants for every space and skill level. From sun-loving statement pieces to shade-tolerant companions — find your perfect green match and learn how to help it thrive.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={onShopNow} className="btn-primary">
                Shop Plants
              </button>
              <button
                onClick={() => document.getElementById('questionnaire')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary"
              >
                Find Your Match
              </button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-6 sm:gap-8 mt-10 pt-8 border-t border-cream-200"
            >
              {[
                { num: '12+', label: 'Plant varieties' },
                { num: '4', label: 'Care categories' },
                { num: '100%', label: 'Plant love' },
              ].map(stat => (
                <div key={stat.label}>
                  <span className="font-display text-xl sm:text-2xl font-bold text-sage-700 block">{stat.num}</span>
                  <span className="font-sans text-[11px] sm:text-xs text-earth-500">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full bg-gradient-to-br from-sage-100 via-moss-50 to-cream-200 flex items-center justify-center shadow-inner">
                <motion.span
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-7xl sm:text-8xl lg:text-9xl"
                >
                  🌿
                </motion.span>
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cream-100 flex items-center justify-center shadow-sm border border-cream-200"
              >
                <span className="text-2xl sm:text-3xl">🌱</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-2 -left-4 sm:-bottom-2 sm:-left-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sage-50 flex items-center justify-center shadow-sm border border-sage-100"
              >
                <span className="text-xl sm:text-2xl">🍃</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute top-1/2 -right-6 sm:-right-8 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-moss-50 flex items-center justify-center shadow-sm border border-moss-100"
              >
                <span className="text-lg sm:text-xl">🪴</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============ PLANT CARD ============
function PlantCard({ plant, onView, index }: { plant: Plant; onView: (p: Plant) => void; index: number }) {
  const { toggleFavorite, isFavorite, addToCart } = useStoreContext();
  const fav = isFavorite(plant.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card-plant group"
    >
      {/* Image area */}
      <div className="relative aspect-square bg-gradient-to-br from-sage-50 to-cream-100 flex items-center justify-center overflow-hidden">
        <span className="text-6xl sm:text-7xl group-hover:scale-110 transition-transform duration-500">
          {plant.image}
        </span>
        {/* Favorite button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(plant.id); }}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-sage-300"
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 transition-colors ${fav ? 'fill-red-400 text-red-400' : 'text-earth-400'}`} />
        </button>
        {/* Difficulty badge */}
        <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-[10px] font-sans font-medium
          ${plant.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
            plant.difficulty === 'intermediate' ? 'bg-amber-100 text-amber-700' :
            'bg-red-100 text-red-700'}`}>
          {plant.difficulty}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="font-display text-base sm:text-lg font-semibold text-earth-800 mb-1 truncate">{plant.name}</h3>
        <p className="font-sans text-xs text-earth-500 italic mb-3">{plant.botanicalName}</p>

        {/* Quick info */}
        <div className="flex items-center gap-3 mb-4 text-xs font-sans text-earth-500">
          <span className="flex items-center gap-1" title="Light">
            <Sun className="w-3.5 h-3.5" />
            {plant.light}
          </span>
          <span className="flex items-center gap-1" title="Water">
            <Droplets className="w-3.5 h-3.5" />
            {plant.watering}
          </span>
        </div>

        {/* Price + Actions */}
        <div className="flex items-center justify-between">
          <span className="font-sans text-lg font-semibold text-sage-700">${plant.price}</span>
          <div className="flex gap-2">
            <button
              onClick={() => addToCart(plant)}
              className="w-10 h-10 rounded-full bg-sage-600 text-white flex items-center justify-center hover:bg-sage-700 active:scale-90 transition-all focus:outline-none focus:ring-2 focus:ring-sage-400"
              aria-label={`Add ${plant.name} to cart`}
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => onView(plant)}
              className="px-4 h-10 rounded-full border border-sage-200 text-sage-700 font-sans text-xs hover:bg-sage-50 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-sage-300"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ============ PLANT MODAL ============
function PlantModal({ plant, onClose }: { plant: Plant; onClose: () => void }) {
  const { addToCart, toggleFavorite, isFavorite } = useStoreContext();
  const fav = isFavorite(plant.id);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    modalRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${plant.name} details`}
    >
      <div className="absolute inset-0 bg-earth-900/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        ref={modalRef}
        tabIndex={-1}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full sm:max-w-2xl max-h-[90vh] bg-cream-50 rounded-t-3xl sm:rounded-3xl overflow-y-auto shadow-2xl focus:outline-none"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-sage-300"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <div className="aspect-[4/3] bg-gradient-to-br from-sage-50 to-moss-100 flex items-center justify-center">
          <span className="text-8xl sm:text-9xl">{plant.image}</span>
        </div>

        <div className="p-5 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-earth-900">{plant.name}</h2>
              <p className="font-sans text-sm text-earth-500 italic">{plant.botanicalName}</p>
            </div>
            <button
              onClick={() => toggleFavorite(plant.id)}
              className="w-11 h-11 rounded-full border border-cream-300 flex items-center justify-center hover:bg-cream-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-300"
              aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-5 h-5 ${fav ? 'fill-red-400 text-red-400' : 'text-earth-400'}`} />
            </button>
          </div>

          <p className="font-sans text-sm text-earth-600 leading-relaxed mb-6">{plant.description}</p>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-sage-50 rounded-2xl p-3 text-center">
              <Sun className="w-5 h-5 text-sage-600 mx-auto mb-1" />
              <span className="font-sans text-xs text-earth-600 block capitalize">{plant.light} light</span>
            </div>
            <div className="bg-sage-50 rounded-2xl p-3 text-center">
              <Droplets className="w-5 h-5 text-sage-600 mx-auto mb-1" />
              <span className="font-sans text-xs text-earth-600 block capitalize">{plant.watering} water</span>
            </div>
            <div className="bg-sage-50 rounded-2xl p-3 text-center">
              <Star className="w-5 h-5 text-sage-600 mx-auto mb-1" />
              <span className="font-sans text-xs text-earth-600 block capitalize">{plant.difficulty}</span>
            </div>
          </div>

          {/* Care instructions */}
          <div className="mb-6">
            <h3 className="font-display text-lg font-semibold text-earth-800 mb-3">Care Instructions</h3>
            <ul className="space-y-2">
              {plant.careInstructions.map((instruction, i) => (
                <li key={i} className="flex items-start gap-2 font-sans text-sm text-earth-600">
                  <Leaf className="w-4 h-4 text-sage-400 mt-0.5 flex-shrink-0" />
                  {instruction}
                </li>
              ))}
            </ul>
          </div>

          {/* Growing conditions */}
          <div className="mb-6">
            <h3 className="font-display text-lg font-semibold text-earth-800 mb-3">Growing Conditions</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(plant.growingConditions).map(([key, value]) => (
                <div key={key} className="bg-cream-100 rounded-xl p-3">
                  <span className="font-sans text-[10px] uppercase tracking-wider text-earth-400 block mb-1">{key}</span>
                  <span className="font-sans text-xs text-earth-700">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {plant.tags.map(tag => (
              <span key={tag} className="badge">{tag}</span>
            ))}
          </div>

          {/* Add to cart */}
          <div className="flex items-center justify-between pt-4 border-t border-cream-200">
            <span className="font-display text-2xl font-bold text-sage-700">${plant.price}</span>
            <button
              onClick={() => { addToCart(plant); onClose(); }}
              className="btn-primary"
            >
              Add to Basket
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============ CATALOG SECTION ============
function CatalogSection({ onViewPlant }: { onViewPlant: (p: Plant) => void }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightFilter, setLightFilter] = useState<string>('');
  const [waterFilter, setWaterFilter] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPlants = plants.filter(plant => {
    if (activeCategory !== 'all' && !plant.category.includes(activeCategory as any)) return false;
    if (lightFilter && plant.light !== lightFilter) return false;
    if (waterFilter && plant.watering !== waterFilter) return false;
    if (difficultyFilter && plant.difficulty !== difficultyFilter) return false;
    return true;
  });

  const hasActiveFilters = lightFilter || waterFilter || difficultyFilter;

  const clearFilters = () => {
    setLightFilter('');
    setWaterFilter('');
    setDifficultyFilter('');
  };

  return (
    <section id="catalog" className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-earth-900 mb-3">Our Collection</h2>
          <p className="font-sans text-earth-500 max-w-md mx-auto">Handpicked plants for every corner of your home</p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center" role="tablist">
          {categories.map(cat => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full font-sans text-sm whitespace-nowrap transition-all min-h-[44px]
                ${activeCategory === cat.id
                  ? 'bg-sage-600 text-white shadow-sm'
                  : 'bg-white border border-cream-200 text-earth-600 hover:border-sage-300'
                }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Filter toggle */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-sans text-sm text-earth-500">{filteredPlants.length} plants</span>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-cream-200 font-sans text-sm text-earth-600 hover:bg-cream-100 transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-sage-300"
            aria-expanded={showFilters}
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-sage-500" />}
          </button>
        </div>

        {/* Filters panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white rounded-2xl border border-cream-200 p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Light filter */}
                  <div>
                    <label className="font-sans text-xs font-medium text-earth-500 uppercase tracking-wider mb-2 block">Light</label>
                    <select
                      value={lightFilter}
                      onChange={e => setLightFilter(e.target.value)}
                      className="input-field"
                      aria-label="Filter by light requirement"
                    >
                      <option value="">Any light</option>
                      {lightOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  {/* Water filter */}
                  <div>
                    <label className="font-sans text-xs font-medium text-earth-500 uppercase tracking-wider mb-2 block">Watering</label>
                    <select
                      value={waterFilter}
                      onChange={e => setWaterFilter(e.target.value)}
                      className="input-field"
                      aria-label="Filter by watering frequency"
                    >
                      <option value="">Any watering</option>
                      {wateringOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  {/* Difficulty filter */}
                  <div>
                    <label className="font-sans text-xs font-medium text-earth-500 uppercase tracking-wider mb-2 block">Difficulty</label>
                    <select
                      value={difficultyFilter}
                      onChange={e => setDifficultyFilter(e.target.value)}
                      className="input-field"
                      aria-label="Filter by difficulty"
                    >
                      <option value="">Any difficulty</option>
                      {difficultyOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="btn-ghost text-sm">
                    Clear all filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Plant grid */}
        {filteredPlants.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredPlants.map((plant, i) => (
              <PlantCard key={plant.id} plant={plant} onView={onViewPlant} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 px-4"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-cream-100 flex items-center justify-center">
              <Leaf className="w-8 h-8 text-sage-300" />
            </div>
            <h3 className="font-display text-xl font-semibold text-earth-700 mb-2">No plants match your filters</h3>
            <p className="font-sans text-sm text-earth-500 mb-6 max-w-sm mx-auto">
              Try adjusting your category or filter selections to discover more plants in our collection.
            </p>
            <button onClick={() => { setActiveCategory('all'); clearFilters(); }} className="btn-primary">
              View All Plants
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ============ CARE GUIDE ============
function CareGuideSection() {
  const [activeSeason, setActiveSeason] = useState<'spring' | 'summer' | 'autumn' | 'winter'>('spring');

  const seasons = {
    spring: {
      icon: '🌸',
      title: 'Spring',
      subtitle: 'Growth & Renewal',
      tips: [
        'Begin fertilizing as plants enter active growth',
        'Repot rootbound plants into slightly larger containers',
        'Prune dead or leggy growth to encourage new shoots',
        'Increase watering frequency as days lengthen',
        'Take cuttings and propagate — spring is ideal for rooting',
        'Clean windows to maximize natural light for your plants',
        'Check for pests that emerge with warmer weather'
      ]
    },
    summer: {
      icon: '☀️',
      title: 'Summer',
      subtitle: 'Peak Growth',
      tips: [
        'Monitor watering closely — plants drink more in heat',
        'Move sensitive plants away from harsh afternoon sun',
        'Group plants together to create humid microclimates',
        'Rotate plants quarterly for even, balanced growth',
        'Watch for signs of heat stress: wilting, crispy edges',
        'Some plants can vacation outdoors in dappled shade',
        'Mist tropical plants more frequently in dry heat'
      ]
    },
    autumn: {
      icon: '🍂',
      title: 'Autumn',
      subtitle: 'Preparing for Rest',
      tips: [
        'Gradually reduce fertilizing as growth slows',
        'Bring outdoor plants inside before first frost',
        'Reduce watering frequency as light decreases',
        'Clean leaves to maximize limited autumn light',
        'Check plants for pests before bringing them indoors',
        'Last chance to propagate before dormancy',
        'Adjust plant positions as sun angle changes'
      ]
    },
    winter: {
      icon: '❄️',
      title: 'Winter',
      subtitle: 'Rest & Recovery',
      tips: [
        'Most plants are dormant — water significantly less',
        'Keep plants away from cold drafts and heating vents',
        'Use grow lights for plants in dark corners',
        'Increase humidity to combat dry indoor air',
        'Avoid repotting or fertilizing during dormancy',
        'Dust leaves regularly to maximize light absorption',
        'Resist overwatering — root rot is most common in winter'
      ]
    }
  };

  const currentSeason = seasons[activeSeason];

  return (
    <section id="care-guide" className="py-12 sm:py-20 bg-gradient-to-b from-cream-50 to-sage-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-earth-900 mb-3">Seasonal Care Guide</h2>
          <p className="font-sans text-earth-500 max-w-md mx-auto">Your plants' needs change with the seasons. Here's how to care for them year-round.</p>
        </motion.div>

        {/* Season tabs */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-8">
          {(Object.keys(seasons) as Array<keyof typeof seasons>).map(season => (
            <button
              key={season}
              onClick={() => setActiveSeason(season)}
              className={`flex flex-col items-center gap-1 px-4 sm:px-6 py-3 rounded-2xl transition-all min-h-[60px] min-w-[60px]
                ${activeSeason === season
                  ? 'bg-white shadow-md border border-sage-200'
                  : 'hover:bg-white/50'
                }`}
              aria-label={`${seasons[season].title} care tips`}
            >
              <span className="text-2xl">{seasons[season].icon}</span>
              <span className={`font-sans text-xs ${activeSeason === season ? 'text-sage-700 font-medium' : 'text-earth-500'}`}>
                {seasons[season].title}
              </span>
            </button>
          ))}
        </div>

        {/* Season content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSeason}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{currentSeason.icon}</span>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-earth-800">{currentSeason.title}</h3>
                  <p className="font-sans text-sm text-earth-500">{currentSeason.subtitle}</p>
                </div>
              </div>
              <ul className="space-y-3">
                {currentSeason.tips.map((tip, i) => (
                  <motion.li
                    key={tip}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 font-sans text-sm text-earth-600"
                  >
                    <span className="w-6 h-6 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sage-600 text-xs font-medium">{i + 1}</span>
                    </span>
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>

        <BotanicalDivider variant="vine" />

        {/* General tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="font-display text-xl sm:text-2xl font-bold text-earth-800 text-center mb-6">Universal Plant Wisdom</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: '💧', title: 'Water Wisely', text: 'Most houseplants die from overwatering, not underwatering. When in doubt, wait a day.' },
              { icon: '🌤️', title: 'Know Your Light', text: 'Observe how light moves through your space throughout the day before choosing plant positions.' },
              { icon: '🌡️', title: 'Avoid Drafts', text: 'Keep plants away from AC vents, heaters, and frequently opened doors.' },
              { icon: '🪴', title: 'Right-Size Pots', text: 'A pot only 1-2 inches larger than the root ball is ideal. Too large = waterlogged soil.' },
            ].map(tip => (
              <div key={tip.title} className="bg-white rounded-2xl border border-cream-200 p-5">
                <span className="text-2xl mb-2 block">{tip.icon}</span>
                <h4 className="font-display text-base font-semibold text-earth-800 mb-1">{tip.title}</h4>
                <p className="font-sans text-sm text-earth-500 leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ QUESTIONNAIRE ============
function QuestionnaireSection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    light: '',
    time: '',
    experience: '',
    pets: '',
    purpose: ''
  });
  const [results, setResults] = useState<Plant[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      key: 'light',
      question: 'How much natural light does your space get?',
      options: [
        { value: 'low', label: 'Low Light', desc: 'North-facing or shaded rooms', icon: '🌙' },
        { value: 'medium', label: 'Medium Light', desc: 'East-facing or bright rooms', icon: '🌤️' },
        { value: 'bright', label: 'Bright Light', desc: 'South/west-facing, sunny spots', icon: '☀️' }
      ]
    },
    {
      key: 'time',
      question: 'How much time can you dedicate to plant care?',
      options: [
        { value: 'minimal', label: 'Minimal', desc: 'I might forget to water', icon: '⏰' },
        { value: 'moderate', label: 'Moderate', desc: 'Weekly check-ins work for me', icon: '📅' },
        { value: 'dedicated', label: 'Dedicated', desc: 'I enjoy regular plant care', icon: '💚' }
      ]
    },
    {
      key: 'experience',
      question: 'What\'s your plant experience level?',
      options: [
        { value: 'beginner', label: 'Beginner', desc: 'First plant or killed a cactus', icon: '🌱' },
        { value: 'intermediate', label: 'Intermediate', desc: 'I keep a few alive happily', icon: '🌿' },
        { value: 'advanced', label: 'Advanced', desc: 'I have a whole jungle', icon: '🌳' }
      ]
    },
    {
      key: 'pets',
      question: 'Do you have pets that might nibble on plants?',
      options: [
        { value: 'yes', label: 'Yes', desc: 'Need pet-safe plants only', icon: '🐾' },
        { value: 'no', label: 'No', desc: 'Any plant is fine', icon: '🏠' },
        { value: 'unsure', label: 'Not sure', desc: 'Better safe than sorry', icon: '🤔' }
      ]
    },
    {
      key: 'purpose',
      question: 'What\'s your main goal for this plant?',
      options: [
        { value: 'decor', label: 'Decoration', desc: 'A beautiful statement piece', icon: '🎨' },
        { value: 'air', label: 'Air Quality', desc: 'Purify my living space', icon: '💨' },
        { value: 'relax', label: 'Relaxation', desc: 'Bring calm and nature inside', icon: '🧘' }
      ]
    }
  ];

  const calculateResults = () => {
    let scored = plants.map(plant => {
      let score = 0;

      // Light match
      if (answers.light === plant.light) score += 3;
      else if (
        (answers.light === 'medium' && (plant.light === 'low' || plant.light === 'bright')) ||
        (answers.light === 'low' && plant.light === 'medium')
      ) score += 1;

      // Time/experience → difficulty match
      if (answers.time === 'minimal' && plant.difficulty === 'beginner') score += 3;
      else if (answers.time === 'minimal' && plant.watering === 'low') score += 2;
      else if (answers.time === 'moderate' && (plant.difficulty === 'beginner' || plant.difficulty === 'intermediate')) score += 2;
      else if (answers.time === 'dedicated') score += 1;

      // Experience
      if (answers.experience === 'beginner' && plant.difficulty === 'beginner') score += 3;
      else if (answers.experience === 'intermediate' && plant.difficulty !== 'advanced') score += 2;
      else if (answers.experience === 'advanced') score += 1;

      // Pets
      if ((answers.pets === 'yes' || answers.pets === 'unsure') && plant.category.includes('pet-friendly')) score += 3;
      if (answers.pets === 'yes' && !plant.category.includes('pet-friendly')) score -= 5;

      // Purpose
      if (answers.purpose === 'air' && plant.tags.includes('air-purifying')) score += 2;
      if (answers.purpose === 'decor' && plant.tags.includes('statement')) score += 2;
      if (answers.purpose === 'decor' && plant.tags.includes('architectural')) score += 2;
      if (answers.purpose === 'relax' && plant.category.includes('easy-care')) score += 1;

      return { plant, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 4).filter(s => s.score > 0).map(s => s.plant);
  };

  const handleSubmit = () => {
    const recs = calculateResults();
    setResults(recs);
    setShowResults(true);
  };

  const reset = () => {
    setStep(0);
    setAnswers({ light: '', time: '', experience: '', pets: '', purpose: '' });
    setShowResults(false);
    setResults([]);
  };

  const currentQ = questions[step];
  const canProceed = currentQ && answers[currentQ.key as keyof typeof answers] !== '';

  if (showResults) {
    return (
      <section id="questionnaire" className="py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <span className="text-4xl mb-4 block">🌱</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-earth-900 mb-3">Your Perfect Matches</h2>
            <p className="font-sans text-earth-500">Based on your space and lifestyle, here are our top recommendations</p>
          </motion.div>

          {results.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
              {results.map((plant, i) => (
                <motion.div
                  key={plant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card-plant p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-sage-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">{plant.image}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-base font-semibold text-earth-800 truncate">{plant.name}</h3>
                      <p className="font-sans text-xs text-earth-500 italic truncate">{plant.botanicalName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-sans text-sage-600 capitalize">{plant.difficulty}</span>
                        <span className="text-earth-300">•</span>
                        <span className="text-xs font-sans text-earth-500 capitalize">{plant.light} light</span>
                      </div>
                    </div>
                    <span className="font-sans text-lg font-semibold text-sage-700">${plant.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-cream-200">
              <span className="text-4xl mb-4 block">🔍</span>
              <h3 className="font-display text-xl font-semibold text-earth-700 mb-2">No perfect matches found</h3>
              <p className="font-sans text-sm text-earth-500 mb-4">Try adjusting your answers — even partial matches can work with a little extra care!</p>
            </div>
          )}

          <div className="text-center">
            <button onClick={reset} className="btn-secondary">
              Retake Quiz
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="questionnaire" className="py-12 sm:py-20 bg-gradient-to-b from-sage-50/30 to-cream-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-earth-900 mb-3">Find Your Plant Match</h2>
          <p className="font-sans text-earth-500">Answer a few questions and we'll recommend the perfect plants for your space</p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-sans text-xs text-earth-500">Question {step + 1} of {questions.length}</span>
            <span className="font-sans text-xs text-sage-600">{Math.round(((step) / questions.length) * 100)}% complete</span>
          </div>
          <div className="h-2 bg-cream-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-sage-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-earth-800 mb-6 text-center">
              {currentQ.question}
            </h3>

            <div className="space-y-3 mb-8">
              {currentQ.options.map(option => (
                <button
                  key={option.value}
                  onClick={() => setAnswers(prev => ({ ...prev, [currentQ.key]: option.value }))}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left min-h-[60px]
                    ${answers[currentQ.key as keyof typeof answers] === option.value
                      ? 'border-sage-500 bg-sage-50'
                      : 'border-cream-200 bg-white hover:border-sage-200'
                    }`}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <div>
                    <span className="font-sans text-sm font-medium text-earth-800 block">{option.label}</span>
                    <span className="font-sans text-xs text-earth-500">{option.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="btn-ghost flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {step < questions.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed}
              className="btn-primary flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed}
              className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              See My Matches
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

// ============ BASKET ============
function BasketSection() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartSubtotal } = useStoreContext();

  if (cart.length === 0) {
    return (
      <section className="py-12 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-cream-100 flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-sage-300" />
            </div>
            <h2 className="font-display text-2xl font-bold text-earth-800 mb-3">Your basket is empty</h2>
            <p className="font-sans text-sm text-earth-500 mb-6">Browse our collection and add some green friends to your home.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display text-3xl font-bold text-earth-900 mb-8">Your Basket</h2>

          <div className="space-y-4 mb-8">
            <AnimatePresence>
              {cart.map(item => (
                <motion.div
                  key={item.plant.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex items-center gap-4 bg-white rounded-2xl border border-cream-200 p-4"
                >
                  <div className="w-14 h-14 rounded-xl bg-sage-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{item.plant.image}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-sm font-semibold text-earth-800 truncate">{item.plant.name}</h3>
                    <p className="font-sans text-xs text-earth-500">${item.plant.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.plant.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-cream-300 flex items-center justify-center hover:bg-cream-100 transition-colors min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-sage-300"
                      aria-label={`Decrease quantity of ${item.plant.name}`}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-sans text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.plant.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-cream-300 flex items-center justify-center hover:bg-cream-100 transition-colors min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-sage-300"
                      aria-label={`Increase quantity of ${item.plant.name}`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-right">
                    <span className="font-sans text-sm font-semibold text-sage-700">${item.plant.price * item.quantity}</span>
                    <button
                      onClick={() => removeFromCart(item.plant.id)}
                      className="block text-xs text-earth-400 hover:text-red-500 transition-colors mt-1 min-h-[44px] flex items-center justify-end w-full"
                      aria-label={`Remove ${item.plant.name} from basket`}
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl border border-cream-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-sans text-earth-600">Subtotal</span>
              <span className="font-display text-2xl font-bold text-sage-700">${cartSubtotal.toFixed(2)}</span>
            </div>
            <p className="font-sans text-xs text-earth-400 mb-4">Shipping and taxes calculated at checkout</p>
            <button className="btn-primary w-full text-center justify-center">
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="btn-ghost w-full text-center mt-2"
            >
              Clear Basket
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ FAVORITES ============
function FavoritesSection({ onViewPlant }: { onViewPlant: (p: Plant) => void }) {
  const { favorites } = useStoreContext();
  const favoritePlants = plants.filter(p => favorites.includes(p.id));

  if (favoritePlants.length === 0) {
    return (
      <section className="py-12 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-cream-100 flex items-center justify-center">
              <Heart className="w-10 h-10 text-sage-300" />
            </div>
            <h2 className="font-display text-2xl font-bold text-earth-800 mb-3">No favorites yet</h2>
            <p className="font-sans text-sm text-earth-500">Tap the heart icon on any plant to save it here for later.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display text-3xl font-bold text-earth-900 mb-8">Your Favorites</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {favoritePlants.map((plant, i) => (
              <PlantCard key={plant.id} plant={plant} onView={onViewPlant} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="bg-earth-800 text-cream-200 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-5 h-5 text-sage-400" />
              <span className="font-display text-lg font-semibold text-cream-100">Fern & Fable</span>
            </div>
            <p className="font-sans text-sm text-earth-300 leading-relaxed">
              Curated houseplants and botanical wisdom for modern living. Every plant tells a story.
            </p>
          </div>
          <div>
            <h4 className="font-sans text-xs uppercase tracking-wider text-earth-400 mb-4">Shop</h4>
            <ul className="space-y-2 font-sans text-sm text-earth-300">
              <li>All Plants</li>
              <li>Indoor Plants</li>
              <li>Low Light</li>
              <li>Pet Friendly</li>
              <li>Easy Care</li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-xs uppercase tracking-wider text-earth-400 mb-4">Learn</h4>
            <ul className="space-y-2 font-sans text-sm text-earth-300">
              <li>Care Guide</li>
              <li>Plant Match Quiz</li>
              <li>Beginner Tips</li>
              <li>Seasonal Advice</li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-xs uppercase tracking-wider text-earth-400 mb-4">Connect</h4>
            <ul className="space-y-2 font-sans text-sm text-earth-300">
              <li>Instagram</li>
              <li>Pinterest</li>
              <li>Newsletter</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-earth-700 pt-8 text-center">
          <p className="font-sans text-xs text-earth-400">© 2026 Fern & Fable. All rights reserved. Made with 🌿 and care.</p>
        </div>
      </div>
    </footer>
  );
}

// ============ MAIN APP ============
export default function App() {
  const store = useStore();
  const [activeSection, setActiveSection] = useState('home');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <StoreContext.Provider value={store}>
      <div className="min-h-screen bg-cream-50">
        <Navigation activeSection={activeSection} setActiveSection={scrollToSection} />

        <main className="pt-16 sm:pt-18">
          {activeSection === 'home' && (
            <>
              <HeroSection onShopNow={() => scrollToSection('catalog')} />
              <BotanicalDivider variant="dots" />
              {/* Featured categories */}
              <section className="py-8 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {[
                      { icon: '🏠', title: 'Indoor Plants', desc: 'Thrives inside your home', cat: 'indoor' },
                      { icon: '🌙', title: 'Low Light', desc: 'Perfect for shaded rooms', cat: 'low-light' },
                      { icon: '🐾', title: 'Pet Friendly', desc: 'Safe for furry friends', cat: 'pet-friendly' },
                      { icon: '✨', title: 'Easy Care', desc: 'Forgiving & resilient', cat: 'easy-care' },
                    ].map((item, i) => (
                      <motion.button
                        key={item.cat}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => scrollToSection('catalog')}
                        className="bg-white rounded-2xl border border-cream-200 p-4 sm:p-6 text-left hover:border-sage-300 hover:shadow-sm transition-all group min-h-[80px]"
                      >
                        <span className="text-2xl sm:text-3xl mb-2 block">{item.icon}</span>
                        <h3 className="font-display text-sm sm:text-base font-semibold text-earth-800 group-hover:text-sage-700 transition-colors">{item.title}</h3>
                        <p className="font-sans text-[11px] sm:text-xs text-earth-500 mt-0.5">{item.desc}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </section>
              <BotanicalDivider variant="vine" />
              <CatalogSection onViewPlant={setSelectedPlant} />
              <BotanicalDivider variant="dots" />
              {/* Why section */}
              <section className="py-12 sm:py-16 bg-gradient-to-b from-sage-50/40 to-cream-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-earth-900 mb-3">Why Fern & Fable?</h2>
                    <p className="font-sans text-earth-500 max-w-md mx-auto mb-8">More than a plant shop — we're your guide to a greener, more mindful life.</p>
                  </motion.div>
                  <div className="grid sm:grid-cols-3 gap-6">
                    {[
                      { icon: '🌱', title: 'Expertly Curated', text: 'Every plant in our collection is chosen for its beauty, resilience, and suitability for indoor life.' },
                      { icon: '📖', title: 'Care Education', text: 'Detailed guides, seasonal tips, and a plant-matching quiz to set you up for success.' },
                      { icon: '💚', title: 'Sustainable', text: 'Peat-free compost, recyclable packaging, and plants sourced from responsible growers.' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="text-center"
                      >
                        <span className="text-3xl mb-3 block">{item.icon}</span>
                        <h3 className="font-display text-base font-semibold text-earth-800 mb-2">{item.title}</h3>
                        <p className="font-sans text-sm text-earth-500 leading-relaxed">{item.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
              <BotanicalDivider />
              <CareGuideSection />
              <BotanicalDivider variant="vine" />
              <QuestionnaireSection />
            </>
          )}

          {activeSection === 'catalog' && (
            <CatalogSection onViewPlant={setSelectedPlant} />
          )}

          {activeSection === 'care-guide' && (
            <CareGuideSection />
          )}

          {activeSection === 'questionnaire' && (
            <QuestionnaireSection />
          )}

          {activeSection === 'basket' && (
            <BasketSection />
          )}

          {activeSection === 'favorites' && (
            <FavoritesSection onViewPlant={setSelectedPlant} />
          )}
        </main>

        <Footer />

        {/* Mobile bottom navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-cream-50/95 backdrop-blur-md border-t border-cream-200 safe-area-bottom" aria-label="Mobile navigation">
          <div className="flex items-center justify-around h-16">
            {[
              { id: 'home', icon: <Leaf className="w-5 h-5" />, label: 'Home' },
              { id: 'catalog', icon: <Search className="w-5 h-5" />, label: 'Shop' },
              { id: 'questionnaire', icon: <Star className="w-5 h-5" />, label: 'Match' },
              { id: 'favorites', icon: <Heart className="w-5 h-5" />, label: 'Saved' },
              { id: 'basket', icon: <ShoppingBag className="w-5 h-5" />, label: 'Basket' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[44px] min-h-[44px] px-2 py-1 rounded-xl transition-colors
                  ${activeSection === item.id ? 'text-sage-600' : 'text-earth-400'}`}
                aria-label={item.label}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.icon}
                <span className="font-sans text-[10px]">{item.label}</span>
                {item.id === 'basket' && store.cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 w-4 h-4 bg-sage-600 text-white text-[9px] font-sans rounded-full flex items-center justify-center"
                  >
                    {store.cartCount}
                  </motion.span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Plant detail modal */}
        <AnimatePresence>
          {selectedPlant && (
            <PlantModal plant={selectedPlant} onClose={() => setSelectedPlant(null)} />
          )}
        </AnimatePresence>
      </div>
    </StoreContext.Provider>
  );
}
