import { FC } from 'react';

import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';
import { Center } from '@/components/ui/center';
import { useRecoilValue } from 'recoil';

import states from '@/states';

import FormButton from '@/components/FormButton';

interface IEmptyProps {
  router: any;
}

const MyTrips: FC = () => {
  const auth = useRecoilValue(states.auth);

  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack className="my-8 px-4 flex-1" space="4xl">
        <VStack space="xs">
          <Text size="4xl" className="font-medium">
            Hey, {auth.user?.fullname}!
          </Text>
          <Text size="xl" className="text-primary-500">
            Where would you like to go next?
          </Text>
        </VStack>
        <Empty router={router} />
      </VStack>
    </SafeAreaView>
  );
};

const Empty: FC<IEmptyProps> = ({ router }) => {
  return (
    <VStack space="4xl" className="flex-1 justify-center align-middle">
      <Center>
        <Image
          alt="no-trips"
          size="2xl"
          resizeMode="contain"
          source={require('@/assets/images/no_trips.png')}
        />
      </Center>
      <VStack space="lg">
        <Text size="3xl" className="text-primary-500 text-center font-medium">
          No Trips Planned Yet
        </Text>
        <Text size="xl" className="text-center">
          {`Start planning your next trip by creating \na new trip.`}
        </Text>
      </VStack>
      <FormButton
        text="Start New Trip"
        icon={<Ionicons name="add" size={24} color="#fff" />}
        onPress={() => router.push('/create-trip/SearchPlace')}
      />
    </VStack>
  );
};

export default MyTrips;
