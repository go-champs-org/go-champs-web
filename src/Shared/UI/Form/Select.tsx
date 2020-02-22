import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { default as ReactSelect } from 'react-select';
import { ValueType } from 'react-select/lib/types';

interface SelectProps extends FieldRenderProps<string, HTMLSelectElement> {
  selectOptions: any[];
  getOptionLabel: any;
  getOptionValue?: any;
}

const OPTIONS = [
  { value: 'elimination', label: 'Eliminaćão' },
  { value: 'draw', label: 'Rounds' }
];

const getValue = (value: string) => {
  if (value === OPTIONS[0].value) {
    return OPTIONS[0];
  }

  return OPTIONS[1];
};

const getOptionValue = (option: any) => option.value;

class Select extends React.Component<SelectProps> {
  render() {
    const { input, getOptionLabel, selectOptions } = this.props;
    console.log(input, 'value');

    return (
      <ReactSelect
        value={getValue(input.value)}
        // inputValue={getOptionLabel(input.value)}
        // getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        options={OPTIONS}
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
    const customValue = getOptionValue(value);
    this.props.input.onChange(customValue);
  }

  onFocus(event: any) {
    this.props.input.onFocus(event);
  }
}

export default ({ input, meta, ...rest }: any) => (
  <Select input={input} meta={meta} {...rest} />
);

export interface SelectOptionType {
  value: string;
  label: string;
}

interface SelectInputProps extends FieldRenderProps<string, HTMLSelectElement> {
  options: SelectOptionType[];
}

const newGetOptionValue = (option: SelectOptionType) => option.value;

const findOptionByValue = (options: SelectOptionType[], value: string) => {
  for (const option of options) {
    if (option.value === value) {
      return option;
    }
  }
};

export const SelectInput: React.FC<SelectInputProps> = ({
  input,
  meta,
  options
}) => {
  const value = findOptionByValue(options, input.value);

  const onChange = (eventValue: ValueType<SelectOptionType>) => {
    const newValue = newGetOptionValue(eventValue as SelectOptionType);
    return input.onChange(newValue);
  };

  return (
    <ReactSelect
      value={value}
      getOptionValue={newGetOptionValue}
      options={options}
      onChange={onChange}
      onBlur={event =>
        input.onBlur(event as React.FocusEvent<HTMLSelectElement>)
      }
      onFocus={event =>
        input.onFocus(event as React.FocusEvent<HTMLSelectElement>)
      }
    />
  );
};
