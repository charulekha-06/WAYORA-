'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, Map, Wallet, Compass, User, Menu, X, 
  Plane, Search
} from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/explore', label: 'Explore', icon: Compass },
  { href: '/planner', label: 'Planner', icon: Map },
  { href: '/budget', label: 'Budget', icon: Wallet },
  { href: '/safety', label: 'Safety', icon: Plane },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass" style={{ borderBottom: '1px solid rgba(232,99,122,0.12)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 no-underline">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--wayora-coral), var(--wayora-orange))' }}>
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-[family-name:var(--font-display)]"
                style={{ 
                  background: 'linear-gradient(135deg, var(--wayora-coral), var(--wayora-orange))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                Wayora
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 no-underline"
                    style={{
                      color: isActive ? 'var(--wayora-coral)' : 'var(--wayora-dark-gray)',
                      background: isActive ? 'rgba(232,99,122,0.08)' : 'transparent',
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/auth" className="btn-secondary text-sm !py-2 !px-5 no-underline">
                Log In
              </Link>
              <Link href="/auth" className="btn-primary text-sm !py-2 !px-5 no-underline">
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-xl transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: 'var(--wayora-dark-gray)' }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass animate-fade-in" style={{ borderTop: '1px solid var(--wayora-light-gray)' }}>
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium no-underline transition-all"
                    style={{
                      color: isActive ? 'var(--wayora-coral)' : 'var(--wayora-dark-gray)',
                      background: isActive ? 'rgba(232,99,122,0.08)' : 'transparent',
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3 flex gap-2">
                <Link href="/auth" className="btn-secondary text-sm !py-2 flex-1 justify-center no-underline">
                  Log In
                </Link>
                <Link href="/auth" className="btn-primary text-sm !py-2 flex-1 justify-center no-underline">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass"
        style={{ borderTop: '1px solid var(--wayora-light-gray)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex items-center justify-around py-2">
          {navLinks.slice(0, 5).map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl no-underline transition-all"
              >
                <Icon 
                  className="w-5 h-5 transition-all" 
                  style={{
                    color: isActive ? 'var(--wayora-orange)' : 'var(--wayora-gray)',
                    strokeWidth: isActive ? 2.5 : 1.5,
                  }}
                />
                <span className="text-[10px] font-medium"
                  style={{ color: isActive ? 'var(--wayora-orange)' : 'var(--wayora-gray)' }}>
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
