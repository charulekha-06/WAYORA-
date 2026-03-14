import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WayoraColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function FloatingChatbot() {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your Wayora AI Guide. I offer 24/7 travel help, local tips, safety alerts, and recommendations. What can I help you with today?", isUser: false }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), text: input, isUser: true };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great idea! For local tips, you should definitely try the nearby street food market. It's safe and vibrant.",
        "Remember to stay alert in crowded tourist areas. It's generally very safe, but watch your belongings.",
        "I highly recommend taking the scenic route. Want me to build an itinerary for that?",
      ];
      const botMsg = { id: Date.now() + 1, text: responses[Math.floor(Math.random() * responses.length)], isUser: false };
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
          <View style={styles.chatContainer}>
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Ionicons name="sparkles" size={20} color={WayoraColors.coral} />
                <Text style={styles.headerTitle}>Wayora AI Guide</Text>
              </View>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Ionicons name="close" size={24} color={WayoraColors.black} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.messageList} contentContainerStyle={{ padding: 16 }}>
              {messages.map(msg => (
                <View key={msg.id} style={[styles.messageBubble, msg.isUser ? styles.userBubble : styles.aiBubble]}>
                  <Text style={[styles.messageText, msg.isUser ? styles.userText : styles.aiText]}>{msg.text}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Ask me anything..."
                placeholderTextColor={WayoraColors.gray}
                value={input}
                onChangeText={setInput}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <Ionicons name="send" size={18} color="#fff" />
              </TouchableOpacity>
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
    bottom: 90, // Above the tab bar
    right: 20,
    zIndex: 999,
  },
  circleButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F28C38', // Orange color matching provided image
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F28C38',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
  },
  chatContainer: {
    backgroundColor: WayoraColors.offWhite,
    height: '80%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: WayoraColors.white,
    borderBottomWidth: 1,
    borderBottomColor: WayoraColors.lightGray,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: WayoraColors.black,
  },
  messageList: {
    flex: 1,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: WayoraColors.coral,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: WayoraColors.white,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: WayoraColors.lightGray,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userText: {
    color: '#fff',
  },
  aiText: {
    color: WayoraColors.darkGray,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: WayoraColors.white,
    borderTopWidth: 1,
    borderTopColor: WayoraColors.lightGray,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: WayoraColors.offWhite,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: WayoraColors.black,
    borderWidth: 1,
    borderColor: WayoraColors.lightGray,
    marginRight: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: WayoraColors.coral,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
