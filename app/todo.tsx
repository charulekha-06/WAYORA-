import React, { useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
  StatusBar, Dimensions, Modal, TextInput, KeyboardAvoidingView, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { WayoraColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type Category = 'Pre-Trip' | 'On-Trip' | 'After-Trip';
type Priority = 'High' | 'Medium' | 'Low';

interface TodoItem {
  id: string;
  task: string;
  description?: string;
  completed: boolean;
  category: Category;
  priority: Priority;
  classification: string;
}

// Strictly Monochromatic Priority System
const PRIORITY_COLORS = {
  High: '#000000',     // Black
  Medium: '#4B5563',   // Dark Gray (slate-600)
  Low: '#9CA3AF',      // Medium Gray (slate-400)
};

const CATEGORY_ICONS = {
  'Pre-Trip': 'briefcase-outline' as const,
  'On-Trip': 'airplane-outline' as const,
  'After-Trip': 'flag-outline' as const,
};

export default function TodoScreen() {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', task: 'Check passport validity', completed: true, category: 'Pre-Trip', priority: 'High', classification: 'Docs', description: 'Expiry date must be at least 6 months after return.' },
    { id: '2', task: 'Book flight tickets', completed: true, category: 'Pre-Trip', priority: 'High', classification: 'Booking' },
    { id: '3', task: 'Pack lightweight clothing', completed: false, category: 'Pre-Trip', priority: 'Medium', classification: 'Packing', description: 'Focus on breathable fabrics for humid weather.' },
    { id: '4', task: 'Exchange local currency', completed: false, category: 'On-Trip', priority: 'Medium', classification: 'Finance' },
    { id: '5', task: 'Visit the main museum', completed: false, category: 'On-Trip', priority: 'Low', classification: 'Activities' },
    { id: '6', task: 'Sort trip photos', completed: false, category: 'After-Trip', priority: 'Low', classification: 'Memories' },
  ]);

  // Modal State
  const [newTask, setNewTask] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCat, setNewCat] = useState<Category>('Pre-Trip');
  const [newPriority, setNewPriority] = useState<Priority>('Medium');
  const [newClass, setNewClass] = useState('');

  const toggleExpand = (id: string) => {
    const next = new Set(expandedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedIds(next);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const item: TodoItem = {
      id: Date.now().toString(),
      task: newTask,
      description: newDesc,
      category: newCat,
      priority: newPriority,
      classification: newClass || 'Misc',
      completed: false,
    };
    setTodos([item, ...todos]);
    setShowAddModal(false);
    setNewTask(''); setNewDesc(''); setNewCat('Pre-Trip'); setNewPriority('Medium'); setNewClass('');
  };

  const renderSection = (title: string, cat: Category) => {
    const items = todos.filter(t => t.category === cat);
    if (items.length === 0) return null;

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name={CATEGORY_ICONS[cat]} size={18} color="#000" />
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        {items.map(item => (
          <View key={item.id} style={[styles.todoCard, { borderLeftColor: PRIORITY_COLORS[item.priority] }]}>
            <TouchableOpacity
              onPress={() => toggleTodo(item.id)}
              style={styles.todoMain}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, item.completed && styles.checkboxDone]}>
                {item.completed && <Ionicons name="checkmark" size={12} color="white" />}
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.textRow}>
                  <Text style={[styles.todoText, item.completed && styles.todoTextDone]}>{item.task}</Text>
                  <View style={[styles.priorityBadge, { backgroundColor: '#F3F4F6' }]}>
                    <Text style={[styles.priorityText, { color: PRIORITY_COLORS[item.priority] }]}>{item.priority}</Text>
                  </View>
                </View>
                <View style={styles.metaRow}>
                  <View style={styles.classTag}>
                    <Text style={styles.classTagText}>{item.classification}</Text>
                  </View>
                </View>
                {expandedIds.has(item.id) && (
                  <Text style={styles.todoDescFull}>
                    {item.description || "No additional details available."}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            
            <View style={styles.actionColumn}>
              <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.actionIconBtn}>
                <Ionicons 
                  name={expandedIds.has(item.id) ? "information-circle" : "information-circle-outline"} 
                  size={20} 
                  color={expandedIds.has(item.id) ? "#000" : "#9CA3AF"} 
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTodo(item.id)} style={styles.actionIconBtn}>
                <Ionicons name="trash-outline" size={18} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const completedCount = todos.filter(t => t.completed).length;
  const progress = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Monochromatic Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>To Do List</Text>
        <TouchableOpacity onPress={() => setShowAddModal(true)} style={styles.addBtn}>
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Monochromatic Progress Card */}
        <View style={styles.progressContainer}>
          <View style={styles.progressCard}>
            <View style={styles.progressTop}>
              <View>
                <Text style={styles.progressLabel}>Trip Readiness</Text>
                <Text style={styles.progressCount}>{completedCount} of {todos.length} completed</Text>
              </View>
              <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
          </View>
        </View>

        {renderSection('Before Trip', 'Pre-Trip')}
        {renderSection('On Trip', 'On-Trip')}
        {renderSection('After Trip', 'After-Trip')}
      </ScrollView>

      {/* Monochromatic Add Task Modal */}
      <Modal visible={showAddModal} animationType="fade" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Task</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Task Name</Text>
              <TextInput style={styles.input} placeholder="e.g. Packing list" placeholderTextColor="#9CA3AF" value={newTask} onChangeText={setNewTask} />

              <Text style={styles.inputLabel}>Description (Optional)</Text>
              <TextInput 
                style={[styles.input, { height: 80 }]} 
                multiline 
                placeholder="Add details..." 
                placeholderTextColor="#9CA3AF"
                value={newDesc} 
                onChangeText={setNewDesc} 
              />

              <View style={styles.inputRow}>
                <View style={{ flex: 1, marginRight: 12 }}>
                  <Text style={styles.inputLabel}>Category</Text>
                  <TextInput style={styles.input} placeholder="e.g. Gear" placeholderTextColor="#9CA3AF" value={newClass} onChangeText={setNewClass} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.inputLabel}>Priority</Text>
                  <View style={styles.selector}>
                    {['High', 'Med', 'Low'].map(p => (
                      <TouchableOpacity 
                        key={p} 
                        style={[styles.selectorBtn, (newPriority.startsWith(p)) && styles.selectorBtnActive]}
                        onPress={() => setNewPriority(p === 'Med' ? 'Medium' : p as Priority)}
                      >
                        <Text style={[styles.selectorText, (newPriority.startsWith(p)) && { color: 'white' }]}>{p}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              <Text style={styles.inputLabel}>When?</Text>
              <View style={styles.selector}>
                {['Pre', 'On', 'After'].map(c => (
                  <TouchableOpacity 
                    key={c} 
                    style={[styles.selectorBtn, { flex: 1 }, (newCat.startsWith(c)) && styles.selectorBtnActive]}
                    onPress={() => setNewCat((c + '-Trip') as Category)}
                  >
                    <Text style={[styles.selectorText, (newCat.startsWith(c)) && { color: 'white' }]}>{c}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.submitBtn} onPress={addTask}>
                <Text style={styles.submitBtnText}>Add Task</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingTop: 10, 
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#000' },
  addBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },

  progressContainer: { padding: 20 },
  progressCard: { padding: 24, borderRadius: 24, backgroundColor: '#000', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 15, elevation: 8 },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  progressLabel: { fontSize: 16, fontWeight: '700', color: 'white' },
  progressCount: { fontSize: 12, color: '#9CA3AF', marginTop: 4 },
  progressPercent: { fontSize: 28, fontWeight: '900', color: 'white' },
  progressTrack: { height: 4, backgroundColor: '#374151', borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: 'white', borderRadius: 2 },

  section: { paddingHorizontal: 20, marginBottom: 25 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 15 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: '#000', textTransform: 'uppercase', letterSpacing: 1 },
  
  todoCard: { 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    borderRadius: 0, // Harder edges for monochromatic look
    padding: 16, 
    marginBottom: 0, 
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    borderLeftWidth: 3, // Priority indicator
    alignItems: 'center',
  },
  todoMain: { flex: 1, flexDirection: 'row', alignItems: 'flex-start' },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: '#000', alignItems: 'center', justifyContent: 'center', marginRight: 16, marginTop: 2 },
  checkboxDone: { backgroundColor: '#000' },
  textRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  todoText: { fontSize: 15, fontWeight: '700', color: '#000' },
  todoTextDone: { textDecorationLine: 'line-through', color: '#9CA3AF' },
  priorityBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  priorityText: { fontSize: 9, fontWeight: '900', textTransform: 'uppercase' },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  classTag: { backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  classTagText: { fontSize: 10, fontWeight: '700', color: '#4B5563' },
  todoDescFull: { fontSize: 13, color: '#4B5563', marginTop: 12, lineHeight: 18, fontStyle: 'italic' },
  
  actionColumn: { alignItems: 'center', gap: 12, marginLeft: 10 },
  actionIconBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 0, borderTopRightRadius: 0, padding: 24, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, borderBottomWidth: 2, borderBottomColor: '#000', paddingBottom: 10 },
  modalTitle: { fontSize: 22, fontWeight: '900', color: '#000', textTransform: 'uppercase' },
  inputLabel: { fontSize: 12, fontWeight: '900', color: '#000', marginBottom: 8, marginTop: 16, textTransform: 'uppercase' },
  input: { backgroundColor: '#F9FAFB', borderRadius: 0, padding: 16, fontSize: 14, color: '#000', borderWidth: 1, borderColor: '#E5E7EB' },
  inputRow: { flexDirection: 'row', marginTop: 4 },
  selector: { flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 0, padding: 2, gap: 2 },
  selectorBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 0 },
  selectorBtnActive: { backgroundColor: '#000' },
  selectorText: { fontSize: 11, fontWeight: '800', color: '#4B5563' },
  submitBtn: { backgroundColor: '#000', padding: 18, borderRadius: 0, alignItems: 'center', marginTop: 32 },
  submitBtnText: { color: 'white', fontSize: 14, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 2 },
});
