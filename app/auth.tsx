import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { WayoraColors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'error' | 'success' } | null>(null);
  const router = useRouter();

  async function signInWithEmail() {
    console.log('--- SIGN IN ATTEMPT ---', email);
    setLoading(true);
    setMessage(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.log('Sign in error:', error.message);
        setMessage({ text: error.message, type: 'error' });
      } else {
        console.log('Sign in success!', data.user?.id);
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      console.error('Sign in unexpected error:', err);
      setMessage({ text: err.message || 'An unexpected error occurred', type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function signUpWithEmail() {
    console.log('--- SIGN UP ATTEMPT ---', email);
    if (password !== confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      console.log('Calling supabase.auth.signUp...');
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
          }
        }
      });

      if (error) {
        console.log('Sign up error:', error.message);
        setMessage({ text: error.message, type: 'error' });
      } else {
        console.log('Sign up success!', data.user?.id);
        if (data.user?.identities?.length === 0) {
          setMessage({ text: 'This email is already registered. Try signing in.', type: 'error' });
        } else {
          setMessage({ text: 'Success! Please check your email for a confirmation link.', type: 'success' });
        }
      }
    } catch (err: any) {
      console.error('Sign up unexpected error:', err);
      setMessage({ text: err.message || 'An unexpected error occurred', type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <LinearGradient colors={[WayoraColors.taviPurple, '#4F46E5']} style={styles.background} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Ionicons name="airplane" size={60} color="white" />
            <Text style={styles.title}>Wayora</Text>
            <Text style={styles.subtitle}>Your AI Travel Companion</Text>
          </View>

          <View style={styles.form}>
          {isSignUp && (
            <View style={styles.inputGroup}>
              <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                onChangeText={(text) => setFullName(text)}
                value={fullName}
                placeholder="Full Name"
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={'none'}
              style={styles.input}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={'none'}
              style={styles.input}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {isSignUp && (
            <>
              <View style={styles.inputGroup}>
                <Ionicons name="shield-checkmark-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  onChangeText={(text) => setConfirmPassword(text)}
                  value={confirmPassword}
                  secureTextEntry={true}
                  placeholder="Confirm Password"
                  autoCapitalize={'none'}
                  style={styles.input}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Ionicons name="call-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  onChangeText={(text) => setPhone(text)}
                  value={phone}
                  placeholder="Mobile Number"
                  keyboardType="phone-pad"
                  style={styles.input}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </>
          )}

          {message && (
            <View style={[styles.messageContainer, message.type === 'error' ? styles.errorContainer : styles.successContainer]}>
              <Ionicons 
                name={message.type === 'error' ? 'alert-circle' : 'checkmark-circle'} 
                size={20} 
                color={message.type === 'error' ? '#EF4444' : '#10B981'} 
              />
              <Text style={[styles.messageText, message.type === 'error' ? styles.errorText : styles.successText]}>
                {message.text}
              </Text>
            </View>
          )}

          <TouchableOpacity 
            style={styles.button} 
            disabled={loading} 
            onPress={() => isSignUp ? signUpWithEmail() : signInWithEmail()}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setIsSignUp(!isSignUp)} 
            style={styles.toggleContainer}
          >
            <Text style={styles.toggleText}>
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '45%',
  },
  content: { padding: 30, justifyContent: 'center' },
  scrollContent: { flexGrow: 1, justifyContent: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 50 },
  title: { fontSize: 36, fontWeight: '900', color: 'white', marginTop: 10 },
  subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', fontWeight: '500' },
  form: { 
    backgroundColor: 'white', 
    borderRadius: 30, 
    padding: 30, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 10 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 20, 
    elevation: 10 
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 50, color: WayoraColors.black, fontSize: 16 },
  button: {
    backgroundColor: WayoraColors.taviPurple,
    height: 55,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: WayoraColors.taviPurple,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '700' },
  toggleContainer: { marginTop: 20, alignItems: 'center' },
  toggleText: { color: WayoraColors.darkGray, fontWeight: '600', fontSize: 14 },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  successContainer: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  messageText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  errorText: {
    color: '#B91C1C',
  },
  successText: {
    color: '#065F46',
  },
});
