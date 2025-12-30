import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { default as ReactSelect } from 'react-select';
import { ValueType } from 'react-select/lib/types';
import { useTheme } from '../../../Theme/useTheme';
import './Select.scss';

export interface SelectOptionType {
  value: string;
  label: string;
}

interface SelectInputProps extends FieldRenderProps<string, HTMLSelectElement> {
  isClearable?: boolean;
  isDisabled?: boolean;
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

// Styles are now handled via CSS custom properties in Select.scss
// This allows proper theme integration and better maintainability

const SelectInput: React.FC<SelectInputProps> = ({
  input,
  meta,
  isClearable,
  isDisabled = false,
  options
}) => {
  const { theme } = useTheme();
  const value = findOptionByValue(options, input.value);

  // Create styles object using theme colors
  const selectStyles = {
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: theme.colors.background,
      border: 'none',
      borderRadius: '8px',
      marginTop: '4px',
      boxShadow: `0 4px 16px ${theme.colors.shadowLight}`,
      overflow: 'hidden',
      zIndex: 9999,
      position: 'absolute'
    }),
    menuPortal: (provided: any) => ({
      ...provided,
      zIndex: 9999
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? theme.colors.primary
        : state.isFocused
        ? theme.colors.backgroundSecondary
        : theme.colors.background,
      color: state.isSelected ? theme.colors.buttonText : theme.colors.text,
      padding: '12px 16px',
      ':active': {
        backgroundColor: theme.colors.primary
      }
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: theme.colors.text
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: theme.colors.textPlaceholder
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused
        ? theme.colors.primary
        : theme.colors.textSecondary,
      '&:hover': {
        color: theme.colors.primary
      }
    }),
    clearIndicator: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused
        ? theme.colors.primary
        : theme.colors.textSecondary,
      '&:hover': {
        color: theme.colors.primary
      }
    })
  };

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
      isDisabled={isDisabled}
      styles={selectStyles}
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
      menuPortalTarget={document.body}
      menuPosition="absolute"
      menuPlacement="auto"
    />
  );
};

export default SelectInput;
