'use client';

import { useState } from 'react';
import { 
  Sparkles, MapPin, Calendar, Users, DollarSign, 
  Heart, Mountain, Camera, Utensils, Clock,
  ChevronDown, ArrowRight, Loader2, Map, Star,
  Sun, Coffee, Moon, Sunset
} from 'lucide-react';

const interests = [
  { id: 'culture', label: 'Culture', icon: '🏛️' },
  { id: 'food', label: 'Food', icon: '🍜' },
  { id: 'adventure', label: 'Adventure', icon: '🧗' },
  { id: 'nature', label: 'Nature', icon: '🌿' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'nightlife', label: 'Nightlife', icon: '🌙' },
  { id: 'wellness', label: 'Wellness', icon: '🧘' },
  { id: 'photography', label: 'Photography', icon: '📸' },
];

const groupTypes = ['Solo', 'Couple', 'Family', 'Friends', 'Business'];

const sampleItinerary = [
  {
    day: 1,
    title: 'Arrival & Cultural Immersion',
    activities: [
      { time: '09:00 AM', name: 'Arrive & Check into Ryokan', description: 'Traditional Japanese inn experience', cost: '$120', icon: Sun, type: 'stay' },
      { time: '11:30 AM', name: 'Senso-ji Temple', description: 'Tokyo\'s oldest and most significant temple', cost: 'Free', icon: Camera, type: 'culture' },
      { time: '01:00 PM', name: 'Ramen Street Lunch', description: 'Authentic tonkotsu ramen in Asakusa', cost: '$15', icon: Coffee, type: 'food' },
      { time: '03:00 PM', name: 'Meiji Shrine & Harajuku', description: 'Serene shrine followed by quirky fashion district', cost: 'Free', icon: Camera, type: 'culture' },
      { time: '06:30 PM', name: 'Shibuya Crossing & Dinner', description: 'Iconic crossing then Izakaya dining', cost: '$35', icon: Sunset, type: 'food' },
      { time: '09:00 PM', name: 'Tokyo Tower Night View', description: 'Panoramic city views illuminated at night', cost: '$10', icon: Moon, type: 'experience' },
    ],
  },
  {
    day: 2,
    title: 'Modern Tokyo & Tech',
    activities: [
      { time: '08:30 AM', name: 'Tsukiji Outer Market', description: 'Fresh sushi breakfast at the famous fish market', cost: '$25', icon: Sun, type: 'food' },
      { time: '11:00 AM', name: 'TeamLab Borderless', description: 'Immersive digital art museum experience', cost: '$30', icon: Camera, type: 'experience' },
      { time: '01:30 PM', name: 'Akihabara Electric Town', description: 'Electronics, anime, and gaming culture hub', cost: '$20', icon: Coffee, type: 'shopping' },
      { time: '04:00 PM', name: 'Imperial Palace Gardens', description: 'Peaceful gardens in the heart of the city', cost: 'Free', icon: Sunset, type: 'nature' },
      { time: '07:00 PM', name: 'Shinjuku Golden Gai', description: 'Tiny atmospheric bars in narrow alleys', cost: '$40', icon: Moon, type: 'nightlife' },
    ],
  },
  {
    day: 3,
    title: 'Day Trip & Nature',
    activities: [
      { time: '07:00 AM', name: 'Shinkansen to Hakone', description: 'Bullet train to hot springs mountain town', cost: '$45', icon: Sun, type: 'transport' },
      { time: '10:00 AM', name: 'Hakone Open-Air Museum', description: 'Sculpture art set against mountain backdrop', cost: '$15', icon: Camera, type: 'culture' },
      { time: '12:30 PM', name: 'Lake Ashi Cruise', description: 'Pirate ship cruise with Mt. Fuji views', cost: '$10', icon: Coffee, type: 'nature' },
      { time: '03:00 PM', name: 'Onsen Experience', description: 'Traditional hot spring bathing ritual', cost: '$25', icon: Sunset, type: 'wellness' },
      { time: '06:00 PM', name: 'Return & Roppongi Dinner', description: 'Kaiseki multi-course Japanese dinner', cost: '$60', icon: Moon, type: 'food' },
    ],
  },
];

export default function PlannerPage() {
  const [step, setStep] = useState<'form' | 'loading' | 'result'>('form');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('3');
  const [budget, setBudget] = useState('1500');
  const [group, setGroup] = useState('Solo');
  const [activeDay, setActiveDay] = useState(1);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    setStep('loading');
    setTimeout(() => setStep('result'), 2500);
  };

  const typeColors: Record<string, string> = {
    culture: 'var(--wayora-blue)',
    food: 'var(--wayora-orange)',
    experience: 'var(--wayora-coral)',
    nature: 'var(--wayora-green)',
    shopping: '#C77DBA',
    nightlife: '#8B5CF6',
    wellness: '#14B8A6',
    stay: 'var(--wayora-coral)',
    transport: 'var(--wayora-dark-gray)',
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--wayora-off-white)' }}>
      {/* Header */}
      <section className="py-12 sm:py-16" 
        style={{ background: 'linear-gradient(135deg, #FDF2F4 0%, #FEF3EA 50%, #F0F4FF 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{ background: 'rgba(232,99,122,0.08)', border: '1px solid rgba(232,99,122,0.15)' }}>
            <Sparkles className="w-4 h-4" style={{ color: 'var(--wayora-coral)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--wayora-coral)' }}>AI Itinerary Planner</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--wayora-black)' }}>
            Plan your <span className="gradient-text">perfect trip</span>
          </h1>
          <p className="text-base" style={{ color: 'var(--wayora-gray)' }}>
            Tell us about your dream trip. Our AI will craft a personalized itinerary just for you.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 -mt-4 pb-12">
        {step === 'form' && (
          <div className="rounded-2xl p-6 sm:p-8 animate-fade-in-up"
            style={{ background: 'var(--wayora-white)', boxShadow: 'var(--shadow-lg)' }}>
            
            {/* Destination */}
            <div className="mb-6">
              <label className="text-sm font-semibold mb-2 block" style={{ color: 'var(--wayora-black)' }}>
                <MapPin className="w-4 h-4 inline mr-1" style={{ color: 'var(--wayora-coral)' }} />
                Where do you want to go?
              </label>
              <input
                type="text"
                placeholder="e.g., Tokyo, Japan"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all focus:ring-2"
                style={{
                  background: 'var(--wayora-off-white)',
                  border: '1.5px solid var(--wayora-light-gray)',
                  color: 'var(--wayora-black)',
                }}
              />
            </div>

            {/* Duration & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: 'var(--wayora-black)' }}>
                  <Calendar className="w-4 h-4 inline mr-1" style={{ color: 'var(--wayora-orange)' }} />
                  Duration (days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-base outline-none"
                  style={{
                    background: 'var(--wayora-off-white)',
                    border: '1.5px solid var(--wayora-light-gray)',
                    color: 'var(--wayora-black)',
                  }}
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: 'var(--wayora-black)' }}>
                  <DollarSign className="w-4 h-4 inline mr-1" style={{ color: 'var(--wayora-green)' }} />
                  Budget (USD)
                </label>
                <input
                  type="number"
                  min="100"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-base outline-none"
                  style={{
                    background: 'var(--wayora-off-white)',
                    border: '1.5px solid var(--wayora-light-gray)',
                    color: 'var(--wayora-black)',
                  }}
                />
              </div>
            </div>

            {/* Group Type */}
            <div className="mb-6">
              <label className="text-sm font-semibold mb-2 block" style={{ color: 'var(--wayora-black)' }}>
                <Users className="w-4 h-4 inline mr-1" style={{ color: 'var(--wayora-blue)' }} />
                Group type
              </label>
              <div className="flex flex-wrap gap-2">
                {groupTypes.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGroup(g)}
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: group === g ? 'linear-gradient(135deg, var(--wayora-coral), var(--wayora-orange))' : 'var(--wayora-off-white)',
                      color: group === g ? 'white' : 'var(--wayora-dark-gray)',
                      border: group === g ? 'none' : '1px solid var(--wayora-light-gray)',
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="mb-8">
              <label className="text-sm font-semibold mb-2 block" style={{ color: 'var(--wayora-black)' }}>
                <Heart className="w-4 h-4 inline mr-1" style={{ color: 'var(--wayora-coral)' }} />
                Your interests
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {interests.map((int) => (
                  <button
                    key={int.id}
                    onClick={() => toggleInterest(int.id)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: selectedInterests.includes(int.id) ? 'rgba(232,99,122,0.08)' : 'var(--wayora-off-white)',
                      color: selectedInterests.includes(int.id) ? 'var(--wayora-coral)' : 'var(--wayora-dark-gray)',
                      border: selectedInterests.includes(int.id) ? '1.5px solid var(--wayora-coral)' : '1px solid var(--wayora-light-gray)',
                    }}
                  >
                    <span>{int.icon}</span>
                    {int.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="btn-primary w-full justify-center text-base !py-4 group"
            >
              <Sparkles className="w-5 h-5" />
              Generate My Itinerary
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}

        {step === 'loading' && (
          <div className="rounded-2xl p-12 text-center animate-fade-in"
            style={{ background: 'var(--wayora-white)', boxShadow: 'var(--shadow-lg)' }}>
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full animate-gradient"
                style={{ background: 'linear-gradient(135deg, var(--wayora-coral), var(--wayora-orange), var(--wayora-blue))', opacity: 0.15 }} />
              <div className="absolute inset-2 rounded-full flex items-center justify-center"
                style={{ background: 'var(--wayora-white)' }}>
                <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--wayora-coral)' }} />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--wayora-black)' }}>
              Crafting your perfect itinerary...
            </h3>
            <p className="text-sm" style={{ color: 'var(--wayora-gray)' }}>
              Our AI is analyzing thousands of travel experiences to build your personalized plan.
            </p>
          </div>
        )}

        {step === 'result' && (
          <div className="animate-fade-in-up">
            {/* Itinerary Header */}
            <div className="rounded-2xl p-6 mb-6"
              style={{ 
                background: 'linear-gradient(135deg, var(--wayora-coral), var(--wayora-orange))',
                boxShadow: 'var(--shadow-lg)',
              }}>
              <div className="flex items-start justify-between text-white">
                <div>
                  <p className="text-sm opacity-80 mb-1">Your AI-Generated Itinerary</p>
                  <h2 className="text-2xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {destination || 'Tokyo, Japan'} ✨
                  </h2>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm opacity-90">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {days} days</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> ${budget}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {group}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-xl transition-colors" style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <Heart className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 rounded-xl transition-colors" style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <Map className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Day Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {sampleItinerary.map((day) => (
                <button
                  key={day.day}
                  onClick={() => setActiveDay(day.day)}
                  className="flex flex-col items-center px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all min-w-[80px]"
                  style={{
                    background: activeDay === day.day ? 'var(--wayora-white)' : 'transparent',
                    color: activeDay === day.day ? 'var(--wayora-coral)' : 'var(--wayora-gray)',
                    boxShadow: activeDay === day.day ? 'var(--shadow-md)' : 'none',
                    border: activeDay === day.day ? '1px solid var(--wayora-light-gray)' : '1px solid transparent',
                  }}
                >
                  <span className="text-xs opacity-70">Day</span>
                  <span className="text-lg font-bold">{day.day}</span>
                </button>
              ))}
            </div>

            {/* Day Content */}
            {sampleItinerary.filter(d => d.day === activeDay).map(day => (
              <div key={day.day} className="animate-fade-in">
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--wayora-black)', fontFamily: 'Outfit, sans-serif' }}>
                  {day.title}
                </h3>
                <div className="space-y-3">
                  {day.activities.map((activity, idx) => {
                    const Icon = activity.icon;
                    return (
                      <div key={idx} className="flex gap-4 p-4 rounded-xl card-hover"
                        style={{ background: 'var(--wayora-white)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--wayora-light-gray)' }}>
                        <div className="flex flex-col items-center pt-1">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: `${typeColors[activity.type]}10`, color: typeColors[activity.type] }}>
                            <Icon className="w-5 h-5" />
                          </div>
                          {idx < day.activities.length - 1 && (
                            <div className="w-px h-8 mt-2" style={{ background: 'var(--wayora-light-gray)' }} />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-md"
                              style={{ background: 'var(--wayora-off-white)', color: 'var(--wayora-gray)' }}>
                              {activity.time}
                            </span>
                            <span className="text-sm font-bold" style={{ color: typeColors[activity.type] }}>
                              {activity.cost}
                            </span>
                          </div>
                          <h4 className="text-base font-semibold" style={{ color: 'var(--wayora-black)' }}>
                            {activity.name}
                          </h4>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--wayora-gray)' }}>
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Actions */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setStep('form')}
                className="btn-secondary flex-1 justify-center"
              >
                Regenerate
              </button>
              <button className="btn-primary flex-1 justify-center">
                Save Itinerary
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
