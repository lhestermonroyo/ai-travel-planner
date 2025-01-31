import { StyleSheet, Image, Platform } from 'react-native';

import { Box } from '@/components/ui/box';
import FormButton from '@/components/FormButton';
import { useRouter } from 'expo-router';

const MyTrips = () => {
  const router = useRouter();

  return (
    <Box className="flex-1 justify-center items-center">
      <FormButton
        text="Start New Trip"
        onPress={() => router.push('/create-trip/SearchPlace')}
      />
    </Box>
  );
};

export default MyTrips;
