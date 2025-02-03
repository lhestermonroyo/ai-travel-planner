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
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';

const AccountSettings = () => {
  const [values, setValues] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [formErrors, setFormErrors] = useState({
    oldPassword: '',
    newPassword: '',
  }) as any;
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [auth, setAuth] = useRecoilState(states.auth);

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

  const handleChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      await services.auth.changePassword(
        values.oldPassword,
        values.newPassword
      );
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
              Account Settings
            </Text>
          </HStack>

          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack className="flex-1">
              <VStack space="3xl">
                <FormInput
                  type={showNewPassword ? 'text' : 'password'}
                  label="Old Password"
                  placeholder="Enter your old password"
                  value={values.newPassword}
                  onChangeText={text => handleChange('newPassword', text)}
                  rightIcon={showNewPassword ? EyeIcon : EyeOffIcon}
                  onPressRightIcon={() => setShowNewPassword(!showNewPassword)}
                  errorMessage={formErrors.newPassword}
                />

                <FormInput
                  type={showOldPassword ? 'text' : 'password'}
                  label="New Password"
                  placeholder="Enter new password"
                  value={values.oldPassword}
                  onChangeText={text => handleChange('oldPassword', text)}
                  rightIcon={showOldPassword ? EyeIcon : EyeOffIcon}
                  onPressRightIcon={() => setShowOldPassword(!showOldPassword)}
                  onBlur={() =>
                    values.oldPassword === values.newPassword &&
                    setFormErrors({
                      ...formErrors,
                      oldPassword: 'Passwords must not be the same.',
                    })
                  }
                  helperText="New password must not be the same as your old password."
                  errorMessage={formErrors.oldPassword}
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

export default AccountSettings;
