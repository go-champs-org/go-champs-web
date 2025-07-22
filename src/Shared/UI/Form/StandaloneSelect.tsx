import React from 'react';
import { default as ReactSelect } from 'react-select';
import { ValueType } from 'react-select/lib/types';
import { useTheme } from '../../../Theme/useTheme';

export interface SelectOptionType {
  value: string;
  label: string;
}

interface StandaloneSelectProps {
  value?: string;
  options: SelectOptionType[];
  onChange?: (value: string) => void;
  placeholder?: string;
  isClearable?: boolean;
  className?: string;
  isDisabled?: boolean;
}

const getOptionValue = (option: SelectOptionType) => option.value;

const findOptionByValue = (options: SelectOptionType[], value: string) => {
  for (const option of options) {
    if (option.value === value) {
      return option;
    }
  }
};

const StandaloneSelect: React.FC<StandaloneSelectProps> = ({
  value,
  options,
  onChange,
  placeholder,
  isClearable = false,
  className = '',
  isDisabled = false
}) => {
  const { theme } = useTheme();
  const selectedOption = value ? findOptionByValue(options, value) : undefined;

  // Create styles object using theme colors
  const selectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: theme.colors.background,
      borderColor: state.isFocused ? theme.colors.primary : theme.colors.border,
      borderWidth: '2px',
      borderRadius: '8px',
      minHeight: '44px',
      minWidth: '200px',
      width: '100%',
      '@media (min-width: 768px)': {
        minWidth: '280px',
        width: 'auto'
      },
      boxShadow: state.isFocused
        ? `0 0 0 0.125rem ${theme.colors.primary}40`
        : 'none',
      '&:hover': {
        borderColor: state.isFocused ? theme.colors.primary : theme.colors.text
      }
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: theme.colors.background,
      border: `2px solid ${theme.colors.border}`,
      borderRadius: '8px',
      marginTop: '4px',
      boxShadow: `0 4px 16px ${theme.colors.shadowLight}`,
      overflow: 'hidden',
      zIndex: 9999,
      position: 'absolute',
      minWidth: '200px',
      '@media (min-width: 768px)': {
        minWidth: '280px'
      }
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
      cursor: 'pointer',
      '&:active': {
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
    }),
    indicatorSeparator: () => ({
      display: 'none'
    })
  };

  const handleChange = (eventValue: ValueType<SelectOptionType>) => {
    if (eventValue) {
      const newValue = getOptionValue(eventValue as SelectOptionType);
      if (onChange) {
        onChange(newValue);
      }
    } else if (isClearable && onChange) {
      onChange('');
    }
  };

  return (
    <ReactSelect
      className={`select-themed ${className}`}
      value={selectedOption}
      styles={selectStyles}
      isClearable={isClearable}
      isDisabled={isDisabled}
      getOptionValue={getOptionValue}
      options={options}
      onChange={handleChange}
      placeholder={placeholder}
      menuPortalTarget={document.body}
      menuPosition="absolute"
      menuPlacement="auto"
    />
  );
};

export default StandaloneSelect;
