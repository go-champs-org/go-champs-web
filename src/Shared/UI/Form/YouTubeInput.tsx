import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import MetaInput from './MetaInput';

/// ReGex to match YouTube Code from URLs like
/// https://www.youtube.com/watch?v=VIDEO_CODE
/// https://www.youtube.com/v/VIDEO_CODE
/// https://www.youtube.com/embed/VIDEO_CODE
/// https://www.youtube.com/watch?v=VIDEO_CODE&ab_channel=CHANNEL_NAME
/// https://youtu.be/VIDEO_CODE
const YOUTUBE_CODE_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|v\/|embed\/|watch\?.*v=)?([a-zA-Z0-9_-]{11})(?:[&?].*)?$/;

interface YouTubeInputProps extends FieldRenderProps<string, HTMLElement> {
  className?: string;
  disabled?: boolean;
}

const YouTubeInput: React.FunctionComponent<YouTubeInputProps> = ({
  input,
  meta,
  className,
  disabled = false
}) => {
  const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      const match = value.match(YOUTUBE_CODE_REGEX);
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

export default YouTubeInput;
