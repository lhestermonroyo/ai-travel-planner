import { useState } from 'react';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { EyeIcon } from '@/components/ui/icon';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import FormInput from '@/components/FormInput';

const SignUp = () => {
  const [values, setValues] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  console.log('values', values);

  return (
    <VStack className="mt-32 px-4" space="3xl">
      <VStack space="xs">
        <Text size="4xl">Create your account</Text>
        <Text size="2xl" className="text-blue-500">
          Sign up to get started
        </Text>
      </VStack>

      <FormInput
        type="text"
        label="Fullname"
        placeholder="Enter your fullname"
        value={values.fullname}
        onChangeText={text => setValues({ ...values, fullname: text })}
      />

      <FormInput
        type="text"
        label="Email"
        placeholder="Enter your email"
        value={values.email}
        onChangeText={text => setValues({ ...values, email: text })}
      />

      <FormInput
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={values.password}
        onChangeText={text => setValues({ ...values, password: text })}
      />

      <FormControl
        size="lg"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Password</FormControlLabelText>
        </FormControlLabel>

        <Input
          variant="outline"
          className="my-1 h-14 border-gray-500"
          size="xl"
        >
          <InputField
            type="password"
            placeholder="Enter your password"
            // value={inputValue}
            // onChangeText={text => setInputValue(text)}
          />
          <InputSlot>
            <InputIcon as={EyeIcon} className="mr-4 color-gray-600" />
          </InputSlot>
        </Input>

        <FormControlHelper>
          <FormControlHelperText className="text-gray-500">
            Must be atleast 6 characters.
          </FormControlHelperText>
        </FormControlHelper>
      </FormControl>

      <FormControl
        size="lg"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Confirm Password</FormControlLabelText>
        </FormControlLabel>

        <Input
          variant="outline"
          className="my-1 h-14 border-gray-500"
          size="xl"
        >
          <InputField
            type="password"
            placeholder="Enter confirm password"
            // value={inputValue}
            // onChangeText={text => setInputValue(text)}
          />
          <InputSlot>
            <InputIcon as={EyeIcon} className="mr-4 color-gray-600" />
          </InputSlot>
        </Input>
      </FormControl>

      <Button
        className="bg-blue-500 h-16 mt-4"
        size="xl"
        variant="solid"
        action="primary"
        // onPress={handleSubmit}
      >
        <ButtonText className="color-white">Create Account</ButtonText>
      </Button>

      <Center>
        <HStack className="mt-4" space="xs">
          <Text size="xl" className="text-gray-500">
            Already have an account?
          </Text>
          <Text size="xl" className="text-blue-500">
            Login
          </Text>
        </HStack>
      </Center>
    </VStack>
  );
};

export default SignUp;
