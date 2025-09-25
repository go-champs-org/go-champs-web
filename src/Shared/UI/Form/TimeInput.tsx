import React, { useState, useEffect } from 'react';
import { FieldRenderProps } from 'react-final-form';
import MetaInput from './MetaInput';

interface TimeInputProps extends FieldRenderProps<number, HTMLInputElement> {
  className?: string;
  disabled?: boolean;
}

const TimeInput: React.FunctionComponent<TimeInputProps> = ({
  input,
  meta,
  className,
  disabled = false
}) => {
  // Convert seconds to MM:SS format
  const secondsToTimeString = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  // Convert MM:SS format to seconds
  const timeStringToSeconds = (timeString: string): number => {
    if (!timeString || !timeString.includes(':')) return 0;
    const [minutesStr, secondsStr] = timeString.split(':');
    const minutes = parseInt(minutesStr, 10) || 0;
    const seconds = parseInt(secondsStr, 10) || 0;
    return minutes * 60 + seconds;
  };

  // Local state to manage the display value
  const [displayValue, setDisplayValue] = useState(
    secondsToTimeString(input.value)
  );

  // Update display value when input.value changes
  useEffect(() => {
    setDisplayValue(secondsToTimeString(input.value));
  }, [input.value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDisplayValue = event.target.value;
    setDisplayValue(newDisplayValue);

    // Convert to seconds and update the form
    const secondsValue = timeStringToSeconds(newDisplayValue);
    input.onChange(secondsValue);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // On blur, ensure the format is correct
    const correctedValue = secondsToTimeString(
      timeStringToSeconds(displayValue)
    );
    setDisplayValue(correctedValue);
    input.onBlur(event);
  };

  return (
    <MetaInput
      className={className}
      component={inputMetaClasses => (
        <input
          className={`input ${inputMetaClasses}`}
          type="time"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={input.onFocus}
          placeholder="00:00"
          disabled={disabled}
        />
      )}
      meta={meta as any}
    />
  );
};

export default TimeInput;
