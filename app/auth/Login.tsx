import { useState } from 'react';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import FormInput from '@/components/FormInput';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { Link } from '@/components/ui/link';
import { useRouter } from 'expo-router';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      // TODO: Implement form submission
    } catch (error) {}
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView>
        <VStack className="mt-32 px-4" space="3xl">
          <VStack space="xs">
            <Text size="4xl">Welcome back!</Text>
            <Text size="2xl" className="text-blue-500">
              Let's get you signed in
            </Text>
          </VStack>

          <FormInput
            type="text"
            label="Email"
            placeholder="Enter your email"
            value={values.email}
            onChangeText={text => setValues({ ...values, email: text })}
          />

          <FormInput
            type={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="Enter your password"
            value={values.password}
            onChangeText={text => setValues({ ...values, password: text })}
            rightIcon={showPassword ? EyeIcon : EyeOffIcon}
            onPressRightIcon={() => setShowPassword(!showPassword)}
          />

          <Button
            className="bg-blue-500 mt-4"
            size="xl"
            variant="solid"
            action="primary"
            onPress={handleSubmit}
          >
            <ButtonText className="color-white">Create Account</ButtonText>
          </Button>

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
    </KeyboardAvoidingView>
  );
};

export default Login;
