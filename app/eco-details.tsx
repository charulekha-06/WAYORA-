import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { WayoraColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function EcoDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string; name: string; subtitle: string; image: string; description: string }>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: params.image }} style={styles.headerImage} />
          <LinearGradient colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.1)', 'transparent']} style={styles.topGradient} />
          
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.badge}>
            <Ionicons name="leaf" size={14} color="#16A34A" />
            <Text style={styles.badgeText}>ECO INTELLIGENCE</Text>
          </View>

          <Text style={styles.title}>{params.name}</Text>
          <Text style={styles.subtitle}>{params.subtitle}</Text>

          <View style={styles.divider} />

          <Text style={styles.descriptionTitle}>About this Initiative</Text>
          <Text style={styles.descriptionText}>{params.description}</Text>

          <View style={styles.impactCard}>
            <View style={styles.impactIcon}>
              <Ionicons name="analytics" size={24} color="#16A34A" />
            </View>
            <View style={styles.impactInfo}>
              <Text style={styles.impactTitle}>Positive Impact</Text>
              <Text style={styles.impactDesc}>Your participation helps reduce CO2 emissions and supports local biodiversity.</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Get Involved</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  imageContainer: { width: width, height: 350, position: 'relative' },
  headerImage: { width: '100%', height: '100%' },
  topGradient: { position: 'absolute', top: 0, left: 0, right: 0, height: 100 },
  backButton: { 
    position: 'absolute', 
    top: 50, 
    left: 20, 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: 'rgba(0,0,0,0.3)', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  content: { 
    flex: 1, 
    backgroundColor: '#FFF', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    marginTop: -30, 
    paddingHorizontal: 25, 
    paddingTop: 30,
    paddingBottom: 40
  },
  badge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F0FDF4', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 8, 
    alignSelf: 'flex-start',
    marginBottom: 15,
    gap: 6
  },
  badgeText: { fontSize: 11, fontWeight: '800', color: '#16A34A' },
  title: { fontSize: 28, fontWeight: '800', color: WayoraColors.black, marginBottom: 8 },
  subtitle: { fontSize: 16, color: WayoraColors.gray, fontWeight: '500', marginBottom: 20 },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginBottom: 25 },
  descriptionTitle: { fontSize: 18, fontWeight: '700', color: WayoraColors.black, marginBottom: 12 },
  descriptionText: { fontSize: 15, color: '#4B5563', lineHeight: 24, marginBottom: 30 },
  impactCard: { 
    flexDirection: 'row', 
    backgroundColor: '#F9FAFB', 
    borderRadius: 16, 
    padding: 16, 
    alignItems: 'center',
    marginBottom: 35
  },
  impactIcon: { 
    width: 48, 
    height: 48, 
    borderRadius: 12, 
    backgroundColor: '#DCFCE7', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginRight: 16
  },
  impactInfo: { flex: 1 },
  impactTitle: { fontSize: 15, fontWeight: '700', color: WayoraColors.black, marginBottom: 2 },
  impactDesc: { fontSize: 13, color: '#6B7280', lineHeight: 18 },
  actionButton: { 
    backgroundColor: '#16A34A', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 18, 
    borderRadius: 16, 
    gap: 10,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4
  },
  actionButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});
