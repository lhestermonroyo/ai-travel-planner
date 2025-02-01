import React, { FC } from 'react';
import { Card } from './ui/card';
import { HStack } from './ui/hstack';
import { VStack } from './ui/vstack';
import { Text } from './ui/text';
import FormButton from './FormButton';

interface IFormReviewCardProps {
  title: string;
  name: string;
  sub?: string;
  onChange: () => void;
}

const FormReviewCard: FC<IFormReviewCardProps> = ({
  title,
  name,
  sub,
  onChange,
}) => {
  return (
    <Card className="bg-white">
      <HStack space="md" className="items-center justify-between">
        <VStack space="md">
          <Text size="md" className="text-secondary-900">
            {title}
          </Text>
          <VStack>
            <Text size="xl" className="text-primary-500 font-medium">
              {name}
            </Text>
            {sub && <Text size="lg">{sub}</Text>}
          </VStack>
        </VStack>
        <FormButton variant="link" text="Change" onPress={onChange} />
      </HStack>
    </Card>
  );
};

export default FormReviewCard;
