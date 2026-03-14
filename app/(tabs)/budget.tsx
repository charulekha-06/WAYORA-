import React, { useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
  TextInput, StatusBar, Modal, Dimensions, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WayoraColors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const breakdownData = [
  { id: 'stay', label: 'Accommodation', icon: 'home' as const, color: '#4285F4', total: 180, budget: 800 },
  { id: 'food', label: 'Food & Dining', icon: 'restaurant' as const, color: '#E67C5C', total: 150, budget: 600 },
  { id: 'transport', label: 'Transportation', icon: 'car' as const, color: '#34A853', total: 80, budget: 400 },
  { id: 'activities', label: 'Activities', icon: 'camera' as const, color: '#F29900', total: 40, budget: 500 },
];

const transactionData = [
  { id: 1, name: 'Flight to Tokyo', amount: 450.00, date: 'Mar 10' },
  { id: 2, name: 'Ryokan Check-in', amount: 120.00, date: 'Mar 10' },
  { id: 3, name: 'Ramen & Sushi', amount: 35.00, date: 'Mar 10' },
  { id: 4, name: 'Metro Day Pass', amount: 12.00, date: 'Mar 10' },
  { id: 5, name: 'TeamLab Borderless', amount: 30.00, date: 'Mar 11' },
  { id: 6, name: 'Akihabara Shopping', amount: 85.00, date: 'Mar 11' },
  { id: 7, name: 'Izakaya Dinner', amount: 40.00, date: 'Mar 11' },
];

export default function BudgetScreen() {
  const [expenses, setExpenses] = useState(transactionData);
  const [showAdd, setShowAdd] = useState(false);
  const [newExp, setNewExp] = useState({ name: '', category: 'food', amount: '' });

  const addExpense = () => {
    if (!newExp.name || !newExp.amount) return;
    setExpenses([{ id: Date.now(), name: newExp.name, amount: Number(newExp.amount), date: 'Today' }, ...expenses]);
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
            <Ionicons name="add" size={18} color="#000" />
            <Text style={styles.addBtnText}>Add Manually</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scanBtn} onPress={() => Alert.alert('Camera', 'Scan receipt feature opened!')}>
            <Ionicons name="camera-outline" size={18} color="#FFF" />
            <Text style={styles.scanBtnText}>Scan Receipt</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionHeaderTitle}>Budget Breakdown</Text>
          {breakdownData.map(c => (
            <View key={c.id} style={styles.bdCard}>
              <View style={styles.bdRow}>
                <View style={[styles.bdIconBg, { backgroundColor: c.color + '20' }]}>
                  <Ionicons name={c.icon} size={20} color={c.color} />
                </View>
                <View style={styles.bdInfo}>
                  <Text style={styles.bdTitle}>{c.label}</Text>
                  <Text style={styles.bdSub}>${c.total} of ${c.budget}</Text>
                </View>
                <View style={styles.bdRight}>
                  <Text style={styles.bdPercent}>{Math.round((c.total / c.budget) * 100)}%</Text>
                  <Text style={styles.bdSub}>${c.budget - c.total} left</Text>
                </View>
              </View>
              <View style={styles.bdTrack}>
                <View style={[styles.bdFill, { width: `${Math.min((c.total / c.budget) * 100, 100)}%`, backgroundColor: c.color }]} />
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
          
          {expenses.map(item => (
            <View key={item.id} style={styles.txCard}>
              <View style={styles.txIconBg}>
                <Ionicons name="receipt" size={20} color="#8E8E93" />
              </View>
              <View style={styles.txInfo}>
                <Text style={styles.txName}>{item.name}</Text>
                <Text style={styles.txDate}>{item.date}</Text>
              </View>
              <Text style={styles.txAmount}>${item.amount.toFixed(2)}</Text>
            </View>
          ))}
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
                {breakdownData.map(c => (
                  <TouchableOpacity 
                    key={c.id} 
                    style={[styles.catChip, newExp.category === c.id && { borderColor: c.color, backgroundColor: c.color + '10' }]}
                    onPress={() => setNewExp({ ...newExp, category: c.id })}
                  >
                    <Ionicons name={c.icon} size={16} color={newExp.category === c.id ? c.color : '#8E8E93'} />
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
  container: { flex: 1, backgroundColor: '#F9FAFC' },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20 },
  title: { fontSize: 24, fontWeight: '800', color: WayoraColors.black },
  
  overviewCard: { backgroundColor: '#F8F9FA', borderRadius: 20, padding: 20, marginHorizontal: 20, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  overviewCardTitle: { fontSize: 15, fontWeight: '700', color: '#1B1B2F', textAlign: 'center', marginBottom: 16 },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  metricBox: { backgroundColor: WayoraColors.white, padding: 14, borderRadius: 14, width: '31%', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  metricValue: { fontSize: 18, fontWeight: '800', color: '#1B1B2F', marginBottom: 4 },
  metricLabel: { fontSize: 10, color: '#8E8E93' },
  
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { fontSize: 12, fontWeight: '500', color: '#555' },
  progressBg: { height: 6, backgroundColor: '#E0E0E0', borderRadius: 3, overflow: 'hidden', marginBottom: 20 },
  progressFill: { height: '100%', backgroundColor: '#1B1B2F', borderRadius: 3 },
  
  dailyAvgRow: { backgroundColor: WayoraColors.white, flexDirection: 'row', justifyContent: 'space-between', padding: 14, borderRadius: 14 },
  dailyAvgText: { fontSize: 12, color: '#444' },
  dailyAvgValue: { fontSize: 13, fontWeight: '800', color: '#1B1B2F' },
  
  actionRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 12, marginBottom: 24 },
  addBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF', paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: '#E0E0E0', gap: 6 },
  addBtnText: { color: '#000', fontSize: 14, fontWeight: '600' },
  scanBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#5B42F3', paddingVertical: 14, borderRadius: 12, gap: 6 },
  scanBtnText: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionHeaderTitle: { fontSize: 16, fontWeight: '700', color: '#1B1B2F', marginBottom: 16 },
  
  bdCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  bdRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  bdIconBg: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  bdInfo: { flex: 1, marginLeft: 12 },
  bdTitle: { fontSize: 15, fontWeight: '700', color: '#1B1B2F' },
  bdSub: { fontSize: 12, color: '#8E8E93', marginTop: 4 },
  bdRight: { alignItems: 'flex-end' },
  bdPercent: { fontSize: 14, fontWeight: '600', color: '#555' },
  bdTrack: { height: 6, backgroundColor: '#F0F2F5', borderRadius: 3, width: '100%' },
  bdFill: { height: '100%', borderRadius: 3 },
  
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  viewAllText: { fontSize: 12, fontWeight: '600', color: '#555' },
  txCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 16, borderRadius: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  txIconBg: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F0F2F5', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  txInfo: { flex: 1 },
  txName: { fontSize: 15, fontWeight: '600', color: '#1B1B2F' },
  txDate: { fontSize: 12, color: '#8E8E93', marginTop: 4 },
  txAmount: { fontSize: 15, fontWeight: '800', color: '#1B1B2F' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modal: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#1B1B2F' },
  catChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  catChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#F8F9FA', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#E0E0E0' },
  catChipText: { fontSize: 13, fontWeight: '600', color: '#555' },
  modalInput: { backgroundColor: '#F8F9FA', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 14, marginBottom: 16, borderWidth: 1, borderColor: '#E0E0E0' },
  modalSubmit: { backgroundColor: '#5B42F3', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  modalSubmitText: { fontSize: 15, fontWeight: '700', color: '#fff' }
});
