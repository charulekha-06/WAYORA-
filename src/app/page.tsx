'use client';

import Link from 'next/link';
import { 
  Plane, Map, Wallet, Shield, Sparkles, Users, 
  BarChart3, Globe, ArrowRight, Star, Zap,
  Compass, Heart, Trophy, Camera, ChevronRight
} from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Planning',
    description: 'Generate personalized day-wise itineraries tailored to your budget, interests, group type, and trip length.',
    color: 'var(--wayora-coral)',
    bgColor: 'rgba(232,99,122,0.08)',
  },
  {
    icon: Wallet,
    title: 'Smart Budgeting',
    description: 'Real-time expense tracking with OCR bill scanning and visual spending summaries.',
    color: 'var(--wayora-orange)',
    bgColor: 'rgba(242,140,56,0.08)',
  },
  {
    icon: Shield,
    title: 'Safety & Logistics',
    description: '24/7 AI chatbot, nearby emergency finder, and live weather & festival alerts.',
    color: 'var(--wayora-blue)',
    bgColor: 'rgba(74,144,217,0.08)',
  },
  {
    icon: Trophy,
    title: 'Wandrix & Puthir',
    description: 'Gamified exploration — earn digital collectibles and badges for visiting heritage sites.',
    color: 'var(--wayora-green)',
    bgColor: 'rgba(60,179,113,0.08)',
  },
  {
    icon: Heart,
    title: 'Artisan Support',
    description: 'Discover and support local artisans. Buy authentic handcrafted products directly.',
    color: '#C77DBA',
    bgColor: 'rgba(199,125,186,0.08)',
  },
  {
    icon: BarChart3,
    title: 'Crowd Intelligence',
    description: 'ML-powered crowd density analysis to find the best times to visit popular attractions.',
    color: 'var(--wayora-orange)',
    bgColor: 'rgba(242,140,56,0.08)',
  },
];

const destinations = [
  { name: 'Tokyo', country: 'Japan', image: '🏯', rating: 4.9, price: '$1,200', tags: ['Culture', 'Food'] },
  { name: 'Santorini', country: 'Greece', image: '🏛️', rating: 4.8, price: '$1,800', tags: ['Beach', 'Romance'] },
  { name: 'Bali', country: 'Indonesia', image: '🌴', rating: 4.7, price: '$900', tags: ['Wellness', 'Adventure'] },
  { name: 'Paris', country: 'France', image: '🗼', rating: 4.9, price: '$2,100', tags: ['Art', 'Food'] },
];

const stats = [
  { value: '50K+', label: 'Active Travelers' },
  { value: '120+', label: 'Destinations' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '1M+', label: 'Itineraries Created' },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FDF2F4 0%, #FEF3EA 30%, #F0F4FF 70%, #F2FFF6 100%)' }}>
        
        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-20 animate-float"
            style={{ background: 'radial-gradient(circle, var(--wayora-coral-light), transparent)', animationDelay: '0s' }} />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-15 animate-float"
            style={{ background: 'radial-gradient(circle, var(--wayora-lavender), transparent)', animationDelay: '1s' }} />
          <div className="absolute top-40 right-1/4 w-40 h-40 rounded-full opacity-20 animate-float"
            style={{ background: 'radial-gradient(circle, var(--wayora-orange-light), transparent)', animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-in-up"
            style={{ background: 'rgba(232,99,122,0.08)', border: '1px solid rgba(232,99,122,0.15)' }}>
            <Zap className="w-4 h-4" style={{ color: 'var(--wayora-coral)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--wayora-coral)' }}>
              AI-Powered Travel Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in-up"
            style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--wayora-black)', animationDelay: '0.1s' }}>
            Travel beyond maps,
            <br />
            <span className="gradient-text">explore beyond limits</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
            style={{ color: 'var(--wayora-dark-gray)', animationDelay: '0.2s' }}>
            Your AI companion for personalized itineraries, smart budgeting, 
            and unforgettable discoveries. Travel, reimagined.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}>
            <Link href="/planner" className="btn-primary text-base !py-3.5 !px-8 group no-underline">
              Start Planning
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/explore" className="btn-secondary text-base !py-3.5 !px-8 no-underline">
              <Compass className="w-5 h-5" />
              Explore Destinations
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}>
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {stat.value}
                </div>
                <div className="text-xs mt-1 font-medium" style={{ color: 'var(--wayora-gray)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28" style={{ background: 'var(--wayora-white)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider"
              style={{ background: 'rgba(232,99,122,0.08)', color: 'var(--wayora-coral)' }}>
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--wayora-black)' }}>
              Everything you need for the <span className="gradient-text">perfect trip</span>
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--wayora-gray)' }}>
              From AI-powered planning to real-time safety tools, Wayora has every angle covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl card-hover cursor-pointer"
                  style={{
                    background: 'var(--wayora-white)',
                    border: '1px solid var(--wayora-light-gray)',
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`,
                    opacity: 0,
                  }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: feature.bgColor }}>
                    <Icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--wayora-black)' }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--wayora-gray)' }}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="py-20 sm:py-28" style={{ background: 'var(--wayora-off-white)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider"
                style={{ background: 'rgba(242,140,56,0.08)', color: 'var(--wayora-orange)' }}>
                Trending
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--wayora-black)' }}>
                Popular destinations
              </h2>
            </div>
            <Link href="/explore" className="hidden sm:flex items-center gap-1 text-sm font-semibold no-underline transition-colors"
              style={{ color: 'var(--wayora-coral)' }}>
              View all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, index) => (
              <Link
                href="/planner"
                key={dest.name}
                className="group rounded-2xl overflow-hidden card-hover no-underline"
                style={{
                  background: 'var(--wayora-white)',
                  boxShadow: 'var(--shadow-card)',
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`,
                  opacity: 0,
                }}
              >
                {/* Image area */}
                <div className="h-48 flex items-center justify-center relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${index % 2 === 0 ? 'rgba(232,99,122,0.08)' : 'rgba(74,144,217,0.08)'}, ${index % 2 === 0 ? 'rgba(242,140,56,0.08)' : 'rgba(60,179,113,0.08)'})` 
                  }}>
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-500">{dest.image}</span>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold glass"
                    style={{ color: 'var(--wayora-black)' }}>
                    <Star className="w-3 h-3 inline mr-1" style={{ color: 'var(--wayora-orange)' }} />
                    {dest.rating}
                  </div>
                </div>
                {/* Info */}
                <div className="p-4">
                  <h3 className="text-base font-bold mb-0.5" style={{ color: 'var(--wayora-black)' }}>
                    {dest.name}
                  </h3>
                  <p className="text-xs mb-3" style={{ color: 'var(--wayora-gray)' }}>
                    {dest.country}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {dest.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-medium"
                          style={{ background: 'var(--wayora-lavender-light)', color: 'var(--wayora-blue)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-bold" style={{ color: 'var(--wayora-coral)' }}>
                      {dest.price}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--wayora-coral), var(--wayora-orange))' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent)' }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.2), transparent)' }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center text-white">
          <Globe className="w-12 h-12 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl sm:text-5xl font-bold mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Ready to reimagine travel?
          </h2>
          <p className="text-lg opacity-90 mb-10 max-w-xl mx-auto">
            Join thousands of travelers who plan smarter, spend wiser, and explore deeper with Wayora.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/planner" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base transition-all hover:-translate-y-0.5 no-underline"
              style={{ background: 'white', color: 'var(--wayora-coral)' }}>
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/explore" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base transition-all hover:-translate-y-0.5 no-underline"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
              <Compass className="w-5 h-5" />
              Browse Destinations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
