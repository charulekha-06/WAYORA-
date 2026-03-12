'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plane, Mail, Lock, User, Phone, Eye, EyeOff,
  ArrowRight, Chrome
} from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4"
      style={{ background: 'linear-gradient(135deg, #FDF2F4 0%, #FEF3EA 30%, #F0F4FF 70%, #F2FFF6 100%)' }}>
      
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, var(--wayora-coral), var(--wayora-orange))' }}>
            <Plane className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--wayora-black)' }}>
            {isLogin ? 'Welcome back!' : 'Join Wayora'}
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--wayora-gray)' }}>
            {isLogin ? 'Log in to continue your journey' : 'Start your travel adventure today'}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-6 sm:p-8"
          style={{ background: 'var(--wayora-white)', boxShadow: 'var(--shadow-xl)' }}>
          
          {/* Tabs */}
          <div className="flex rounded-xl p-1 mb-6" style={{ background: 'var(--wayora-off-white)' }}>
            <button onClick={() => setIsLogin(true)}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: isLogin ? 'var(--wayora-white)' : 'transparent',
                color: isLogin ? 'var(--wayora-coral)' : 'var(--wayora-gray)',
                boxShadow: isLogin ? 'var(--shadow-sm)' : 'none',
              }}>
              Log In
            </button>
            <button onClick={() => setIsLogin(false)}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: !isLogin ? 'var(--wayora-white)' : 'transparent',
                color: !isLogin ? 'var(--wayora-coral)' : 'var(--wayora-gray)',
                boxShadow: !isLogin ? 'var(--shadow-sm)' : 'none',
              }}>
              Sign Up
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--wayora-gray)' }} />
                <input type="text" placeholder="Full name"
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                  style={{ background: 'var(--wayora-off-white)', border: '1.5px solid var(--wayora-light-gray)', color: 'var(--wayora-black)' }} />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--wayora-gray)' }} />
              <input type="email" placeholder="Email address"
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                style={{ background: 'var(--wayora-off-white)', border: '1.5px solid var(--wayora-light-gray)', color: 'var(--wayora-black)' }} />
            </div>

            {!isLogin && (
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--wayora-gray)' }} />
                <input type="tel" placeholder="Phone number"
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                  style={{ background: 'var(--wayora-off-white)', border: '1.5px solid var(--wayora-light-gray)', color: 'var(--wayora-black)' }} />
              </div>
            )}

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--wayora-gray)' }} />
              <input type={showPassword ? 'text' : 'password'} placeholder="Password"
                className="w-full pl-11 pr-11 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                style={{ background: 'var(--wayora-off-white)', border: '1.5px solid var(--wayora-light-gray)', color: 'var(--wayora-black)' }} />
              <button onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--wayora-gray)' }}>
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-xs font-medium no-underline" style={{ color: 'var(--wayora-coral)' }}>
                  Forgot password?
                </a>
              </div>
            )}

            <button className="btn-primary w-full justify-center !py-3.5 group">
              {isLogin ? 'Log In' : 'Create Account'}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1" style={{ background: 'var(--wayora-light-gray)' }} />
            <span className="text-xs" style={{ color: 'var(--wayora-gray)' }}>or continue with</span>
            <div className="h-px flex-1" style={{ background: 'var(--wayora-light-gray)' }} />
          </div>

          {/* Social */}
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5"
            style={{ background: 'var(--wayora-off-white)', border: '1.5px solid var(--wayora-light-gray)', color: 'var(--wayora-black)' }}>
            <Chrome className="w-5 h-5" />
            Google
          </button>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--wayora-gray)' }}>
          By continuing, you agree to Wayora&apos;s{' '}
          <a href="#" className="no-underline font-medium" style={{ color: 'var(--wayora-coral)' }}>Terms</a> and{' '}
          <a href="#" className="no-underline font-medium" style={{ color: 'var(--wayora-coral)' }}>Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
