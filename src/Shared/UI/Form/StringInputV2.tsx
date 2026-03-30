import React, { Fragment, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import './StringInputV2.scss';

interface StringInputV2Props extends FieldRenderProps<string, HTMLElement> {
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
}

const StringInputV2: React.FC<StringInputV2Props> = ({
  input,
  meta,
  className,
  disabled = false,
  placeholder,
  type = 'text'
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const fieldType = (input.type || type) as 'text' | 'email' | 'password';
  const isPassword = fieldType === 'password';
  const hasError = meta.touched && !meta.dirtySinceLastSubmit && meta.invalid;
  const errors: string[] = meta.touched
    ? Array.isArray(meta.error)
      ? (meta.error as string[]).filter(Boolean)
      : meta.error
      ? [meta.error]
      : []
    : [];
  const submitErrors: string[] = meta.submitError || [];

  const inputType = isPassword && showPassword ? 'text' : fieldType;

  return (
    <Fragment>
      <div
        className={`string-input-v2-wrapper${isPassword ? ' has-toggle' : ''}`}
      >
        <input
          {...input}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          className={`string-input-v2${hasError ? ' is-error' : ''}${
            className ? ` ${className}` : ''
          }`}
        />
        {isPassword && (
          <button
            type="button"
            className="string-input-v2-eye-toggle"
            onClick={() => setShowPassword(prev => !prev)}
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
          </button>
        )}
      </div>

      {errors.map(err => (
        <p key={err} className="string-input-v2-error">
          {err}
        </p>
      ))}
      {submitErrors.map(err => (
        <p key={err} className="string-input-v2-error">
          {err}
        </p>
      ))}
    </Fragment>
  );
};

export default StringInputV2;
