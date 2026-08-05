import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-secondary text-neutral-900 hover:opacity-90'
};

export const Button = ({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonProps) => (
  <button
    className={`rounded px-4 py-2 font-medium transition-colors ${VARIANT_CLASSES[variant]} ${className}`}
    {...rest}
  >
    {children}
  </button>
);
