import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { default as ReactSelect } from 'react-select';
import { ValueType } from 'react-select/lib/types';
import './Select.scss';

export interface SelectOptionType {
  value: string;
  label: string;
}

interface SelectInputProps extends FieldRenderProps<string, HTMLSelectElement> {
  isClearable?: boolean;
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

const styles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#970c10' : 'transparent',
    ':active': {
      backgroundColor: '#ad383c9a'
    },
    ':hover': {
      backgroundColor: '#ad383c9a'
    }
  })
};

const SelectInput: React.FC<SelectInputProps> = ({
  input,
  meta,
  isClearable,
  options
}) => {
  const value = findOptionByValue(options, input.value);

  const onChange = (eventValue?: ValueType<SelectOptionType>) => {
    if (eventValue) {
      const newValue = getOptionValue(eventValue as SelectOptionType);
      return input.onChange(newValue);
    }
    return input.onChange(null);
  };

  return (
    <ReactSelect
      className="select-override"
      value={value}
      styles={styles}
      isClearable={isClearable}
      getOptionValue={getOptionValue}
      options={options}
      onChange={onChange}
      onBlur={event =>
        input.onBlur(event as React.FocusEvent<HTMLSelectElement>)
      }
      onFocus={event =>
        input.onFocus(event as React.FocusEvent<HTMLSelectElement>)
      }
      name={input.name}
    />
  );
};

export default SelectInput;
