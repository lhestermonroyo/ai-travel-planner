import React from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Center } from './ui/center';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';
import AppIntroSlider from 'react-native-app-intro-slider';

const LandingIntro = () => {
  const router = useRouter();

  const slides = [
    {
      key: '1',
      title: 'Welcome to AI Travel Planner',
      text: 'Your AI-powered travel planner',
      image: require('./../assets/images/1.png'),
      backgroundColor: '#febe29',
    },
    {
      key: '2',
      title: 'Fast and Easy',
      text: 'Generate your itinerary in \nmatter of seconds',
      image: require('./../assets/images/2.png'),
      backgroundColor: '#8bbc22',
    },
    {
      key: '3',
      title: 'Get Started',
      text: 'Sign up to start planning your trip',
      image: require('./../assets/images/3.png'),
      backgroundColor: '#ff6161',
    },
  ];

  const _renderItem = ({ item }: any) => {
    return (
      <View
        className="align-middle justify-center flex-1"
        key={item.key}
        style={{
          backgroundColor: item.backgroundColor,
        }}
      >
        <VStack space="3xl">
          <Text className="color-white text-center" size="4xl">
            {item.title}
          </Text>
          <Center>
            <Image
              className="my-12"
              size="2xl"
              resizeMode="contain"
              alt={`item-${item.key}`}
              source={item.image}
            />
          </Center>
          <Text className="color-white text-center" size="2xl">
            {item.text}
          </Text>
        </VStack>
      </View>
    );
  };

  return (
    <AppIntroSlider
      renderItem={_renderItem}
      data={slides}
      doneLabel="Get Started"
      onDone={() => router.push('/auth/SignUp')}
    />
  );
};

export default LandingIntro;
