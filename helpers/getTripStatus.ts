import { isWithinInterval, addDays, startOfDay } from 'date-fns';

export const getTripStatus = (trip: any) => {
  const today = startOfDay(new Date());
  const tripStart = startOfDay(new Date(trip.aiGenTrip.travelDates.start));
  const tripEnd = startOfDay(new Date(trip.aiGenTrip.travelDates.end));

  let status = 'UPCOMING';

  if (
    isWithinInterval(today, { start: addDays(tripStart, -7), end: tripStart })
  ) {
    status = 'FEW_DAYS_AWAY';
  }

  if (isWithinInterval(today, { start: tripStart, end: tripEnd })) {
    status = 'ONGOING';
  }

  if (today > tripEnd) {
    status = 'PAST_TRIP';
  }

  return status;
};
