import { FC, Fragment } from 'react';
import { FlatList } from 'react-native';
import { Skeleton, SkeletonText } from './ui/skeleton';
import { Card } from './ui/card';
import { VStack } from './ui/vstack';
import { HStack } from './ui/hstack';

interface IRatingDetailsProps {
  loading: boolean;
  children: React.ReactElement;
}

const RatingDetailsLoading: FC<IRatingDetailsProps> = ({
  loading,
  children,
}) => {
  if (loading) {
    return (
      <VStack space="xl">
        <HStack space="md" className="items-center">
          <SkeletonText className="h-12 w-12 rounded-full" />
          <SkeletonText _lines={1} className="h-10 w-3/5" />
        </HStack>
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

export default RatingDetailsLoading;
