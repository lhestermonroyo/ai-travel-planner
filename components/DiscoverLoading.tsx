import { FC } from 'react';
import { Skeleton } from './ui/skeleton';
import { Grid, GridItem } from './ui/grid';

interface IDiscoversLoadingProps {
  loading: boolean;
  children: React.ReactElement;
}

const DiscoverLoading: FC<IDiscoversLoadingProps> = ({ loading, children }) => {
  if (loading) {
    return (
      <Grid
        className="gap-2"
        _extra={{
          className: 'grid-cols-12',
        }}
      >
        {[...Array(6)].map((_, index) => (
          <GridItem
            key={index}
            _extra={{
              className: 'col-span-6',
            }}
          >
            <Skeleton
              key={index}
              className="h-[200px] w-full rounded-md aspect-[1:1]"
            />
          </GridItem>
        ))}
      </Grid>
    );
  }

  return children;
};

export default DiscoverLoading;
