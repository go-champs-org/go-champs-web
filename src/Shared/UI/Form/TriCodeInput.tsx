import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import MetaInput from './MetaInput';

interface TriCodeInputProps extends FieldRenderProps<string, HTMLElement> {
  className?: string;
  disabled?: boolean;
}

const TriCodeInput: React.FunctionComponent<TriCodeInputProps> = ({
  input,
  meta,
  className,
  disabled = false,
  numberOfCharacters = 3
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
          maxLength={numberOfCharacters}
          onInput={event => {
            const target = event.target as HTMLInputElement;
            target.value = target.value.toUpperCase();
          }}
        />
      )}
      meta={meta}
    />
  );
};

export default TriCodeInput;
