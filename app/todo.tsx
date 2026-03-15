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

const PRIORITY_COLORS = {
  High: '#EF4444',
  Medium: '#F59E0B',
  Low: '#10B981',
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
          <Ionicons name={CATEGORY_ICONS[cat]} size={18} color={WayoraColors.gray} />
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
                  <View style={[styles.priorityBadge, { backgroundColor: PRIORITY_COLORS[item.priority] + '15' }]}>
                    <Text style={[styles.priorityText, { color: PRIORITY_COLORS[item.priority] }]}>{item.priority}</Text>
                  </View>
                </View>
                <View style={styles.metaRow}>
                  <View style={styles.classTag}>
                    <Text style={styles.classTagText}>{item.classification}</Text>
                  </View>
                </View>
                {item.description && expandedIds.has(item.id) && (
                  <Text style={styles.todoDescFull}>{item.description}</Text>
                )}
              </View>
            </TouchableOpacity>
            
            <View style={styles.actionColumn}>
              {item.description && (
                <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.actionIconBtn}>
                  <Ionicons 
                    name={expandedIds.has(item.id) ? "information-circle" : "information-circle-outline"} 
                    size={20} 
                    color={expandedIds.has(item.id) ? WayoraColors.coral : WayoraColors.gray} 
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => deleteTodo(item.id)} style={styles.actionIconBtn}>
                <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
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
      
      {/* Premium Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={WayoraColors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>To Do List</Text>
        <TouchableOpacity onPress={() => setShowAddModal(true)} style={styles.addBtn}>
          <Ionicons name="add" size={24} color={WayoraColors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Modern Progress Card */}
        <View style={styles.progressContainer}>
          <LinearGradient colors={['#4F46E5', '#7C3AED']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.progressCard}>
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
          </LinearGradient>
        </View>

        {renderSection('Before Trip', 'Pre-Trip')}
        {renderSection('On Trip', 'On-Trip')}
        {renderSection('After Trip', 'After-Trip')}
      </ScrollView>

      {/* Add Task Modal */}
      <Modal visible={showAddModal} animationType="fade" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Task</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={24} color={WayoraColors.gray} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Task Name</Text>
              <TextInput style={styles.input} placeholder="e.g. Packing list" value={newTask} onChangeText={setNewTask} />

              <Text style={styles.inputLabel}>Description (Optional)</Text>
              <TextInput style={[styles.input, { height: 80 }]} multiline placeholder="Add details..." value={newDesc} onChangeText={setNewDesc} />

              <View style={styles.inputRow}>
                <View style={{ flex: 1, marginRight: 12 }}>
                  <Text style={styles.inputLabel}>Category</Text>
                  <TextInput style={styles.input} placeholder="e.g. Gear" value={newClass} onChangeText={setNewClass} />
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
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingTop: 10, 
    paddingBottom: 15,
    backgroundColor: 'white',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3
  },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F1F3F5', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: WayoraColors.black },
  addBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: WayoraColors.coral, alignItems: 'center', justifyContent: 'center' },

  progressContainer: { padding: 20 },
  progressCard: { padding: 24, borderRadius: 24, shadowColor: '#4F46E5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 15, elevation: 8 },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  progressLabel: { fontSize: 16, fontWeight: '700', color: 'white' },
  progressCount: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  progressPercent: { fontSize: 28, fontWeight: '900', color: 'white' },
  progressTrack: { height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: 'white', borderRadius: 3 },

  section: { paddingHorizontal: 20, marginBottom: 25 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 15 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: WayoraColors.gray, textTransform: 'uppercase', letterSpacing: 0.5 },
  
  todoCard: { 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    borderRadius: 20, 
    padding: 16, 
    marginBottom: 12, 
    borderLeftWidth: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2
  },
  todoMain: { flex: 1, flexDirection: 'row', alignItems: 'flex-start' },
  checkbox: { width: 22, height: 22, borderRadius: 8, borderWidth: 2, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center', marginRight: 16, marginTop: 2 },
  checkboxDone: { backgroundColor: WayoraColors.coral, borderColor: WayoraColors.coral },
  textRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  todoText: { fontSize: 15, fontWeight: '700', color: WayoraColors.black },
  todoTextDone: { textDecorationLine: 'line-through', opacity: 0.4 },
  priorityBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  priorityText: { fontSize: 9, fontWeight: '800', textTransform: 'uppercase' },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  classTag: { backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  classTagText: { fontSize: 10, fontWeight: '700', color: WayoraColors.gray },
  todoDescFull: { fontSize: 13, color: WayoraColors.gray, marginTop: 12, lineHeight: 18, fontStyle: 'italic' },
  
  actionColumn: { alignItems: 'center', gap: 12, marginLeft: 10 },
  actionIconBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 22, fontWeight: '800', color: WayoraColors.black },
  inputLabel: { fontSize: 13, fontWeight: '700', color: WayoraColors.gray, marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: '#F3F4F6', borderRadius: 14, padding: 16, fontSize: 14, color: WayoraColors.black },
  inputRow: { flexDirection: 'row', marginTop: 4 },
  selector: { flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 12, padding: 4, gap: 4 },
  selectorBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  selectorBtnActive: { backgroundColor: WayoraColors.coral },
  selectorText: { fontSize: 11, fontWeight: '700', color: WayoraColors.gray },
  submitBtn: { backgroundColor: WayoraColors.coral, padding: 18, borderRadius: 18, alignItems: 'center', marginTop: 32 },
  submitBtnText: { color: 'white', fontSize: 16, fontWeight: '800' },
});
