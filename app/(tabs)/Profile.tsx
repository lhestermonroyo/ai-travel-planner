import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Box } from '@/components/ui/box';
import { useRouter } from 'expo-router';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import states from '@/states';
import { auth as firebaseAuth } from '@/services/firebase';
import { signOut } from 'firebase/auth';

const Profile = () => {
  const auth = useRecoilValue(states.auth);
  const resetAuth = useResetRecoilState(states.auth);

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(firebaseAuth);

      resetAuth();
      router.navigate('/auth/Login');
    } catch (error) {
      console.log('[handleSignOut] error', error);
    }
  };

  return (
    <Box className="display-flex justify-center align-center">
      <Text>Profile: {JSON.stringify(auth.user)}</Text>
      <Button onPress={handleSignOut}>
        <ButtonText>Sign Out</ButtonText>
      </Button>
    </Box>
  );
};

export default Profile;
