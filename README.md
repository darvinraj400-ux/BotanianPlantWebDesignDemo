# 🌿 Fern & Fable — Botanical Plant Shop

An online plant shop and plant-care resource for beginners and experienced plant lovers. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

### 🪴 Plant Catalog
- 12 realistic plant varieties with detailed profiles
- Categorized by: Indoor Plants, Low Light, Pet Friendly, Easy Care
- Individual plant cards with quick info (light, water, difficulty)

### 🔍 Smart Filtering
- Filter by light requirements (Low, Medium, Bright)
- Filter by watering frequency (Low, Medium, High)
- Filter by difficulty level (Beginner, Intermediate, Advanced)
- Combine category tabs with filters for precise results
- Informative empty states when no plants match

### 📋 Plant Profiles
- Detailed care instructions
- Growing conditions (temperature, humidity, soil, size)
- Seasonal care tips (spring, summer, autumn, winter)
- Botanical names and descriptive tags

### 🌸 Seasonal Care Guide
- Interactive seasonal tips (Spring, Summer, Autumn, Winter)
- Universal plant wisdom tips
- Animated transitions between seasons

### 🎯 Plant-Matching Questionnaire
- 5-question quiz about your space and lifestyle
- Questions about: light, time commitment, experience, pets, purpose
- Genuine scoring algorithm that calculates best matches
- Returns top 4 recommended plants based on answers

### 🛒 Shopping Basket
- Add plants with quantity controls
- Real-time subtotal calculation
- Animated item additions/removals
- Persistent across page refreshes (localStorage)
- Clear basket option

### ❤️ Favorites
- Save favorite plants with heart icon
- Dedicated favorites page
- Persisted in localStorage
- Works across sessions

## Design

- **Mobile-first** responsive design (320px → desktop)
- **Organic, tactile aesthetic** with botanical greens, sage, cream, and earth tones
- **Custom typography** using Playfair Display (display) and Inter (body)
- **Smooth animations** via Framer Motion (scroll reveals, page transitions, interactive feedback)
- **Accessible** with ARIA labels, keyboard navigation, reduced-motion support
- **Touch-optimized** with 44px+ touch targets and mobile bottom navigation

## Tech Stack

- **React 18** — UI framework
- **TypeScript** — Type safety
- **Vite** — Build tool
- **Tailwind CSS v4** — Utility-first styling
- **Framer Motion** — Animations and transitions
- **Lucide React** — Icons
- **localStorage** — Client-side persistence

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

### Running

1. Clone or download this project
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Open the URL shown in the terminal (typically `http://localhost:5173`)

### Production Build

Run `npm run build` to create an optimized production build in the `dist/` directory. The output can be served by any static file server.

## Project Structure

```
├── src/
│   ├── App.tsx           # Main application with all components
│   ├── main.tsx          # Entry point
│   ├── index.css         # Global styles and Tailwind config
│   ├── data/
│   │   └── plants.ts     # Plant catalog data and types
│   └── hooks/
│       └── useStore.ts   # Cart & favorites state management
├── index.html            # HTML entry point
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md             # This file
```

## Plant Inventory

| Plant | Price | Light | Water | Difficulty | Categories |
|-------|-------|-------|-------|------------|------------|
| Monstera Deliciosa | $45 | Bright | Medium | Beginner | Indoor, Easy Care |
| Snake Plant | $28 | Low | Low | Beginner | Indoor, Low Light, Pet Friendly, Easy Care |
| Golden Pothos | $18 | Low | Medium | Beginner | Indoor, Low Light, Easy Care |
| Fiddle Leaf Fig | $65 | Bright | Medium | Intermediate | Indoor |
| Peace Lily | $32 | Low | High | Beginner | Indoor, Low Light |
| Spider Plant | $15 | Medium | Medium | Beginner | Indoor, Pet Friendly, Easy Care |
| Rubber Plant | $38 | Medium | Medium | Beginner | Indoor, Low Light |
| Calathea Orbifolia | $42 | Medium | High | Intermediate | Indoor, Pet Friendly |
| ZZ Plant | $35 | Low | Low | Beginner | Indoor, Low Light, Easy Care |
| Boston Fern | $25 | Medium | High | Intermediate | Indoor, Pet Friendly |
| Aloe Vera | $20 | Bright | Low | Beginner | Easy Care |
| Heartleaf Philodendron | $22 | Low | Medium | Beginner | Indoor, Low Light, Easy Care |

## Accessibility

- Semantic HTML with proper ARIA attributes
- Keyboard navigation support throughout
- `prefers-reduced-motion` media query respected
- Minimum 44×44px touch targets
- Sufficient color contrast ratios
- Focus indicators on all interactive elements
- Screen reader friendly labels and descriptions

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS 15+)
- Chrome for Android (latest)

---

Made with 🌿 by Fern & Fable
