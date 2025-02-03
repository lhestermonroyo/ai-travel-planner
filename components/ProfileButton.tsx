import React, { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { VStack } from './ui/vstack';
import { HStack } from './ui/hstack';
import { Text } from './ui/text';

interface IProfileButtonProps {
  title: string;
  onPress: () => void;
}

const ProfileButton: FC<IProfileButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <HStack space="md" className="items-center justify-between">
        <VStack space="xs">
          <VStack>
            <Text size="lg" className="text-primary-500 font-medium">
              {title}
            </Text>
          </VStack>
        </VStack>
        <Ionicons name="chevron-forward-outline" size={24} color="#3b82f6" />
      </HStack>
    </TouchableOpacity>
  );
};

export default ProfileButton;
