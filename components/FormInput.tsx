import React, { FC } from 'react';
import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from './ui/form-control';
import { Input, InputField, InputIcon, InputSlot } from './ui/input';

interface IFormInputProps {
  type: 'text' | 'password' | undefined;
  placeholder: string;
  label: string;
  value: string;
  onChangeText: (text: string) => void;
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
  rightIcon,
  helperText,
  isRequired = false,
  isReadOnly = false,
  isDisabled = false,
}) => {
  return (
    <FormControl
      size="lg"
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
    >
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>

      <Input variant="outline" className="my-1 h-14 border-gray-500" size="xl">
        <InputField
          type={type}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
        {rightIcon && (
          <InputSlot>
            <InputIcon as={rightIcon} className="mr-4 color-gray-600" />
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
