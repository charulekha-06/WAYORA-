import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WayoraColors } from '@/constants/Colors';

export default function BookingScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Trips</Text>
        </View>

        <View style={styles.listContainer}>
          {/* Stay & Food Picks */}
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconCircle, { backgroundColor: '#FFF0ED' }]}>
                <Ionicons name="restaurant" size={24} color={WayoraColors.orange} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>Stay & Food Picks</Text>
                <Text style={styles.cardSubtitle}>Smart recommendations filtered by price, ratings, and availability.</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Artisan Support */}
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconCircle, { backgroundColor: '#F4EBFA' }]}>
                <Ionicons name="color-palette" size={24} color={WayoraColors.purple} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>Artisan Support</Text>
                <Text style={styles.cardSubtitle}>Platform for local artisans to showcase products and sell directly to travellers.</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Cultural Engagement */}
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconCircle, { backgroundColor: '#EBF4FF' }]}>
                <Ionicons name="library" size={24} color={WayoraColors.blue} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>Cultural Engagement</Text>
                <Text style={styles.cardSubtitle}>Interactive stories and guides for cultural and heritage sites.</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WayoraColors.offWhite,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: WayoraColors.black,
  },
  listContainer: {
    paddingHorizontal: 20,
    gap: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: WayoraColors.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ECECEC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: WayoraColors.black,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: WayoraColors.gray,
    lineHeight: 18,
  },
});
