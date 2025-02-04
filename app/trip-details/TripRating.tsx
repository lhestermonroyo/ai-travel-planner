import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { AirbnbRating } from 'react-native-ratings';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Grid, GridItem } from '@/components/ui/grid';
import { Image } from '@/components/ui/image';
import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { useRecoilState, useRecoilValue } from 'recoil';

import states from '@/states';
import { format } from 'date-fns';
import FormTextArea from '@/components/FormTextArea';

import FormButton from '@/components/FormButton';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';
import services from '@/services';

const TripRating = () => {
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState({
    feedback: '',
    stars: 3,
    photos: [],
  });

  const auth = useRecoilValue(states.auth);
  const [trip, setTrip] = useRecoilState(states.trip);
  const { aiGenTrip } = trip.tripItem;

  const router = useRouter();
  const toast = useToast();

  const handleToast = (title: string, description: string, type: any) => {
    toast.show({
      placement: 'top',
      duration: 5000,
      render: ({ id }) => {
        const uniqueToastId = 'toast-' + id;

        return (
          <Toast nativeID={uniqueToastId} action={type} variant="outline">
            <ToastTitle>{title}</ToastTitle>
            <ToastDescription>{description}</ToastDescription>
          </Toast>
        );
      },
    });
  };

  const handlePickImage = async () => {
    let response = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true, // Works on **Web** but not **Android/iOS**
      mediaTypes: 'images',
      aspect: [1, 1],
      quality: 1,
    });

    if (!response.canceled) {
      setValues((prev: any) => ({
        ...prev,
        photos: [...prev.photos, ...response.assets],
      }));
    }
  };

  const removePhoto = (imageUri: string) => {
    setValues((prev: any) => ({
      ...prev,
      photos: prev.photos.filter((photo: any) => photo.uri !== imageUri),
    }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      let photoUrls: string[] = [];
      // Upload photos
      if (values.photos.length > 0) {
        photoUrls = (await services.upload.uploadTripRatingPhotos(
          values.photos,
          trip.tripItem.id
        )) as string[];
      }

      const payload = {
        email: auth?.user.email,
        feedback: values.feedback,
        stars: values.stars,
        photos: photoUrls,
      };

      const response = await services.database.saveRating(
        trip.tripItem.id,
        payload
      );

      if (response) {
        handleToast('Success', 'Trip rating submitted successfully', 'success');
        router.back();
      }
    } catch (error) {
      console.log('handleSubmit [error]', error);
      handleToast('Error', 'Failed to submit trip rating', 'error');
    } finally {
      setSubmitting(false);
    }
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
                Rate Your Trip
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

                <Grid
                  className="gap-2"
                  _extra={{
                    className: 'grid-cols-9',
                  }}
                >
                  <GridItem
                    _extra={{
                      className: 'col-span-3',
                    }}
                  >
                    <TouchableOpacity onPress={handlePickImage}>
                      <Box className="bg-white h-[120px] justify-center items-center rounded-md">
                        <Ionicons
                          name="add-outline"
                          size={48}
                          color="#6b7280"
                        />
                      </Box>
                    </TouchableOpacity>
                  </GridItem>
                  {values.photos.map((photo: any, index: number) => (
                    <GridItem
                      key={index}
                      _extra={{
                        className: 'col-span-3',
                      }}
                    >
                      <Box className="rounded-md relative">
                        <HStack className="z-10 absolute top-2 right-2">
                          <Button
                            size="xs"
                            variant="solid"
                            className=" h-8 w-8 rounded-full p-1"
                            onPress={() => removePhoto(photo.uri)}
                          >
                            <Ionicons
                              name="close-outline"
                              size={20}
                              color="#fff"
                            />
                          </Button>
                        </HStack>
                        <Image
                          className="bg-gray-300 h-[120px] w-full rounded-md aspect-[1:1]"
                          resizeMode="cover"
                          alt="trip-rating-image"
                          source={{ uri: photo.uri }}
                        />
                      </Box>
                    </GridItem>
                  ))}
                </Grid>
              </FormControl>
            </VStack>
          </ScrollView>
          <FormButton
            loading={submitting}
            text="Submit"
            onPress={handleSubmit}
          />
        </VStack>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default TripRating;
