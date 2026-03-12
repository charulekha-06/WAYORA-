import React, { useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
  TextInput, StatusBar, Modal, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WayoraColors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const categories = [
  { id: 'food', label: 'Food', icon: 'restaurant-outline' as const, color: WayoraColors.orange },
  { id: 'transport', label: 'Transport', icon: 'car-outline' as const, color: WayoraColors.blue },
  { id: 'stay', label: 'Stay', icon: 'home-outline' as const, color: WayoraColors.coral },
  { id: 'shopping', label: 'Shopping', icon: 'bag-outline' as const, color: WayoraColors.purple },
  { id: 'activities', label: 'Activities', icon: 'ticket-outline' as const, color: WayoraColors.green },
  { id: 'flight', label: 'Flight', icon: 'airplane-outline' as const, color: WayoraColors.darkGray },
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

export default function BudgetScreen() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [showAdd, setShowAdd] = useState(false);
  const [newExp, setNewExp] = useState({ name: '', category: 'food', amount: '' });
  const totalBudget = 2500;
  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
  const remaining = totalBudget - totalSpent;
  const pct = (totalSpent / totalBudget) * 100;

  const breakdown = categories.map(c => ({
    ...c, total: expenses.filter(e => e.category === c.id).reduce((s, e) => s + e.amount, 0),
  })).filter(c => c.total > 0).sort((a, b) => b.total - a.total);

  const addExpense = () => {
    if (!newExp.name || !newExp.amount) return;
    setExpenses([...expenses, { id: Date.now(), name: newExp.name, category: newExp.category, amount: Number(newExp.amount), date: 'Mar 12' }]);
    setNewExp({ name: '', category: 'food', amount: '' });
    setShowAdd(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.badge}>
            <Ionicons name="wallet-outline" size={14} color={WayoraColors.orange} />
            <Text style={[styles.badgeText, { color: WayoraColors.orange }]}>Smart Budget</Text>
          </View>
          <Text style={styles.title}>Track your <Text style={{ color: WayoraColors.coral }}>spending</Text></Text>
        </View>

        {/* Overview */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewTop}>
            <View>
              <Text style={styles.overviewSubtitle}>Tokyo, Japan Trip</Text>
              <Text style={styles.overviewAmount}>${totalSpent.toLocaleString()} <Text style={styles.overviewTotal}>/ ${totalBudget.toLocaleString()}</Text></Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.overviewSubtitle}>Remaining</Text>
              <Text style={[styles.remainingAmount, { color: remaining > 0 ? WayoraColors.green : WayoraColors.red }]}>${remaining.toLocaleString()}</Text>
            </View>
          </View>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${Math.min(pct, 100)}%`, backgroundColor: pct > 90 ? WayoraColors.red : pct > 70 ? WayoraColors.orange : WayoraColors.black }]} />
          </View>
          <Text style={styles.progressLabel}>{pct.toFixed(0)}% of budget used</Text>
        </View>

        {/* Category Breakdown */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            <Ionicons name="trending-up-outline" size={16} color={WayoraColors.coral} />{' '}Spending by Category
          </Text>
          {breakdown.map(cat => (
            <View key={cat.id} style={styles.catRow}>
              <View style={[styles.catIcon, { backgroundColor: cat.color + '15' }]}>
                <Ionicons name={cat.icon} size={16} color={cat.color} />
              </View>
              <View style={styles.catInfo}>
                <View style={styles.catHeader}>
                  <Text style={styles.catLabel}>{cat.label}</Text>
                  <Text style={styles.catAmount}>${cat.total}</Text>
                </View>
                <View style={styles.catBarBg}>
                  <View style={[styles.catBarFill, { width: `${(cat.total / totalSpent) * 100}%`, backgroundColor: cat.color }]} />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.addBtnText}>Add Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scanBtn}>
            <Ionicons name="camera-outline" size={20} color={WayoraColors.darkGray} />
            <Text style={styles.scanBtnText}>Scan Bill</Text>
          </TouchableOpacity>
        </View>

        {/* Expense List */}
        <View style={[styles.card, { marginBottom: 30 }]}>
          <Text style={styles.cardTitle}>
            <Ionicons name="receipt-outline" size={16} color={WayoraColors.orange} />{' '}Recent Expenses
          </Text>
          {expenses.slice().reverse().map(exp => {
            const cat = categories.find(c => c.id === exp.category);
            return (
              <View key={exp.id} style={styles.expItem}>
                <View style={[styles.catIcon, { backgroundColor: (cat?.color || WayoraColors.gray) + '15' }]}>
                  <Ionicons name={cat?.icon || 'ellipsis-horizontal'} size={16} color={cat?.color || WayoraColors.gray} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.expName}>{exp.name}</Text>
                  <Text style={styles.expDate}>{exp.date}</Text>
                </View>
                <Text style={styles.expAmount}>-${exp.amount}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Add Expense Modal */}
      <Modal visible={showAdd} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Expense</Text>
              <TouchableOpacity onPress={() => setShowAdd(false)}>
                <Ionicons name="close" size={24} color={WayoraColors.gray} />
              </TouchableOpacity>
            </View>
            <TextInput style={styles.modalInput} placeholder="Expense name" value={newExp.name} onChangeText={t => setNewExp({ ...newExp, name: t })} />
            <TextInput style={styles.modalInput} placeholder="Amount ($)" keyboardType="numeric" value={newExp.amount} onChangeText={t => setNewExp({ ...newExp, amount: t })} />
            <View style={styles.catChips}>
              {categories.map(c => (
                <TouchableOpacity key={c.id} onPress={() => setNewExp({ ...newExp, category: c.id })}
                  style={[styles.catChip, newExp.category === c.id && { borderColor: c.color, backgroundColor: c.color + '10' }]}>
                  <Text style={[styles.catChipText, newExp.category === c.id && { color: c.color }]}>{c.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.modalSubmit} onPress={addExpense}>
              <Text style={styles.modalSubmitText}>Add Expense</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WayoraColors.offWhite },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 16 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', backgroundColor: 'rgba(242,140,56,0.08)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginBottom: 8 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  title: { fontSize: 26, fontWeight: '800', color: WayoraColors.black },
  overviewCard: { marginHorizontal: 20, backgroundColor: WayoraColors.white, borderRadius: 20, padding: 20, shadowColor: WayoraColors.black, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 5 },
  overviewTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  overviewSubtitle: { fontSize: 11, color: WayoraColors.gray, fontWeight: '500' },
  overviewAmount: { fontSize: 22, fontWeight: '800', color: WayoraColors.black, marginTop: 4 },
  overviewTotal: { fontSize: 14, fontWeight: '400', color: WayoraColors.gray },
  remainingAmount: { fontSize: 18, fontWeight: '700', marginTop: 4 },
  progressBg: { height: 10, backgroundColor: WayoraColors.lightGray, borderRadius: 5, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 5 },
  progressLabel: { fontSize: 11, color: WayoraColors.gray, marginTop: 6, fontWeight: '500' },
  card: { marginHorizontal: 20, marginTop: 16, backgroundColor: WayoraColors.white, borderRadius: 18, padding: 16, shadowColor: WayoraColors.black, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: WayoraColors.black, marginBottom: 14 },
  catRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  catIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  catInfo: { flex: 1 },
  catHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  catLabel: { fontSize: 13, fontWeight: '500', color: WayoraColors.black },
  catAmount: { fontSize: 13, fontWeight: '700', color: WayoraColors.black },
  catBarBg: { height: 6, backgroundColor: WayoraColors.lightGray, borderRadius: 3, overflow: 'hidden' },
  catBarFill: { height: '100%', borderRadius: 3 },
  actionRow: { flexDirection: 'row', gap: 10, marginHorizontal: 20, marginTop: 16 },
  addBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: WayoraColors.coral, paddingVertical: 14, borderRadius: 14 },
  addBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  scanBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: WayoraColors.white, paddingVertical: 14, borderRadius: 14, borderWidth: 1.5, borderColor: WayoraColors.lightGray },
  scanBtnText: { fontSize: 14, fontWeight: '600', color: WayoraColors.darkGray },
  expItem: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: WayoraColors.lightGray },
  expName: { fontSize: 13, fontWeight: '600', color: WayoraColors.black },
  expDate: { fontSize: 11, color: WayoraColors.gray, marginTop: 2 },
  expAmount: { fontSize: 14, fontWeight: '700', color: WayoraColors.black },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modal: { backgroundColor: WayoraColors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: WayoraColors.black },
  modalInput: { backgroundColor: WayoraColors.offWhite, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 14, marginBottom: 12, borderWidth: 1, borderColor: WayoraColors.lightGray },
  catChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  catChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, borderWidth: 1.5, borderColor: WayoraColors.lightGray },
  catChipText: { fontSize: 12, fontWeight: '600', color: WayoraColors.gray },
  modalSubmit: { backgroundColor: WayoraColors.coral, paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  modalSubmitText: { fontSize: 15, fontWeight: '700', color: '#fff' },
});
