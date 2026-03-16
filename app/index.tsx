import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { View, ActivityIndicator } from 'react-native';
import { WayoraColors } from '@/constants/Colors';

export default function RootIndex() {
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/auth');
      }
    } catch (e) {
      router.replace('/auth');
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF' }}>
      <ActivityIndicator size="large" color={WayoraColors.taviPurple} />
    </View>
  );
}
