import React from 'react';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import CalendarPicker from 'react-native-calendar-picker';
import { format } from 'date-fns';

import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text/';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Button } from '@/components/ui/button';
import { useRecoilState } from 'recoil';

import states from '@/states';

import FormButton from '@/components/FormButton';

const SelectDates = () => {
  const [trip, setTrip] = useRecoilState(states.trip);

  const router = useRouter();

  const handleSelectDates = (date: any, type: any) => {
    if (type === 'START_DATE') {
      setTrip((prev: any) => ({
        ...prev,
        tripForm: {
          ...prev.tripForm,
          travelDates: {
            ...prev.tripForm.travelDates,
            start: date,
          },
        },
      }));
    } else {
      setTrip((prev: any) => ({
        ...prev,
        tripForm: {
          ...prev.tripForm,
          travelDates: {
            ...prev.tripForm.travelDates,
            end: date,
          },
        },
      }));
    }
  };

  const handleResetDates = () => {
    setTrip((prev: any) => ({
      ...prev,
      tripForm: {
        ...prev.tripForm,
        travelDates: {
          start: '',
          end: '',
        },
      },
    }));
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
              Choose Travel Dates
            </Text>
          </HStack>

          <VStack space="3xl" className="flex-1">
            <CalendarPicker
              height={400}
              enableDateChange
              allowRangeSelection
              showDayStragglers
              minDate={new Date()}
              dayShape="circle"
              selectedRangeStyle={{ backgroundColor: '#3b82f6' }}
              selectedDayTextColor="#fff"
              todayBackgroundColor="#333"
              selectedStartDate={trip.tripForm.travelDates.start}
              selectedEndDate={trip.tripForm.travelDates.end}
              onDateChange={handleSelectDates}
            />

            {trip.tripForm.travelDates.start &&
              trip.tripForm.travelDates.end && (
                <HStack className="justify-between items-center">
                  <VStack>
                    <Text size="md" className="text-secondary-900">
                      Selected dates
                    </Text>
                    <Text size="xl" className="text-primary-500 font-medium">
                      {format(trip.tripForm.travelDates.start, 'MMM. dd, yyyy')}{' '}
                      - {format(trip.tripForm.travelDates.end, 'MMM. dd, yyyy')}
                    </Text>
                    <Text size="lg">
                      {Math.abs(
                        trip.tripForm.travelDates.end.getTime() -
                          trip.tripForm.travelDates.start.getTime()
                      ) /
                        (1000 * 60 * 60 * 24)}{' '}
                      days
                    </Text>
                  </VStack>
                  <FormButton
                    size="md"
                    variant="outline"
                    text="Reset"
                    onPress={handleResetDates}
                  />
                </HStack>
              )}
          </VStack>

          <FormButton
            disabled={
              !trip.tripForm.travelDates.start || !trip.tripForm.travelDates.end
            }
            text="Next"
            onPress={() => router.push('/create-trip/SelectTravelType')}
          />
        </VStack>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SelectDates;
