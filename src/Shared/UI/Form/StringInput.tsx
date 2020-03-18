import React, { Fragment } from 'react';
import { FieldRenderProps } from 'react-final-form';
import classNames from 'classnames';
import './StringInput.scss';

const StringInput: React.FC<FieldRenderProps<string, HTMLInputElement>> = ({
  input,
  meta
}) => {
  const classes = classNames('input', {
    'is-warning': !meta.dirtySinceLastSubmit && meta.invalid
  });

  return (
    <Fragment>
      <input className={classes} type="text" {...input} />

      {meta.submitError &&
        meta.submitError.map((error: string) => (
          <p className="help is-warning">{error}</p>
        ))}
    </Fragment>
  );
};

export default StringInput;
