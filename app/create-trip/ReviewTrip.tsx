import React, { useState } from 'react';
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
import { format } from 'date-fns';

import FormButton from '@/components/FormButton';
import FormReviewCard from '@/components/FormReviewCard';

const SelectBudgetType = () => {
  const [loading, setLoading] = useState(false);

  const [trip, setTrip] = useRecoilState(states.trip);

  const router = useRouter();

  const handleGenerateTrip = async () => {
    try {
      setLoading(true);

      // TODO: Implement Gemini AI to handle trip generation
      // TODO: Save trip to database
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack className="my-8 px-4 flex-1" space="4xl">
          <HStack space="md" className="items-center">
            <Button size="xl" variant="link" onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#3b82f6" />
            </Button>
            <Text size="3xl" className="font-medium">
              Review Trip
            </Text>
          </HStack>

          <VStack className="flex-1" space="sm">
            <FormReviewCard
              title="📍 Destination"
              name={trip.tripForm.destination}
              onChange={() => router.push('/create-trip/SearchPlace')}
            />

            {trip.tripForm.travelDates.start &&
              trip.tripForm.travelDates.end && (
                <FormReviewCard
                  title="🗓️ Travel Dates"
                  name={`${format(
                    trip.tripForm.travelDates.start,
                    'MMM. dd, yyyy'
                  )} - ${format(
                    trip.tripForm.travelDates.end,
                    'MMM. dd, yyyy'
                  )}`}
                  sub={`${
                    Math.abs(
                      trip.tripForm.travelDates.end.getTime() -
                        trip.tripForm.travelDates.start.getTime()
                    ) /
                    (1000 * 60 * 60 * 24)
                  } days`}
                  onChange={() => router.push('/create-trip/SelectDates')}
                />
              )}

            <FormReviewCard
              title="🧳 Travel Type"
              name={trip.tripForm.travelType?.name}
              onChange={() => router.push('/create-trip/SelectTravelType')}
            />

            <FormReviewCard
              title="💸 Budget Type"
              name={trip.tripForm.budgetType?.name}
              onChange={() => router.push('/create-trip/SelectBudgetType')}
            />
          </VStack>

          <FormButton text="Generate Your Trip" onPress={handleGenerateTrip} />
        </VStack>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SelectBudgetType;
