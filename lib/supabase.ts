import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace these with your actual Supabase URL and Anon Key
// from your Supabase Project Settings > API
const supabaseUrl = 'https://djjygexkdcvuiimqlyke.supabase.co';
const supabaseAnonKey = 'sb_publishable_GUlcRJT0O-tNmdcbS452yw_C8h1Al8u';

// Prevent crash if user hasn't set keys yet
console.log('--- SUPABASE LIB INITIALIZING ---');
const isConfigured = supabaseUrl && supabaseUrl.includes('supabase.co');

let supabaseInstance: any;

if (isConfigured) {
  try {
    console.log('Attempting to create Supabase client...');
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
    console.log('Supabase client created successfully!');
  } catch (err) {
    console.error('FAILED to create Supabase client:', err);
    supabaseInstance = null;
  }
}

if (!supabaseInstance) {
  console.log('Using Supabase Mock...');
  // Mock object to prevent app from crashing during build/render
  console.warn('Supabase is not configured. Please set YOUR_SUPABASE_URL and YOUR_SUPABASE_ANON_KEY in lib/supabase.ts');
  supabaseInstance = {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: async () => {
        console.warn('Supabase URL and Key are missing in lib/supabase.ts.');
        return { data: { user: null }, error: null };
      },
      signUp: async () => {
        console.warn('Supabase URL and Key are missing in lib/supabase.ts.');
        return { data: { user: null }, error: null };
      },
      signOut: async () => ({ error: null }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
          order: () => ({ data: [], error: null }),
          limit: () => ({ data: [], error: null }),
        }),
        order: () => ({ data: [], error: null }),
        limit: () => ({ data: [], error: null }),
      }),
      upsert: async () => ({ data: null, error: null }),
      insert: () => ({
        select: () => ({
          single: async () => ({ data: null, error: null }),
        }),
      }),
      update: () => ({
        eq: () => ({
          eq: async () => ({ data: null, error: null }),
        }),
      }),
      delete: () => ({
        eq: async () => ({ data: null, error: null }),
      }),
    }),
  };
}

export const supabase = supabaseInstance;
