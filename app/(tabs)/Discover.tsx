import { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Grid, GridItem } from '@/components/ui/grid';
import { useRecoilState } from 'recoil';

import services from '@/services';
import states from '@/states';

import DiscoverLoading from '@/components/DiscoverLoading';

const Discover = () => {
  const [loading, setLoading] = useState(false);

  const [rating, setRating] = useRecoilState(states.rating);
  const { ratingList } = rating;

  const router = useRouter();

  useEffect(() => {
    if (!ratingList.length) {
      fetchRatings();
    }
  }, []);

  const fetchRatings = async () => {
    try {
      setLoading(true);

      const response = await services.database.getAllRatings();

      setRating((prev: any) => ({
        ...prev,
        ratingList: response,
      }));
    } catch (error) {
      console.log('fetchRatings [error]', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (rating: any) => {
    setRating((prev: any) => ({
      ...prev,
      ratingItem: rating,
    }));
    router.push('/rating-details');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack className="pt-8 pb-12 px-4 flex-1" space="lg">
        <VStack space="xs">
          <Text size="4xl" className="font-medium">
            Discover
          </Text>
          <Text size="xl" className="text-primary-500">
            Explore travel plans through other traveler's ratings and photos
          </Text>
        </VStack>

        <ScrollView showsVerticalScrollIndicator={false}>
          <DiscoverLoading loading={loading}>
            <Grid
              className="gap-2"
              _extra={{
                className: 'grid-cols-12',
              }}
            >
              {rating.ratingList.map((rating: any, index: number) => {
                const randomPhoto =
                  rating.photos[
                    Math.floor(Math.random() * rating.photos.length)
                  ];

                return (
                  <GridItem
                    key={index}
                    _extra={{
                      className: 'col-span-6',
                    }}
                  >
                    <TouchableOpacity onPress={() => handleView(rating)}>
                      <Image
                        resizeMode="cover"
                        source={{ uri: randomPhoto }}
                        className="bg-secondary-400 h-[200px] w-full rounded-md aspect-[1:1]"
                      />
                    </TouchableOpacity>
                  </GridItem>
                );
              })}
            </Grid>
          </DiscoverLoading>
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
};

export default Discover;
