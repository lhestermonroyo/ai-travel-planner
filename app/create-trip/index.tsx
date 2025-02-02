import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text/';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Button } from '@/components/ui/button';
import { useRecoilState } from 'recoil';

import states from '@/states';

import FormButton from '@/components/FormButton';

const CreateTrip = () => {
  const [errorMsg, setErrorMsg] = useState('');

  const [trip, setTrip] = useRecoilState(states.trip);

  const router = useRouter();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg(
        'Permission to access location was denied. Please enable location services for better accuracy of flight suggestions.'
      );
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    setTrip((prev: any) => ({
      ...prev,
      tripForm: {
        ...prev.tripForm,
        currLocation: location,
      },
    }));
  };

  const handleBack = () => {
    setTrip((prev: any) => ({
      ...prev,
      tripForm: {
        destination: null,
        travelDates: {
          start: '',
          end: '',
        },
        travelType: null,
        budgetType: null,
        notes: '',
      },
    }));
    router.push('/(tabs)/MyTrips');
  };

  const handleSelectPlace = (
    data: GooglePlaceData,
    _: GooglePlaceDetail | null = null
  ) => {
    setTrip((prev: any) => ({
      ...prev,
      tripForm: {
        ...prev.tripForm,
        destination: {
          placeId: data.place_id,
          description: data.description,
        },
      },
    }));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack className="my-8 px-4 flex-1" space="4xl">
          <HStack space="md" className="items-center">
            <Button size="xl" variant="link" onPress={handleBack}>
              <Ionicons name="arrow-back" size={24} color="#3b82f6" />
            </Button>
            <Text size="3xl" className="font-medium">
              Search Travel Destination
            </Text>
          </HStack>
          {errorMsg && (
            <Text className="text-center text-error-500">{errorMsg}</Text>
          )}

          <GooglePlacesAutocomplete
            placeholder="Search your travel destination"
            fetchDetails
            minLength={2}
            numberOfLines={6}
            renderDescription={row => row.description}
            onPress={handleSelectPlace}
            listViewDisplayed="auto"
            query={{
              key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
              language: 'en',
            }}
            styles={{
              container: {
                flex: 1,
              },
              textInput: {
                height: 48,
                fontSize: 16,
              },
              listView: {
                borderRadius: 4,
                width: '100%',
                height: 'auto',
                backgroundColor: '#fff',
              },
            }}
          />
          <FormButton
            disabled={!trip.tripForm.destination}
            text="Next"
            onPress={() => router.push('/create-trip/SelectDates')}
          />
        </VStack>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CreateTrip;
