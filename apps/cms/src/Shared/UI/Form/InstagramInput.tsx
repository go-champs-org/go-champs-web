import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import MetaInput from './MetaInput';

/// ReGex to match Instagram Username from URLs like
/// https://www.instagram.com/USERNAME/
/// https://instagram.com/USERNAME/
/// www.instagram.com/USERNAME/
/// instagram.com/USERNAME/
/// instagram.com/USERNAME

const INSTAGRAM_USERNAME_REGEX = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9._]+)\/?(?:[?&].*)?/;

interface InstagramInputProps extends FieldRenderProps<string, HTMLElement> {
  className?: string;
  disabled?: boolean;
}

// Validation function to be used with Field validate prop
export const validateInstagramInput = (value: string): string | undefined => {
  if (!value) return undefined;

  // Check if it's a valid Instagram URL
  const urlMatch = value.match(INSTAGRAM_USERNAME_REGEX);
  if (urlMatch) return undefined;

  // Check if it's a valid username (letters, numbers, periods, underscores)
  const usernameRegex = /^[a-zA-Z0-9._]+$/;
  if (value.match(usernameRegex)) return undefined;

  return 'Invalid Instagram username or URL';
};

const InstagramInput: React.FunctionComponent<InstagramInputProps> = ({
  input,
  meta,
  className,
  disabled = false
}) => {
  const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      const match = value.match(INSTAGRAM_USERNAME_REGEX);
      if (match) {
        input.onChange(match[1]);
      } else {
        input.onChange(value);
      }
    } else {
      input.onChange(value);
    }
  };

  return (
    <MetaInput
      className={className}
      component={inputMetaClasses => (
        <input
          className={`input ${inputMetaClasses}`}
          type="text"
          {...input}
          disabled={disabled}
          onBlur={onBlur}
        />
      )}
      meta={meta}
    />
  );
};

export default InstagramInput;
