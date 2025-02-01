import React from 'react';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';
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

const SearchPlace = () => {
  const [trip, setTrip] = useRecoilState(states.trip);

  const router = useRouter();

  const handleSelectPlace = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null = null
  ) => {
    setTrip((prev: any) => ({
      ...prev,
      tripForm: {
        ...prev.tripForm,
        destination: data.description,
      },
    }));
  };

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
              Search Destination
            </Text>
          </HStack>
          <GooglePlacesAutocomplete
            placeholder="Search your destination"
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

export default SearchPlace;
