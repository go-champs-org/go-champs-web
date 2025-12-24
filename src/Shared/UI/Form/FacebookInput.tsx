import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import MetaInput from './MetaInput';

/// ReGex to match Facebook Username from URLs like
/// https://www.facebook.com/USERNAME
/// https://facebook.com/USERNAME
/// www.facebook.com/USERNAME
/// facebook.com/USERNAME

const FACEBOOK_USERNAME_REGEX = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/([a-zA-Z0-9._-]+)(?:[?&/].*)?/;

interface FacebookInputProps extends FieldRenderProps<string, HTMLElement> {
  className?: string;
  disabled?: boolean;
}

// Validation function to be used with Field validate prop
export const validateFacebookInput = (value: string): string | undefined => {
  if (!value) return undefined;

  // Check if it's a valid Facebook URL
  const urlMatch = value.match(FACEBOOK_USERNAME_REGEX);
  if (urlMatch) return undefined;

  // Check if it's a valid username (letters, numbers, periods, underscores, hyphens)
  const usernameRegex = /^[a-zA-Z0-9._-]+$/;
  if (value.match(usernameRegex)) return undefined;

  return 'Invalid Facebook username or URL';
};

const FacebookInput: React.FunctionComponent<FacebookInputProps> = ({
  input,
  meta,
  className,
  disabled = false
}) => {
  const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      const match = value.match(FACEBOOK_USERNAME_REGEX);
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

export default FacebookInput;
