import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import MetaInput from './MetaInput';

interface StringInputProps extends FieldRenderProps<string, HTMLElement> {
  className?: string;
}

const StringInput: React.FunctionComponent<StringInputProps> = ({
  input,
  meta,
  className
}) => {
  return (
    <MetaInput
      className={className}
      component={inputMetaClasses => (
        <input className={`input ${inputMetaClasses}`} type="text" {...input} />
      )}
      meta={meta}
    />
  );
};

export default StringInput;
