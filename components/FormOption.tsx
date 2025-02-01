import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Card } from './ui/card';
import { HStack } from './ui/hstack';
import { VStack } from './ui/vstack';
import { Text } from './ui/text';
import { Image } from './ui/image';

interface IFormOptionProps {
  item: any;
  variant: 'outline' | 'elevated';
  onPress: (item: any) => void;
}

const FormOption: FC<IFormOptionProps> = ({ item, variant, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        onPress({
          name: item.name,
          description: item.description,
          pax: item.pax,
        })
      }
    >
      <Card
        key={item.id}
        variant={
          // trip.tripForm.travelType?.name === item.name ? 'outline' : 'elevated'
          variant
        }
        className="my-2 bg-white"
      >
        <HStack space="md" className="items-center justify-between">
          <VStack>
            <Text size="2xl" className="text-primary-500 font-medium">
              {item.name}
            </Text>
            <Text size="lg" className="text-secondary-900">
              {item.description}
            </Text>
          </VStack>
          <Image
            size="md"
            resizeMode="contain"
            alt={`item-${item.id}`}
            source={item.icon}
          />
        </HStack>
      </Card>
    </TouchableOpacity>
  );
};

export default FormOption;
