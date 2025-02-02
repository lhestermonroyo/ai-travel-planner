import { FC, Fragment, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Skeleton, SkeletonText } from '@/components/ui/skeleton';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { useRecoilState, useRecoilValue } from 'recoil';

import states from '@/states';
import services from '@/services';

import FormButton from '@/components/FormButton';
import MyTripsEmpty from '@/components/MyTripsEmpty';
import TripCard from '@/components/TripCard';

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack className="mt-8 mb-16 px-4 flex-1" space="lg">
        <HStack>
          <VStack space="xs">
            <Text size="4xl" className="font-medium">
              Hey, {auth.user?.fullname}!
            </Text>
            <Text size="xl" className="text-primary-500">
              Where would you like to go next?
            </Text>
          </VStack>
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
                  renderItem={({ item }) => (
                    <TripCard key={item.id} item={item} />
                  )}
                  keyExtractor={item => item.id}
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

interface IMyTripsListProps {
  loading: boolean;
  children: React.ReactElement;
}

const MyTripsList: FC<IMyTripsListProps> = ({ loading, children }) => {
  if (loading) {
    return (
      <Fragment>
        <Skeleton variant="rounded" className="h-[50px]" />
        <FlatList
          data={[1, 2]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card key={item} className="p-4 my-1">
              <VStack space="lg">
                <Skeleton variant="rounded" className="h-[200px]" />
                <VStack space="md">
                  <SkeletonText _lines={1} className="h-6 w-3/5" />
                  <SkeletonText _lines={1} className="h-10" />
                  <SkeletonText _lines={1} className="h-6 w-3/5" />
                  <SkeletonText _lines={1} className="h-12 w-2/5" />
                </VStack>
              </VStack>
            </Card>
          )}
        />
      </Fragment>
    );
  }

  return children;
};

export default MyTrips;
