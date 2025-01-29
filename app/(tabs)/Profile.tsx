import { StyleSheet, Image, Platform } from 'react-native';

import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import services from '@/services';
import { Box } from '@/components/ui/box';
import { useRouter } from 'expo-router';
import { useResetRecoilState } from 'recoil';
import states from '@/states';

const Profile = () => {
  const resetAuth = useResetRecoilState(states.auth);

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await services.auth.logOut();

      resetAuth();
      router.navigate('/auth/Login');
    } catch (error) {
      console.log('Profile [handleSignOut] error', error);
    }
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text>Profile</Text>
      <Button onPress={handleSignOut}>
        <ButtonText>Sign Out</ButtonText>
      </Button>
    </Box>
  );
};

export default Profile;
