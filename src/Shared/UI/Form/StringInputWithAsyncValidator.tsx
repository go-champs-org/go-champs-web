import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import MetaInput from './MetaInput';
import './StringInputWithAsyncValidator.scss';

const StringInputWithAsyncValidator: React.FC<FieldRenderProps<
  string,
  HTMLInputElement
>> = ({ input, meta }) => {
  return (
    <MetaInput
      component={inputMetaClasses => (
        <div className="async-validator">
          <input
            className={`input ${inputMetaClasses}`}
            type="text"
            {...input}
          />

          {!meta.validating && meta.touched && meta.error && (
            <span className="icon is-right has-text-warning">
              <i className="fas fa-times"></i>
            </span>
          )}

          {!meta.validating && meta.touched && meta.valid && (
            <span className="icon is-right has-text-success">
              <i className="fas fa-check"></i>
            </span>
          )}

          {meta.validating && (
            <span className="icon is-right">
              <i className="fas fa-circle-notch fa-spin"></i>
            </span>
          )}
        </div>
      )}
      meta={meta}
    />
  );
};

export default StringInputWithAsyncValidator;
