import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Center } from '@/components/ui/center';
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import states from '@/states';
import { auth as firebaseAuth } from '@/services/firebase';
import { signOut } from 'firebase/auth';

import FormButton from '@/components/FormButton';
import ProfileButton from '@/components/ProfileButton';
import UploadAvatarDrawer from '@/components/UploadAvatarDrawer';
import services from '@/services';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';

const Profile = () => {
  const [showEditAvatar, setShowEditAvatar] = useState(false);
  const [imageData, setImageData] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const [auth, setAuth] = useRecoilState(states.auth);
  const resetAuth = useResetRecoilState(states.auth);
  const resetTrip = useResetRecoilState(states.trip);

  useEffect(() => {
    if (!auth?.user?.phone || !auth?.user?.location) {
      router.push('/update-personal-info');
      return;
    }
  }, []);

  const router = useRouter();
  const toast = useToast();

  const handleToast = (title: string, description: string, type: any) => {
    toast.show({
      placement: 'top',
      duration: 5000,
      render: ({ id }) => {
        const uniqueToastId = 'toast-' + id;

        return (
          <Toast nativeID={uniqueToastId} action={type} variant="outline">
            <ToastTitle>{title}</ToastTitle>
            <ToastDescription>{description}</ToastDescription>
          </Toast>
        );
      },
    });
  };

  const handlePickImage = async () => {
    let response: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!response.canceled) {
      if (!showEditAvatar) {
        setShowEditAvatar(true);
      }
      setImageData(response);
    }
  };

  const handleCloseEditAvatar = () => {
    setShowEditAvatar(false);
    setImageData(null);
  };

  const handleSaveAvatar = async () => {
    try {
      if (!imageData) return;

      setUploading(true);

      const avatar = await services.upload.uploadAvatar(
        imageData,
        auth.user.email
      );

      if (avatar) {
        await services.database
          .updateUser({
            ...auth.user,
            avatar,
          })
          .then(() => {
            setAuth((prev: any) => ({
              ...prev,
              user: {
                ...prev.user,
                avatar,
              },
            }));

            handleToast('Success', 'Avatar updated successfully', 'success');
            handleCloseEditAvatar();
          });
      }
    } catch (error) {
      console.log('[handleSaveAvatar] error', error);
      handleToast('Error', 'Failed to update avatar', 'error');
    } finally {
      setUploading(false);
      setImageData(null);
      setShowEditAvatar(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(firebaseAuth);

      router.navigate('/auth/Login');
      resetAuth();
      resetTrip();
    } catch (error) {
      console.log('[handleSignOut] error', error);
    }
  };

  console.log('auth', auth);

  if (!auth?.user) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <UploadAvatarDrawer
        loading={uploading}
        showDrawer={showEditAvatar}
        imageData={imageData}
        onChangeImage={handlePickImage}
        onSave={handleSaveAvatar}
        onClose={handleCloseEditAvatar}
      />
      <VStack className="pt-8 pb-12 px-4 flex-1" space="lg">
        <Text size="4xl" className="font-medium">
          Profile
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space="sm">
            <Card className="py-6">
              <VStack space="2xl">
                <Center>
                  <Box className="border-secondary-800 border-solid border-4 rounded-full p-1 relative">
                    <Avatar className="bg-secondary-900" size="xl">
                      <AvatarFallbackText>
                        {auth?.user.fullname}
                      </AvatarFallbackText>
                      <AvatarImage
                        source={{
                          uri: auth?.user.avatar,
                        }}
                      />
                    </Avatar>
                    <HStack className="absolute -bottom-1 right-0">
                      <Button
                        size="xs"
                        variant="solid"
                        className=" h-10 w-10 rounded-full p-1"
                        onPress={handlePickImage}
                      >
                        <Ionicons name="camera" size={20} color="#fff" />
                      </Button>
                    </HStack>
                  </Box>
                </Center>

                <VStack space="xs">
                  <Text size="2xl" className="font-medium text-center">
                    {auth?.user.fullname}
                  </Text>
                  <Text size="lg" className="text-center text-secondary-900">
                    ({auth?.user.pronouns})
                  </Text>
                  <HStack className="items-center justify-center">
                    <Ionicons name="location-outline" size={16} />
                    <Text size="lg" className="text-center text-secondary-900">
                      {auth?.user.location}
                    </Text>
                    <Text className="mx-2">|</Text>
                    <Ionicons name="phone-portrait-outline" size={16} />
                    <Text size="lg" className="text-center text-secondary-900">
                      +{auth?.user.phone}
                    </Text>
                  </HStack>
                </VStack>

                <Text size="xl" className="text-center">
                  {auth?.user.bio}
                </Text>

                <HStack space="2xl" className="justify-center">
                  {auth?.user.socials?.facebook && (
                    <Button variant="link">
                      <Ionicons
                        name="logo-facebook"
                        size={32}
                        color="#1877F2"
                      />
                    </Button>
                  )}

                  {auth?.user.socials?.twitter && (
                    <Button variant="link">
                      <Ionicons name="logo-twitter" size={32} color="#1DA1F2" />
                    </Button>
                  )}

                  {auth?.user.socials?.instagram && (
                    <Button variant="link">
                      <Ionicons
                        name="logo-instagram"
                        size={32}
                        color="#E1306C"
                      />
                    </Button>
                  )}

                  {auth?.user.socials?.tiktok && (
                    <Button variant="link">
                      <Ionicons name="logo-tiktok" size={32} color="#000" />
                    </Button>
                  )}

                  {auth?.user.socials?.youtube && (
                    <Button variant="link">
                      <Ionicons name="logo-youtube" size={32} color="#FF0000" />
                    </Button>
                  )}

                  {auth?.user.socials?.website && (
                    <Button variant="link">
                      <Ionicons name="globe" size={32} color="#000" />
                    </Button>
                  )}
                </HStack>
              </VStack>
            </Card>
            <Card className="py-6">
              <ProfileButton
                title="Share Socials"
                onPress={() => router.push('/update-personal-info/ShareSocial')}
              />
              <Divider className="my-5 bg-secondary-200" />
              <ProfileButton
                title="Update Personal Info"
                onPress={() => router.push('/update-personal-info')}
              />
              <Divider className="my-5 bg-secondary-200" />
              <ProfileButton
                title="Account Settings"
                onPress={() => router.push('/update-personal-info')}
              />
            </Card>

            <FormButton text="Sign Out" onPress={handleSignOut} />
          </VStack>
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
};

export default Profile;
