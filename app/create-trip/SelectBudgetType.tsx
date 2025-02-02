import React from 'react';
import { FlatList, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import 'react-native-get-random-values';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text/';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Button } from '@/components/ui/button';
import { useRecoilState } from 'recoil';

import states from '@/states';
import { budgetTypes } from '@/constants/CreateTrip';

import FormButton from '@/components/FormButton';
import FormOption from '@/components/FormOption';

const SelectBudgetType = () => {
  const [trip, setTrip] = useRecoilState(states.trip);

  const router = useRouter();

  const handleSelectBudgetType = (item: any) => {
    const { name, description } = item;

    setTrip((prev: any) => ({
      ...prev,
      tripForm: {
        ...prev.tripForm,
        budgetType: {
          name,
          description,
        },
      },
    }));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack className="my-8 px-4 flex-1" space="4xl">
          <HStack space="md" className="items-center">
            <Button size="xl" variant="link" onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#3b82f6" />
            </Button>
            <Text size="3xl" className="font-medium">
              Select Budget Type
            </Text>
          </HStack>

          <VStack className="flex-1" space="2xl">
            <FlatList
              data={budgetTypes}
              renderItem={({ item }) => (
                <FormOption
                  item={item}
                  variant={
                    trip.tripForm.budgetType?.name === item.name
                      ? 'outline'
                      : 'elevated'
                  }
                  onPress={handleSelectBudgetType}
                />
              )}
            />
          </VStack>

          <FormButton
            disabled={!trip.tripForm.budgetType}
            text="Review Trip"
            onPress={() => router.push('/create-trip/ReviewTrip')}
          />
        </VStack>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SelectBudgetType;
