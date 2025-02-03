import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text/';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';
import { Box } from '@/components/ui/box';
import { Center } from '@/components/ui/center';
import { Image } from '@/components/ui/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import { format } from 'date-fns';

import states from '@/states';
import services from '@/services';
import { chatSession } from '@/services/ai';
import { AI_PROMPT } from '@/constants/CreateTrip';

import FormButton from '@/components/FormButton';
import FormReviewCard from '@/components/FormReviewCard';

const SelectBudgetType = () => {
  const [loading, setLoading] = useState(false);

  const auth = useRecoilValue(states.auth);
  const [trip, setTrip] = useRecoilState(states.trip);

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

  const handleAIPrompt = async () => {
    const travelDetails = {
      destination: trip.form.destination.description,
      travelDates: {
        start: trip.form.travelDates.start,
        end: trip.form.travelDates.end,
      },
      travelType: trip.form.travelType,
      budgetType: trip.form.budgetType,
      notes: trip.form.notes,
    };

    const finalPromp = AI_PROMPT.replace(
      '{travelDetails}',
      JSON.stringify(travelDetails)
    ).replace('{coordinates}', JSON.stringify(trip.form.currLocation));

    const prompRes = await chatSession.sendMessage(finalPromp);
    return JSON.parse(prompRes.response.text());
  };

  const handleGenerateTrip = async () => {
    try {
      setLoading(true);

      const generatedTrip = await handleAIPrompt();

      if (generatedTrip) {
        const response = await services.database.saveTrip(
          auth.user.email,
          trip.form,
          generatedTrip
        );

        if (response) {
          setTrip((prev: any) => ({
            ...prev,
            form: {
              destination: null,
              travelDates: {
                start: '',
                end: '',
              },
              travelType: null,
              budgetType: null,
              notes: '',
            },
            tripItem: response.data(),
          }));
          handleToast(
            'Generate Trip Success',
            'Your trip has been successfully generated.',
            'success'
          );
          router.push('/trip-details');
        }
      }
    } catch (error) {
      console.log('handleGenerateTrip [error]', error);
      handleToast(
        'Generate Trip Failed',
        'An error occurred while generating your trip. Please try again.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box className="bg-white flex-1 justify-center items-center">
        <VStack space="3xl">
          <Text size="3xl" className="text-center text-primary-500 font-medium">
            Generating Trip...
          </Text>
          <Text size="xl" className="text-center">
            {`Please wait while we generate your \ndream trip`}
          </Text>
          <Center className="mt-12">
            <Image
              size="2xl"
              source={require('../../assets/images/generating_trip.gif')}
              alt="loading"
              resizeMode="contain"
            />
          </Center>
        </VStack>
      </Box>
    );
  }

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
          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack className="flex-1" space="xl">
              <VStack space="sm">
                <FormReviewCard
                  title="📍 Destination"
                  name={trip.form.destination?.description}
                  onChange={() => router.push('/create-trip')}
                />

                {trip.form.travelDates.start && trip.form.travelDates.end && (
                  <FormReviewCard
                    title="🗓️ Travel Dates"
                    name={`${format(
                      trip.form.travelDates.start,
                      'MMM. dd, yyyy'
                    )} - ${format(trip.form.travelDates.end, 'MMM. dd, yyyy')}`}
                    sub={`${
                      Math.abs(
                        trip.form.travelDates.end.getTime() -
                          trip.form.travelDates.start.getTime()
                      ) /
                      (1000 * 60 * 60 * 24)
                    } days`}
                    onChange={() => router.push('/create-trip/SelectDates')}
                  />
                )}

                <FormReviewCard
                  title="🧳 Travel Type"
                  name={trip.form.travelType?.name}
                  onChange={() => router.push('/create-trip/SelectTravelType')}
                />

                <FormReviewCard
                  title="💸 Budget Type"
                  name={trip.form.budgetType?.name}
                  onChange={() => router.push('/create-trip/SelectBudgetType')}
                />
              </VStack>
              <FormControl size="md">
                <FormControlLabel>
                  <FormControlLabelText>Additional Notes</FormControlLabelText>
                </FormControlLabel>

                <Textarea
                  size="lg"
                  isReadOnly={false}
                  isInvalid={false}
                  isDisabled={false}
                >
                  <TextareaInput
                    placeholder="Enter additional notes"
                    value={trip.form.notes}
                    onChange={text =>
                      setTrip((prev: any) => ({
                        ...prev,
                        form: { ...prev.form, notes: text },
                      }))
                    }
                  />
                </Textarea>

                <FormControlHelper>
                  <FormControlHelperText className="text-gray-500">
                    Compose something specific before generating your trip.
                  </FormControlHelperText>
                </FormControlHelper>
              </FormControl>
            </VStack>
          </ScrollView>

          <FormButton text="Generate Your Trip" onPress={handleGenerateTrip} />
        </VStack>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  video: {
    width: 350,
    height: 275,
  },
});

export default SelectBudgetType;
