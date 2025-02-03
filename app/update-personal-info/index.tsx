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

const UpdatePersonalInfo = () => {
  const [values, setValues] = useState({
    fullname: '',
    email: '',
    phone: '',
    location: '',
    pronouns: '',
    bio: '',
  });
  const [formErrors, setFormErrors] = useState({
    fullname: '',
    email: '',
    phone: '',
    location: '',
  }) as any;
  const [disableBack, setDisableBack] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [auth, setAuth] = useRecoilState(states.auth);

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (auth?.user) {
      if (!auth?.user?.phone || !auth?.user?.location) {
        setDisableBack(true);
      }

      setValues({
        fullname: auth.user?.fullname,
        email: auth.user?.email,
        phone: auth.user?.phone,
        location: auth.user?.location,
        pronouns: auth.user?.pronouns,
        bio: auth.user?.bio,
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
    if (formErrors[key]) {
      setFormErrors({ ...formErrors, [key]: '' });
    }

    setValues({ ...values, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      let errors: any = {};
      if (!values.fullname) {
        errors.fullname = 'Fullname is required';
      }

      if (!values.email) {
        errors.email = 'Email is required';
      }

      if (!values.phone) {
        errors.phone = 'Phone number is required';
      }

      if (!values.location) {
        errors.location = 'Location is required';
      }

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      await services.database.updateUser(values).then(() => {
        setAuth((prev: any) => ({
          ...prev,
          user: {
            ...prev.user,
            ...values,
          },
        }));
        handleToast(
          'Profile Updated',
          'Your profile has been updated.',
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
            {!disableBack && (
              <Button size="xl" variant="link" onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#3b82f6" />
              </Button>
            )}
            <Text size="3xl" className="font-medium">
              Update Personal Info
            </Text>
          </HStack>

          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack className="flex-1">
              <VStack space="3xl">
                <FormInput
                  type="text"
                  label="Fullname"
                  placeholder="Enter your fullname"
                  value={values.fullname}
                  onChangeText={text => handleChange('fullname', text)}
                  errorMessage={formErrors.fullname}
                />

                <FormInput
                  type="text"
                  label="Email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChangeText={text => handleChange('email', text)}
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  isDisabled
                  helperText="Updating email is not allowed for now"
                  errorMessage={formErrors.email}
                />

                <FormInput
                  type="text"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  value={values.phone}
                  onChangeText={text => handleChange('phone', text)}
                  autoCapitalize="none"
                  autoComplete="tel"
                  keyboardType="phone-pad"
                  errorMessage={formErrors.phone}
                />

                <FormInput
                  type="text"
                  label="Location"
                  placeholder="Enter your location"
                  value={values.location}
                  onChangeText={text => handleChange('location', text)}
                  autoComplete="street-address"
                  helperText="Location will be used as reference for flight suggestions"
                  errorMessage={formErrors.location}
                />

                <FormSelect
                  label="Pronouns"
                  placeholder="Select your pronouns"
                  value={values.pronouns}
                  onValueChange={value => handleChange('pronouns', value)}
                  options={[
                    { label: 'He/Him', value: 'He/Him' },
                    { label: 'She/Her', value: 'She/Her' },
                    { label: 'They/Them', value: 'They/Them' },
                  ]}
                />

                <FormTextArea
                  label="Bio"
                  placeholder="Compose a bio"
                  value={values.bio}
                  onChangeText={text => handleChange('bio', text)}
                  errorMessage={formErrors.bio}
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

export default UpdatePersonalInfo;
