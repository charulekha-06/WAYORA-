import React, { useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
  StatusBar, Dimensions, 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { WayoraColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
  category: 'Pre-Trip' | 'On-Trip';
}

export default function TodoScreen() {
  const router = useRouter();
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', task: 'Check passport validity', completed: true, category: 'Pre-Trip' },
    { id: '2', task: 'Book flight tickets', completed: true, category: 'Pre-Trip' },
    { id: '3', task: 'Confirm hotel reservation', completed: false, category: 'Pre-Trip' },
    { id: '4', task: 'Pack lightweight clothing', completed: false, category: 'Pre-Trip' },
    { id: '5', task: 'Exchange local currency', completed: false, category: 'On-Trip' },
    { id: '6', task: 'Buy a local SIM card', completed: false, category: 'On-Trip' },
    { id: '7', task: 'Visit the main museum', completed: false, category: 'On-Trip' },
  ]);

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = todos.filter(t => t.completed).length;
  const progress = (completedCount / todos.length) * 100;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={WayoraColors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Travel Checklist</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        
        {/* Progress Card */}
        <LinearGradient colors={['#FF8A00', '#FF4D6D']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Your Progress</Text>
            <Text style={styles.progressValue}>{completedCount}/{todos.length} Completed</Text>
          </View>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressQuote}>
            {progress === 100 ? "You're all set! Enjoy your trip! ✈️" : "Keep going, you're getting there!"}
          </Text>
        </LinearGradient>

        {/* Pre-Trip Section */}
        <Text style={styles.sectionTitle}>Before Your Trip</Text>
        <View style={styles.todoList}>
          {todos.filter(t => t.category === 'Pre-Trip').map(item => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.todoItem} 
              onPress={() => toggleTodo(item.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, item.completed && styles.checkboxActive]}>
                {item.completed && <Ionicons name="checkmark" size={16} color="white" />}
              </View>
              <Text style={[styles.todoText, item.completed && styles.todoTextDone]}>{item.task}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* On-Trip Section */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>On Your Trip</Text>
        <View style={styles.todoList}>
          {todos.filter(t => t.category === 'On-Trip').map(item => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.todoItem} 
              onPress={() => toggleTodo(item.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, item.completed && styles.checkboxActive]}>
                {item.completed && <Ionicons name="checkmark" size={16} color="white" />}
              </View>
              <Text style={[styles.todoText, item.completed && styles.todoTextDone]}>{item.task}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WayoraColors.offWhite },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: WayoraColors.offWhite,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: WayoraColors.black },
  
  progressCard: {
    padding: 24,
    borderRadius: 24,
    marginBottom: 30,
    shadowColor: '#FF4D6D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  progressTitle: { fontSize: 18, fontWeight: '700', color: 'white' },
  progressValue: { fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.9)' },
  progressBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: 'white', borderRadius: 4 },
  progressQuote: { fontSize: 13, color: 'white', marginTop: 16, fontWeight: '500' },
  
  sectionTitle: { fontSize: 18, fontWeight: '700', color: WayoraColors.black, marginBottom: 16 },
  todoList: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden', padding: 8 },
  todoItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F9F9F9' },
  checkbox: { width: 24, height: 24, borderRadius: 8, borderWidth: 2, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  checkboxActive: { backgroundColor: WayoraColors.coral, borderColor: WayoraColors.coral },
  todoText: { fontSize: 15, color: WayoraColors.black, fontWeight: '500' },
  todoTextDone: { textDecorationLine: 'line-through', color: WayoraColors.gray },
});
