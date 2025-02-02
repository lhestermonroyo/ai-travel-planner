import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey: any = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const genConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

const ai = new GoogleGenerativeAI(apiKey);
const model = ai.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const userText = `Generate a travel plan based on the following trip details and preferences. Please read the travel details carefully and follow the return instructions.

User's Travel Details and Preferences: {"destination":"Taiwan","travelDates":{"start":"2025-02-09T04:00:00.000Z","end":"2025-02-13T04:00:00.000Z"},"travelType":{"name":"Couple","description":"Two people in tandem","pax":"2"},"budgetType":{"name":"Moderate","description":"Keeping costs in check"},"notes":"","currLocation":{"timestamp":1738473186042.9868,"coords":{"altitudeAccuracy":30,"speed":-1,"altitude":16.340002687112474,"latitude":10.7566650013422,"accuracy":16.97926692836413,"heading":-1,"longitude":122.52660224825007}}}

User's Coordinates: {"timestamp":1738473186042.9868,"coords":{"altitudeAccuracy":30,"speed":-1,"altitude":16.340002687112474,"latitude":10.7566650013422,"accuracy":16.97926692836413,"heading":-1,"longitude":122.52660224825007}}

Return a JSON object ONLY using this type: {
  imageUri: string;
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
      time: string; // e.g. 9:00 AM - 12:00 PM
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
- Use the user's coordinates to determine the user's currency
- Don't use the destination's currency
- Apply it in the values of price, totalPrice, estimatedBudget

For Flight Suggestions
- Check what airlines are available in the user's coordinates
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

For Notes
- If user has additional notes, please consider the user's additional notes on the itinerary

For Image/Logo URIs
- Search in the web for the image/logo and add it in the imageUri/logoUri
- Make sure every image/logo is related to its content
- URIs should not be empty and returns a 404 status code
- For the Image URIs, take the photos from googleusercontent 
- For the Logo URIs, take the logos from the official website of the airline/hotel

For Date Format
- Use the new Date().toISOString() format to all date values`;

const modelText = `{"imageUri": "https://lh5.googleusercontent.com/p/AF1QipOFt3iY-s4FKSgjj7oV_4CdZxMtHCv70QfHT9EI=w540-h312-n-k-no", "destination": "Taiwan", "travelDates": {"start": "2025-02-09T04:00:00.000Z", "end": "2025-02-13T04:00:00.000Z"}, "noOfDays": 5, "estimatedBudget": "$1000-$1500", "itinerary": [{"day": 1, "date": "2025-02-09", "activities": [{"name": "Arrive in Taipei & Check in", "description": "Arrive at Taoyuan International Airport (TPE), transfer to your hotel in Taipei, and check in.", "time": "14:00 - 15:00", "location": "Taipei"}, {"name": "Explore Taipei 101", "description": "Visit the iconic Taipei 101 skyscraper, offering breathtaking panoramic views of the city.", "time": "15:30 - 17:30", "location": "Taipei 101"}, {"name": "Dinner", "description": "Enjoy a delicious Taiwanese dinner at Din Tai Fung, known for its soup dumplings.", "time": "19:00 - 20:00", "location": "Din Tai Fung, Taipei"}]}, {"day": 2, "date": "2025-02-10", "activities": [{"name": "National Palace Museum", "description": "Explore the vast collection of Chinese art and artifacts at the National Palace Museum.", "time": "9:00 - 12:00", "location": "National Palace Museum"}, {"name": "Lunch", "description": "Have lunch at a local restaurant near the museum.", "time": "12:30 - 13:30", "location": "Local Restaurant near National Palace Museum"}, {"name": "Chiang Kai-shek Memorial Hall", "description": "Visit the Chiang Kai-shek Memorial Hall, a significant historical landmark.", "time": "14:00 - 16:00", "location": "Chiang Kai-shek Memorial Hall"}, {"name": "Dinner", "description": "Enjoy dinner at a night market, experiencing the vibrant atmosphere and diverse street food.", "time": "19:00 - 20:00", "location": "Shilin Night Market"}]}, {"day": 3, "date": "2025-02-11", "activities": [{"name": "Day Trip to Taroko Gorge", "description": "Take a day trip to Taroko Gorge National Park, marveling at the stunning marble cliffs and natural beauty.", "time": "8:00 - 18:00", "location": "Taroko Gorge National Park"}, {"name": "Lunch", "description": "Have lunch at a restaurant near Taroko Gorge.", "time": "13:00 - 14:00", "location": "Restaurant near Taroko Gorge"}]}, {"day": 4, "date": "2025-02-12", "activities": [{"name": "Longshan Temple", "description": "Visit Longshan Temple, a historic and beautiful Buddhist temple.", "time": "9:00 - 10:30", "location": "Longshan Temple"}, {"name": "Lunch", "description": "Have lunch at a local restaurant.", "time": "11:00 - 12:00", "location": "Local Restaurant"}, {"name": "Explore Ximending", "description": "Spend the afternoon exploring the trendy Ximending shopping district.", "time": "13:00 - 17:00", "location": "Ximending"}, {"name": "Farewell Dinner", "description": "Enjoy a farewell dinner at a restaurant of your choice.", "time": "19:00 - 20:30", "location": "Restaurant of your choice"}]}, {"day": 5, "date": "2025-02-13", "activities": [{"name": "Departure", "description": "Depart from Taoyuan International Airport (TPE).", "time": "10:00", "location": "Taoyuan International Airport (TPE)"}]}], "flightSuggestions": [{"airline": "Philippine Airlines", "departure": "Cebu (CEB)", "arrival": "Taipei (TPE)", "duration": "4h 30m", "price": "$500", "logoUri": "https://www.philippineairlines.com/images/pal-logo.png", "bookingLink": "https://www.philippineairlines.com/"}, {"airline": "Cebu Pacific", "departure": "Cebu (CEB)", "arrival": "Taipei (TPE)", "duration": "4h 30m", "price": "$450", "logoUri": "https://www.cebupacificair.com/images/logo.svg", "bookingLink": "https://www.cebupacificair.com/"}, {"airline": "China Airlines", "departure": "Cebu (CEB)", "arrival": "Taipei (TPE)", "duration": "4h 30m", "price": "$550", "logoUri": "https://www.china-airlines.com/us/en/images/logo.png", "bookingLink": "https://www.china-airlines.com/us/en/"}, {"airline": "EVA Air", "departure": "Cebu (CEB)", "arrival": "Taipei (TPE)", "duration": "4h 30m", "price": "$600", "logoUri": "https://www.evaair.com/en-global/images/common/logo.png", "bookingLink": "https://www.evaair.com/"}, {"airline": "Scoot", "departure": "Cebu (CEB)", "arrival": "Taipei (TPE)", "duration": "4h 30m", "price": "$400", "logoUri": "https://www.flyscoot.com/images/logo.svg", "bookingLink": "https://www.flyscoot.com/"}], "hotelSuggestions": [{"name": "Cosmos Hotel Taipei", "description": "Comfortable hotel with convenient location.", "location": "Taipei", "price": "$100", "totalPrice": "$500", "rating": "4.5", "geoLocation": {"lat": 25.0479, "lng": 121.5171}, "imageUri": "https://lh3.googleusercontent.com/p/AF1QipM9zJ0d9wZ9aW4wO4Qp-p6c7rZvG0-tG9o-3hA=w408-h306-k-no", "bookingLink": "https://www.cosmoshotel.com.tw/"}, {"name": "Amba Taipei Songshan", "description": "Stylish hotel near Songshan Airport.", "location": "Taipei", "price": "$150", "totalPrice": "$750", "rating": "4.0", "geoLocation": {"lat": 25.0501, "lng": 121.5735}, "imageUri": "https://lh3.googleusercontent.com/p/AF1QipM6L-5P_T7fN-R1c_G_zK0a9X2T_C_5i_aE7wE=w408-h306-k-no", "bookingLink": "https://www.amba-hotels.com/en/taipei-songshan/"}, {"name": "Caesar Park Hotel Taipei", "description": "Luxury hotel with excellent amenities.", "location": "Taipei", "price": "$200", "totalPrice": "$1000", "rating": "4.5", "geoLocation": {"lat": 25.0462, "lng": 121.5239}, "imageUri": "https://lh3.googleusercontent.com/p/AF1QipP-R0P43Lh7b4O5v_y0w-k_m33j4o-y6uW7Q8N=w408-h306-k-no", "bookingLink": "https://www.caesarpark.com.tw/"}, {"name": "Meander Taipei Hostel", "description": "Budget-friendly hostel in a central location.", "location": "Taipei", "price": "$30", "totalPrice": "$150", "rating": "4.2", "geoLocation": {"lat": 25.0443, "lng": 121.5256}, "imageUri": "https://lh3.googleusercontent.com/p/AF1QipM_aW3x0v0p6k_H_a_B2h_x3Q8f9Y-qYq_K09v=w408-h306-k-no", "bookingLink": "https://www.meandertaipei.com/"}, {"name": "Green World Hotel", "description": "Clean hotel with amazing staff and good location.", "location": "Taipei", "price": "$75", "totalPrice": "$375", "rating": "4.3", "geoLocation": {"lat": 25.0439, "lng": 121.5192}, "imageUri": "https://lh3.googleusercontent.com/p/AF1QipN2q0l-bP4V5b52eR-pU7tV6Z_l_xP8jY9k-rX=w408-h306-k-no", "bookingLink": "https://www.greenworldhotels.com/"}]}`;

export const chatSession = model.startChat({
  generationConfig: genConfig,
  // history: [
  //   {
  //     role: 'user',
  //     parts: [
  //       {
  //         text: userText,
  //       },
  //     ],
  //   },
  //   {
  //     role: 'model',
  //     parts: [
  //       {
  //         text: modelText,
  //       },
  //     ],
  //   },
  // ],
});
