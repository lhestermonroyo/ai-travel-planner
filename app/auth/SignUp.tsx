import { useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
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

import FormInput from '@/components/FormInput';
import Logo from '@/components/Logo';
import FormButton from '@/components/FormButton';

const SignUp = () => {
  const [values, setValues] = useState({
    fullname: '',
    email: '',
    password: '',
    confPassword: '',
  });
  const [formErrors, setFormErrors] = useState({
    fullname: '',
    email: '',
    password: '',
    confPassword: '',
  }) as any;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
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

      if (!values.password) {
        errors.password = 'Password is required';
      }

      if (!values.confPassword) {
        errors.confPassword = 'Confirm Password is required';
      }

      if (values.password !== values.confPassword) {
        errors.confPassword = 'Passwords do not match';
      }

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      const user = await services.auth.signUp(
        values.email.trim(),
        values.password.trim()
      );

      if (user && !user.emailVerified) {
        await services.database.saveUser({
          uid: user.uid,
          email: values.email,
          fullname: values.fullname,
        });

        handleToast(
          'Account Created',
          'Your account has been created successfully! Please verify your email first to login.',
          'success'
        );
        router.push('/auth/Login');
      }
    } catch (error) {
      console.log('Error creating account:', error);
      handleToast(
        'Sign Up Failed',
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
              <Text size="4xl">Create your account</Text>
              <Text size="xl" className="text-primary-500">
                Let's get you signed in
              </Text>
            </VStack>

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
                errorMessage={formErrors.email}
              />

              <FormInput
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="Enter your password"
                value={values.password}
                onChangeText={text => handleChange('password', text)}
                rightIcon={showPassword ? EyeIcon : EyeOffIcon}
                onPressRightIcon={() => setShowPassword(!showPassword)}
                errorMessage={formErrors.password}
              />

              <FormInput
                type={showConfPassword ? 'text' : 'password'}
                label="Confirm Password"
                placeholder="Enter confirm password"
                value={values.confPassword}
                onChangeText={text => handleChange('confPassword', text)}
                onBlur={() =>
                  values.password !== values.confPassword &&
                  setFormErrors({
                    ...formErrors,
                    confPassword: 'Passwords do not match',
                  })
                }
                rightIcon={showConfPassword ? EyeIcon : EyeOffIcon}
                onPressRightIcon={() => setShowConfPassword(!showConfPassword)}
                errorMessage={formErrors.confPassword}
              />

              <FormButton
                text="Create Account"
                loading={submitting}
                onPress={handleSubmit}
              />
            </VStack>

            <Center>
              <HStack className="mt-4" space="xs">
                <Text size="lg" className="text-gray-500">
                  Already have an account?
                </Text>
                <Link onPress={() => router.push('/auth/Login')}>
                  <Text size="lg" className="text-primary-500">
                    Login
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

export default SignUp;
