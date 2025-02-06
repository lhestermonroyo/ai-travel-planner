import React, { Fragment, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
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
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';
import TripStatusBadge from '@/components/TripStatusBadge';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from '@/components/ui/actionsheet';
import { format } from 'date-fns';
import { useRecoilValue } from 'recoil';

import states from '@/states';
import services from '@/services';

import FormButton from '@/components/FormButton';
import TripDetailsLoading from '@/components/TripDetailsLoading';
import TripRatingCard from '@/components/TripRatingCard';

const apiKey: any = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const TripDetails = () => {
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [selected, setSelected] = useState([
    'PREFERENCES',
    'RATING',
    'ITINERARY',
    'FLIGHT_SUGGESTIONS',
    'HOTEL_SUGGESTIONS',
  ]);
  const [rating, setRating] = useState<any>(null);

  const trip = useRecoilValue(states.trip);
  const {
    tripItem: { id, createdAt, status, tripDetails, aiGenTrip },
  } = trip;

  const router = useRouter();
  const toast = useToast();

  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (status && status === 'PAST_TRIP') {
      getPhotoReference();
      fetchTripRating();
      return;
    }

    getPhotoReference();
  }, []);

  const fetchTripRating = async () => {
    try {
      const response = await services.database.getRatingByTripId(id);

      if (response) {
        setRating(response[0]);
      }
    } catch (error) {
      console.log('fetchTripRating [error]', error);
    }
  };

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
    } finally {
      setLoading(false);
    }
  };

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

  const handleLinkPress = (url: string) => {
    const canOpen = Linking.canOpenURL(url);

    if (!canOpen) {
      handleToast(
        'Error',
        'Failed to open. Please input a valid link.',
        'error'
      );
      return;
    }

    Linking.openURL(url);
  };

  const OptionSheet = () => {
    return (
      <Actionsheet
        isOpen={showOptions}
        onClose={() => setShowOptions(false)}
        closeOnOverlayClick
      >
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          {status !== 'PAST_TRIP' && status !== 'ONGOING' && (
            <ActionsheetItem onPress={() => setShowOptions(false)}>
              <ActionsheetItemText size="lg">Edit</ActionsheetItemText>
            </ActionsheetItem>
          )}
          <ActionsheetItem onPress={() => setShowOptions(false)}>
            <ActionsheetItemText size="lg">Delete</ActionsheetItemText>
          </ActionsheetItem>
          <Box className="h-12" />
        </ActionsheetContent>
      </Actionsheet>
    );
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <OptionSheet />
      <SafeAreaView style={{ flex: 1 }}>
        <VStack className="pt-8 px-4 flex-1" space="lg">
          <HStack space="md" className="items-center justify-between">
            <HStack space="md" className="items-center">
              <Button
                size="xl"
                variant="link"
                onPress={() => router.push('/(tabs)/MyTrips')}
              >
                <Ionicons name="arrow-back" size={24} color="#3b82f6" />
              </Button>
              <Text size="3xl" className="font-medium">
                Trip Details
              </Text>
            </HStack>
            <HStack space="2xl">
              {status === 'PAST_TRIP' && !rating && (
                <Button
                  variant="link"
                  onPress={() => router.push('/trip-details/TripRating')}
                >
                  <Ionicons name="star-outline" size={32} color="#3b82f6" />
                </Button>
              )}
              <Button variant="link" onPress={() => setShowOptions(true)}>
                <Ionicons
                  name="ellipsis-vertical-outline"
                  size={32}
                  color="#3b82f6"
                />
              </Button>
            </HStack>
          </HStack>

          <TripDetailsLoading loading={loading}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <VStack space="lg">
                <Image
                  className="bg-gray-300 h-[240px] w-full rounded-md aspect-[16:9]"
                  resizeMode="cover"
                  resizeMethod="auto"
                  alt="trip-image"
                  source={{ uri: imageUri }}
                />
                <HStack className="justify-between items-center">
                  <VStack>
                    <Text size="3xl" className="text-primary-500 font-medium">
                      {tripDetails.destination.description}
                    </Text>
                    <HStack space="xs" className="items-center">
                      <Ionicons name="time-outline" size={14} />
                      <Text size="md" className="text-secondary-900">
                        {format(createdAt, 'MMM. d, yyyy - hh:mm a')}
                      </Text>
                    </HStack>
                  </VStack>
                  {rating?.stars && (
                    <HStack space="xs" className="items-center">
                      <Ionicons name="star" size={18} color="#e77828" />
                      <Text size="2xl" className="font-medium">
                        {rating.stars}
                      </Text>
                    </HStack>
                  )}
                </HStack>
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
                <AccordionItem value="PREFERENCES">
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
                      <VStack space="xs">
                        <HStack space="sm">
                          <Text size="md" className="text-secondary-900">
                            🗓️ Travel Dates
                          </Text>
                          <TripStatusBadge status={status} />
                        </HStack>

                        <VStack>
                          <Text size="xl" className="font-medium">
                            {format(
                              aiGenTrip.travelDates.start,
                              'MMM. d, yyyy'
                            )}{' '}
                            -{' '}
                            {format(aiGenTrip.travelDates.end, 'MMM. d, yyyy')}
                          </Text>
                          <Text size="lg">({aiGenTrip.noOfDays} days)</Text>
                        </VStack>
                      </VStack>

                      <VStack space="xs">
                        <Text size="md" className="text-secondary-900">
                          🧳 Travel Type
                        </Text>
                        <VStack>
                          <Text size="xl" className="font-medium">
                            {tripDetails.travelType.name}
                          </Text>
                        </VStack>
                      </VStack>

                      <VStack space="xs">
                        <Text size="md" className="text-secondary-900">
                          💸 Budget Type
                        </Text>
                        <VStack>
                          <Text size="xl" className="font-medium">
                            {tripDetails.budgetType.name}
                          </Text>
                        </VStack>
                      </VStack>

                      <VStack space="xs">
                        <Text size="md" className="text-secondary-900">
                          📝 Notes
                        </Text>
                        <VStack>
                          <Text size="xl" className="font-medium">
                            {tripDetails.notes
                              ? tripDetails.notes
                              : 'No additional notes'}
                          </Text>
                        </VStack>
                      </VStack>
                    </VStack>
                  </AccordionContent>
                </AccordionItem>
                <Divider />

                {rating && (
                  <Fragment>
                    <AccordionItem value="RATING">
                      <AccordionHeader>
                        <AccordionTrigger className="px-0">
                          {({ isExpanded }) => {
                            return (
                              <Fragment>
                                <Text size="2xl" className="font-medium">
                                  Reviews
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
                        <TripRatingCard rating={rating} />
                      </AccordionContent>
                    </AccordionItem>
                    <Divider />
                  </Fragment>
                )}

                <AccordionItem value="ITINERARY">
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
                              Day {item.day} (
                              {format(item.date, 'MMM. d, yyyy')})
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

                <AccordionItem value="FLIGHT_SUGGESTIONS">
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
                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToAlignment="start"
                        decelerationRate="normal"
                        data={aiGenTrip.flightSuggestions}
                        renderItem={({ item, index }) => (
                          <Card
                            key={index}
                            style={{ width: screenWidth - 100 }}
                            className="p-4 mr-2"
                          >
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
                                  onPress={() =>
                                    handleLinkPress(item.bookingLink)
                                  }
                                  iconEnd={
                                    <Ionicons
                                      name="chevron-forward"
                                      color="#3b82f6"
                                      size={24}
                                    />
                                  }
                                />
                              </HStack>
                            </VStack>
                          </Card>
                        )}
                      />
                    )}
                  </AccordionContent>
                </AccordionItem>
                <Divider />

                <AccordionItem value="HOTEL_SUGGESTIONS">
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
                        <FlatList
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          snapToAlignment="start"
                          decelerationRate="normal"
                          data={aiGenTrip.hotelSuggestions}
                          keyExtractor={item => item.name}
                          renderItem={({ item }) => (
                            <Card
                              style={{ width: screenWidth - 100 }}
                              className="p-4 mr-2"
                            >
                              <VStack space="md">
                                <HStack
                                  space="sm"
                                  className="items-center mb-1"
                                >
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
                                  <Text
                                    size="md"
                                    className="text-secondary-900"
                                  >
                                    {item.price}
                                  </Text>
                                  <Text>|</Text>
                                  <Ionicons name="star-outline" size={14} />
                                  <Text
                                    size="md"
                                    className="text-secondary-900"
                                  >
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
                                    onPress={() => {
                                      handleLinkPress(
                                        `https://maps.google.com/?q=${item.geoLocation?.lat},${item.geoLocation?.lng}`
                                      );
                                    }}
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
                                    onPress={() =>
                                      handleLinkPress(item.bookingLink)
                                    }
                                  />
                                </HStack>
                              </VStack>
                            </Card>
                          )}
                        />
                      </Fragment>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollView>
          </TripDetailsLoading>
        </VStack>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default TripDetails;
