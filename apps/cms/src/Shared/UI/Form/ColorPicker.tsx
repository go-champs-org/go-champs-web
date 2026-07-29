import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import MetaInput from './MetaInput';

interface ColorPickerProps extends FieldRenderProps<string, HTMLElement> {
  className?: string;
  disabled?: boolean;
  isClearable?: boolean;
  placeholder?: string;
}

const ColorPicker: React.FunctionComponent<ColorPickerProps> = ({
  input,
  meta,
  className,
  disabled = false,
  isClearable = false,
  placeholder
}) => {
  const handleClear = () => {
    input.onChange('');
  };

  const hasValue = input.value && input.value !== '';

  return (
    <MetaInput
      className={className}
      component={inputMetaClasses => (
        <div className="field has-addons">
          <div className="control">
            <div
              className="button is-static"
              style={{
                width: '40px',
                height: '2.5em',
                padding: '0',
                border: '1px solid #dbdbdb',
                borderRadius: '4px 0 0 4px',
                background: hasValue
                  ? input.value
                  : 'repeating-conic-gradient(#ccc 0% 25%, transparent 0% 50%) 50% / 10px 10px',
                position: 'relative'
              }}
              title={hasValue ? `Color: ${input.value}` : 'No color selected'}
            >
              {!hasValue && (
                <span
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '12px',
                    color: '#999',
                    fontWeight: 'bold'
                  }}
                >
                  ∅
                </span>
              )}
            </div>
          </div>
          <div className="control">
            <input
              className={`input ${inputMetaClasses}`}
              type="color"
              {...input}
              disabled={disabled}
              style={{
                height: '2.5em',
                padding: '0.25em 0.5em',
                width: '100px',
                borderRadius: '0'
              }}
            />
          </div>
          {isClearable && (
            <div className="control">
              <button
                type="button"
                className="button is-light"
                onClick={handleClear}
                disabled={disabled || input.value === ''}
                title="Clear color"
                style={{
                  borderRadius: '0 4px 4px 0',
                  height: '100%'
                }}
              >
                <span className="icon is-small">
                  <i className="fas fa-times"></i>
                </span>
              </button>
            </div>
          )}
        </div>
      )}
      meta={meta}
    />
  );
};

export default ColorPicker;
