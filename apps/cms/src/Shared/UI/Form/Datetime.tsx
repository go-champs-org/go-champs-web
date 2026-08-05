import moment from 'moment';
import React from 'react';
import DateTimePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { FieldRenderProps } from 'react-final-form';
import './Datetime.scss';

interface DatetimeProps extends FieldRenderProps<string, HTMLElement> {
  timeFormat?: boolean | string;
}

class Datetime extends React.Component<DatetimeProps> {
  render() {
    const { input, timeFormat } = this.props;
    return (
      <DateTimePicker
        {...input}
        name={input.name}
        inputProps={{ className: 'input' }}
        utc
        timeFormat={timeFormat}
        value={moment(input.value)}
        renderInput={this.renderInput}
      />
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- react-datetime ships no types (see react-datetime.d.ts ambient declaration)
  renderInput(props: any, openCalendar: any, closeCalendar: any) {
    const clear = () => {
      props.onChange({ target: { value: '' } });
    };
    return (
      <p className="control has-icons-left has-icons-right">
        <input {...props} />
        <span
          className="icon is-left"
          onClick={openCalendar}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: '10px'
          }}
        >
          <i className="fas fa-calendar" />
        </span>
        <span
          className="icon is-right"
          onClick={clear}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: '10px'
          }}
        >
          <i className="fas fa-times" />
        </span>
      </p>
    );
  }
}

export default Datetime;
