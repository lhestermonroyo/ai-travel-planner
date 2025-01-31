import React from 'react';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import { Text } from '@/components/ui/text/';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { ArrowLeftIcon } from '@/components/ui/icon';
import { Button, ButtonIcon } from '@/components/ui/button';

import FormButton from '@/components/FormButton';

const SearchPlace = () => {
  const router = useRouter();

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack className="my-8 px-4" space="4xl">
          <HStack space="md" className="items-center">
            <Button size="xl" variant="link" onPress={() => router.back()}>
              <ButtonIcon className="size-32" as={ArrowLeftIcon} />
            </Button>
            <Text size="3xl">Search Place</Text>
            {/* <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
          language: 'en',
        }}
      /> */}
          </HStack>
        </VStack>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SearchPlace;
