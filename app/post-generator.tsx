import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, TextInput, Platform, KeyboardAvoidingView, Share, Clipboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { WayoraColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const TONES = [
  { label: 'Adventurous', value: 'adventurous', icon: 'compass-outline' as const },
  { label: 'Whimsical', value: 'whimsical', icon: 'sparkles-outline' as const },
  { label: 'Relaxed', value: 'relaxed', icon: 'leaf-outline' as const },
  { label: 'Professional', value: 'professional', icon: 'business-outline' as const },
];

export default function PostGeneratorScreen() {
  const router = useRouter();
  const [dest, setDest] = useState('');
  const [highlights, setHighlights] = useState('');
  const [tone, setTone] = useState('adventurous');
  const [generatedPost, setGeneratedPost] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePost = () => {
    if (!dest) return;
    setIsGenerating(true);
    
    // Simulation delay
    setTimeout(() => {
      let post = '';
      const place = dest.charAt(0).toUpperCase() + dest.slice(1);
      const items = highlights ? highlights.toLowerCase() : 'the beautiful architecture and local vibes';

      if (tone === 'adventurous') {
        post = `Beyond excited to finally experience ${place}! 🌍\n\nSpent the day exploring ${items} and pushing my boundaries. There's nothing quite like the thrill of discovering hidden gems in a new city. Every corner here tells a story. 🏔️✨\n\n#Adventure #Wanderlust #${place.replace(/\s/g, '')} #Wayora`;
      } else if (tone === 'whimsical') {
        post = `Lost in a dream at ${place}... 🕊️\n\nIt feels like stepping into a storybook here. Magic was everywhere, especially while taking in ${items}. My soul is so full of wonder right now. Pure enchantment! ✨🎠💫\n\n#TravelMagic #DreamDestination #${place.replace(/\s/g, '')} #ParisVibes`;
      } else if (tone === 'relaxed') {
        post = `Slowing down and soaking in every second at ${place}. 🌿\n\nSometimes the best way to travel is to just *be*. Enjoying ${items} was exactly the reset I needed. Peace and quiet found in the heart of the city. 🌊🧘‍♀️\n\n#SlowTravel #MindfulMoments #${place.replace(/\s/g, '')} #Serenity`;
      } else {
        post = `Highly impressed by the cultural richness and infrastructure of ${place}. 🏙️\n\nThe experience at ${items} provided unique insights into the region's heritage and modern lifestyle. A must-visit for anyone looking for a balanced and enriching travel itinerary. 💼🖋️\n\n#TravelPro #GlobalInsights #Wayora #${place.replace(/\s/g, '')}`;
      }
      
      setGeneratedPost(post);
      setIsGenerating(false);
    }, 1200);
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
              {TONES.map((t) => (
                <TouchableOpacity 
                  key={t.value} 
                  style={[styles.toneChip, tone === t.value && styles.toneChipActive]}
                  onPress={() => setTone(t.value)}
                >
                  <Ionicons 
                    name={t.icon} 
                    size={16} 
                    color={tone === t.value ? 'white' : '#1E40AF'} 
                    style={{ marginRight: 6 }}
                  />
                  <Text style={[styles.toneLabel, tone === t.value && { color: 'white' }]}>{t.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={[styles.genBtn, !dest && { opacity: 0.5 }]} 
              onPress={generatePost}
              disabled={!dest || isGenerating}
            >
              <LinearGradient colors={['#34D399', '#10B981']} style={styles.genGradient}>
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
  toneGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
  toneChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: '#EFF6FF', borderWidth: 1, borderColor: '#DBEAFE' },
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
