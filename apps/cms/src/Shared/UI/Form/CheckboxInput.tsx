import React from 'react';
import { FieldRenderProps } from 'react-final-form';

export interface CheckboxInputProps
  extends FieldRenderProps<string, HTMLInputElement> {
  id: string;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ id, input }) => {
  return <input {...input} id={id} type="checkbox" className="is-checkradio" />;
};

export default CheckboxInput;
