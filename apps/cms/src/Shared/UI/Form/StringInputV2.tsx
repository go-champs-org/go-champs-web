import React, { Fragment, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import FieldStatusIcon, { FieldStatus } from './FieldStatusIcon';
import './StringInputV2.scss';

export type InputStatus = FieldStatus;

interface StringInputV2Props extends FieldRenderProps<string, HTMLElement> {
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  status?: InputStatus;
  type?: 'text' | 'email' | 'password';
}

const StringInputV2: React.FC<StringInputV2Props> = ({
  input,
  meta,
  className,
  disabled = false,
  placeholder,
  status = 'idle',
  type = 'text'
}) => {
  const [showPassword, setShowPassword] = useState(false);
  // Validation messages travel through the form as translation keys. Anything
  // that is not a key comes back from i18next unchanged, so the messages that
  // are still plain sentences keep rendering as they are.
  const { t } = useTranslation();

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

  const hasStatusIcon = status !== 'idle';

  return (
    <Fragment>
      <div
        className={`string-input-v2-wrapper${isPassword ? ' has-toggle' : ''}${
          hasStatusIcon ? ' has-status' : ''
        }`}
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
        {hasStatusIcon && (
          <span className={`string-input-v2-status is-${status}`}>
            <FieldStatusIcon status={status} />
          </span>
        )}
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
          {t(err)}
        </p>
      ))}
      {submitErrors.map(err => (
        <p key={err} className="string-input-v2-error">
          {t(err)}
        </p>
      ))}
    </Fragment>
  );
};

export default StringInputV2;
