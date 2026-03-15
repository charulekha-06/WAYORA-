import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, 
  Image, StatusBar, Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WayoraColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function ProductDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);

  // Destructure search params
  const { name, price, artisan, image } = params as { 
    name: string; 
    price: string; 
    artisan: string; 
    image: string 
  };

  const totalPrice = parseInt(price || '0') * quantity;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
          <Ionicons name="chevron-back" size={24} color={WayoraColors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
          <Ionicons name="close" size={24} color={WayoraColors.black} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.productImage} />
          <TouchableOpacity style={styles.favBtn}>
             <Ionicons name="heart-outline" size={24} color={WayoraColors.black} />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View style={styles.infoSection}>
          <Text style={styles.productName}>{name || "Artisan Product"}</Text>
          <Text style={styles.artisanBy}>by {artisan || "Local Artisan"}</Text>
          
          <View style={styles.ratingRow}>
            <View style={styles.stars}>
               <Ionicons name="star" size={16} color="#FBBF24" />
               <Text style={styles.ratingText}>4.9</Text>
               <Text style={styles.dot}>•</Text>
               <Text style={styles.soldText}>156 sold</Text>
            </View>
            <View style={styles.tag}>
               <Text style={styles.tagText}>Handcrafted</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>About this item</Text>
          <Text style={styles.description}>
            Hand-painted Ceramic Vases{'\n\n'}
            Each piece is carefully handcrafted by {artisan || "the artisan"}, a skilled creator based in Paris. Every item is unique and made with premium materials, ensuring exceptional quality and authenticity.
          </Text>

          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresGrid}>
             <View style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: '#FFF7ED' }]}>
                   <Ionicons name="bus-outline" size={20} color="#EA580C" />
                </View>
                <Text style={styles.featureText}>Free delivery on orders over $50</Text>
             </View>
             <View style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: '#FFF7ED' }]}>
                   <Ionicons name="refresh-outline" size={20} color="#EA580C" />
                </View>
                <Text style={styles.featureText}>30-day return policy</Text>
             </View>
             <View style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: '#FFF7ED' }]}>
                   <Ionicons name="shield-checkmark-outline" size={20} color="#EA580C" />
                </View>
                <Text style={styles.featureText}>Authenticity guaranteed</Text>
             </View>
          </View>

          {/* Quantity Selector */}
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantityContainer}>
             <TouchableOpacity 
               style={styles.qtyBtn} 
               onPress={() => quantity > 1 && setQuantity(quantity - 1)}
             >
                <Ionicons name="remove" size={20} color={WayoraColors.black} />
             </TouchableOpacity>
             <Text style={styles.qtyText}>{quantity}</Text>
             <TouchableOpacity 
               style={styles.qtyBtn} 
               onPress={() => setQuantity(quantity + 1)}
             >
                <Ionicons name="add" size={20} color={WayoraColors.black} />
             </TouchableOpacity>
          </View>

          {/* Total Price Section */}
          <View style={styles.totalCard}>
             <View style={styles.priceDetailRow}>
                <Text style={styles.priceDetailLabel}>Price per item:</Text>
                <Text style={styles.priceDetailValue}>${price || '0'}</Text>
             </View>
             <View style={styles.priceDetailRow}>
                <Text style={styles.priceDetailLabel}>Quantity:</Text>
                <Text style={styles.priceDetailValue}>{quantity}</Text>
             </View>
             <View style={styles.divider} />
             <View style={[styles.priceDetailRow, { marginTop: 15 }]}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>${totalPrice}</Text>
             </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.bottomActions}>
         <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
         </TouchableOpacity>
         <TouchableOpacity 
           style={styles.cartBtn} 
           onPress={() => alert('Added to cart! Tap the cart icon to checkout.')}
          >
            <Ionicons name="cart-outline" size={22} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.cartBtnText}>Add to Cart</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
    paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#F3F4F6' 
  },
  headerBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: WayoraColors.black },
  
  scrollContent: { paddingBottom: 120 },
  
  imageContainer: { width: width, height: 350, position: 'relative' },
  productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  favBtn: { 
    position: 'absolute', top: 15, right: 15, 
    width: 44, height: 44, borderRadius: 22, backgroundColor: 'white', 
    alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 
  },

  infoSection: { padding: 25 },
  productName: { fontSize: 24, fontWeight: '800', color: WayoraColors.black },
  artisanBy: { fontSize: 16, color: WayoraColors.gray, marginTop: 4 },
  
  ratingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 },
  stars: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 15, fontWeight: '700', marginLeft: 6, color: WayoraColors.black },
  dot: { marginHorizontal: 8, color: WayoraColors.gray },
  soldText: { fontSize: 14, color: WayoraColors.gray },
  tag: { backgroundColor: '#FF8A00', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  tagText: { color: 'white', fontSize: 12, fontWeight: '800' },

  sectionTitle: { fontSize: 18, fontWeight: '800', color: WayoraColors.black, marginTop: 30, marginBottom: 15 },
  description: { fontSize: 15, color: '#4B5563', lineHeight: 24 },

  featuresGrid: { gap: 12 },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  featureIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  featureText: { fontSize: 14, color: '#4B5563', fontWeight: '500' },

  quantityContainer: { flexDirection: 'row', alignItems: 'center', gap: 25 },
  qtyBtn: { 
    width: 44, height: 44, borderRadius: 12, backgroundColor: '#F3F4F6', 
    alignItems: 'center', justifyContent: 'center' 
  },
  qtyText: { fontSize: 20, fontWeight: '800', color: WayoraColors.black, minWidth: 20, textAlign: 'center' },

  totalCard: { backgroundColor: '#FFF7ED', borderRadius: 24, padding: 25, marginTop: 30 },
  priceDetailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  priceDetailLabel: { fontSize: 15, color: '#4B5563' },
  priceDetailValue: { fontSize: 16, fontWeight: '800', color: WayoraColors.black },
  divider: { height: 1, backgroundColor: '#FED7AA', marginVertical: 5 },
  totalLabel: { fontSize: 18, fontWeight: '800', color: WayoraColors.black },
  totalValue: { fontSize: 28, fontWeight: '800', color: '#EA580C' },

  bottomActions: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    flexDirection: 'row', padding: 25, backgroundColor: 'white', borderTopWidth: 1, borderColor: '#F3F4F6', gap: 15 
  },
  cancelBtn: { flex: 1, height: 55, borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  cancelBtnText: { fontSize: 16, fontWeight: '700', color: WayoraColors.black },
  cartBtn: { flex: 1, height: 55, borderRadius: 16, backgroundColor: '#FF8A00', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  cartBtnText: { fontSize: 16, fontWeight: '800', color: 'white' },
});
