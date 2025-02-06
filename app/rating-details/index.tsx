import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Image } from '@/components/ui/image';
import { Box } from '@/components/ui/box';
import { Ionicons } from '@expo/vector-icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import { format } from 'date-fns';

import states from '@/states';

import StarRating from '@/components/StarRating';
import FormButton from '@/components/FormButton';
import services from '@/services';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import RatingDetailsLoading from '@/components/RatingDetailsLoading';

const RatingDetails = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [trip, setTrip] = useState<any>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isTruncated, setIsTruncated] = useState(true);

  const screenWidth = Dimensions.get('screen').width;

  const [rating, setRating] = useRecoilState(states.rating);
  const { ratingItem } = rating;

  const router = useRouter();

  useEffect(() => {
    fetchTripAndUser();
  }, []);

  const fetchTripAndUser = async () => {
    try {
      setLoading(true);
      const requests = [
        services.database.getTripById(ratingItem.tripId),
        services.database.getUser(ratingItem.email),
      ];
      const [trip, user] = (await Promise.allSettled(requests)) as any;

      setTrip(trip.value);
      setUser(user.value);
    } catch (error) {
      console.log('fetchReqData [error]', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setRating((prev: any) => ({
      ...prev,
      ratingItem: null,
    }));
    router.back();
  };

  console.log('trip', JSON.stringify(trip, null, 2));

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack className="pt-8 px-4 flex-1" space="lg">
          <HStack space="md" className="items-center">
            <Button size="xl" variant="link" onPress={handleBack}>
              <Ionicons name="arrow-back" size={24} color="#3b82f6" />
            </Button>
            <Text size="3xl" className="font-medium">
              Rating Details
            </Text>
          </HStack>

          <RatingDetailsLoading loading={loading || !user || !trip}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <VStack space="xl">
                <HStack space="md" className="items-center">
                  <Box className="border-secondary-800 border-solid border-2 rounded-full relative">
                    <Avatar className="bg-secondary-900" size="md">
                      <AvatarFallbackText>{user?.fullname}</AvatarFallbackText>
                      <AvatarImage
                        source={{
                          uri: user?.avatar,
                        }}
                      />
                    </Avatar>
                  </Box>
                  <VStack>
                    <Text size="xl" className="font-medium">
                      {user?.fullname}
                    </Text>
                    <HStack space="xs" className="items-center">
                      <Ionicons name="time-outline" size={14} />
                      <Text size="md" className="text-secondary-900">
                        {format(ratingItem.createdAt, 'MMM. d, yyyy - hh:mm a')}
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
                <VStack space="md">
                  <Box className="rounded-md overflow-hidden">
                    <Carousel
                      loop={false}
                      autoPlay
                      autoPlayInterval={5000}
                      width={screenWidth - 24}
                      height={screenWidth - 24}
                      data={ratingItem.photos}
                      pagingEnabled
                      scrollAnimationDuration={1000}
                      onSnapToItem={index => setSlideIndex(index)}
                      renderItem={({ item }: any) => {
                        return (
                          <Box className="w-full h-full bg-secondary-400 justify-center items-center">
                            <Image
                              key={item}
                              size="full"
                              alt="trip-rating-photo"
                              className="w-full aspect-[1/1]"
                              resizeMode="cover"
                              source={{ uri: item }}
                            />
                          </Box>
                        );
                      }}
                    />
                  </Box>
                  <HStack space="xs" className="justify-center">
                    {ratingItem.photos.map((_: any, i: number) => (
                      <Box
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i === slideIndex ? 'bg-primary-500' : 'bg-gray-400'
                        }`}
                      />
                    ))}
                  </HStack>
                </VStack>
                <VStack>
                  <Text size="3xl" className="text-primary-500 font-medium">
                    {trip?.tripDetails.destination?.description}
                  </Text>
                  <HStack space="xs" className="items-center">
                    <Ionicons name="time-outline" size={14} />
                    <Text size="md" className="text-secondary-900">
                      Trip Created:{' '}
                      {trip &&
                        format(trip?.createdAt, 'MMM. d, yyyy - hh:mm a')}
                    </Text>
                  </HStack>
                </VStack>
                {ratingItem.stars && (
                  <HStack space="md" className="items-center">
                    <Text size="lg">User rated the travel plan with</Text>
                    <StarRating stars={ratingItem.stars} />
                  </HStack>
                )}
                <VStack space="xs">
                  <Text
                    className="flex-wrap text-medium"
                    numberOfLines={isTruncated ? 3 : 0}
                    size="xl"
                    isTruncated
                  >
                    {ratingItem.feedback}
                  </Text>
                  <HStack>
                    <FormButton
                      size="md"
                      variant="link"
                      text={isTruncated ? 'Read more' : 'Read less'}
                      onPress={() => setIsTruncated(!isTruncated)}
                    />
                  </HStack>
                </VStack>
              </VStack>
            </ScrollView>
          </RatingDetailsLoading>
        </VStack>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default RatingDetails;
