import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, TextInput, Platform, KeyboardAvoidingView, Share, Clipboard,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { WayoraColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { generatePostContent } from '@/lib/gemini';

const { width } = Dimensions.get('window');

const TONES = [
  { 
    label: 'Adventurous', value: 'adventurous', icon: 'compass-outline' as const, 
    active: 'rgba(0, 0, 0, 0.85)', inactive: 'rgba(0, 0, 0, 0.05)', text: 'rgba(0, 0, 0, 0.7)' 
  },
  { 
    label: 'Whimsical', value: 'whimsical', icon: 'sparkles-outline' as const, 
    active: 'rgba(0, 0, 0, 0.85)', inactive: 'rgba(0, 0, 0, 0.05)', text: 'rgba(0, 0, 0, 0.7)' 
  },
  { 
    label: 'Relaxed', value: 'relaxed', icon: 'leaf-outline' as const, 
    active: 'rgba(0, 0, 0, 0.85)', inactive: 'rgba(0, 0, 0, 0.05)', text: 'rgba(0, 0, 0, 0.7)' 
  },
  { 
    label: 'Professional', value: 'professional', icon: 'business-outline' as const, 
    active: 'rgba(0, 0, 0, 0.85)', inactive: 'rgba(0, 0, 0, 0.05)', text: 'rgba(0, 0, 0, 0.7)' 
  },
];

export default function PostGeneratorScreen() {
  const router = useRouter();
  const [dest, setDest] = useState('');
  const [highlights, setHighlights] = useState('');
  const [tone, setTone] = useState('adventurous');
  const [generatedPost, setGeneratedPost] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePost = async () => {
    if (!dest) return;
    setIsGenerating(true);
    
    try {
      const post = await generatePostContent(dest, highlights, tone);
      setGeneratedPost(post);
    } catch (error: any) {
      if (error.message === 'API_KEY_MISSING') {
        Alert.alert(
          'API Key Required',
          'To generate real posts, please open the `.env` file in the project directory and paste your actual Google Gemini API Key where it says YOUR_API_KEY_HERE, then restart the server.'
        );
      } else {
        Alert.alert('Error', error.message || 'Failed to generate post. Please try again.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(generatedPost);
    Alert.alert("Success", "Post copied to clipboard!");
  };

  const onShare = async () => {
    try {
      await Share.share({ message: generatedPost });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={WayoraColors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post Generator</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <View style={styles.inputCard}>
            <Text style={styles.label}>Destination</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Where was this?" 
              value={dest} 
              onChangeText={setDest} 
            />

            <Text style={styles.label}>Highlights</Text>
            <TextInput 
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]} 
              placeholder="e.g. Delicious pasta, hidden alleyways..." 
              multiline 
              value={highlights} 
              onChangeText={setHighlights} 
            />

            <Text style={styles.label}>Choose a Tone</Text>
            <View style={styles.toneGrid}>
              {TONES.map((t) => {
                const isActive = tone === t.value;
                return (
                  <TouchableOpacity 
                    key={t.value} 
                    style={[
                      styles.toneChip, 
                      { backgroundColor: isActive ? t.active : t.inactive, borderColor: isActive ? t.active : t.inactive }
                    ]}
                    onPress={() => setTone(t.value)}
                  >
                    <Ionicons 
                      name={t.icon} 
                      size={20} 
                      color={isActive ? 'white' : t.text} 
                      style={{ marginBottom: 6 }}
                    />
                    <Text style={[styles.toneLabel, { color: isActive ? 'white' : t.text, textAlign: 'center' }]}>{t.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity 
              style={[styles.genBtn, !dest && { opacity: 0.5 }]} 
              onPress={generatePost}
              disabled={!dest || isGenerating}
            >
              <LinearGradient colors={['rgba(0, 0, 0, 0.75)', 'rgba(0, 0, 0, 0.95)']} style={styles.genGradient}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  {isGenerating ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Ionicons name="sparkles" size={20} color="white" />
                  )}
                  <Text style={styles.genText}>{isGenerating ? 'Polishing your post...' : 'Create Post'}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {generatedPost ? (
            <View style={styles.resultCard}>
              <Text style={styles.resultHeading}>Generated Post</Text>
              <View style={styles.resultBox}>
                <Text style={styles.resultText}>{generatedPost}</Text>
              </View>
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.actionBtn} onPress={copyToClipboard}>
                  <Ionicons name="copy-outline" size={18} color={WayoraColors.black} />
                  <Text style={styles.actionLabel}>Copy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} onPress={onShare}>
                  <Ionicons name="share-outline" size={18} color={WayoraColors.black} />
                  <Text style={styles.actionLabel}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

import { Alert, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
    paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15, backgroundColor: 'white' 
  },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F1F3F5', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: WayoraColors.black },

  inputCard: { backgroundColor: 'white', padding: 25, borderRadius: 24, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  label: { fontSize: 13, fontWeight: '700', color: WayoraColors.gray, marginBottom: 8, marginTop: 15 },
  input: { backgroundColor: '#F8FAFC', borderRadius: 16, padding: 16, fontSize: 14, color: WayoraColors.black, borderWidth: 1, borderColor: '#F1F5F9' },
  toneGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, marginTop: 10 },
  toneChip: { 
    width: '48%', // More reliable than manual dimension math
    paddingVertical: 16, 
    borderRadius: 16, 
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  toneChipActive: { backgroundColor: '#3B82F6', borderColor: '#3B82F6' },
  toneLabel: { fontSize: 12, fontWeight: '700', color: '#1E40AF' },

  genBtn: { marginTop: 30, borderRadius: 18, overflow: 'hidden', shadowColor: '#10B981', shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
  genGradient: { paddingVertical: 18, alignItems: 'center' },
  genText: { color: 'white', fontSize: 16, fontWeight: '800' },

  resultCard: { marginTop: 25, backgroundColor: 'white', padding: 25, borderRadius: 24, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 15, elevation: 5, borderLeftWidth: 6, borderLeftColor: '#F5BE87' },
  resultHeading: { fontSize: 14, fontWeight: '800', color: '#C0512E', marginBottom: 15, textTransform: 'uppercase' },
  resultBox: { backgroundColor: 'white', padding: 20, borderRadius: 18 },
  resultText: { fontSize: 14, color: '#4A5568', lineHeight: 22 },
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 15, marginTop: 15 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8 },
  actionLabel: { fontSize: 13, fontWeight: '700', color: WayoraColors.black },
});
