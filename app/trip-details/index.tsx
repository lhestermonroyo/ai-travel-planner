import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import 'react-native-get-random-values';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text/';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Button } from '@/components/ui/button';
import { useRecoilState } from 'recoil';

import states from '@/states';

import FormButton from '@/components/FormButton';

const TripDetails = () => {
  const [trip, setTrip] = useRecoilState(states.trip);
  const { tripDetails, aiGenTrip } = trip;

  const router = useRouter();

  useEffect(() => {
    if (!tripDetails) {
      router.push('/(tabs)/MyTrips');
    }
  }, []);

  console.log(JSON.stringify(tripDetails, null, 2));

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack className="my-8 px-4 flex-1" space="4xl">
          <HStack space="md" className="items-center">
            <Button
              size="xl"
              variant="link"
              onPress={() => router.push('/(tabs)/MyTrips')}
            >
              <Ionicons name="arrow-back" size={24} color="#3b82f6" />
            </Button>
            <Text size="3xl" className="font-medium">
              Trip Preview
            </Text>
          </HStack>
        </VStack>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default TripDetails;
