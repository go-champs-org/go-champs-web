import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import MetaInput from './MetaInput';

const StringInput: React.FC<FieldRenderProps<string, HTMLInputElement>> = ({
  input,
  meta
}) => {
  return (
    <MetaInput
      component={inputMetaClasses => (
        <input className={`input ${inputMetaClasses}`} type="text" {...input} />
      )}
      meta={meta}
    />
  );
};

export default StringInput;
