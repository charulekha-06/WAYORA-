'use client';

import { 
  Shield, Phone, MapPin, Cloud, AlertTriangle,
  Hospital, Landmark, Pill, Siren, Wifi,
  Sun, CloudRain, Wind, Thermometer,
  MessageCircle, Bell, ChevronRight, Zap
} from 'lucide-react';

const emergencyServices = [
  { name: 'Nearby Hospitals', icon: Hospital, count: 8, distance: '0.3 km', color: 'var(--wayora-red)', bgColor: 'rgba(232,93,111,0.08)' },
  { name: 'ATMs & Banks', icon: Landmark, count: 12, distance: '0.1 km', color: 'var(--wayora-blue)', bgColor: 'rgba(74,144,217,0.08)' },
  { name: 'Pharmacies', icon: Pill, count: 5, distance: '0.2 km', color: 'var(--wayora-green)', bgColor: 'rgba(60,179,113,0.08)' },
  { name: 'Police Stations', icon: Siren, count: 3, distance: '0.5 km', color: 'var(--wayora-orange)', bgColor: 'rgba(242,140,56,0.08)' },
];

const emergencyNumbers = [
  { country: 'Japan', police: '110', ambulance: '119', fire: '119', flag: '🇯🇵' },
  { country: 'USA', police: '911', ambulance: '911', fire: '911', flag: '🇺🇸' },
  { country: 'India', police: '100', ambulance: '108', fire: '101', flag: '🇮🇳' },
  { country: 'UK', police: '999', ambulance: '999', fire: '999', flag: '🇬🇧' },
];

const weatherData = {
  current: { temp: 18, condition: 'Partly Cloudy', humidity: 65, wind: 12, icon: Sun },
  forecast: [
    { day: 'Today', high: 20, low: 14, icon: Sun },
    { day: 'Tomorrow', high: 18, low: 12, icon: CloudRain },
    { day: 'Friday', high: 22, low: 15, icon: Sun },
    { day: 'Saturday', high: 19, low: 13, icon: Cloud },
  ],
};

const alerts = [
  { type: 'festival', title: '🎌 Cherry Blossom Festival', desc: 'Peak bloom expected this week in Ueno Park', color: 'var(--wayora-coral)' },
  { type: 'weather', title: '🌧️ Rain Advisory', desc: 'Light rain expected tomorrow afternoon', color: 'var(--wayora-blue)' },
  { type: 'crowd', title: '👥 High Crowd Alert', desc: 'Senso-ji Temple: Best visit before 9 AM', color: 'var(--wayora-orange)' },
];

export default function SafetyPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--wayora-off-white)' }}>
      <section className="py-12 sm:py-16"
        style={{ background: 'linear-gradient(135deg, #F0F4FF 0%, #FDF2F4 50%, #F2FFF6 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{ background: 'rgba(74,144,217,0.08)', border: '1px solid rgba(74,144,217,0.15)' }}>
            <Shield className="w-4 h-4" style={{ color: 'var(--wayora-blue)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--wayora-blue)' }}>Safety & Logistics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--wayora-black)' }}>
            Stay <span className="gradient-text">safe & informed</span>
          </h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 -mt-4 pb-12 space-y-6">
        {/* Emergency Finder */}
        <div className="rounded-2xl p-6" style={{ background: 'var(--wayora-white)', boxShadow: 'var(--shadow-lg)' }}>
          <h3 className="text-base font-bold mb-4" style={{ color: 'var(--wayora-black)' }}>
            <MapPin className="w-4 h-4 inline mr-2" style={{ color: 'var(--wayora-red)' }} />
            Emergency Finder — Tokyo, Japan
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {emergencyServices.map(svc => {
              const Icon = svc.icon;
              return (
                <button key={svc.name} className="p-4 rounded-xl text-left card-hover"
                  style={{ background: svc.bgColor, border: '1px solid transparent' }}>
                  <Icon className="w-6 h-6 mb-2" style={{ color: svc.color }} />
                  <p className="text-sm font-bold" style={{ color: 'var(--wayora-black)' }}>{svc.name}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--wayora-gray)' }}>
                    {svc.count} nearby · {svc.distance}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Alerts */}
        <div className="rounded-2xl p-6" style={{ background: 'var(--wayora-white)', boxShadow: 'var(--shadow-card)' }}>
          <h3 className="text-base font-bold mb-4" style={{ color: 'var(--wayora-black)' }}>
            <Bell className="w-4 h-4 inline mr-2" style={{ color: 'var(--wayora-orange)' }} />
            Live Alerts
          </h3>
          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: 'var(--wayora-off-white)', borderLeft: `3px solid ${alert.color}` }}>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: 'var(--wayora-black)' }}>{alert.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--wayora-gray)' }}>{alert.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--wayora-gray)' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Weather */}
        <div className="rounded-2xl p-6" style={{ background: 'var(--wayora-white)', boxShadow: 'var(--shadow-card)' }}>
          <h3 className="text-base font-bold mb-4" style={{ color: 'var(--wayora-black)' }}>
            <Cloud className="w-4 h-4 inline mr-2" style={{ color: 'var(--wayora-blue)' }} />
            Weather — Tokyo
          </h3>
          <div className="flex items-center gap-4 mb-5 p-4 rounded-xl" style={{ background: 'rgba(74,144,217,0.06)' }}>
            <Sun className="w-12 h-12" style={{ color: 'var(--wayora-orange)' }} />
            <div>
              <p className="text-3xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--wayora-black)' }}>
                {weatherData.current.temp}°C
              </p>
              <p className="text-sm" style={{ color: 'var(--wayora-gray)' }}>{weatherData.current.condition}</p>
            </div>
            <div className="ml-auto text-right space-y-1">
              <p className="text-xs flex items-center gap-1 justify-end" style={{ color: 'var(--wayora-gray)' }}>
                <Wind className="w-3 h-3" /> {weatherData.current.wind} km/h
              </p>
              <p className="text-xs flex items-center gap-1 justify-end" style={{ color: 'var(--wayora-gray)' }}>
                <Thermometer className="w-3 h-3" /> {weatherData.current.humidity}% humidity
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {weatherData.forecast.map(day => {
              const Icon = day.icon;
              return (
                <div key={day.day} className="text-center p-3 rounded-xl" style={{ background: 'var(--wayora-off-white)' }}>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--wayora-gray)' }}>{day.day}</p>
                  <Icon className="w-6 h-6 mx-auto mb-1" style={{ color: 'var(--wayora-orange)' }} />
                  <p className="text-sm font-bold" style={{ color: 'var(--wayora-black)' }}>{day.high}°</p>
                  <p className="text-xs" style={{ color: 'var(--wayora-gray)' }}>{day.low}°</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Emergency Numbers */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--wayora-white)', boxShadow: 'var(--shadow-card)' }}>
          <div className="p-4" style={{ borderBottom: '1px solid var(--wayora-light-gray)' }}>
            <h3 className="text-base font-bold" style={{ color: 'var(--wayora-black)' }}>
              <Phone className="w-4 h-4 inline mr-2" style={{ color: 'var(--wayora-green)' }} />
              Emergency Numbers
            </h3>
          </div>
          <div className="divide-y" style={{ borderColor: 'var(--wayora-light-gray)' }}>
            {emergencyNumbers.map(c => (
              <div key={c.country} className="flex items-center gap-3 px-4 py-3">
                <span className="text-xl">{c.flag}</span>
                <span className="text-sm font-medium flex-1" style={{ color: 'var(--wayora-black)' }}>{c.country}</span>
                <div className="flex gap-4 text-xs">
                  <span style={{ color: 'var(--wayora-gray)' }}>🚔 {c.police}</span>
                  <span style={{ color: 'var(--wayora-gray)' }}>🚑 {c.ambulance}</span>
                  <span style={{ color: 'var(--wayora-gray)' }}>🚒 {c.fire}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Chatbot FAB */}
        <div className="fixed bottom-24 md:bottom-8 right-6 z-40">
          <button className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
            style={{ background: 'linear-gradient(135deg, var(--wayora-coral), var(--wayora-orange))' }}>
            <MessageCircle className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
