import { FC, Fragment } from 'react';
import { FlatList } from 'react-native';
import { Skeleton, SkeletonText } from './ui/skeleton';
import { Card } from './ui/card';
import { VStack } from './ui/vstack';

interface IMyTripsLoadingProps {
  loading: boolean;
  children: React.ReactElement;
}

const TripDetailsLoading: FC<IMyTripsLoadingProps> = ({
  loading,
  children,
}) => {
  if (loading) {
    return (
      <VStack space="lg">
        <Skeleton className="h-[240px] w-full rounded-md aspect-[16:9]" />
        <VStack space="2xl">
          <VStack space="xs">
            <SkeletonText _lines={1} className="h-10" />
            <SkeletonText _lines={1} className="h-6 w-3/5" />
          </VStack>
          <VStack space="md">
            <SkeletonText _lines={3} className="h-8" />
            <SkeletonText _lines={1} className="h-8 w-3/5" />
          </VStack>
        </VStack>
      </VStack>
    );
  }

  return children;
};

export default TripDetailsLoading;
