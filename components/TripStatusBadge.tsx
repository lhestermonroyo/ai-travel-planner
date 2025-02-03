import React, { FC } from 'react';
import { Badge, BadgeText } from './ui/badge';

interface ITripStatusBadgeProps {
  status: 'UPCOMING' | 'ONGOING' | 'FEW_DAYS_LEFT' | 'PAST_TRIP';
}

const TripStatusBadge: FC<ITripStatusBadgeProps> = ({ status }) => {
  if (status === 'UPCOMING') {
    return (
      <Badge className="bg-warning-500">
        <BadgeText className="text-white">UPCOMING</BadgeText>
      </Badge>
    );
  }

  if (status === 'ONGOING') {
    return (
      <Badge className="bg-primary-500">
        <BadgeText className="text-white">ONGOING</BadgeText>
      </Badge>
    );
  }

  if (status === 'FEW_DAYS_LEFT') {
    return (
      <Badge className="bg-red-500">
        <BadgeText className="text-white">FEW DAYS LEFT</BadgeText>
      </Badge>
    );
  }

  if (status === 'PAST_TRIP') {
    return (
      <Badge className="bg-green-500">
        <BadgeText className="text-white">PAST TRIP</BadgeText>
      </Badge>
    );
  }
};

export default TripStatusBadge;
