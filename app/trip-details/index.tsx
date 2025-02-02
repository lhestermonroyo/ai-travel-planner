import React, { Fragment, useEffect, useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import 'react-native-get-random-values';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text/';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Card } from '@/components/ui/card';
import { Box } from '@/components/ui/box';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import { Image } from '@/components/ui/image';
import { format } from 'date-fns';
import { useRecoilState } from 'recoil';

import states from '@/states';

import FormButton from '@/components/FormButton';

const apiKey: any = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const TripDetails = () => {
  const [imageUri, setImageUri] = useState('');
  const [selected, setSelected] = useState(['a', 'b', 'c', 'd']);

  const [trip, setTrip] = useRecoilState(states.trip);
  const {
    tripItem: { createdAt, tripDetails, aiGenTrip },
  } = trip;

  const router = useRouter();

  useEffect(() => {
    if (!trip.tripItem) {
      router.push('/(tabs)/MyTrips');
      return;
    }

    getPhotoReference();
  }, []);

  const getPhotoReference = async () => {
    try {
      const uri = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${tripDetails.destination.placeId}&key=${apiKey}`;

      const response = await fetch(uri);
      const data = await response.json();

      if (data.result.photos) {
        const randomIndex = Math.floor(
          Math.random() * data.result.photos.length
        );
        const photoReference = data.result.photos[randomIndex].photo_reference;
        const photoUri = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${apiKey}`;

        setImageUri(photoUri);
      }
    } catch (error) {
      console.log('getPhotoReference [error]', error);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack className="my-8 px-4 flex-1" space="lg">
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

          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack space="lg">
              <Image
                className="bg-gray-300 h-[240px] w-full rounded-md aspect-[16:9]"
                resizeMode="cover"
                resizeMethod="auto"
                alt="trip-image"
                source={{ uri: imageUri }}
              />
              <VStack>
                <Text size="4xl" className="text-primary-500 font-medium">
                  {tripDetails.destination.description}
                </Text>
                <HStack space="xs" className="items-center">
                  <Ionicons name="time-outline" size={14} />
                  <Text size="md" className="text-secondary-900">
                    {format(createdAt, 'MMM. d, yyyy - hh:mm a')}
                  </Text>
                </HStack>
              </VStack>
            </VStack>

            <Accordion
              className="mt-2"
              size="md"
              variant="unfilled"
              type="multiple"
              isCollapsible={true}
              isDisabled={false}
              value={selected}
              onValueChange={value => setSelected(value)}
            >
              <AccordionItem value="a">
                <AccordionHeader>
                  <AccordionTrigger className="px-0">
                    {({ isExpanded }) => {
                      return (
                        <Fragment>
                          <Text size="2xl" className="font-medium">
                            Preferences
                          </Text>
                          {isExpanded ? (
                            <Box className="border-primary-500 border-solid border p-2 rounded-full">
                              <Ionicons
                                name="chevron-down-outline"
                                size={24}
                                color="#3b82f6"
                              />
                            </Box>
                          ) : (
                            <Box className="border-primary-500 border-solid border p-2 rounded-full">
                              <Ionicons
                                name="chevron-back-outline"
                                size={24}
                                color="#3b82f6"
                              />
                            </Box>
                          )}
                        </Fragment>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent className="px-0 mb-4">
                  <VStack space="lg">
                    <VStack space="sm">
                      <Text size="md" className="text-secondary-900">
                        🗓️ Travel Dates
                      </Text>
                      <VStack>
                        <Text
                          size="xl"
                          className="text-primary-500 font-medium"
                        >
                          {format(aiGenTrip.travelDates.start, 'MMM. d, yyyy')}{' '}
                          - {format(aiGenTrip.travelDates.end, 'MMM. d, yyyy')}
                        </Text>
                        <Text size="lg">({aiGenTrip.noOfDays} days)</Text>
                      </VStack>
                    </VStack>

                    <VStack space="sm">
                      <Text size="md" className="text-secondary-900">
                        🧳 Travel Type
                      </Text>
                      <VStack>
                        <Text
                          size="xl"
                          className="text-primary-500 font-medium"
                        >
                          {tripDetails.travelType.name}
                        </Text>
                      </VStack>
                    </VStack>

                    <VStack space="sm">
                      <Text size="md" className="text-secondary-900">
                        💸 Budget Type
                      </Text>
                      <VStack>
                        <Text
                          size="xl"
                          className="text-primary-500 font-medium"
                        >
                          {tripDetails.budgetType.name}
                        </Text>
                      </VStack>
                    </VStack>
                  </VStack>
                </AccordionContent>
              </AccordionItem>
              <Divider />
              <AccordionItem value="b">
                <AccordionHeader>
                  <AccordionTrigger className="px-0">
                    {({ isExpanded }) => {
                      return (
                        <Fragment>
                          <Text size="2xl" className="font-medium">
                            Travel Itinerary
                          </Text>
                          {isExpanded ? (
                            <Box className="border-primary-500 border-solid border p-2 rounded-full">
                              <Ionicons
                                name="chevron-down-outline"
                                size={24}
                                color="#3b82f6"
                              />
                            </Box>
                          ) : (
                            <Box className="border-primary-500 border-solid border p-2 rounded-full">
                              <Ionicons
                                name="chevron-back-outline"
                                size={24}
                                color="#3b82f6"
                              />
                            </Box>
                          )}
                        </Fragment>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent className="px-0 mb-4">
                  <VStack space="lg">
                    {aiGenTrip.itinerary.map((item: any, i: number) => (
                      <VStack key={i} space="sm">
                        <VStack>
                          <Text size="xl" className="font-medium">
                            Day {item.day} ({format(item.date, 'MMM. d, yyyy')})
                          </Text>
                        </VStack>
                        {item.activities.map((activity: any, j: number) => (
                          <HStack
                            key={j}
                            space="md"
                            className="items-start flex-wrap"
                          >
                            <VStack space="xs" className="items-center">
                              <Badge className="bg-primary-500 rounded-md">
                                <Text
                                  size="sm"
                                  className="text-white text-center"
                                >
                                  {activity.time.replaceAll('-', '\nto\n')}
                                </Text>
                              </Badge>
                              <Box className="bg-primary-200 w-1 flex-1 rounded-md" />
                            </VStack>
                            <Card className="flex-1 p-3">
                              <VStack space="md">
                                <VStack>
                                  <Text
                                    size="xl"
                                    className="text-primary-500 font-medium"
                                  >
                                    {activity.name}
                                  </Text>
                                  <HStack className="items-center" space="xs">
                                    <Ionicons
                                      name="location-outline"
                                      size={14}
                                    />
                                    <Text
                                      size="md"
                                      className="text-secondary-900"
                                    >
                                      {activity.location}
                                    </Text>
                                  </HStack>
                                </VStack>
                                <Box className="flex-1 flex-shrink">
                                  <Text className="flex-wrap" size="lg">
                                    {activity.description}
                                  </Text>
                                </Box>
                              </VStack>
                            </Card>
                          </HStack>
                        ))}
                      </VStack>
                    ))}
                  </VStack>
                </AccordionContent>
              </AccordionItem>
              <Divider />
              <AccordionItem value="c">
                <AccordionHeader>
                  <AccordionTrigger className="px-0">
                    {({ isExpanded }) => {
                      return (
                        <Fragment>
                          <Text size="2xl" className="font-medium">
                            Suggested Flights
                          </Text>
                          {isExpanded ? (
                            <Box className="border-primary-500 border-solid border p-2 rounded-full">
                              <Ionicons
                                name="chevron-down-outline"
                                size={24}
                                color="#3b82f6"
                              />
                            </Box>
                          ) : (
                            <Box className="border-primary-500 border-solid border p-2 rounded-full">
                              <Ionicons
                                name="chevron-back-outline"
                                size={24}
                                color="#3b82f6"
                              />
                            </Box>
                          )}
                        </Fragment>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent className="px-0 mb-4">
                  {!aiGenTrip.flightSuggestions.length ? (
                    <Box className="h-64 justify-center items-center">
                      <Text size="lg" className="text-center">
                        No flight suggestions available.
                      </Text>
                    </Box>
                  ) : (
                    <Fragment>
                      {aiGenTrip.flightSuggestions.map(
                        (item: any, i: number) => (
                          <Card key={i} className="p-4 my-1">
                            <VStack space="md">
                              <VStack>
                                <HStack
                                  space="sm"
                                  className="items-center mb-1"
                                >
                                  <Avatar className="bg-orange-400" size="md">
                                    <AvatarFallbackText>
                                      {item.airline}
                                    </AvatarFallbackText>
                                    <AvatarImage
                                      source={{
                                        uri: item.logoUri,
                                      }}
                                    />
                                  </Avatar>
                                  <Text size="xl" className="font-medium">
                                    {item.airline}
                                  </Text>
                                </HStack>

                                <HStack space="xs" className="items-center">
                                  <Ionicons name="airplane-outline" size={14} />
                                  <Text
                                    size="md"
                                    className="text-secondary-900"
                                  >
                                    {item.departure} - {item.arrival}
                                  </Text>
                                </HStack>
                                <HStack space="xs" className="items-center">
                                  <Ionicons name="pricetag-outline" size={14} />
                                  <Text
                                    size="md"
                                    className="text-secondary-900"
                                  >
                                    {item.price}
                                  </Text>
                                  <Text>|</Text>
                                  <Ionicons name="timer-outline" size={14} />
                                  <Text
                                    size="md"
                                    className="text-secondary-900"
                                  >
                                    {item.duration}
                                  </Text>
                                </HStack>
                              </VStack>
                              <HStack>
                                <FormButton
                                  variant="link"
                                  text="Book Here"
                                  iconEnd={
                                    <Ionicons
                                      name="chevron-forward"
                                      color="#3b82f6"
                                      size={24}
                                    />
                                  }
                                  // onPress={() => router.push('/flight-details')}
                                />
                              </HStack>
                            </VStack>
                          </Card>
                        )
                      )}
                    </Fragment>
                  )}
                </AccordionContent>
              </AccordionItem>
              <Divider />
              <AccordionItem value="d">
                <AccordionHeader>
                  <AccordionTrigger className="px-0">
                    {({ isExpanded }) => {
                      return (
                        <Fragment>
                          <Text size="2xl" className="font-medium">
                            Suggested Hotels
                          </Text>
                          {isExpanded ? (
                            <Box className="border-primary-500 border-solid border p-2 rounded-full">
                              <Ionicons
                                name="chevron-down-outline"
                                size={24}
                                color="#3b82f6"
                              />
                            </Box>
                          ) : (
                            <Box className="border-primary-500 border-solid border p-2 rounded-full">
                              <Ionicons
                                name="chevron-back-outline"
                                size={24}
                                color="#3b82f6"
                              />
                            </Box>
                          )}
                        </Fragment>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent className="px-0 mb-4">
                  {!aiGenTrip.flightSuggestions.length ? (
                    <Box className="h-64 justify-center items-center">
                      <Text size="lg" className="text-center">
                        No hotel suggestions available.
                      </Text>
                    </Box>
                  ) : (
                    <Fragment>
                      {aiGenTrip.hotelSuggestions.map(
                        (item: any, i: number) => (
                          <Card key={i} className="p-4 my-1">
                            <VStack space="md">
                              <HStack space="sm" className="items-center mb-1">
                                <Avatar className="bg-orange-400" size="md">
                                  <AvatarFallbackText>
                                    {item.name}
                                  </AvatarFallbackText>
                                  <AvatarImage
                                    source={{
                                      uri: item.imageUri,
                                    }}
                                  />
                                </Avatar>
                                <Box className="flex-1 flex-shrink">
                                  <Text
                                    className="flex-wrap text-medium"
                                    size="xl"
                                  >
                                    {item.name}
                                  </Text>
                                </Box>
                              </HStack>

                              <Text size="lg">{item.description}</Text>

                              <HStack space="xs" className="items-center">
                                <Ionicons name="pricetag-outline" size={14} />
                                <Text size="md" className="text-secondary-900">
                                  {item.price} per night
                                </Text>
                                <Text>|</Text>
                                <Ionicons name="star-outline" size={14} />
                                <Text size="md" className="text-secondary-900">
                                  {item.rating}
                                </Text>
                              </HStack>
                              <HStack space="xl">
                                <FormButton
                                  variant="link"
                                  text="View in Maps"
                                  iconEnd={
                                    <Ionicons
                                      name="map-outline"
                                      color="#3b82f6"
                                      size={24}
                                    />
                                  }
                                  // onPress={() => router.push('/flight-details')}
                                />
                                <FormButton
                                  variant="link"
                                  text="Book Here"
                                  iconEnd={
                                    <Ionicons
                                      name="chevron-forward"
                                      color="#3b82f6"
                                      size={24}
                                    />
                                  }
                                  // onPress={() => router.push('/flight-details')}
                                />
                              </HStack>
                            </VStack>
                          </Card>
                        )
                      )}
                    </Fragment>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollView>
        </VStack>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default TripDetails;
