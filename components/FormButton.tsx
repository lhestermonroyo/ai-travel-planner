import React, { FC } from 'react';
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from './ui/button';

interface IFormButtonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'solid' | 'outline' | 'link';
  action?: 'primary' | 'secondary';
  text: string;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  icon?: any;
  iconEnd?: any;
}

const FormButton: FC<IFormButtonProps> = ({
  className,
  variant = 'solid',
  action = 'primary',
  size = 'xl',
  text,
  loading,
  disabled,
  onPress,
  icon,
  iconEnd,
  ...props
}) => {
  return (
    <Button
      className={`disabled:bg-blue-200 ${className}`}
      size={size}
      variant={variant}
      action={action}
      disabled={loading || disabled}
      onPress={onPress}
      {...props}
    >
      {icon}
      <ButtonText>{text}</ButtonText>
      {iconEnd}
      {loading && <ButtonSpinner className="text-white" />}
    </Button>
  );
};

export default FormButton;
