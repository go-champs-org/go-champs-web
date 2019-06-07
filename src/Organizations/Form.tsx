import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';

interface FromProps {
	handleSubmit: any;
	submitting: boolean;
	pristine: boolean;
}

const Input: React.FC<FieldRenderProps<HTMLInputElement>> = ({
	input,
	meta
}) => <input className="input" type="text" {...input} />;

const Form: React.FC<FromProps> = ({ handleSubmit, submitting, pristine }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className="field">
				<label className="label">Name</label>
				<div className="control">
					<Field name="name" component={Input} type="text" placeholder="Name" />
				</div>
			</div>

			<div className="field">
				<label className="label">Slug</label>
				<div className="control">
					<Field name="slug" component={Input} type="text" placeholder="slug" />
				</div>
			</div>

			<button
				className="button is-primary"
				type="submit"
				disabled={submitting || pristine}>
				Submit
      </button>
		</form>
	);
};

export default Form;
