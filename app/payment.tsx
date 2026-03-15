import React from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, 
  StatusBar, TextInput 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WayoraColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { name, price, quantity } = params as { 
    name: string; 
    price: string; 
    quantity: string 
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
          <Ionicons name="chevron-back" size={24} color={WayoraColors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Progress Stepper */}
        <View style={styles.stepper}>
          <View style={styles.step}>
             <View style={[styles.stepDot, styles.stepDotActive]}>
                <Ionicons name="checkmark" size={12} color="white" />
             </View>
             <Text style={styles.stepLabel}>Order</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.step}>
             <View style={[styles.stepDot, styles.stepDotActive]} />
             <Text style={styles.stepLabel}>Payment</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.step}>
             <View style={styles.stepDot} />
             <Text style={styles.stepLabel}>Confirm</Text>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.orderCard}>
             <View style={styles.orderItem}>
                <View style={styles.itemInfo}>
                   <Text style={styles.itemName}>{name || "Product"}</Text>
                   <Text style={styles.itemQty}>Quantity: {quantity || "1"}</Text>
                </View>
                <Text style={styles.itemPrice}>${price || "0"}</Text>
             </View>
             <View style={styles.itemDivider} />
             <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${price || "0"}</Text>
             </View>
             <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={[styles.summaryValue, { color: '#05C46B' }]}>FREE</Text>
             </View>
             <View style={styles.itemDivider} />
             <View style={[styles.summaryRow, { marginTop: 10 }]}>
                <Text style={styles.totalLabel}>Total Payment</Text>
                <Text style={styles.totalValue}>${price || "0"}</Text>
             </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
           <Text style={styles.sectionTitle}>Payment Method</Text>
           <TouchableOpacity style={styles.methodCard}>
              <Ionicons name="card-outline" size={24} color={WayoraColors.black} />
              <View style={styles.methodInfo}>
                 <Text style={styles.methodName}>Credit / Debit Card</Text>
                 <Text style={styles.methodDetail}>**** **** **** 4242</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={WayoraColors.gray} />
           </TouchableOpacity>
           
           <TouchableOpacity style={[styles.methodCard, { marginTop: 12 }]}>
              <Ionicons name="logo-apple" size={22} color={WayoraColors.black} />
              <View style={styles.methodInfo}>
                 <Text style={styles.methodName}>Apple Pay</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={WayoraColors.gray} />
           </TouchableOpacity>
        </View>

        {/* Note */}
        <View style={styles.noteBox}>
           <Ionicons name="shield-checkmark" size={20} color="#05C46B" />
           <Text style={styles.noteText}>Your payment information is encrypted and secure.</Text>
        </View>
      </ScrollView>

      {/* Pay Button */}
      <View style={styles.footer}>
         <TouchableOpacity style={styles.payBtn} onPress={() => router.push('/(tabs)')}>
            <LinearGradient 
              colors={['#FF8A00', '#FF5A36']} 
              style={styles.payGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
               <Text style={styles.payText}>Pay Now • ${price || "0"}</Text>
            </LinearGradient>
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
    paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15, backgroundColor: 'white' 
  },
  headerBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: WayoraColors.black },
  
  scrollContent: { paddingBottom: 100 },
  
  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 30, backgroundColor: 'white', marginBottom: 10 },
  step: { alignItems: 'center', gap: 8 },
  stepDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  stepDotActive: { backgroundColor: WayoraColors.black },
  stepLabel: { fontSize: 10, fontWeight: '700', color: WayoraColors.gray, textTransform: 'uppercase' },
  stepLine: { width: 50, height: 2, backgroundColor: '#F3F4F6', marginHorizontal: 10, marginTop: -15 },

  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: WayoraColors.black, marginBottom: 15 },
  
  orderCard: { backgroundColor: 'white', borderRadius: 20, padding: 20 },
  orderItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemInfo: { gap: 4 },
  itemName: { fontSize: 15, fontWeight: '700', color: WayoraColors.black },
  itemQty: { fontSize: 13, color: WayoraColors.gray },
  itemPrice: { fontSize: 16, fontWeight: '800', color: WayoraColors.black },
  itemDivider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 15 },
  
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: WayoraColors.gray },
  summaryValue: { fontSize: 14, fontWeight: '700', color: WayoraColors.black },
  
  totalLabel: { fontSize: 16, fontWeight: '800', color: WayoraColors.black },
  totalValue: { fontSize: 22, fontWeight: '900', color: '#FF5A36' },

  methodCard: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', 
    padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#F3F4F6' 
  },
  methodInfo: { flex: 1, marginLeft: 15 },
  methodName: { fontSize: 15, fontWeight: '700', color: WayoraColors.black },
  methodDetail: { fontSize: 13, color: WayoraColors.gray, marginTop: 2 },

  noteBox: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 20, marginTop: 20 },
  noteText: { fontSize: 13, color: '#059669', flex: 1, fontWeight: '500' },

  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: 'white', borderTopWidth: 1, borderColor: '#F3F4F6' },
  payBtn: { borderRadius: 18, overflow: 'hidden' },
  payGradient: { paddingVertical: 18, alignItems: 'center', justifyContent: 'center' },
  payText: { color: 'white', fontSize: 16, fontWeight: '800' },
});
