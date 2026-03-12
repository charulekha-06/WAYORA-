'use client';

import { 
  User, Settings, MapPin, Trophy, Calendar,
  Star, ChevronRight, LogOut, Bell, Shield,
  Globe, Edit3, Camera, Award, Compass, Zap
} from 'lucide-react';

const badges = [
  { name: 'Explorer I', desc: 'Visit 5 destinations', emoji: '🗺️', earned: true },
  { name: 'Culture Buff', desc: 'Visit 10 heritage sites', emoji: '🏛️', earned: true },
  { name: 'Foodie', desc: 'Try 20 local cuisines', emoji: '🍜', earned: true },
  { name: 'Budget Pro', desc: 'Stay under budget 3 trips', emoji: '💰', earned: true },
  { name: 'Adventurer', desc: 'Complete 5 adventure activities', emoji: '🧗', earned: false },
  { name: 'Wandrix Elite', desc: 'Earn 1000 Wandrix points', emoji: '⭐', earned: false },
  { name: 'Puthir Master', desc: 'Solve 50 cultural puzzles', emoji: '🧩', earned: false },
  { name: 'Globe Trotter', desc: 'Visit 10 countries', emoji: '🌍', earned: false },
];

const tripHistory = [
  { destination: 'Tokyo, Japan', dates: 'Mar 10-15, 2026', status: 'Active', emoji: '🏯', daysLeft: 12 },
  { destination: 'Bali, Indonesia', dates: 'Jan 5-15, 2026', status: 'Completed', emoji: '🌴', daysLeft: 0 },
  { destination: 'Paris, France', dates: 'Nov 20-27, 2025', status: 'Completed', emoji: '🗼', daysLeft: 0 },
];

const menuItems = [
  { label: 'Notifications', icon: Bell, badge: '3' },
  { label: 'Privacy & Security', icon: Shield },
  { label: 'Language', icon: Globe, value: 'English' },
  { label: 'Help & Support', icon: Compass },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--wayora-off-white)' }}>
      {/* Header */}
      <section className="py-12 sm:py-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--wayora-coral), var(--wayora-orange))' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent)' }} />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
              style={{ background: 'rgba(255,255,255,0.2)', border: '3px solid rgba(255,255,255,0.4)' }}>
              🧑‍💼
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'white', boxShadow: 'var(--shadow-md)' }}>
              <Camera className="w-4 h-4" style={{ color: 'var(--wayora-coral)' }} />
            </button>
          </div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Alex Traveler
          </h1>
          <p className="text-sm text-white opacity-80 mt-1">Wandrix Level: Explorer II · 750 pts</p>
          <div className="flex items-center justify-center gap-6 mt-4 text-white text-sm">
            <div className="text-center">
              <p className="text-lg font-bold">12</p>
              <p className="text-xs opacity-70">Trips</p>
            </div>
            <div className="w-px h-8 bg-white opacity-20" />
            <div className="text-center">
              <p className="text-lg font-bold">8</p>
              <p className="text-xs opacity-70">Countries</p>
            </div>
            <div className="w-px h-8 bg-white opacity-20" />
            <div className="text-center">
              <p className="text-lg font-bold">4</p>
              <p className="text-xs opacity-70">Badges</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 -mt-4 pb-12 space-y-6">
        {/* Wandrix Badges */}
        <div className="rounded-2xl p-6" style={{ background: 'var(--wayora-white)', boxShadow: 'var(--shadow-lg)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold" style={{ color: 'var(--wayora-black)' }}>
              <Trophy className="w-4 h-4 inline mr-2" style={{ color: 'var(--wayora-orange)' }} />
              Wandrix Badges
            </h3>
            <span className="text-xs font-medium" style={{ color: 'var(--wayora-gray)' }}>4/8 earned</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {badges.map(badge => (
              <div key={badge.name} className="text-center p-3 rounded-xl transition-all"
                style={{ background: badge.earned ? 'rgba(242,140,56,0.06)' : 'var(--wayora-off-white)', opacity: badge.earned ? 1 : 0.5 }}>
                <span className="text-2xl block mb-1">{badge.emoji}</span>
                <p className="text-[10px] font-bold leading-tight" style={{ color: badge.earned ? 'var(--wayora-black)' : 'var(--wayora-gray)' }}>
                  {badge.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trip History */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--wayora-white)', boxShadow: 'var(--shadow-card)' }}>
          <div className="p-4" style={{ borderBottom: '1px solid var(--wayora-light-gray)' }}>
            <h3 className="text-base font-bold" style={{ color: 'var(--wayora-black)' }}>
              <Calendar className="w-4 h-4 inline mr-2" style={{ color: 'var(--wayora-coral)' }} />
              Trip History
            </h3>
          </div>
          {tripHistory.map(trip => (
            <div key={trip.destination} className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: '1px solid var(--wayora-light-gray)' }}>
              <span className="text-2xl">{trip.emoji}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: 'var(--wayora-black)' }}>{trip.destination}</p>
                <p className="text-xs" style={{ color: 'var(--wayora-gray)' }}>{trip.dates}</p>
              </div>
              {trip.status === 'Active' ? (
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold"
                  style={{ background: 'rgba(60,179,113,0.08)', color: 'var(--wayora-green)' }}>
                  {trip.daysLeft} days left
                </span>
              ) : (
                <span className="text-xs" style={{ color: 'var(--wayora-gray)' }}>Completed</span>
              )}
            </div>
          ))}
        </div>

        {/* Settings Menu */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--wayora-white)', boxShadow: 'var(--shadow-card)' }}>
          <div className="p-4" style={{ borderBottom: '1px solid var(--wayora-light-gray)' }}>
            <h3 className="text-base font-bold" style={{ color: 'var(--wayora-black)' }}>
              <Settings className="w-4 h-4 inline mr-2" style={{ color: 'var(--wayora-gray)' }} /> Settings
            </h3>
          </div>
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button key={item.label} className="w-full flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[var(--wayora-off-white)]"
                style={{ borderBottom: '1px solid var(--wayora-light-gray)' }}>
                <Icon className="w-5 h-5" style={{ color: 'var(--wayora-gray)' }} />
                <span className="flex-1 text-left text-sm font-medium" style={{ color: 'var(--wayora-black)' }}>{item.label}</span>
                {item.badge && (
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: 'var(--wayora-coral)' }}>{item.badge}</span>
                )}
                {item.value && <span className="text-xs" style={{ color: 'var(--wayora-gray)' }}>{item.value}</span>}
                <ChevronRight className="w-4 h-4" style={{ color: 'var(--wayora-light-gray)' }} />
              </button>
            );
          })}
          <button className="w-full flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[var(--wayora-off-white)]">
            <LogOut className="w-5 h-5" style={{ color: 'var(--wayora-red)' }} />
            <span className="flex-1 text-left text-sm font-medium" style={{ color: 'var(--wayora-red)' }}>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
