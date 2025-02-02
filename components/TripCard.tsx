import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from './ui/image';
import { Card } from './ui/card';
import { VStack } from './ui/vstack';
import { Text } from './ui/text';
import { HStack } from './ui/hstack';

import { format } from 'date-fns';
import { useSetRecoilState } from 'recoil';
import states from '@/states';

import FormButton from './FormButton';

const apiKey: any = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

interface ITripCardProps {
  item: any;
}

const TripCard: FC<ITripCardProps> = ({ item }) => {
  const { createdAt, tripDetails, aiGenTrip } = item;

  const setTrip = useSetRecoilState(states.trip);

  const [imageUri, setImageUri] = useState('');

  const router = useRouter();

  useEffect(() => {
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

  const handleViewTrip = () => {
    setTrip((prev: any) => ({
      ...prev,
      tripDetails: item,
    }));
    router.push('/trip-details');
  };

  return (
    <Card key={item.id} className="p-4 my-1">
      <VStack space="lg">
        <Image
          className="bg-gray-300 h-[240px] w-full rounded-md aspect-[16:9]"
          resizeMode="cover"
          resizeMethod="auto"
          alt="trip-image"
          source={{ uri: imageUri }}
        />
        <VStack space="md">
          <Text size="md" className="text-secondary-900">
            {format(createdAt, 'MMM. d, yyyy - hh:mm a')}
          </Text>
          <Text size="2xl" className="font-medium">
            {tripDetails.destination.description}
          </Text>
        </VStack>
        <Text size="lg">
          Travel Dates: {format(aiGenTrip.travelDates.start, 'MMM. d, yyyy')} -{' '}
          {format(aiGenTrip.travelDates.end, 'MMM. d, yyyy')} (
          {aiGenTrip.noOfDays} days)
        </Text>
        <HStack>
          <FormButton
            variant="link"
            text="View Trip"
            iconEnd={
              <Ionicons name="chevron-forward" color="#3b82f6" size={24} />
            }
            onPress={handleViewTrip}
          />
        </HStack>
      </VStack>
    </Card>
  );
};

export default TripCard;
