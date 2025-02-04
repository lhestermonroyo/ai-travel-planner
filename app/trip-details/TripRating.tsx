import React, { useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { AirbnbRating } from 'react-native-ratings';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Ionicons } from '@expo/vector-icons';
import { useRecoilState } from 'recoil';

import states from '@/states';
import { format } from 'date-fns';
import FormTextArea from '@/components/FormTextArea';
import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import FormButton from '@/components/FormButton';

const TripRating = () => {
  const [values, setValues] = useState({
    feedback: '',
    stars: 1,
    photos: [],
  });

  const [trip, setTrip] = useRecoilState(states.trip);
  const { aiGenTrip } = trip.tripItem;

  const router = useRouter();

  const handlePickImage = async () => {
    let response = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true, // Works on **Web** but not **Android/iOS**
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    console.log('response', response);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack className="pt-8 px-4 flex-1" space="lg">
          <HStack space="md" className="items-center justify-between">
            <HStack space="md" className="items-center">
              <Button size="xl" variant="link" onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#3b82f6" />
              </Button>
              <Text size="3xl" className="font-medium">
                Rate your Trip
              </Text>
            </HStack>
          </HStack>

          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack space="3xl" className="flex-1">
              <VStack>
                <HStack>
                  <Text size="xl">Let us know how your trip went in </Text>
                  <Text size="xl" className="text-primary-500 font-medium">
                    {aiGenTrip.destination}
                  </Text>
                  <Text size="xl">.</Text>
                </HStack>
                <Text size="lg">
                  {format(aiGenTrip.travelDates.start, 'MMM. d, yyyy')} -{' '}
                  {format(aiGenTrip.travelDates.end, 'MMM. d, yyyy')} (
                  {aiGenTrip.noOfDays} days)
                </Text>
              </VStack>

              <FormTextArea
                label="Feedback"
                placeholder="Compose your trip feedback"
                value={values.feedback}
                onChangeText={text =>
                  setValues((prev: any) => ({
                    ...prev,
                    feedback: text,
                  }))
                }
                helperText="Let us know what did you like? What could be improved?"
              />

              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText>Trip Ratings</FormControlLabelText>
                </FormControlLabel>

                <HStack space="md" className="items-center">
                  <AirbnbRating
                    defaultRating={1}
                    size={36}
                    starContainerStyle={{ paddingRight: 10 }}
                    showRating={false}
                    onFinishRating={(rating: any) =>
                      setValues((prev: any) => ({
                        ...prev,
                        stars: rating,
                      }))
                    }
                  />

                  <Text size="xl" className="font-medium">
                    {values.stars}/5
                  </Text>
                </HStack>

                <FormControlHelper>
                  <FormControlHelperText>
                    How much would you recommend this generated trip?
                  </FormControlHelperText>
                </FormControlHelper>
              </FormControl>

              <FormControl>
                <FormControlLabel className="mb-4">
                  <FormControlLabelText>
                    Upload Photos from Trip
                  </FormControlLabelText>
                </FormControlLabel>

                <FormButton
                  text="Upload Photos"
                  icon={
                    <Ionicons name="image-outline" size={24} color="#fff" />
                  }
                  onPress={handlePickImage}
                />
              </FormControl>
            </VStack>
          </ScrollView>
          <FormButton text="Submit" />
        </VStack>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default TripRating;
