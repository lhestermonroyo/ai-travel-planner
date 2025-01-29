import React, { FC } from 'react';
import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from './ui/form-control';
import { Input, InputField, InputIcon, InputSlot } from './ui/input';
import { Button } from './ui/button';

interface IFormInputProps {
  type: 'text' | 'password' | undefined;
  placeholder: string;
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onPressRightIcon?: () => void;
  rightIcon?: any;
  helperText?: string;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
}

const FormInput: FC<IFormInputProps> = ({
  type,
  placeholder,
  label,
  value,
  onChangeText,
  onPressRightIcon,
  rightIcon,
  helperText,
  isRequired = false,
  isReadOnly = false,
  isDisabled = false,
}) => {
  return (
    <FormControl
      size="md"
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
    >
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>

      <Input variant="outline" className="my-1 border-gray-500" size="lg">
        <InputField
          type={type}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
        {rightIcon && (
          <InputSlot>
            <Button onPress={onPressRightIcon}>
              <InputIcon as={rightIcon} className="text-blue-500" />
            </Button>
          </InputSlot>
        )}
      </Input>

      {helperText && (
        <FormControlHelper>
          <FormControlHelperText className="text-gray-500">
            {helperText}
          </FormControlHelperText>
        </FormControlHelper>
      )}
    </FormControl>
  );
};

export default FormInput;
