import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';
import AuthScreen from './ui/screens/auth';
import BottomTabs from './navigation/bottomTabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './lib/types/types';
import { GlobalStyles } from './constants/styles';
import SavePostScreen from './ui/screens/savePost';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Root() {
  return <App />;
}

export function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // console.log('supabase.auth', supabase.auth);

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <>
      <StatusBar style="dark" />

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: '#fff',
          }}
        >
          {!session === null ? (
            <>
              <Stack.Screen
                name="Auth"
                component={AuthScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="AppHome"
                component={BottomTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SavePost"
                component={SavePostScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
