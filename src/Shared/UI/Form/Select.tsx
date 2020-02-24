import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { default as ReactSelect } from 'react-select';
import { ValueType } from 'react-select/lib/types';

export interface SelectOptionType {
  value: string;
  label: string;
}

interface SelectInputProps extends FieldRenderProps<string, HTMLSelectElement> {
  options: SelectOptionType[];
}

const getOptionValue = (option: SelectOptionType) => option.value;

const findOptionByValue = (options: SelectOptionType[], value: string) => {
  for (const option of options) {
    if (option.value === value) {
      return option;
    }
  }
};

const SelectInput: React.FC<SelectInputProps> = ({ input, meta, options }) => {
  const value = findOptionByValue(options, input.value);

  const onChange = (eventValue: ValueType<SelectOptionType>) => {
    const newValue = getOptionValue(eventValue as SelectOptionType);
    return input.onChange(newValue);
  };

  return (
    <ReactSelect
      value={value}
      getOptionValue={getOptionValue}
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

export default SelectInput;
