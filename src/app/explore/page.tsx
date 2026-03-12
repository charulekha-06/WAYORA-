'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Filter, Star, ChevronRight,
  Compass, Mountain, Palmtree, Building, Heart,
  Camera, Waves, Utensils, Music
} from 'lucide-react';

const categories = [
  { name: 'All', icon: Compass, active: true },
  { name: 'Adventure', icon: Mountain, active: false },
  { name: 'Beach', icon: Waves, active: false },
  { name: 'Cultural', icon: Building, active: false },
  { name: 'Wellness', icon: Heart, active: false },
  { name: 'Food', icon: Utensils, active: false },
  { name: 'Nature', icon: Palmtree, active: false },
  { name: 'Nightlife', icon: Music, active: false },
];

const allDestinations = [
  { name: 'Tokyo', country: 'Japan', emoji: '🏯', rating: 4.9, price: '$1,200', category: 'Cultural', duration: '7 days', description: 'Ancient temples meet neon-lit streets in this mesmerizing capital.' },
  { name: 'Santorini', country: 'Greece', emoji: '🏛️', rating: 4.8, price: '$1,800', category: 'Beach', duration: '5 days', description: 'Iconic white-washed buildings perched on volcanic cliffs.' },
  { name: 'Bali', country: 'Indonesia', emoji: '🌴', rating: 4.7, price: '$900', category: 'Wellness', duration: '10 days', description: 'Tropical paradise with rice terraces, temples, and serenity.' },
  { name: 'Paris', country: 'France', emoji: '🗼', rating: 4.9, price: '$2,100', category: 'Cultural', duration: '6 days', description: 'The city of light, love, art, and world-class cuisine.' },
  { name: 'Machu Picchu', country: 'Peru', emoji: '🏔️', rating: 4.8, price: '$1,500', category: 'Adventure', duration: '8 days', description: 'The lost city of the Incas, high in the Andes mountains.' },
  { name: 'Maldives', country: 'Maldives', emoji: '🏝️', rating: 4.9, price: '$2,500', category: 'Beach', duration: '5 days', description: 'Crystal-clear waters and overwater bungalows in paradise.' },
  { name: 'Kyoto', country: 'Japan', emoji: '⛩️', rating: 4.8, price: '$1,100', category: 'Cultural', duration: '5 days', description: 'Bamboo forests, geishas, and over 2,000 temples and shrines.' },
  { name: 'Patagonia', country: 'Argentina', emoji: '🏔️', rating: 4.7, price: '$1,800', category: 'Adventure', duration: '12 days', description: 'The end of the world — glaciers, peaks, and raw wilderness.' },
  { name: 'Marrakech', country: 'Morocco', emoji: '🕌', rating: 4.6, price: '$800', category: 'Cultural', duration: '6 days', description: 'Vibrant souks, stunning riads, and sensory overload in the best way.' },
  { name: 'Ubud', country: 'Indonesia', emoji: '🧘', rating: 4.7, price: '$700', category: 'Wellness', duration: '7 days', description: 'Yoga retreats, organic cafes, and deep spiritual rejuvenation.' },
  { name: 'Bangkok', country: 'Thailand', emoji: '🛕', rating: 4.6, price: '$600', category: 'Food', duration: '5 days', description: 'Street food capital of the world with ornate golden temples.' },
  { name: 'Swiss Alps', country: 'Switzerland', emoji: '🏔️', rating: 4.9, price: '$2,800', category: 'Nature', duration: '7 days', description: 'Snow-capped peaks, alpine meadows, and pristine mountain lakes.' },
];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = allDestinations.filter(d => {
    const matchesCategory = activeCategory === 'All' || d.category === activeCategory;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen" style={{ background: 'var(--wayora-off-white)' }}>
      {/* Hero */}
      <section className="relative py-16 sm:py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FDF2F4 0%, #F0F4FF 50%, #F2FFF6 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--wayora-black)' }}>
            Explore <span className="gradient-text">destinations</span>
          </h1>
          <p className="text-base max-w-lg mx-auto mb-8" style={{ color: 'var(--wayora-gray)' }}>
            Discover handpicked destinations from around the world
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--wayora-gray)' }} />
            <input
              type="text"
              placeholder="Search destinations, countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl text-base outline-none transition-all"
              style={{
                background: 'var(--wayora-white)',
                border: '1.5px solid var(--wayora-light-gray)',
                color: 'var(--wayora-black)',
                boxShadow: 'var(--shadow-md)',
              }}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-colors"
              style={{ background: 'rgba(232,99,122,0.08)', color: 'var(--wayora-coral)' }}>
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 sticky top-16 z-30" style={{ background: 'var(--wayora-white)', borderBottom: '1px solid var(--wayora-light-gray)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
                  style={{
                    background: isActive ? 'linear-gradient(135deg, var(--wayora-coral), var(--wayora-orange))' : 'var(--wayora-off-white)',
                    color: isActive ? 'white' : 'var(--wayora-dark-gray)',
                    border: isActive ? 'none' : '1px solid var(--wayora-light-gray)',
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm mb-6 font-medium" style={{ color: 'var(--wayora-gray)' }}>
            {filtered.length} destination{filtered.length !== 1 ? 's' : ''} found
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest, index) => (
              <Link
                href="/planner"
                key={dest.name}
                className="group rounded-2xl overflow-hidden card-hover no-underline"
                style={{
                  background: 'var(--wayora-white)',
                  boxShadow: 'var(--shadow-card)',
                  animation: `fadeInUp 0.4s ease-out ${index * 0.05}s forwards`,
                  opacity: 0,
                }}
              >
                <div className="h-44 flex items-center justify-center relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${index % 3 === 0 ? 'rgba(232,99,122,0.06)' : index % 3 === 1 ? 'rgba(74,144,217,0.06)' : 'rgba(60,179,113,0.06)'}, rgba(242,140,56,0.06))` 
                  }}>
                  <span className="text-6xl group-hover:scale-125 transition-transform duration-500">{dest.emoji}</span>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold glass"
                    style={{ color: 'var(--wayora-black)' }}>
                    <Star className="w-3 h-3 inline mr-1" style={{ color: 'var(--wayora-orange)' }} /> {dest.rating}
                  </div>
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}>
                    {dest.duration}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: 'var(--wayora-black)' }}>{dest.name}</h3>
                      <p className="text-xs flex items-center gap-1" style={{ color: 'var(--wayora-gray)' }}>
                        <MapPin className="w-3 h-3" /> {dest.country}
                      </p>
                    </div>
                    <span className="text-base font-bold" style={{ color: 'var(--wayora-coral)' }}>{dest.price}</span>
                  </div>
                  <p className="text-xs leading-relaxed mt-2 mb-3" style={{ color: 'var(--wayora-dark-gray)' }}>
                    {dest.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold"
                      style={{ background: 'var(--wayora-lavender-light)', color: 'var(--wayora-blue)' }}>
                      {dest.category}
                    </span>
                    <span className="text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                      style={{ color: 'var(--wayora-coral)' }}>
                      Plan Trip <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
