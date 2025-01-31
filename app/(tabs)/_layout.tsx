import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const TabLayout = () => {
  const colorScheme = useColorScheme();

  console.log('colorScheme', colorScheme);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="MyTrips"
        options={{
          title: 'My Trips',
          tabBarIcon: ({ color }) => (
            <Ionicons name="location-sharp" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color }) => (
            <Ionicons name="compass-sharp" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-sharp" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
