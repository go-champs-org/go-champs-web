import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import MetaInput from './MetaInput';

interface StringInputProps extends FieldRenderProps<string, HTMLElement> {
  className?: string;
  disabled?: boolean;
}

const StringInput: React.FunctionComponent<StringInputProps> = ({
  input,
  meta,
  className,
  disabled = false
}) => {
  return (
    <MetaInput
      className={className}
      component={inputMetaClasses => (
        <input
          className={`input ${inputMetaClasses}`}
          type="text"
          {...input}
          disabled={disabled}
        />
      )}
      meta={meta}
    />
  );
};

export default StringInput;
