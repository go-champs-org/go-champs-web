import React from 'react';
import { FieldRenderProps } from 'react-final-form';

const StringInput: React.FC<FieldRenderProps<HTMLInputElement>> = ({
	input,
	meta
}) => <input className="input" type="text" {...input} />;

export default StringInput;