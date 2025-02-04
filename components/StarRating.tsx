import React, { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { HStack } from './ui/hstack';

interface IStarRatingProps {
  stars: number;
}

const StarRating: FC<IStarRatingProps> = ({ stars }) => {
  return (
    <HStack>
      {Array.from({ length: 5 }).map((_, index) => {
        const name = index < stars ? 'star' : 'star-outline';
        return <Ionicons key={index} name={name} size={24} color="#e77828" />;
      })}
    </HStack>
  );
};

export default StarRating;
