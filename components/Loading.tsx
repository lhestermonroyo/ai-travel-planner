import React, { FC } from 'react';
import { ActivityIndicator } from 'react-native';
import { Box } from './ui/box';
import { Center } from './ui/center';
import { Text } from './ui/text';
import { VStack } from './ui/vstack';
import Logo from './Logo';

interface ILoadingProps {
  message?: string;
}

const Loading: FC<ILoadingProps> = ({
  message = 'Loading app data, please wait...',
}) => {
  return (
    <Box className="flex-1 justify-center items-center">
      <Center>
        <VStack space="4xl">
          <Center>
            <Logo />
          </Center>
          <VStack className="mt-10" space="3xl">
            <ActivityIndicator color="#0da6f2" size="large" />
            <Text size="lg">{message}</Text>
          </VStack>
        </VStack>
      </Center>
    </Box>
  );
};

export default Loading;
