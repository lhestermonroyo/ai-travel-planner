import React, { FC } from 'react';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from './ui/form-control';
import { Textarea, TextareaInput } from './ui/textarea';

interface IFormTextAreaProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (val: string) => void;
  helperText?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
}

const FormTextArea: FC<IFormTextAreaProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  helperText,
  isDisabled = false,
  isReadOnly = false,
  isRequired = false,
  errorMessage,
}) => {
  return (
    <FormControl
      size="md"
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      isInvalid={!!errorMessage}
    >
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>

      <Textarea
        className="border-gray-700"
        size="lg"
        isReadOnly={false}
        isInvalid={false}
        isDisabled={false}
      >
        <TextareaInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
      </Textarea>

      {helperText && (
        <FormControlHelper>
          <FormControlHelperText className="text-gray-500">
            {helperText}
          </FormControlHelperText>
        </FormControlHelper>
      )}

      {errorMessage && (
        <FormControlError>
          <FormControlErrorText>{errorMessage}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
};

export default FormTextArea;
