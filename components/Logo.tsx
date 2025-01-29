import React, { FC } from 'react';
import { Text } from './ui/text';

const Logo: FC = () => {
  return (
    <Text size="2xl">
      <Text size="2xl" className="text-blue-500">
        AI
      </Text>{' '}
      Travel Planner
    </Text>
  );
};

export default Logo;
