import { Plane, Heart, Github, Twitter, Instagram, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ 
      background: 'var(--wayora-black)',
      color: 'var(--wayora-light-gray)',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    }}>
      {/* Decorative gradient top */}
      <div className="h-1 w-full" style={{ 
        background: 'linear-gradient(90deg, var(--wayora-coral), var(--wayora-orange), var(--wayora-blue), var(--wayora-green))' 
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--wayora-coral), var(--wayora-orange))' }}>
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Wayora
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--wayora-gray)' }}>
              Travel beyond maps, explore beyond limits. Your AI-powered companion for unforgettable journeys.
            </p>
            <div className="flex gap-3">
              {[Twitter, Instagram, Github, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ 
                    background: 'rgba(255,255,255,0.06)',
                    color: 'var(--wayora-gray)',
                  }}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Platform', links: ['Explore', 'AI Planner', 'Budget Tracker', 'Safety Tools'] },
            { title: 'Features', links: ['Wandrix Badges', 'Artisan Market', 'Crowd Insights', 'Trip Atlas'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Contact'] },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm transition-colors hover:text-white no-underline"
                      style={{ color: 'var(--wayora-gray)' }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs" style={{ color: 'var(--wayora-gray)' }}>
            © 2026 Wayora. All rights reserved.
          </p>
          <p className="text-xs flex items-center gap-1" style={{ color: 'var(--wayora-gray)' }}>
            Made with <Heart className="w-3 h-3" style={{ color: 'var(--wayora-coral)' }} /> for travelers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
