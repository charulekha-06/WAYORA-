import React, { useState, useEffect } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
  StatusBar, Dimensions, Modal, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator
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

import { supabase } from '@/lib/supabase';

export default function TodoScreen() {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [todos, setTodos] = useState<TodoItem[]>([]);

  // Modal State
  const [newTask, setNewTask] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCat, setNewCat] = useState<Category>('Pre-Trip');
  const [newPriority, setNewPriority] = useState<Priority>('Medium');
  const [newClass, setNewClass] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching todos:', error);
    } else {
      setTodos(data || []);
    }
    setLoading(false);
  }

  const toggleExpand = (id: string) => {
    const next = new Set(expandedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedIds(next);
  };

  const toggleTodo = async (id: string, currentStatus: boolean) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // Local mode
      setTodos(todos.map(t => t.id === id ? { ...t, completed: !currentStatus } : t));
      return;
    }

    const { error } = await supabase
      .from('todos')
      .update({ completed: !currentStatus })
      .eq('id', id);

    if (error) {
      console.error('Error updating todo:', error);
      Alert.alert('Cloud Sync Error', 'Could not update task on cloud, but updated locally.');
      // Still update locally for UX
      setTodos(todos.map(t => t.id === id ? { ...t, completed: !currentStatus } : t));
    } else {
      setTodos(todos.map(t => t.id === id ? { ...t, completed: !currentStatus } : t));
    }
  };

  const deleteTodo = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // Local mode
      setTodos(todos.filter(t => t.id !== id));
      return;
    }

    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting todo:', error);
      Alert.alert('Cloud Sync Error', 'Could not delete task from cloud.');
    } else {
      setTodos(todos.filter(t => t.id !== id));
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) {
      Alert.alert('Required', 'Please enter a task name');
      return;
    }
    
    setSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    const newItemData = {
      task: newTask,
      description: newDesc,
      category: newCat,
      priority: newPriority,
      classification: newClass || 'Misc',
      completed: false,
    };

    if (!user) {
      // Guest Mode / Local Fallback
      const localItem: TodoItem = {
        ...newItemData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setTodos([localItem, ...todos]);
      resetModal();
      return;
    }

    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([{ ...newItemData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      
      setTodos([data, ...todos]);
      resetModal();
    } catch (error: any) {
      console.error('Error adding task:', error);
      Alert.alert('Cloud Sync Error', error.message || 'Could not save to cloud. Task added locally.');
      // Add locally anyway for guest-like experience if sync fails
      const localItem: TodoItem = {
        ...newItemData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setTodos([localItem, ...todos]);
      resetModal();
    } finally {
      setSubmitting(false);
    }
  };

  const resetModal = () => {
    setShowAddModal(false);
    setNewTask(''); setNewDesc(''); setNewCat('Pre-Trip'); setNewPriority('Medium'); setNewClass('');
    setSubmitting(false);
  };

  const renderSection = (title: string, cat: Category) => {
    const items = todos.filter(t => t.category === cat);
    if (items.length === 0) return null;

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name={CATEGORY_ICONS[cat]} size={18} color={WayoraColors.taviPurple} />
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        {items.map(item => (
          <View key={item.id} style={[styles.todoCard, { borderLeftColor: PRIORITY_COLORS[item.priority] }]}>
            <TouchableOpacity
              onPress={() => toggleTodo(item.id, item.completed)}
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
                  color={expandedIds.has(item.id) ? WayoraColors.taviPurple : WayoraColors.gray} 
                />
              </TouchableOpacity>
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
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color={WayoraColors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>To Do List</Text>
          <TouchableOpacity onPress={() => setShowAddModal(true)} style={styles.addBtn}>
            <Ionicons name="add" size={24} color={WayoraColors.white} />
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={{ marginTop: 100 }}>
            <ActivityIndicator size="large" color={WayoraColors.taviPurple} />
            <Text style={{ textAlign: 'center', marginTop: 10, color: WayoraColors.gray }}>Syncing with cloud...</Text>
          </View>
        ) : (
          <>
            {/* Progress Card */}
            <View style={styles.progressContainer}>
              <LinearGradient colors={[WayoraColors.taviPurple, '#A78BFA']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.progressCard}>
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
            
            {todos.length === 0 && (
              <View style={{ marginTop: 100, alignItems: 'center' }}>
                <Ionicons name="list-outline" size={60} color="#E5E7EB" />
                <Text style={{ color: WayoraColors.gray, marginTop: 10, fontWeight: '600' }}>Your task list is empty</Text>
              </View>
            )}
          </>
        )}
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
                  <Text style={styles.inputLabel}>Tag / Classification</Text>
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

              <TouchableOpacity 
                style={[styles.submitBtn, submitting && { opacity: 0.7 }]} 
                onPress={addTask}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.submitBtnText}>Add Task</Text>
                )}
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
    paddingTop: 20, 
    paddingBottom: 15,
    backgroundColor: 'transparent',
  },
  backBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E5E7EB' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: WayoraColors.black },
  addBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: WayoraColors.taviPurple, alignItems: 'center', justifyContent: 'center' },

  progressContainer: { padding: 20 },
  progressCard: { padding: 24, borderRadius: 28, shadowColor: WayoraColors.taviPurple, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  progressLabel: { fontSize: 18, fontWeight: '800', color: 'white' },
  progressCount: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  progressPercent: { fontSize: 32, fontWeight: '900', color: 'white' },
  progressTrack: { height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: 'white', borderRadius: 4 },

  section: { paddingHorizontal: 20, marginBottom: 30 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 18 },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: WayoraColors.gray, textTransform: 'uppercase', letterSpacing: 1 },
  
  todoCard: { 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    borderRadius: 24, 
    padding: 18, 
    marginBottom: 14, 
    borderLeftWidth: 5,
    alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3
  },
  todoMain: { flex: 1, flexDirection: 'row', alignItems: 'flex-start' },
  checkbox: { width: 26, height: 26, borderRadius: 10, borderWidth: 2, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center', marginRight: 18, marginTop: 2 },
  checkboxDone: { backgroundColor: WayoraColors.taviPurple, borderColor: WayoraColors.taviPurple },
  textRow: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  todoText: { fontSize: 16, fontWeight: '700', color: WayoraColors.black },
  todoTextDone: { textDecorationLine: 'line-through', opacity: 0.4 },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  priorityText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  classTag: { backgroundColor: WayoraColors.taviBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  classTagText: { fontSize: 11, fontWeight: '800', color: WayoraColors.taviPurple },
  todoDescFull: { fontSize: 14, color: WayoraColors.gray, marginTop: 14, lineHeight: 20, fontStyle: 'italic' },
  
  actionColumn: { alignItems: 'center', gap: 16, marginLeft: 12 },
  actionIconBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 28, maxHeight: '90%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  modalTitle: { fontSize: 24, fontWeight: '900', color: WayoraColors.black },
  inputLabel: { fontSize: 14, fontWeight: '800', color: WayoraColors.gray, marginBottom: 10, marginTop: 18 },
  input: { backgroundColor: '#F3F4F6', borderRadius: 16, padding: 18, fontSize: 15, color: WayoraColors.black, borderWidth: 1, borderColor: '#E5E7EB' },
  inputRow: { flexDirection: 'row', marginTop: 6 },
  selector: { flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 16, padding: 5, gap: 5 },
  selectorBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12 },
  selectorBtnActive: { backgroundColor: WayoraColors.taviPurple },
  selectorText: { fontSize: 12, fontWeight: '800', color: WayoraColors.gray },
  submitBtn: { backgroundColor: WayoraColors.taviPurple, padding: 20, borderRadius: 20, alignItems: 'center', marginTop: 36, shadowColor: WayoraColors.taviPurple, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  submitBtnText: { color: 'white', fontSize: 18, fontWeight: '900' },
});
