'use client';

import { useState } from 'react';
import { 
  Wallet, Plus, Camera, TrendingUp, Receipt,
  Utensils, Car, Home, ShoppingBag, Ticket,
  Plane, Coffee, X, Check
} from 'lucide-react';

const categories = [
  { id: 'food', label: 'Food', icon: Utensils, color: 'var(--wayora-orange)' },
  { id: 'transport', label: 'Transport', icon: Car, color: 'var(--wayora-blue)' },
  { id: 'stay', label: 'Stay', icon: Home, color: 'var(--wayora-coral)' },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag, color: '#C77DBA' },
  { id: 'activities', label: 'Activities', icon: Ticket, color: 'var(--wayora-green)' },
  { id: 'flight', label: 'Flight', icon: Plane, color: 'var(--wayora-dark-gray)' },
  { id: 'other', label: 'Other', icon: Coffee, color: 'var(--wayora-gray)' },
];

const initialExpenses = [
  { id: 1, name: 'Flight to Tokyo', category: 'flight', amount: 450, date: 'Mar 10' },
  { id: 2, name: 'Ryokan Check-in', category: 'stay', amount: 120, date: 'Mar 10' },
  { id: 3, name: 'Ramen & Sushi', category: 'food', amount: 35, date: 'Mar 10' },
  { id: 4, name: 'Metro Day Pass', category: 'transport', amount: 12, date: 'Mar 10' },
  { id: 5, name: 'TeamLab Borderless', category: 'activities', amount: 30, date: 'Mar 11' },
  { id: 6, name: 'Akihabara Shopping', category: 'shopping', amount: 85, date: 'Mar 11' },
  { id: 7, name: 'Izakaya Dinner', category: 'food', amount: 40, date: 'Mar 11' },
  { id: 8, name: 'Shinkansen Ticket', category: 'transport', amount: 45, date: 'Mar 12' },
  { id: 9, name: 'Onsen Experience', category: 'activities', amount: 25, date: 'Mar 12' },
  { id: 10, name: 'Kaiseki Dinner', category: 'food', amount: 60, date: 'Mar 12' },
];

export default function BudgetPage() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpense, setNewExpense] = useState({ name: '', category: 'food', amount: '' });
  const totalBudget = 2500;
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = totalBudget - totalSpent;
  const percentage = (totalSpent / totalBudget) * 100;

  const categoryBreakdown = categories.map(cat => {
    const total = expenses.filter(e => e.category === cat.id).reduce((sum, e) => sum + e.amount, 0);
    return { ...cat, total };
  }).filter(c => c.total > 0).sort((a, b) => b.total - a.total);

  const addExpense = () => {
    if (!newExpense.name || !newExpense.amount) return;
    setExpenses([...expenses, {
      id: Date.now(), name: newExpense.name, category: newExpense.category,
      amount: Number(newExpense.amount), date: 'Mar 12',
    }]);
    setNewExpense({ name: '', category: 'food', amount: '' });
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--wayora-off-white)' }}>
      <section className="py-12 sm:py-16"
        style={{ background: 'linear-gradient(135deg, #FEF3EA 0%, #FDF2F4 50%, #F0F4FF 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{ background: 'rgba(242,140,56,0.08)', border: '1px solid rgba(242,140,56,0.15)' }}>
            <Wallet className="w-4 h-4" style={{ color: 'var(--wayora-orange)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--wayora-orange)' }}>Smart Budget</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--wayora-black)' }}>
            Track your <span className="gradient-text">spending</span>
          </h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 -mt-4 pb-12 space-y-6">
        {/* Budget Overview */}
        <div className="rounded-2xl p-6" style={{ background: 'var(--wayora-white)', boxShadow: 'var(--shadow-lg)' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--wayora-gray)' }}>Tokyo, Japan Trip</p>
              <h2 className="text-2xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--wayora-black)' }}>
                ${totalSpent.toLocaleString()} <span className="text-base font-normal" style={{ color: 'var(--wayora-gray)' }}>/ ${totalBudget.toLocaleString()}</span>
              </h2>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium" style={{ color: 'var(--wayora-gray)' }}>Remaining</p>
              <p className="text-lg font-bold" style={{ color: remaining > 0 ? 'var(--wayora-green)' : 'var(--wayora-red)' }}>
                ${remaining.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="w-full h-4 rounded-full overflow-hidden" style={{ background: 'var(--wayora-light-gray)' }}>
            <div className="h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(percentage, 100)}%`,
                background: percentage > 90 ? 'var(--wayora-red)' : percentage > 70 ? 'var(--wayora-orange)' : 'var(--wayora-black)' }} />
          </div>
          <p className="text-xs mt-2 font-medium" style={{ color: 'var(--wayora-gray)' }}>{percentage.toFixed(0)}% of budget used</p>
        </div>

        {/* Category Breakdown */}
        <div className="rounded-2xl p-6" style={{ background: 'var(--wayora-white)', boxShadow: 'var(--shadow-card)' }}>
          <h3 className="text-base font-bold mb-4" style={{ color: 'var(--wayora-black)' }}>
            <TrendingUp className="w-4 h-4 inline mr-2" style={{ color: 'var(--wayora-coral)' }} />
            Spending by Category
          </h3>
          <div className="space-y-3">
            {categoryBreakdown.map(cat => {
              const Icon = cat.icon;
              const pct = (cat.total / totalSpent) * 100;
              return (
                <div key={cat.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${cat.color}12` }}>
                    <Icon className="w-4 h-4" style={{ color: cat.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium" style={{ color: 'var(--wayora-black)' }}>{cat.label}</span>
                      <span className="text-sm font-bold" style={{ color: 'var(--wayora-black)' }}>${cat.total}</span>
                    </div>
                    <div className="w-full h-2 rounded-full" style={{ background: 'var(--wayora-light-gray)' }}>
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: cat.color }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setShowAddForm(true)} className="btn-primary justify-center !rounded-2xl !py-4">
            <Plus className="w-5 h-5" /> Add Expense
          </button>
          <button className="btn-secondary justify-center !rounded-2xl !py-4">
            <Camera className="w-5 h-5" /> Scan Bill (OCR)
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="rounded-2xl p-6 animate-fade-in-up"
            style={{ background: 'var(--wayora-white)', boxShadow: 'var(--shadow-lg)', border: '1.5px solid var(--wayora-coral)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold" style={{ color: 'var(--wayora-black)' }}>New Expense</h3>
              <button onClick={() => setShowAddForm(false)}><X className="w-5 h-5" style={{ color: 'var(--wayora-gray)' }} /></button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Expense name" value={newExpense.name}
                onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: 'var(--wayora-off-white)', border: '1px solid var(--wayora-light-gray)' }} />
              <input type="number" placeholder="Amount ($)" value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: 'var(--wayora-off-white)', border: '1px solid var(--wayora-light-gray)' }} />
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => setNewExpense({ ...newExpense, category: cat.id })}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{
                      background: newExpense.category === cat.id ? `${cat.color}15` : 'var(--wayora-off-white)',
                      color: newExpense.category === cat.id ? cat.color : 'var(--wayora-gray)',
                      border: newExpense.category === cat.id ? `1.5px solid ${cat.color}` : '1px solid var(--wayora-light-gray)',
                    }}>{cat.label}</button>
                ))}
              </div>
              <button onClick={addExpense} className="btn-primary w-full justify-center !py-3">
                <Check className="w-4 h-4" /> Add Expense
              </button>
            </div>
          </div>
        )}

        {/* Expense List */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--wayora-white)', boxShadow: 'var(--shadow-card)' }}>
          <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--wayora-light-gray)' }}>
            <h3 className="text-base font-bold" style={{ color: 'var(--wayora-black)' }}>
              <Receipt className="w-4 h-4 inline mr-2" style={{ color: 'var(--wayora-orange)' }} />Recent Expenses
            </h3>
          </div>
          <div className="divide-y" style={{ borderColor: 'var(--wayora-light-gray)' }}>
            {expenses.slice().reverse().map(exp => {
              const cat = categories.find(c => c.id === exp.category);
              const Icon = cat?.icon || Coffee;
              return (
                <div key={exp.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${cat?.color || 'var(--wayora-gray)'}12` }}>
                    <Icon className="w-4 h-4" style={{ color: cat?.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--wayora-black)' }}>{exp.name}</p>
                    <p className="text-xs" style={{ color: 'var(--wayora-gray)' }}>{exp.date}</p>
                  </div>
                  <span className="text-sm font-bold" style={{ color: 'var(--wayora-black)' }}>-${exp.amount}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
