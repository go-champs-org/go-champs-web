import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import MetaInput from './MetaInput';

/// ReGex to match Twitter/X Username from URLs like
/// https://x.com/USERNAME
/// https://twitter.com/USERNAME
/// x.com/USERNAME
/// twitter.com/USERNAME

const TWITTER_USERNAME_REGEX = /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)(?:[?&/].*)?/;

interface TwitterInputProps extends FieldRenderProps<string, HTMLElement> {
  className?: string;
  disabled?: boolean;
}

// Validation function to be used with Field validate prop
export const validateTwitterInput = (value: string): string | undefined => {
  if (!value) return undefined;

  // Check if it's a valid Twitter/X URL
  const urlMatch = value.match(TWITTER_USERNAME_REGEX);
  if (urlMatch) return undefined;

  // Check if it's a valid username (letters, numbers, underscores)
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (value.match(usernameRegex)) return undefined;

  return 'Invalid Twitter/X username or URL';
};

const TwitterInput: React.FunctionComponent<TwitterInputProps> = ({
  input,
  meta,
  className,
  disabled = false
}) => {
  const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      const match = value.match(TWITTER_USERNAME_REGEX);
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

export default TwitterInput;
