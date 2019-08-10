import React from 'react';
import { FieldRenderProps } from 'react-final-form';

const StringInput: React.FC<FieldRenderProps<string, HTMLInputElement>> = ({
  input,
  meta
}) => <input className="input is-primary" type="text" {...input} />;

export default StringInput;
