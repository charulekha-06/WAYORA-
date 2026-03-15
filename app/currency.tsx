import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, TextInput, Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { WayoraColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.0 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.0 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 150.0 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.52 },
];

export default function CurrencyScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState(CURRENCIES[0]);
  const [to, setTo] = useState(CURRENCIES[1]);

  const convert = (val: string) => {
    const num = parseFloat(val) || 0;
    const result = (num / from.rate) * to.rate;
    return result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={WayoraColors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Currency Converter</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.card}>
          <View style={styles.inputSection}>
            <Text style={styles.label}>Amount to Convert</Text>
            <View style={styles.amountBox}>
              <View style={styles.symbolBox}>
                <Text style={styles.boxSymbol}>{from.symbol}</Text>
              </View>
              <TextInput 
                style={styles.amountInput}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>

          <View style={styles.converterGrid}>
            <View style={styles.currencySelector}>
              <Text style={styles.label}>From</Text>
              <View style={styles.pickerBox}>
                {CURRENCIES.map((c) => (
                  <TouchableOpacity 
                    key={c.code} 
                    style={[styles.miniChip, from.code === c.code && styles.miniChipActive]}
                    onPress={() => setFrom(c)}
                  >
                    <Text style={[styles.miniText, from.code === c.code && { color: 'white' }]}>{c.code}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.swapBtn} onPress={swap}>
              <Ionicons name="swap-vertical" size={20} color={WayoraColors.black} />
            </TouchableOpacity>

            <View style={styles.currencySelector}>
              <Text style={styles.label}>To</Text>
              <View style={styles.pickerBox}>
                {CURRENCIES.map((c) => (
                  <TouchableOpacity 
                    key={c.code} 
                    style={[styles.miniChip, to.code === c.code && styles.miniChipActive]}
                    onPress={() => setTo(c)}
                  >
                    <Text style={[styles.miniText, to.code === c.code && { color: 'white' }]}>{c.code}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.resultSection}>
          <LinearGradient colors={['#14B8A6', '#0D9488']} style={styles.resultCard}>
            <Text style={styles.resultLabel}>Converted Amount</Text>
            <View style={styles.resultRow}>
              <Text style={styles.resultSymbol}>{to.symbol}</Text>
              <Text style={styles.resultValue}>{convert(amount)}</Text>
            </View>
            <Text style={styles.rateText}>1 {from.code} = {(to.rate / from.rate).toFixed(4)} {to.code}</Text>
          </LinearGradient>
          
          <View style={styles.footerNote}>
            <Ionicons name="information-circle-outline" size={14} color={WayoraColors.gray} />
            <Text style={styles.footerText}>Rates are provided for informational purposes and may vary.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0FDFA' },
  header: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
    paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15, backgroundColor: 'white' 
  },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F1F3F5', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: WayoraColors.black },

  card: { backgroundColor: 'white', borderRadius: 24, padding: 25, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  label: { fontSize: 13, fontWeight: '700', color: WayoraColors.gray, marginBottom: 10 },
  inputSection: { marginBottom: 25 },
  amountBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F8FAFC', 
    borderRadius: 20, 
    padding: 12, 
    borderWidth: 1.5, 
    borderColor: '#E2E8F0' 
  },
  symbolBox: { 
    width: 48, 
    height: 48, 
    borderRadius: 14, 
    backgroundColor: 'white', 
    alignItems: 'center', 
    justifyContent: 'center', 
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 1
  },
  boxSymbol: { fontSize: 22, fontWeight: '700', color: '#111827' },
  amountInput: { 
    flex: 1, 
    fontSize: 32, 
    fontWeight: '800', 
    color: '#111827', 
    marginLeft: 15,
    paddingVertical: 8
  },

  converterGrid: { gap: 15 },
  pickerBox: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  miniChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB' },
  miniChipActive: { backgroundColor: '#14B8A6', borderColor: '#14B8A6' },
  miniText: { fontSize: 12, fontWeight: '700', color: WayoraColors.gray },
  swapBtn: { alignSelf: 'center', width: 44, height: 44, borderRadius: 22, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', marginVertical: 5 },

  resultSection: { marginTop: 20 },
  resultCard: { padding: 30, borderRadius: 24, shadowColor: '#14B8A6', shadowOpacity: 0.2, shadowRadius: 15, elevation: 8 },
  resultLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '600' },
  resultRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  resultSymbol: { fontSize: 24, color: 'white', marginRight: 8, marginTop: 4 },
  resultValue: { fontSize: 40, fontWeight: '900', color: 'white' },
  rateText: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 15, fontStyle: 'italic' },
  
  footerNote: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 20, paddingHorizontal: 10 },
  footerText: { fontSize: 11, color: WayoraColors.gray, flex: 1 },
});
