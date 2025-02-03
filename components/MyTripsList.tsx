import { FC, Fragment } from 'react';
import { FlatList } from 'react-native';
import { Skeleton, SkeletonText } from './ui/skeleton';
import { Card } from './ui/card';
import { VStack } from './ui/vstack';

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

export default MyTripsList;
