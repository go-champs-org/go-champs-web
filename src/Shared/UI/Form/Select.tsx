import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { default as ReactSelect } from 'react-select';

interface SelectProps extends FieldRenderProps<HTMLSelectElement> {
  selectOptions: any[];
  getOptionLabel: any;
}

class Select extends React.Component<SelectProps> {
  render() {
    const { input, getOptionLabel, selectOptions } = this.props;
    return (
      <ReactSelect
        {...input}
        getOptionLabel={getOptionLabel}
        options={selectOptions}
        searchable
        onChange={(value: any) => this.onChange(value)}
        onBlur={(event: any) => this.onBlur(event)}
        onFocus={(event: any) => this.onFocus(event)}
      />
    );
  }

  onBlur(event: any) {
    this.props.input.onBlur(event);
  }

  onChange(value: any) {
    this.props.input.onChange(value);
  }

  onFocus(event: any) {
    this.props.input.onFocus(event);
  }
}

export default ({ input, meta, ...rest }: any) => (
  <Select input={input} meta={meta} {...rest} />
);
