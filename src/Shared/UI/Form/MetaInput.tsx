import classNames from 'classnames';
import React, { Fragment, ReactNode } from 'react';
import { FieldMetaState } from 'react-final-form';
import './MetaInput.scss';

interface MetaInputProps {
  component: (inputMetaClasses: string) => ReactNode;
  meta: FieldMetaState<string>;
}

const MetaInput: React.FC<MetaInputProps> = ({ component, meta }) => {
  const inputMetaClasses = classNames({
    'is-warning': !meta.dirtySinceLastSubmit && meta.invalid
  });

  return (
    <Fragment>
      {component(inputMetaClasses)}

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
