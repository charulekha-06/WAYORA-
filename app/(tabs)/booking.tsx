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
          <Text style={styles.title}>Bookings</Text>
        </View>

        <View style={styles.grid}>
          <TouchableOpacity style={styles.card}>
            <View style={styles.iconCircle}>
              <Ionicons name="home-outline" size={24} color={WayoraColors.black} />
            </View>
            <Text style={styles.cardTitle}>Find Stays</Text>
            <Text style={styles.cardSubtitle}>Budget to luxury options</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <View style={styles.iconCircle}>
              <Ionicons name="restaurant-outline" size={24} color={WayoraColors.black} />
            </View>
            <Text style={styles.cardTitle}>Food</Text>
            <Text style={styles.cardSubtitle}>Local dining spots</Text>
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
  grid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
  },
  card: {
    flex: 1,
    backgroundColor: WayoraColors.white,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECECEC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: WayoraColors.black,
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 12,
    color: WayoraColors.gray,
    textAlign: 'center',
    lineHeight: 16,
  },
});
