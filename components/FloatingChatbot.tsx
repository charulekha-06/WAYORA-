import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WayoraColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const POPULAR_TOPICS = [
  { id: 't1', title: 'Destinations', desc: 'Get recommendations', icon: 'location' },
  { id: 't2', title: 'Budget Tips', desc: 'Save money', icon: 'cash' },
  { id: 't3', title: 'Food & Dining', desc: 'Local cuisine', icon: 'restaurant' },
  { id: 't4', title: 'Trip Planning', desc: 'Custom itineraries', icon: 'calendar' },
];

const QUICK_QUESTIONS = [
  "Best cafes in Paris?",
  "Budget tips for Tokyo",
  "Hidden gems in Rome",
  "Vegan restaurants nearby",
];

export default function FloatingChatbot() {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Tavi, your AI travel assistant! 🌏 How can I help you plan your perfect trip today?", isUser: false, time: '03:27 PM' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = (text = input) => {
    const msgText = typeof text === 'string' ? text : input;
    if (!msgText.trim()) return;
    
    const userMsg = { id: Date.now(), text: msgText, isUser: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    setTimeout(() => {
      const responses = [
        "That's a great request! I can find some amazing spots for you. Would you like me to filter by price range?",
        "Paris has some incredible hidden cafes. I recommend checking out the Marais district for the best local vibes.",
        "I've updated your budget tips for Tokyo. It's generally very safe, but watch your belongings in Shinjuku.",
      ];
      const botMsg = { id: Date.now() + 1, text: responses[Math.floor(Math.random() * responses.length)], isUser: false, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <>
      <TouchableOpacity style={styles.floatingButton} onPress={() => setVisible(true)} activeOpacity={0.8}>
        <View style={styles.circleButton}>
          <Ionicons name="chatbubble-ellipses" size={26} color="#fff" />
        </View>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)} activeOpacity={1} />
          <View style={styles.contentWrapper}>
            {/* Main Chat Area */}
            <View style={styles.chatContainer}>
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <View style={styles.purpleDot} />
                  <Text style={styles.headerTitle}>Tavi AI</Text>
                </View>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Ionicons name="close" size={24} color={WayoraColors.gray} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.messageList} contentContainerStyle={{ padding: 20 }}>
                {messages.map(msg => (
                  <View key={msg.id} style={[styles.messageRow, msg.isUser ? styles.userRow : styles.aiRow]}>
                    <View style={[styles.messageBubble, msg.isUser ? styles.userBubble : styles.aiBubble]}>
                      <Text style={[styles.messageText, msg.isUser ? styles.userText : styles.aiText]}>{msg.text}</Text>
                    </View>
                    <Text style={styles.timeText}>{msg.time}</Text>
                  </View>
                ))}

                {/* Integrated Suggestions Section */}
                <View style={styles.integratedSuggestions}>
                   <View style={styles.sectionDivider} />
                   
                   <Text style={styles.integratedTitle}>Popular Topics</Text>
                   <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                      {POPULAR_TOPICS.map(topic => (
                        <TouchableOpacity key={topic.id} style={styles.topicChip}>
                          <Ionicons name={topic.icon as any} size={16} color={WayoraColors.taviPurple} />
                          <Text style={styles.topicChipText}>{topic.title}</Text>
                        </TouchableOpacity>
                      ))}
                   </ScrollView>

                   <Text style={[styles.integratedTitle, { marginTop: 24 }]}>Quick Questions</Text>
                   <View style={styles.questionsGrid}>
                      {QUICK_QUESTIONS.map((q, i) => (
                        <TouchableOpacity key={i} style={styles.qCard} onPress={() => sendMessage(q)}>
                          <Text style={styles.qCardText}>{q}</Text>
                          <Ionicons name="chevron-forward" size={14} color={WayoraColors.gray} />
                        </TouchableOpacity>
                      ))}
                   </View>
                </View>
              </ScrollView>

              <View style={styles.inputSection}>
                <View style={styles.inputContainer}>
                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="mic-outline" size={22} color={WayoraColors.gray} />
                  </TouchableOpacity>
                  <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    placeholderTextColor={WayoraColors.gray}
                    value={input}
                    onChangeText={setInput}
                    onSubmitEditing={() => sendMessage()}
                  />
                  <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage()}>
                    <Ionicons name="send" size={18} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 160,
    right: 20,
    zIndex: 999,
  },
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: WayoraColors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: WayoraColors.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  contentWrapper: {
    width: '90%',
    height: '80%',
    backgroundColor: WayoraColors.white,
    borderRadius: 24,
    overflow: 'hidden',
    maxWidth: 500, // Reduced for single column
  },
  chatContainer: {
    flex: 1,
    backgroundColor: WayoraColors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: WayoraColors.lightGray,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  purpleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: WayoraColors.taviPurple,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: WayoraColors.taviPurple,
  },
  messageList: {
    flex: 1,
  },
  messageRow: {
    marginBottom: 20,
    maxWidth: '85%',
  },
  userRow: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  aiRow: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  messageBubble: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 6,
  },
  userBubble: {
    backgroundColor: WayoraColors.taviPurple,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: WayoraColors.taviBg,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: WayoraColors.lightGray,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 22,
  },
  userText: { color: '#FFF' },
  aiText: { color: WayoraColors.black },
  timeText: {
    fontSize: 10,
    color: WayoraColors.gray,
    marginHorizontal: 4,
  },
  integratedSuggestions: {
    marginTop: 10,
    paddingBottom: 20,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: WayoraColors.lightGray,
    marginVertical: 24,
    width: '100%',
  },
  integratedTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: WayoraColors.black,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  horizontalScroll: {
    marginBottom: 10,
  },
  topicChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WayoraColors.taviPurpleLight,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    gap: 8,
  },
  topicChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: WayoraColors.taviPurple,
  },
  questionsGrid: {
    gap: 12,
  },
  qCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: WayoraColors.taviBg,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: WayoraColors.lightGray,
  },
  qCardText: {
    fontSize: 14,
    color: WayoraColors.darkGray,
    fontWeight: '500',
  },
  inputSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: WayoraColors.lightGray,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WayoraColors.taviBg,
    borderRadius: 25,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: WayoraColors.lightGray,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 14,
    color: WayoraColors.black,
  },
  iconButton: {
    padding: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: WayoraColors.taviPurple,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
