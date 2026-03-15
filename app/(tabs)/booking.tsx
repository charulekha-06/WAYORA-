import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, TextInput, Image, Dimensions, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { WayoraColors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const TABS = [
  { id: 'booking', label: 'Booking', icon: 'ticket-outline' as const },
  { id: 'artisan', label: 'Artisan', icon: 'color-palette-outline' as const },
  { id: 'culture', label: 'Culture', icon: 'library-outline' as const },
  { id: 'eco', label: 'Eco', icon: 'leaf-outline' as const },
];

export default function BookingScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('booking');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
        
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

        <View style={styles.contentArea}>
          {activeTab === 'booking' && <BookingTab />}
          {activeTab === 'artisan' && <ArtisanTab />}
          {activeTab === 'culture' && <CultureTab />}
          {activeTab === 'eco' && <EcoTab />}
        </View>

      </ScrollView>

      {/* Floating Cart for Artisan Tab */}
      {activeTab === 'artisan' && (
        <TouchableOpacity 
          style={styles.floatingCart}
          onPress={() => router.push('/payment' as any)} // For demo, let's go to payment or a cart page
        >
          <Ionicons name="bag-handle" size={26} color="white" />
          <View style={styles.floatingBadge}>
            <Text style={styles.floatingBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                                SUB-TABS VIEWS                              */
/* -------------------------------------------------------------------------- */

const FEATURED_DEALS = [
  { id: 'd1', name: 'Le Grand Hotel Paris', subtitle: 'Luxury Hotel', price: '180', unit: '/night', rating: '4.8', discount: '20% OFF', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80', type: 'hotel' },
  { id: 'd2', name: 'Seine River Cruise', subtitle: 'Activity', price: '45', unit: '/person', rating: '4.9', image: 'https://images.unsplash.com/photo-1548544149-4835e62ee5b3?w=400&q=80', type: 'activities' },
  { id: 'd3', name: 'Swiss Alp Chalet', subtitle: 'Resort', price: '210', unit: '/night', rating: '4.7', discount: '15% OFF', image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=400&q=80', type: 'hotel' },
  { id: 'd4', name: 'Eurostar Business', subtitle: 'Transport', price: '85', unit: '/ticket', rating: '4.6', image: 'https://images.unsplash.com/photo-1474487056207-5d7d76e535cd?w=400&q=80', type: 'transport' },
  { id: 'd5', name: 'Louvre Explorer', subtitle: 'Activity', price: '35', unit: '/person', rating: '4.8', image: 'https://images.unsplash.com/photo-1544413647-b51463ddffb3?w=400&q=80', type: 'activities' },
];

// 1. Booking Tab Content
function BookingTab() {
  const router = useRouter();
  const categories = [
    { id: 'hotel', label: 'Hotels', icon: 'business', color: '#FF5A36' },
    { id: 'flight', label: 'Flights', icon: 'airplane', color: '#00A3FF' },
    { id: 'transport', label: 'Transport', icon: 'train', color: '#DE31D1' },
    { id: 'car', label: 'Car Rental', icon: 'car', color: '#05C46B' },
    { id: 'activities', label: 'Activities', icon: 'ticket', color: '#FF8A00' },
    { id: 'food', label: 'Food', icon: 'fast-food', color: '#8854D0' },
  ];

  return (
    <View>
      <View style={styles.gridNav}>
        {categories.map(c => (
          <TouchableOpacity 
            key={c.id} 
            style={styles.gridItem}
            activeOpacity={0.7}
            onPress={() => router.push({
              pathname: '/booking-items',
              params: { categoryId: c.id, categoryName: c.label }
            } as any)}
          >
            <View style={[styles.gridIconBox, { backgroundColor: c.color }]}>
              <Ionicons name={c.icon as any} size={24} color="#FFF" />
            </View>
            <Text style={styles.gridItemLabel}>{c.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Featured Deals</Text>
      
      {FEATURED_DEALS.map(deal => (
        <TouchableOpacity 
          key={deal.id} 
          style={styles.dealCard}
          onPress={() => router.push({
            pathname: '/booking-details',
            params: { id: deal.id, category: deal.type, name: deal.name, price: deal.price, image: deal.image, location: 'Paris, France' }
          } as any)}
        >
          <Image source={{ uri: deal.image }} style={styles.dealImage} />
          <View style={styles.dealInfo}>
            <View style={styles.dealTitleRow}>
              <Text style={styles.dealName}>{deal.name}</Text>
              <Ionicons name="heart-outline" size={18} color="#D1D5DB" />
            </View>
            <Text style={styles.dealSubtitle}>{deal.subtitle}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#FBBF24" />
              <Text style={styles.ratingText}>{deal.rating}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceText}><Text style={styles.priceAmount}>${deal.price}</Text>{deal.unit}</Text>
              {deal.discount && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{deal.discount}</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}



const ARTISAN_PRODUCTS = [
  { id: '1', name: "Marie's Pottery Studio", price: '45', artisan: 'Marie Dubois', product: 'Ceramic Vases', category: 'Pottery', rating: '4.9', sold: '156', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80' },
  { id: '2', name: "Parisian Leather Co.", price: '120', artisan: 'Jean-Pierre Laurent', product: 'Leather Bags', category: 'Textiles', rating: '5.0', sold: '89', image: 'https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?w=400&q=80' },
  { id: '3', name: "Atelier des Parfums", price: '65', artisan: 'Sophie Martin', product: 'Fragrance Blends', category: 'Jewelry', rating: '4.8', sold: '203', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80' },
  { id: '4', name: "Silk & Stones", price: '85', artisan: 'Elena Rossi', product: 'Hand-woven Scarves', category: 'Textiles', rating: '4.7', sold: '112', image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&q=80' },
  { id: '5', name: "Lumière Glass", price: '55', artisan: 'Marc Chen', product: 'Stained Glass Art', category: 'Art', rating: '4.9', sold: '45', image: 'https://images.unsplash.com/photo-1541844053589-3462d48344cd?w=400&q=80' },
  { id: '6', name: "Terra Cotta Collective", price: '38', artisan: 'Ana Silva', product: 'Rustic Planters', category: 'Pottery', rating: '4.6', sold: '310', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80' },
  { id: '7', name: "Bijoux de Paris", price: '150', artisan: 'Chloé Bernard', product: 'Gold Necklaces', category: 'Jewelry', rating: '5.0', sold: '72', image: 'https://images.unsplash.com/photo-1515562141521-7a1dd0db7941?w=400&q=80' },
  { id: '8', name: "Abstract Soul", price: '210', artisan: 'Sacha Vogel', product: 'Oil on Canvas', category: 'Art', rating: '4.8', sold: '28', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80' },
  { id: '9', name: "Nordic Wood Craft", price: '75', artisan: 'Erik Svenson', product: 'Hand-carved Bowls', category: 'Art', rating: '4.9', sold: '142', image: 'https://images.unsplash.com/photo-1520408162871-29433433383a?w=400&q=80' },
  { id: '10', name: "Azure Ceramics", price: '58', artisan: 'Lia Costa', product: 'Blue Glazed Plates', category: 'Pottery', rating: '4.7', sold: '88', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&q=80' },
];

// 3. Artisan Tab Content
function ArtisanTab() {
  const router = useRouter();
  const [selectedCat, setSelectedCat] = useState('All');
  
  const artisanCats = [
    { name: 'Art', icon: 'color-palette-outline' as const, color: '#EC4899' },
    { name: 'Textiles', icon: 'shirt-outline' as const, color: '#8B5CF6' },
    { name: 'Pottery', icon: 'cafe-outline' as const, color: '#D97706' },
    { name: 'Jewelry', icon: 'diamond-outline' as const, color: '#0D9488' },
  ];

  const filteredProducts = selectedCat === 'All' 
    ? ARTISAN_PRODUCTS 
    : ARTISAN_PRODUCTS.filter(p => p.category === selectedCat);

  return (
    <View>
      {/* Banner */}
      <View style={styles.artisanBanner}>
        <View style={styles.bannerTop}>
           <Ionicons name="storefront-outline" size={20} color="#D97706" style={{ marginRight: 8 }} />
           <Text style={styles.bannerTitle}>Support Local Artisans</Text>
        </View>
        <Text style={styles.bannerDesc}>Discover authentic handcrafted products from local creators</Text>
      </View>

      {/* Category Grid */}
      <View style={styles.artisanGrid}>
        {artisanCats.map(c => {
          const isActive = selectedCat === c.name;
          return (
            <TouchableOpacity 
              key={c.name} 
              style={[styles.artisanCatCard, isActive && { borderColor: c.color, borderWidth: 2 }]}
              onPress={() => setSelectedCat(isActive ? 'All' : c.name)}
            >
              <View style={[styles.artisanIconWrap, { backgroundColor: c.color + (isActive ? '30' : '18') }]}>
                <Ionicons name={c.icon} size={24} color={c.color} />
              </View>
              <Text style={[styles.artisanCatName, isActive && { fontWeight: '800' }]}>{c.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, marginBottom: 16 }}>
        <Text style={[styles.sectionTitle, { marginTop: 0, marginBottom: 0 }]}>
          {selectedCat === 'All' ? 'Featured Artisans' : `${selectedCat} Collection`}
        </Text>
        {selectedCat !== 'All' && (
          <TouchableOpacity onPress={() => setSelectedCat('All')}>
             <Text style={{ fontSize: 13, color: WayoraColors.gray, fontWeight: '600' }}>Clear Filter</Text>
          </TouchableOpacity>
        )}
      </View>

      {filteredProducts.map((item) => (
        <TouchableOpacity 
          key={item.id}
          style={styles.artisanDealCard}
          onPress={() => router.push({
            pathname: '/product-details',
            params: { id: item.id, name: item.name, price: item.price, artisan: item.artisan, image: item.image }
          } as any)}
        >
          <Image source={{ uri: item.image }} style={styles.dealImage} />
          <View style={styles.dealInfo}>
            <Text style={styles.artisanName}>{item.name}</Text>
            <Text style={styles.artisanBy}>by {item.artisan}</Text>
            <Text style={styles.artisanProduct}>{item.product}</Text>
            
            <View style={styles.artisanBottomRow}>
              <View style={styles.ratingInline}>
                <Ionicons name="star" size={14} color="#FBBF24" />
                <Text style={styles.ratingNumber}>{item.rating} <Text style={styles.ratingCount}>({item.sold} sold)</Text></Text>
              </View>
              <Text style={styles.artisanPrice}>${item.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {filteredProducts.length === 0 && (
        <View style={{ padding: 40, alignItems: 'center' }}>
           <Ionicons name="search-outline" size={48} color={WayoraColors.gray} />
           <Text style={{ marginTop: 10, color: WayoraColors.gray }}>No products found in this category.</Text>
        </View>
      )}

      {/* Artisan Markets Banner */}
      <View style={styles.marketsBanner}>
         <Text style={styles.marketsTitle}>Visit Local Artisan Markets</Text>
         <Text style={styles.marketsDesc}>Explore weekend markets and meet artisans in person</Text>
         <TouchableOpacity style={styles.marketsBtn}>
            <Ionicons name="location-outline" size={16} color="#FF6B00" style={{ marginRight: 6 }} />
            <Text style={styles.marketsBtnText}>Find Markets Near You</Text>
         </TouchableOpacity>
      </View>
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
          source={{ uri: 'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=800&q=80' }} // Notre dame representation
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
          source={{ uri: 'https://images.unsplash.com/photo-1554941068-a252680d25d9?auto=format&fit=crop&w=800&q=80' }} // Louvre representation
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

      {/* Culture Card 3 */}
      <TouchableOpacity style={styles.cultureCard}>
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=800&q=80' }} // Montmartre
          style={styles.cultureCardImage}
          imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
        >
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.cultureCardOverlay}>
             <View style={styles.purpleTag}><Text style={styles.purpleTagText}>Artist Quarter</Text></View>
             
             <View style={styles.cultureBottomText}>
                <Text style={styles.largeCardTitle}>Sacré-Cœur & Montmartre</Text>
                <Text style={styles.cultureStyleText}>Bohemian Heritage</Text>
             </View>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.cultureCardBody}>
           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
             <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
               <Ionicons name="walk-outline" size={14} color="#6B7280" />
               <Text style={styles.timeText}>Flexible</Text>
             </View>
             <Text style={styles.freeText}>Free</Text>
           </View>
           
           <View style={styles.interactiveBadge}>
              <Ionicons name="brush-outline" size={14} color="#374151" />
              <Text style={styles.interactiveText}>Local Portrait Artists</Text>
           </View>
        </View>
      </TouchableOpacity>

    </View>
  );
}

// 5. Eco Tab Content
const ECO_INITIATIVES = [
  { id: 'e1', name: 'Green Travel Guide', subtitle: 'Reduce your carbon footprint', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80', action: 'Read More', description: 'Sustainable travel is about making smarter choices. Learn how to reduce your carbon footprint while exploring the world, from choosing eco-friendly transport to supporting local green businesses.' },
  { id: 'e3', name: 'Wildlife Protection', subtitle: 'Respecting natural habitats', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80', action: 'Join Now', description: 'Our protection programs focus on preserving the delicate ecosystems of the French countryside. Join us in respecting local flora and fauna and ensuring these natural wonders remain for generations.' },
  { id: 'e4', name: 'Re-forest France', subtitle: 'Planting trees in the Loire', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80', action: 'Donate', description: 'The Loire Valley is the heart of France. Contribute to our reforestation efforts and help us plant thousands of native trees to combat climate change and restore biodiversity.' },
  { id: 'e5', name: 'Plastic-Free Paris', subtitle: 'Find eco-friendly retailers', image: 'https://images.unsplash.com/photo-1591189863430-ab87e120f312?w=400&q=80', action: 'View Map', description: 'Say no to single-use plastics! Use our interactive map to find bulk-buy stores, water fountain locations, and retailers committed to zero-waste packaging in the city.' },
];

function EcoTab() {
  const router = useRouter();
  return (
    <View>
      <View style={[styles.artisanBanner, { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }]}>
        <View style={styles.bannerTop}>
           <Ionicons name="leaf" size={20} color="#16A34A" style={{ marginRight: 8 }} />
           <Text style={styles.bannerTitle}>ECO INTELLIGENCE</Text>
        </View>
        <Text style={styles.bannerDesc}>Encourages sustainable travel, crowd control, and protection of eco-sensitive areas.</Text>
      </View>

      <Text style={styles.sectionTitle}>Eco-Friendly Initiatives</Text>
      {ECO_INITIATIVES.map(item => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.dealCard}
          onPress={() => router.push({
            pathname: '/eco-details',
            params: { id: item.id, name: item.name, subtitle: item.subtitle, image: item.image, description: item.description }
          } as any)}
        >
          <Image source={{ uri: item.image }} style={styles.dealImage} />
          <View style={styles.dealInfo}>
            <Text style={styles.dealName}>{item.name}</Text>
            <Text style={styles.dealSubtitle}>{item.subtitle}</Text>
            <Text style={styles.priceAmount}>{item.action}</Text>
          </View>
        </TouchableOpacity>
      ))}
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
  
  tabsContainerWrapper: { backgroundColor: '#FFF', paddingBottom: 16, paddingTop: 10 },
  tabsScrollContent: { paddingHorizontal: 20, gap: 10, alignItems: 'center' },
  tabBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#F3F4F6' },
  tabBtnActive: { backgroundColor: '#FFF', borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  tabLabel: { fontSize: 13, fontWeight: '600', color: WayoraColors.darkGray },
  tabLabelActive: { color: WayoraColors.black },
  
  contentArea: { paddingHorizontal: 20, paddingBottom: 40 },
  
  // Booking Tab Styles
  gridNav: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    marginTop: 10, 
    gap: 12 
  },
  gridItem: { 
    width: (width - 40 - 24) / 3, 
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    paddingVertical: 20, 
    paddingHorizontal: 12,
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 1, 
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3
  },
  gridIconBox: { 
    width: 50, 
    height: 50, 
    borderRadius: 16, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 10 
  },
  gridItemLabel: { fontSize: 13, fontWeight: '700', color: WayoraColors.black, textAlign: 'center' },
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



  // Common Shared Styles (formerly in Stays)
  ratingInline: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingNumber: { fontSize: 14, fontWeight: '700', color: WayoraColors.black },
  ratingCount: { fontSize: 12, fontWeight: '400', color: WayoraColors.gray },
  largeCardTitle: { fontSize: 18, fontWeight: '700', color: '#FFF', marginBottom: 4 },

  // Artisan Styles
  artisanBanner: { backgroundColor: '#FFFDF0', borderWidth: 1, borderColor: '#FEF3C7', padding: 20, borderRadius: 12, marginTop: 10 },
  bannerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  bannerTitle: { fontSize: 16, fontWeight: '700', color: WayoraColors.black },
  bannerDesc: { fontSize: 13, color: '#6B7280', lineHeight: 18 },
  artisanGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, gap: 10 },
  artisanCatCard: { flex: 1, paddingVertical: 16, backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#F3F4F6', alignItems: 'center' },
  artisanIconWrap: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  artisanCatName: { fontSize: 12, fontWeight: '600', color: WayoraColors.black },
  
  artisanDealCard: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 12, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: '#F3F4F6' },
  artisanName: { fontSize: 15, fontWeight: '700', color: WayoraColors.black },
  artisanBy: { fontSize: 11, color: '#9CA3AF', marginTop: 2, marginBottom: 6 },
  artisanProduct: { fontSize: 12, fontWeight: '600', color: '#374151', marginBottom: 10 },
  artisanBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  artisanPrice: { fontSize: 16, fontWeight: '800', color: '#FF5A36' },
  
  marketsBanner: { backgroundColor: '#FF8A00', borderRadius: 16, padding: 20, marginTop: 10 },
  marketsTitle: { fontSize: 18, fontWeight: '800', color: '#FFF', marginBottom: 16 },
  marketsDesc: { fontSize: 14, color: '#FFF', lineHeight: 20, marginBottom: 24 },
  marketsBtn: { backgroundColor: '#FFF', borderRadius: 12, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  marketsBtnText: { fontSize: 15, fontWeight: '700', color: '#FF6B00' },

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

  cartBadge: {
    position: 'absolute', top: -5, right: -5,
    backgroundColor: WayoraColors.coral,
    width: 16, height: 16, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'white'
  },
  cartBadgeText: { color: 'white', fontSize: 8, fontWeight: '900' },

  floatingCart: {
    position: 'absolute',
    bottom: 160, // Above chatbot (which is at 90)
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF8A00', // Orange
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  floatingBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'white',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  floatingBadgeText: {
    color: '#FF8A00',
    fontSize: 10,
    fontWeight: '900',
  },
});
