import { useState } from 'react';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Link } from '@/components/ui/link';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';

import services from '@/services';
import states from '@/states';

import Logo from '@/components/Logo';
import FormInput from '@/components/FormInput';

const Login = () => {
  const setAuth = useSetRecoilState(states.auth);

  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  }) as any;
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      let errors: any = {};

      if (!values.email) {
        errors.email = 'Email is required';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      }

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      const user = await services.auth.logIn(
        values.email.trim(),
        values.password.trim()
      );

      if (user) {
        if (user.emailVerified) {
          setAuth({ user, isAuth: true });

          router.push('/(tabs)/MyTrips');
        } else {
          handleToast(
            'Account Not Verified',
            'Please verify your email first to login.',
            'warning'
          );
        }
      }
    } catch (error) {
      console.log('Error creating account:', error);
      handleToast(
        'Login Failed',
        'An error occurred while creating your account. Please try again.',
        'error'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <VStack className="mt-24 px-4" space="4xl">
            <Logo />

            <VStack space="xs">
              <Text size="4xl">Welcome back!</Text>
              <Text size="xl" className="text-blue-500">
                Let's get you signed in
              </Text>
            </VStack>

            <VStack space="3xl">
              <FormInput
                type="text"
                label="Email"
                placeholder="Enter your email"
                value={values.email}
                onChangeText={text => setValues({ ...values, email: text })}
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                errorMessage={formErrors.email}
              />

              <FormInput
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="Enter your password"
                value={values.password}
                onChangeText={text => setValues({ ...values, password: text })}
                rightIcon={showPassword ? EyeIcon : EyeOffIcon}
                onPressRightIcon={() => setShowPassword(!showPassword)}
                errorMessage={formErrors.password}
              />

              <Button
                className="bg-blue-500 disabled:bg-blue-200 mt-4"
                size="xl"
                variant="solid"
                action="primary"
                disabled={submitting}
                onPress={handleSubmit}
              >
                <ButtonText className="color-white">Login</ButtonText>
                {submitting && <ButtonSpinner className="color-white" />}
              </Button>
            </VStack>

            <Center>
              <HStack className="mt-4" space="xs">
                <Text size="lg" className="text-gray-500">
                  No account yet?
                </Text>
                <Link onPress={() => router.push('/auth/SignUp')}>
                  <Text size="lg" className="text-blue-500">
                    Sign up
                  </Text>
                </Link>
              </HStack>
            </Center>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;
