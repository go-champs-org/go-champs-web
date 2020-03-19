import classNames from 'classnames';
import React, { Fragment, ReactNode } from 'react';
import { FieldMetaState } from 'react-final-form';
import './MetaInput.scss';

interface MetaInputProps {
  component: (inputMetaClasses: string) => ReactNode;
  meta: FieldMetaState<string>;
}

const MetaInput: React.FC<MetaInputProps> = ({ component, meta }) => {
  const shouldSetError =
    meta.touched && !meta.dirtySinceLastSubmit && meta.invalid;

  const inputMetaClasses = classNames({
    'is-warning': shouldSetError
  });

  return (
    <Fragment>
      {component(inputMetaClasses)}

      {meta.touched && meta.error && (
        <p className="help is-warning">{meta.error}</p>
      )}

      {meta.submitError &&
        meta.submitError.map((error: string) => (
          <p key={error} className="help is-warning">
            {error}
          </p>
        ))}
    </Fragment>
  );
};

export default MetaInput;
