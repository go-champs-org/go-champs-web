import moment from 'moment';
import React from 'react';
import DateTimePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { FieldRenderProps } from 'react-final-form';
import './Datetime.scss';

class Datetime extends React.Component<
  FieldRenderProps<string, HTMLInputElement>
> {
  render() {
    const { input } = this.props;
    return (
      <DateTimePicker
        {...input}
        name={input.name}
        inputProps={{ className: 'input' }}
        utc
        value={moment(input.value)}
        renderInput={this.renderInput}
      />
    );
  }

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
