import React from 'react';
import MetaInput from './MetaInput';
import { FieldRenderProps } from 'react-final-form';

interface DateInputProps extends FieldRenderProps<string, HTMLElement> {
  className?: string;
  disabled?: boolean;
}

function DateInput({
  className,
  input,
  meta,
  disabled = false
}: DateInputProps) {
  return (
    <MetaInput
      className={className}
      component={inputMetaClasses => (
        <input
          className={`input ${inputMetaClasses}`}
          type="date"
          {...input}
          disabled={disabled}
        />
      )}
      meta={meta}
    />
  );
}

export default DateInput;
