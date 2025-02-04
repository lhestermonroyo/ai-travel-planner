export const travelTypes = [
  {
    id: '1',
    name: 'Solo',
    description: 'A sole traveler on a journey',
    pax: '1',
    icon: require('@/assets/images/travel_type_1.png'),
  },
  {
    id: '2',
    name: 'Couple',
    description: 'Two people in tandem',
    pax: '2',
    icon: require('@/assets/images/travel_type_2.png'),
  },
  {
    id: '3',
    name: 'Family',
    description: 'A group comprising of family members',
    pax: '3-12',
    icon: require('@/assets/images/travel_type_3.png'),
  },
  {
    id: '4',
    name: 'Friends',
    description: 'A bunch of friends on a getaway',
    pax: '3-15',
    icon: require('@/assets/images/travel_type_4.png'),
  },
];

export const budgetTypes = [
  {
    id: '1',
    name: 'Low',
    description: 'Sticking to a tight budget',
    icon: require('@/assets/images/budget_type_1.png'),
  },
  {
    id: '2',
    name: 'Moderate',
    description: 'Keeping costs in check',
    icon: require('@/assets/images/budget_type_2.png'),
  },
  {
    id: '3',
    name: 'High',
    description: 'No worries about spending',
    icon: require('@/assets/images/budget_type_3.png'),
  },
];

export const AI_PROMPT = `
Generate a travel plan based on the following trip details and preferences. Please read the travel details carefully and follow the return instructions.

User's Travel Details and Preferences: {travelDetails}

User's Current Location: {currLocation}

Return a JSON object ONLY using this type: {
  destination: string;
  travelDates: {
    start: string;
    end: string;
  };
  noOfDays: number;
  estimatedBudget: string; // e.g. $1000-$1500
  itinerary: {
    day: number;
    date: string;
    activities: {
      name: string;
      description: string;
      time: string; // e.g. 9:00 AM - 12:30 PM
      location: string;
    }[];
  }[];
  flightSuggestions: {
    airline: string;
    departure: string;
    arrival: string;
    duration: string;
    price: string;
    logoUri: string;
    bookingLink: string;
  }[];
  hotelSuggestions: {
    name: string;
    description: string;
    location: string;
    price: string; // e.g. $100-$200 per night
    totalPrice: string; 
    rating: string;
    geoLocation: {
      lat: number;
      lng: number;
    };
    imageUri: string;
    bookingLink: string;
  }[];
}

Currency Usage
- Use the user's current location to determine the user's currency
- Don't use the destination's currency
- Apply it in the values of price, totalPrice, estimatedBudget

For Flight Suggestions
- Determine if the user's location requires a plane or not, if not do not suggest flights
- Check what airlines are available within the user's location
- At least 5 flight suggestions
- Suggest flight according to the user's trip details budget type
- Suggest also the flights selected on the travel days
- Put a shortcut link for booking

For Hotel Suggestions
- At least 5 hotel suggestions 
- Suggest hotel according to the user's trip details budget type and pax
- Put the total price according to the price and number of travel days 
- Put a shortcut link for booking

For Travel Itinerary
- Make the places to tour half city and half nature
- Suggest also the places that are popular
- Consider also the season on suggesting places and activities
- Apply breakfast, lunch and dinner on the itinerary and the place to eat
- Ideal place to eat should be nearby or can be easily travelled from the previous activity place
- Give at least 3 to 6 activities per day

For Notes
- If user has additional notes, please prioritize the user's additional notes on the itinerary
- Adjust the remaining itinerary based on the user's additional notes

For Image/Logo URIs
- Search in the web for the image/logo and add it in the imageUri/logoUri
- Make sure every image/logo is related to its content
- URIs should not be empty and returns a 404 status code

For Date Format
- Use the new Date().toISOString() format to all date values
`;
