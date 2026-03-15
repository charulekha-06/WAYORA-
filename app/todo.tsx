import React, { useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
  StatusBar, Dimensions, Modal, TextInput, Alert, KeyboardAvoidingView, Platform
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

export default function TodoScreen() {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', task: 'Check passport validity', completed: true, category: 'Pre-Trip', priority: 'High', classification: 'Docs' },
    { id: '2', task: 'Book flight tickets', completed: true, category: 'Pre-Trip', priority: 'High', classification: 'Booking' },
    { id: '3', task: 'Pack lightweight clothing', completed: false, category: 'Pre-Trip', priority: 'Medium', classification: 'Packing' },
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
    // Reset fields
    setNewTask('');
    setNewDesc('');
    setNewCat('Pre-Trip');
    setNewPriority('Medium');
    setNewClass('');
  };

  const renderSection = (title: string, cat: Category) => {
    const items = todos.filter(t => t.category === cat);
    if (items.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.listContainer}>
          {items.map(item => (
            <View key={item.id} style={styles.todoItem}>
              <TouchableOpacity
                onPress={() => toggleTodo(item.id)}
                style={styles.todoMain}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, item.completed && { backgroundColor: WayoraColors.coral, borderColor: WayoraColors.coral }]}>
                  {item.completed && <Ionicons name="checkmark" size={14} color="white" />}
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
                    {item.description ? <Text style={styles.todoDesc} numberOfLines={1}>{item.description}</Text> : null}
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTodo(item.id)} style={styles.deleteBtn}>
                <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const completedCount = todos.filter(t => t.completed).length;
  const progress = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={WayoraColors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip Planner</Text>
        <TouchableOpacity onPress={() => setShowAddModal(true)} style={styles.addHeaderBtn}>
          <Ionicons name="add" size={24} color={WayoraColors.coral} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Progress Card */}
        <View style={{ padding: 20 }}>
          <LinearGradient colors={['#FF8A00', '#FF4D6D']} style={styles.progressCard}>
            <View style={styles.progressTop}>
              <Text style={styles.progressTitle}>Trip Readiness</Text>
              <Text style={styles.progressStat}>{Math.round(progress)}%</Text>
            </View>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressInfo}>{completedCount} of {todos.length} tasks completed</Text>
          </LinearGradient>
        </View>

        {renderSection('Before Trip', 'Pre-Trip')}
        {renderSection('On Trip', 'On-Trip')}
        {renderSection('After Trip', 'After-Trip')}
        
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Add Task Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Task</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={24} color={WayoraColors.gray} />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <Text style={styles.inputLabel}>Task Name</Text>
              <TextInput style={styles.input} placeholder="e.g. Packing list" value={newTask} onChangeText={setNewTask} />

              <Text style={styles.inputLabel}>Description (Optional)</Text>
              <TextInput style={[styles.input, { height: 80 }]} multiline placeholder="Add details..." value={newDesc} onChangeText={setNewDesc} />

              <View style={styles.inputRow}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={styles.inputLabel}>Classification</Text>
                  <TextInput style={styles.input} placeholder="e.g. Gear" value={newClass} onChangeText={setNewClass} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.inputLabel}>Priority</Text>
                  <View style={styles.pickerSim}>
                    {['High', 'Medium', 'Low'].map(p => (
                      <TouchableOpacity 
                        key={p} 
                        style={[styles.pickerBtn, newPriority === p && { backgroundColor: WayoraColors.coral }]}
                        onPress={() => setNewPriority(p as Priority)}
                      >
                        <Text style={[styles.pickerBtnText, newPriority === p && { color: 'white' }]}>{p}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              <Text style={styles.inputLabel}>Category</Text>
              <View style={[styles.pickerSim, { marginBottom: 20 }]}>
                {['Pre-Trip', 'On-Trip', 'After-Trip'].map(c => (
                  <TouchableOpacity 
                    key={c} 
                    style={[styles.pickerBtn, { flex: 1 }, newCat === c && { backgroundColor: WayoraColors.coral }]}
                    onPress={() => setNewCat(c as Category)}
                  >
                    <Text style={[styles.pickerBtnText, newCat === c && { color: 'white' }]}>{c.replace('-Trip', '')}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.submitBtn} onPress={addTask}>
                <Text style={styles.submitBtnText}>Add to Checklist</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setShowAddModal(true)}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WayoraColors.offWhite },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15 },
  backBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: WayoraColors.black },
  addHeaderBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' },

  progressCard: { padding: 24, borderRadius: 28, shadowColor: '#FF4D6D', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 8 },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  progressTitle: { fontSize: 18, fontWeight: '700', color: 'white' },
  progressStat: { fontSize: 24, fontWeight: '800', color: 'white' },
  progressBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: 'white', borderRadius: 4 },
  progressInfo: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 12, fontWeight: '600' },

  section: { paddingHorizontal: 20, marginBottom: 25 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: WayoraColors.black, marginBottom: 15, opacity: 0.8 },
  listContainer: { backgroundColor: 'white', borderRadius: 24, overflow: 'hidden', padding: 5 },
  todoItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#F8F9FA' },
  todoMain: { flex: 1, flexDirection: 'row', alignItems: 'flex-start' },
  checkbox: { width: 22, height: 22, borderRadius: 7, borderWidth: 2, borderColor: '#E9ECEF', alignItems: 'center', justifyContent: 'center', marginRight: 15, marginTop: 2 },
  textRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  todoText: { fontSize: 15, fontWeight: '600', color: WayoraColors.black },
  todoTextDone: { textDecorationLine: 'line-through', opacity: 0.4 },
  todoDesc: { fontSize: 12, color: WayoraColors.gray, marginTop: 4 },
  
  priorityBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 5 },
  priorityText: { fontSize: 9, fontWeight: '800', textTransform: 'uppercase' },
  
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  classTag: { backgroundColor: '#F1F3F5', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  classTagText: { fontSize: 10, fontWeight: '700', color: WayoraColors.gray },

  deleteBtn: { padding: 8 },

  fab: { position: 'absolute', right: 25, bottom: 25, width: 60, height: 60, borderRadius: 30, backgroundColor: WayoraColors.coral, alignItems: 'center', justifyContent: 'center', shadowColor: WayoraColors.coral, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 6 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 25, maxHeight: '90%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  modalTitle: { fontSize: 22, fontWeight: '800', color: WayoraColors.black },
  inputLabel: { fontSize: 14, fontWeight: '700', color: WayoraColors.black, marginBottom: 8, marginTop: 15 },
  input: { backgroundColor: '#F8F9FA', borderRadius: 14, padding: 15, fontSize: 14, color: WayoraColors.black, borderWidth: 1, borderColor: '#E9ECEF' },
  inputRow: { flexDirection: 'row', marginTop: 5 },
  pickerSim: { flexDirection: 'row', gap: 5 },
  pickerBtn: { paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10, backgroundColor: '#F1F3F5', alignItems: 'center' },
  pickerBtnText: { fontSize: 11, fontWeight: '700', color: WayoraColors.gray },
  submitBtn: { backgroundColor: WayoraColors.coral, padding: 18, borderRadius: 16, alignItems: 'center', marginTop: 30 },
  submitBtnText: { color: 'white', fontSize: 16, fontWeight: '800' },
});
