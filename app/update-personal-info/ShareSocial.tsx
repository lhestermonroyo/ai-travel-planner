import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text/';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Button } from '@/components/ui/button';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';
import { useRecoilState } from 'recoil';

import states from '@/states';
import services from '@/services';

import FormButton from '@/components/FormButton';
import FormInput from '@/components/FormInput';
import FormTextArea from '@/components/FormTextArea';
import FormSelect from '@/components/FormSelect';

const ShareSocial = () => {
  const [values, setValues] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    tiktok: '',
    youtube: '',
    website: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const [auth, setAuth] = useRecoilState(states.auth);

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (auth?.user.socials) {
      setValues({
        facebook: auth.user.socials?.facebook,
        twitter: auth.user.socials?.twitter,
        instagram: auth.user.socials?.instagram,
        tiktok: auth.user.socials?.tiktok,
        youtube: auth.user.socials?.youtube,
        website: auth.user.socials?.website,
      });
    }
  }, []);

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

  const handleChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const payload = {
        ...auth.user,
        socials: {
          ...values,
        },
      };

      await services.database.updateUser(payload).then(() => {
        setAuth((prev: any) => ({
          ...prev,
          user: payload,
        }));
        handleToast(
          'Socials Updated',
          'Your socials has been updated.',
          'success'
        );
        router.push('/Profile');
      });
    } catch (error) {
      console.log('[handleSubmit] error', error);
      handleToast('Error', 'An error occurred. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, height: '100%' }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <VStack className="my-8 px-4 flex-1" space="4xl">
          <HStack space="md" className="items-center">
            <Button size="xl" variant="link" onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#3b82f6" />
            </Button>
            <Text size="3xl" className="font-medium">
              Share Socials
            </Text>
          </HStack>

          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack className="flex-1">
              <VStack space="3xl">
                <FormInput
                  type="text"
                  label="Facebook"
                  placeholder="Enter your facebook link"
                  value={values.facebook}
                  onChangeText={text => handleChange('facebook', text)}
                />

                <FormInput
                  type="text"
                  label="Twitter"
                  placeholder="Enter your twitter link"
                  value={values.twitter}
                  onChangeText={text => handleChange('twitter', text)}
                />

                <FormInput
                  type="text"
                  label="Instagram"
                  placeholder="Enter your instagram link"
                  value={values.instagram}
                  onChangeText={text => handleChange('instagram', text)}
                />

                <FormInput
                  type="text"
                  label="Tiktok"
                  placeholder="Enter your tiktok link"
                  value={values.tiktok}
                  onChangeText={text => handleChange('tiktok', text)}
                />

                <FormInput
                  type="text"
                  label="Youtube"
                  placeholder="Enter your youtube link"
                  value={values.youtube}
                  onChangeText={text => handleChange('youtube', text)}
                />

                <FormInput
                  type="text"
                  label="Website"
                  placeholder="Enter your website link"
                  value={values.website}
                  onChangeText={text => handleChange('website', text)}
                />
              </VStack>
            </VStack>
          </ScrollView>
          <FormButton
            loading={submitting}
            text="Save Changes"
            onPress={handleSubmit}
          />
        </VStack>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ShareSocial;
