import { FC, Fragment, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Button } from '@/components/ui/button';
import { useRecoilState, useRecoilValue } from 'recoil';

import states from '@/states';
import services from '@/services';

import FormButton from '@/components/FormButton';
import MyTripsEmpty from '@/components/MyTripsEmpty';
import TripCard from '@/components/TripCard';
import MyTripsList from '@/components/MyTripsList';

const MyTrips: FC = () => {
  const [loading, setLoading] = useState(true);

  const [trips, setTrips] = useRecoilState(states.trip);
  const { tripList } = trips;
  const auth = useRecoilValue(states.auth);

  const router = useRouter();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);

      const response = await services.database.getTripsByEmail(
        auth.user?.email
      );

      setTrips((prev: any) => ({
        ...prev,
        tripList: response,
      }));
    } catch (error) {
      console.log('fetchTrips [error]', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    // TODO: Implement search functionality
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack className="pt-8 pb-12 px-4 flex-1" space="lg">
        <HStack className=" justify-between">
          <VStack space="xs">
            <Text size="4xl" className="font-medium">
              Hey, {auth.user?.fullname.split(' ')[0]}!
            </Text>
            <Text size="xl" className="text-primary-500">
              Where would you like to go next?
            </Text>
          </VStack>
          <Button variant="link">
            <Ionicons
              name="search"
              size={32}
              color="#3b82f6"
              onPress={handleSearch}
            />
          </Button>
        </HStack>

        <MyTripsList loading={loading}>
          <Fragment>
            {tripList.length ? (
              <Fragment>
                <FormButton
                  variant="solid"
                  text="Create Trip"
                  icon={<Ionicons name="add" size={24} color="#fff" />}
                  onPress={() => router.push('/create-trip')}
                />
                <FlatList
                  data={trips.tripList}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <TripCard key={item.id} item={item} />
                  )}
                />
              </Fragment>
            ) : (
              <MyTripsEmpty />
            )}
          </Fragment>
        </MyTripsList>
      </VStack>
    </SafeAreaView>
  );
};

export default MyTrips;
