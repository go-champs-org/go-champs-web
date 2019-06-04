import moment from 'moment';
import React from 'react';
import DateTimePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { FieldRenderProps } from 'react-final-form';

class Datetime extends React.Component<FieldRenderProps<HTMLInputElement>> {
	render() {
		const { input } = this.props;
		return (
			<DateTimePicker className="input" {...input} utc value={moment(input.value)} />
		);
	}
}

export default Datetime;