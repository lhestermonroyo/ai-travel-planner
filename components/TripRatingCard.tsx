import React, { FC, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card } from './ui/card';
import { VStack } from './ui/vstack';
import { Text } from './ui/text';
import { HStack } from './ui/hstack';
import { Box } from './ui/box';
import { Image } from './ui/image';
import { format } from 'date-fns';

import StarRating from './StarRating';
import FormButton from './FormButton';
import { useSetRecoilState } from 'recoil';
import states from '@/states';
import services from '@/services';
import { Avatar, AvatarFallbackText, AvatarImage } from './ui/avatar';
import { SkeletonText } from './ui/skeleton';

interface ITripRatingCardProps {
  rating: any;
}

const TripRatingCard: FC<ITripRatingCardProps> = ({ rating }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const setRating = useSetRecoilState(states.rating);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await services.database.getUser(rating.email);

      setUser(response);
    } catch (error) {
      console.log('fetchUser [error]', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = () => {
    setRating((prev: any) => ({
      ...prev,
      ratingItem: rating,
    }));
    router.push('/rating-details');
  };

  const Loading = () => {
    return (
      <VStack space="xl">
        <HStack space="md" className="items-center">
          <SkeletonText className="h-12 w-12 rounded-full" />
          <SkeletonText _lines={1} className="h-10 w-3/5" />
        </HStack>
        <SkeletonText _lines={1} className="h-10 w-3/5" />
        <SkeletonText _lines={2} className="h-8" />
        <SkeletonText _lines={1} className="h-8 w-2/5" />
      </VStack>
    );
  };

  return (
    <Card className="py-6">
      {loading ? (
        <Loading />
      ) : (
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
                  {format(rating.createdAt, 'MMM. d, yyyy - hh:mm a')}
                </Text>
              </HStack>
            </VStack>
          </HStack>
          {rating.stars && <StarRating stars={rating.stars} />}
          <Text
            className="flex-wrap text-medium"
            numberOfLines={2}
            size="xl"
            isTruncated
          >
            {rating.feedback}
          </Text>

          <HStack>
            <FormButton
              variant="link"
              text="View More"
              iconEnd={
                <Ionicons name="chevron-forward" color="#3b82f6" size={24} />
              }
              onPress={handleView}
            />
          </HStack>
        </VStack>
      )}
    </Card>
  );
};

export default TripRatingCard;
