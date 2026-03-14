import React, { useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
  TextInput, StatusBar, Modal, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WayoraColors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const categories = [
  { id: '1', label: 'Stay', icon: 'home-outline' as const, color: WayoraColors.coral },
  { id: '2', label: 'Food', icon: 'restaurant-outline' as const, color: WayoraColors.orange },
  { id: '3', label: 'Transport', icon: 'car-outline' as const, color: WayoraColors.blue },
  { id: '4', label: 'Activities', icon: 'ticket-outline' as const, color: WayoraColors.green },
  { id: '5', label: 'General', icon: 'ellipsis-horizontal' as const, color: WayoraColors.gray }
];

const initialExpenses = [
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
          <Text style={styles.title}>Budget Tracker</Text>
        </View>

        {/* Paris Budget Card */}
        <View style={styles.overviewCard}>
          <Text style={styles.overviewCardTitle}>Paris Trip Budget</Text>
          
          <View style={styles.metricsRow}>
            <View style={styles.metricBox}>
              <Text style={styles.metricValue}>$1,250</Text>
              <Text style={styles.metricLabel}>Total Budget</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricValue}>$420</Text>
              <Text style={styles.metricLabel}>Spent So Far</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricValue}>$830</Text>
              <Text style={styles.metricLabel}>Remaining</Text>
            </View>
          </View>

          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Budget used: 33%</Text>
            <Text style={styles.progressLabel}>5 days left</Text>
          </View>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: '33%' }]} />
          </View>

          <View style={styles.dailyAvgRow}>
            <Text style={styles.dailyAvgText}>Safe to spend daily:</Text>
            <Text style={styles.dailyAvgValue}>$166 / day</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.addBtnText}>Add Manually</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scanBtn}>
            <Ionicons name="scan" size={20} color={WayoraColors.darkGray} />
            <Text style={styles.scanBtnText}>Scan Receipt</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionHeaderTitle}>Expense Breakdown</Text>
          {breakdown.map(c => (
            <View key={c.id} style={styles.breakdownCard}>
              <View style={styles.breakdownTop}>
                <View style={styles.catHeaderLeft}>
                  <View style={[styles.catIconWrap, { backgroundColor: c.color + '15' }]}>
                    <Ionicons name={c.icon} size={20} color={c.color} />
                  </View>
                  <View>
                    <Text style={styles.catTitle}>{c.label}</Text>
                    <Text style={styles.catSubtext}>${c.total} / ${c.budget ?? 0}</Text>
                  </View>
                </View>
                <Text style={styles.catTitle}>{Math.round((c.total / (c.budget ?? 1)) * 100)}%</Text>
              </View>
              <View style={styles.catProgressBg}>
                <View style={[styles.catProgressFill, { width: `${Math.min((c.total / (c.budget ?? 1)) * 100, 100)}%` }]} />
              </View>
            </View>
          ))}
        </View>

        {/* Transactions List */}
        <View style={styles.section}>
          <View style={styles.listHeader}>
            <Text style={styles.sectionHeaderTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {expenses.map(item => {
            const cat = categories.find(c => c.id === item.category);
            return (
              <View key={item.id} style={styles.transactionCard}>
                <View style={[styles.catIconWrap, { backgroundColor: cat ? cat.color + '15' : WayoraColors.lightGray, marginRight: 12 }]}>
                  <Ionicons name={cat?.icon ?? 'receipt'} size={20} color={cat?.color ?? WayoraColors.gray} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.tranName}>{item.name}</Text>
                  <Text style={styles.tranSubtext}>{item.date}</Text>
                </View>
                <Text style={styles.tranAmount}>${item.amount.toFixed(2)}</Text>
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
                <Text style={styles.modalTitle}>Add Expense</Text>
                <TouchableOpacity onPress={() => setShowAdd(false)}>
                  <Ionicons name="close" size={24} color={WayoraColors.gray} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.catChips}>
                {categories.map(c => (
                  <TouchableOpacity 
                    key={c.id} 
                    style={[styles.catChip, newExp.category === c.id && { borderColor: c.color, backgroundColor: c.color + '10' }]}
                    onPress={() => setNewExp({ ...newExp, category: c.id })}
                  >
                    <Ionicons name={c.icon} size={16} color={newExp.category === c.id ? c.color : WayoraColors.gray} />
                    <Text style={[styles.catChipText, newExp.category === c.id && { color: c.color }]}>{c.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput 
                style={styles.modalInput} 
                placeholder="Amount (e.g., 25.00)" 
                keyboardType="numeric" 
                value={newExp.amount}
                onChangeText={t => setNewExp({ ...newExp, amount: t })}
              />
              <TextInput 
                style={styles.modalInput} 
                placeholder="Description (e.g., Lunch at Cafe)" 
                value={newExp.name}
                onChangeText={t => setNewExp({ ...newExp, name: t })}
              />
              <TouchableOpacity style={styles.modalSubmit} onPress={addExpense}>
                <Text style={styles.modalSubmitText}>Save Expense</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WayoraColors.offWhite },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20 },
  title: { fontSize: 28, fontWeight: '800', color: WayoraColors.black },
  
  overviewCard: { backgroundColor: '#F8F9FA', borderRadius: 24, padding: 24, marginHorizontal: 20, marginBottom: 24, borderWidth: 1, borderColor: '#ECECEC' },
  overviewCardTitle: { fontSize: 16, fontWeight: '700', color: WayoraColors.black, textAlign: 'center', marginBottom: 20 },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  metricBox: { backgroundColor: WayoraColors.white, padding: 16, borderRadius: 16, width: '31%', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  metricValue: { fontSize: 20, fontWeight: '800', marginBottom: 4 },
  metricLabel: { fontSize: 10, color: WayoraColors.gray },
  
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { fontSize: 13, fontWeight: '600', color: WayoraColors.black },
  progressBg: { height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, overflow: 'hidden', marginBottom: 24 },
  progressFill: { height: '100%', backgroundColor: WayoraColors.black, borderRadius: 4 },
  
  dailyAvgRow: { backgroundColor: WayoraColors.white, flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderRadius: 16 },
  dailyAvgText: { fontSize: 13, color: WayoraColors.black },
  dailyAvgValue: { fontSize: 14, fontWeight: '800', color: WayoraColors.black },
  
  actionRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 12, marginBottom: 30 },
  addBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: WayoraColors.black, paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: '#ECECEC', gap: 6 },
  addBtnText: { color: WayoraColors.white, fontSize: 14, fontWeight: '600' },
  scanBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#4834D4', paddingVertical: 14, borderRadius: 12, gap: 6 },
  scanBtnText: { color: WayoraColors.white, fontSize: 14, fontWeight: '600' },
  
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionHeaderTitle: { fontSize: 16, fontWeight: '700', color: WayoraColors.black, marginBottom: 16 },
  
  breakdownCard: { backgroundColor: WayoraColors.white, padding: 16, borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: '#ECECEC' },
  breakdownTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  catHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  catIconWrap: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  catTitle: { fontSize: 14, fontWeight: '600', color: WayoraColors.black },
  catSubtext: { fontSize: 12, color: WayoraColors.gray, marginTop: 4 },
  catProgressBg: { height: 6, backgroundColor: '#E0E0E0', borderRadius: 3, overflow: 'hidden' },
  catProgressFill: { height: '100%', backgroundColor: WayoraColors.black, borderRadius: 3 },
  
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  viewAllText: { fontSize: 13, fontWeight: '600', color: WayoraColors.black },
  transactionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: WayoraColors.white, padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#ECECEC' },
  tranName: { fontSize: 14, fontWeight: '600', color: WayoraColors.black },
  tranSubtext: { fontSize: 11, color: WayoraColors.gray, marginTop: 4 },
  tranAmount: { fontSize: 14, fontWeight: '800', color: WayoraColors.black },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modal: { backgroundColor: WayoraColors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: WayoraColors.black },
  catChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  catChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: WayoraColors.offWhite, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderWidth: 1.5, borderColor: WayoraColors.lightGray },
  catChipText: { fontSize: 13, fontWeight: '600', color: WayoraColors.gray },
  modalInput: { backgroundColor: '#F8F9FA', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 14, marginBottom: 16, borderWidth: 1, borderColor: '#ECECEC' },
  modalSubmit: { backgroundColor: '#4834D4', paddingVertical: 14, borderRadius: 14, alignItems: 'center', marginTop: 10 },
  modalSubmitText: { fontSize: 15, fontWeight: '700', color: '#fff' }
});
