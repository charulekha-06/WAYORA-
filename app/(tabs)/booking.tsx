import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, 
  StatusBar, TextInput, Image, Dimensions, ImageBackground 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { WayoraColors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const TABS = [
  { id: 'booking', label: 'Booking', icon: 'ticket-outline' as const },
  { id: 'artisan', label: 'Artisan', icon: 'color-palette-outline' as const },
  { id: 'culture', label: 'Culture', icon: 'library-outline' as const },
];

export default function BookingScreen() {
  const [activeTab, setActiveTab] = useState('booking');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]}>
        
        {/* Header & Search */}
        <View style={styles.header}>
          <View style={styles.topRow}>
            <Text style={styles.title}>Discover & Book</Text>
            <TouchableOpacity>
              <Ionicons name="search-outline" size={24} color={WayoraColors.black} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.searchBarContainer}>
            <Ionicons name="search" size={18} color={WayoraColors.gray} />
            <TextInput 
              style={styles.searchInput} 
              placeholder="Search destinations, stays, experiences..."
              placeholderTextColor={WayoraColors.gray}
            />
          </View>
        </View>

        {/* Sticky Tab Navigation */}
        <View style={styles.tabsContainerWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScrollContent}>
            {TABS.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <TouchableOpacity 
                  key={tab.id} 
                  style={[styles.tabBtn, isActive && styles.tabBtnActive]}
                  onPress={() => setActiveTab(tab.id)}
                >
                  <Ionicons name={tab.icon} size={16} color={isActive ? WayoraColors.black : WayoraColors.darkGray} />
                  <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Dynamic Content based on Active Tab */}
        <View style={styles.contentArea}>
          {activeTab === 'booking' && <BookingTab />}
          {activeTab === 'artisan' && <ArtisanTab />}
          {activeTab === 'culture' && <CultureTab />}
        </View>

      </ScrollView>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                                SUB-TABS VIEWS                              */
/* -------------------------------------------------------------------------- */

// 1. Booking Tab Content
function BookingTab() {
  const categories = [
    { id: 'hotel', label: 'Hotels', icon: 'business', color: '#FF5A36' },
    { id: 'flight', label: 'Flights', icon: 'airplane', color: '#00A3FF' },
    { id: 'transport', label: 'Transport', icon: 'train', color: '#DE31D1' },
    { id: 'car', label: 'Car Rental', icon: 'car', color: '#05C46B' },
    { id: 'activities', label: 'Activities', icon: 'ticket', color: '#FF8A00' },
    { id: 'tours', label: 'Tours', icon: 'compass', color: '#8854D0' },
  ];

  return (
    <View>
      <View style={styles.gridNav}>
        {categories.map(c => (
          <TouchableOpacity key={c.id} style={styles.gridItem}>
            <View style={[styles.gridIconBox, { backgroundColor: c.color }]}>
              <Ionicons name={c.icon as any} size={24} color="#FFF" />
            </View>
            <Text style={styles.gridItemLabel}>{c.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Featured Deals</Text>
      
      {/* Featured Deal Card 1 */}
      <TouchableOpacity style={styles.dealCard}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80' }} style={styles.dealImage} />
        <View style={styles.dealInfo}>
          <View style={styles.dealTitleRow}>
            <Text style={styles.dealName}>Le Grand Hotel Paris</Text>
            <Ionicons name="heart-outline" size={18} color="#D1D5DB" />
          </View>
          <Text style={styles.dealSubtitle}>Luxury Hotel</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#FBBF24" />
            <Text style={styles.ratingText}>4.8</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceText}><Text style={styles.priceAmount}>$180</Text>/night</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>20% OFF</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Featured Deal Card 2 */}
      <TouchableOpacity style={styles.dealCard}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1548544149-4835e62ee5b3?auto=format&fit=crop&w=400&q=80' }} style={styles.dealImage} />
        <View style={styles.dealInfo}>
          <View style={styles.dealTitleRow}>
            <Text style={styles.dealName}>Seine River Cruise</Text>
            <Ionicons name="heart-outline" size={18} color="#D1D5DB" />
          </View>
          <Text style={styles.dealSubtitle}>Activity</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#FBBF24" />
            <Text style={styles.ratingText}>4.9</Text>
          </View>
           <View style={styles.priceRow}>
            <Text style={styles.priceText}><Text style={styles.priceAmount}>$45</Text>/person</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}



// 3. Artisan Tab Content
function ArtisanTab() {
  const artisanCats = [
    { name: 'Art', image: '🎨' },
    { name: 'Textiles', image: '🧵' },
    { name: 'Pottery', image: '🏺' },
    { name: 'Jewelry', image: '💍' },
  ];

  return (
    <View>
      {/* Banner */}
      <View style={styles.artisanBanner}>
        <View style={styles.bannerTop}>
           <Text style={styles.bannerEmoji}>🎨</Text>
           <Text style={styles.bannerTitle}>Support Local Artisans</Text>
        </View>
        <Text style={styles.bannerDesc}>Discover authentic handcrafted products from local creators</Text>
      </View>

      {/* Category Grid */}
      <View style={styles.artisanGrid}>
        {artisanCats.map(c => (
           <TouchableOpacity key={c.name} style={styles.artisanCatCard}>
             <Text style={styles.artisanEmoji}>{c.image}</Text>
             <Text style={styles.artisanCatName}>{c.name}</Text>
           </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Featured Artisans</Text>

      {/* Artisan Card 1 */}
      <TouchableOpacity style={styles.artisanDealCard}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=300&q=80' }} style={styles.dealImage} />
        <View style={styles.dealInfo}>
          <Text style={styles.artisanName}>Marie's Pottery Studio</Text>
          <Text style={styles.artisanBy}>by Marie Dubois</Text>
          <Text style={styles.artisanProduct}>Hand-painted Ceramic Vases</Text>
          
          <View style={styles.artisanBottomRow}>
            <View style={styles.ratingInline}>
              <Ionicons name="star" size={14} color="#FBBF24" />
              <Text style={styles.ratingNumber}>4.9 <Text style={styles.ratingCount}>(156 sold)</Text></Text>
            </View>
            <Text style={styles.artisanPrice}>$45</Text>
          </View>
        </View>
      </TouchableOpacity>
      
      {/* Artisan Card 2 */}
      <TouchableOpacity style={styles.artisanDealCard}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?auto=format&fit=crop&w=300&q=80' }} style={styles.dealImage} />
        <View style={styles.dealInfo}>
          <Text style={styles.artisanName}>Parisian Leather Co.</Text>
          <Text style={styles.artisanBy}>by Jean-Pierre Laurent</Text>
          <Text style={styles.artisanProduct}>Handcrafted Leather Bags</Text>
          
          <View style={styles.artisanBottomRow}>
            <View style={styles.ratingInline}>
              <Ionicons name="star" size={14} color="#FBBF24" />
              <Text style={styles.ratingNumber}>4.8 <Text style={styles.ratingCount}>(89 sold)</Text></Text>
            </View>
            <Text style={styles.artisanPrice}>$120</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

// 4. Culture Tab Content
function CultureTab() {
  return (
    <View>
      {/* Culture Banner */}
      <View style={[styles.artisanBanner, { backgroundColor: '#F9F5FF', borderColor: '#E9D5FF' }]}>
        <View style={styles.bannerTop}>
           <Ionicons name="library" size={20} color="#9333EA" style={{ marginRight: 8 }} />
           <Text style={styles.bannerTitle}>Cultural & Heritage Experiences</Text>
        </View>
        <Text style={styles.bannerDesc}>Immerse yourself in local history and traditions</Text>
      </View>

      <Text style={styles.sectionTitle}>Must-Visit Heritage Sites</Text>

      {/* Culture Card 1 */}
      <TouchableOpacity style={styles.cultureCard}>
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1543158055-1f919bffa9c5?auto=format&fit=crop&w=800&q=80' }} // Notre dame representation
          style={styles.cultureCardImage}
          imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
        >
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.cultureCardOverlay}>
             <View style={styles.purpleTag}><Text style={styles.purpleTagText}>UNESCO World Heritage</Text></View>
             
             <View style={styles.cultureBottomText}>
                <Text style={styles.largeCardTitle}>Notre-Dame Cathedral</Text>
                <Text style={styles.cultureStyleText}>Medieval Gothic</Text>
             </View>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.cultureCardBody}>
           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
             <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
               <Ionicons name="time-outline" size={14} color="#6B7280" />
               <Text style={styles.timeText}>2 hours</Text>
             </View>
             <Text style={styles.freeText}>Free</Text>
           </View>
           
           <View style={styles.interactiveBadge}>
              <Ionicons name="phone-portrait-outline" size={14} color="#374151" />
              <Text style={styles.interactiveText}>Interactive AR Tour</Text>
           </View>
        </View>
      </TouchableOpacity>

      {/* Culture Card 2 */}
      <TouchableOpacity style={styles.cultureCard}>
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1575416049301-381c62f275e7?auto=format&fit=crop&w=800&q=80' }} // Louvre representation
          style={styles.cultureCardImage}
          imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
        >
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.cultureCardOverlay}>
             <View style={styles.purpleTag}><Text style={styles.purpleTagText}>World's Largest Museum</Text></View>
             
             <View style={styles.cultureBottomText}>
                <Text style={styles.largeCardTitle}>The Louvre</Text>
                <Text style={styles.cultureStyleText}>Art and Antiquities</Text>
             </View>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.cultureCardBody}>
           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
             <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
               <Ionicons name="time-outline" size={14} color="#6B7280" />
               <Text style={styles.timeText}>3-4 hours</Text>
             </View>
             <Text style={[styles.freeText, { color: WayoraColors.black }]}>$17</Text>
           </View>
           
           <View style={styles.interactiveBadge}>
              <Ionicons name="volume-medium-outline" size={14} color="#374151" />
              <Text style={styles.interactiveText}>Audio Guide Available</Text>
           </View>
        </View>
      </TouchableOpacity>

    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 16, backgroundColor: '#FFF' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: '800', color: WayoraColors.black },
  
  searchBarContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: '#F3F4F6' },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14, color: WayoraColors.black },
  
  tabsContainerWrapper: { backgroundColor: '#FFF', paddingBottom: 16 },
  tabsScrollContent: { paddingHorizontal: 20, gap: 10, alignItems: 'center' },
  tabBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#F3F4F6' },
  tabBtnActive: { backgroundColor: '#FFF', borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  tabLabel: { fontSize: 13, fontWeight: '600', color: WayoraColors.darkGray },
  tabLabelActive: { color: WayoraColors.black },
  
  contentArea: { paddingHorizontal: 20, paddingBottom: 40 },
  
  // Booking Tab Styles
  gridNav: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10, gap: 12 },
  gridItem: { width: (width - 40 - 24) / 3, backgroundColor: '#FFF', borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#F3F4F6' },
  gridIconBox: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  gridItemLabel: { fontSize: 12, fontWeight: '600', color: WayoraColors.black },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: WayoraColors.black, marginTop: 28, marginBottom: 16 },
  
  dealCard: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 16, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: '#F3F4F6' },
  dealImage: { width: 100, height: 100, borderRadius: 12 },
  dealInfo: { flex: 1, marginLeft: 16, justifyContent: 'center' },
  dealTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dealName: { fontSize: 15, fontWeight: '700', color: WayoraColors.black, flex: 1 },
  dealSubtitle: { fontSize: 12, color: WayoraColors.gray, marginTop: 2, marginBottom: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 10 },
  ratingText: { fontSize: 12, fontWeight: '700', color: WayoraColors.black },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceText: { fontSize: 12, color: WayoraColors.gray },
  priceAmount: { fontSize: 16, fontWeight: '800', color: '#FF5A36' },
  discountBadge: { backgroundColor: '#FF5A36', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  discountText: { fontSize: 10, fontWeight: '800', color: '#FFF' },



  // Artisan Styles
  artisanBanner: { backgroundColor: '#FFFDF0', borderWidth: 1, borderColor: '#FEF3C7', padding: 20, borderRadius: 12, marginTop: 10 },
  bannerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  bannerEmoji: { fontSize: 18, marginRight: 8 },
  bannerTitle: { fontSize: 16, fontWeight: '700', color: WayoraColors.black },
  bannerDesc: { fontSize: 13, color: '#6B7280', lineHeight: 18 },
  artisanGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, gap: 10 },
  artisanCatCard: { flex: 1, paddingVertical: 16, backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#F3F4F6', alignItems: 'center' },
  artisanEmoji: { fontSize: 24, marginBottom: 8 },
  artisanCatName: { fontSize: 12, fontWeight: '600', color: WayoraColors.black },
  
  artisanDealCard: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 12, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: '#F3F4F6' },
  artisanName: { fontSize: 15, fontWeight: '700', color: WayoraColors.black },
  artisanBy: { fontSize: 11, color: '#9CA3AF', marginTop: 2, marginBottom: 6 },
  artisanProduct: { fontSize: 12, fontWeight: '600', color: '#374151', marginBottom: 10 },
  artisanBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  artisanPrice: { fontSize: 16, fontWeight: '800', color: '#FF5A36' },

  // Culture Styles
  cultureCard: { backgroundColor: '#FFF', borderRadius: 16, borderWidth: 1, borderColor: '#F3F4F6', marginBottom: 20 },
  cultureCardImage: { width: '100%', height: 180 },
  cultureCardOverlay: { flex: 1, justifyContent: 'space-between', padding: 16 },
  purpleTag: { alignSelf: 'flex-start', backgroundColor: '#A855F7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  purpleTagText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
  cultureBottomText: { gap: 4 },
  cultureStyleText: { fontSize: 13, fontWeight: '600', color: '#FCD34D' },
  cultureCardBody: { padding: 16 },
  timeText: { fontSize: 12, color: '#6B7280' },
  freeText: { fontSize: 14, fontWeight: '700', color: '#A855F7' },
  interactiveBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, alignSelf: 'flex-start' },
  interactiveText: { fontSize: 12, fontWeight: '600', color: '#374151' },
});
