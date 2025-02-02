import React, { FC } from 'react';
import { useRouter } from 'expo-router';
import { VStack } from './ui/vstack';
import { Center } from './ui/center';
import { Image } from './ui/image';
import { Text } from './ui/text';
import { Ionicons } from '@expo/vector-icons';

import FormButton from './FormButton';

const MyTripsEmpty: FC = () => {
  const router = useRouter();
  return (
    <VStack space="4xl" className="flex-1 justify-center align-middle">
      <Center>
        <Image
          alt="no-trips"
          size="xl"
          resizeMode="contain"
          source={require('@/assets/images/no_trips.png')}
        />
      </Center>
      <VStack space="lg">
        <Text size="3xl" className="text-primary-500 text-center font-medium">
          No Trips Planned Yet
        </Text>
        <Text size="xl" className="text-center">
          {`Start planning your dream trip by adding your \nfirst destination.`}
        </Text>
      </VStack>
      <FormButton
        text="Start New Trip"
        icon={<Ionicons name="add" size={24} color="#fff" />}
        onPress={() => router.push('/create-trip')}
      />
    </VStack>
  );
};

export default MyTripsEmpty;
