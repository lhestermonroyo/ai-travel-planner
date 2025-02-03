import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from './ui/drawer';
import { VStack } from './ui/vstack';
import { Text } from './ui/text';

import FormButton from './FormButton';
import { Image } from './ui/image';
import { Ionicons } from '@expo/vector-icons';

interface IUploadAvatarDrawerProps {
  loading: boolean;
  showDrawer: boolean;
  imageData: any;
  onChangeImage: () => void;
  onSave: () => void;
  onClose: () => void;
}

const UploadAvatarDrawer: FC<IUploadAvatarDrawerProps> = ({
  loading,
  showDrawer,
  imageData,
  onChangeImage,
  onSave,
  onClose,
}) => {
  return (
    <Drawer isOpen={showDrawer} onClose={onClose} size="full" anchor="bottom">
      <DrawerBackdrop />
      <DrawerContent>
        <SafeAreaView style={{ flex: 1 }}>
          <DrawerHeader className="justify-center">
            <Text size="3xl" className="pt-8 font-medium">
              Edit Avatar
            </Text>
          </DrawerHeader>
          <DrawerBody>
            {imageData?.assets && (
              <VStack space="xl">
                <Image
                  source={{ uri: imageData?.assets[0].uri }}
                  alt="edit-avatar"
                  resizeMode="cover"
                  size="none"
                  className="w-full aspect-[1/1] rounded-full"
                />
                <FormButton
                  disabled={loading}
                  text="Re-pick Avatar"
                  icon={
                    <Ionicons name="camera-outline" size={24} color="#fff" />
                  }
                  onPress={onChangeImage}
                />
              </VStack>
            )}
          </DrawerBody>
          <DrawerFooter>
            <VStack className="flex-1" space="sm">
              <FormButton
                loading={loading}
                text="Set as Avatar"
                onPress={onSave}
              />
              <FormButton
                disabled={loading}
                variant="outline"
                text="Cancel"
                onPress={onClose}
              />
            </VStack>
          </DrawerFooter>
        </SafeAreaView>
      </DrawerContent>
    </Drawer>
  );
};

export default UploadAvatarDrawer;
