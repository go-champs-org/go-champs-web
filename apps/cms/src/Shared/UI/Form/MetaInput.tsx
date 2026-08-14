import classNames from 'classnames';
import React, { Fragment, ReactNode } from 'react';
import { FieldMetaState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import './MetaInput.scss';
import { isArray } from 'util';

interface MetaInputProps<T> {
  className?: string;
  component: (inputMetaClasses: string) => ReactNode;
  meta: FieldMetaState<T>;
}

const MetaInput = <T,>({ className, component, meta }: MetaInputProps<T>) => {
  // Validation messages travel through the form as translation keys. i18next
  // returns anything that is not a key unchanged, so messages that are still
  // plain sentences keep rendering as they are.
  const { t } = useTranslation();
  const shouldSetError =
    meta.touched && !meta.dirtySinceLastSubmit && meta.invalid;

  const inputMetaClasses = classNames(
    {
      'is-warning': shouldSetError
    },
    className
  );

  return (
    <Fragment>
      {component(inputMetaClasses)}

      {meta.touched && meta.error && (
        <Fragment>
          {isArray(meta.error) ? (
            meta.error
              .filter((err: string | undefined) => !!err)
              .map(err => (
                <p key={err} className="help is-warning">
                  {t(err)}
                </p>
              ))
          ) : (
            <p className="help is-warning">{t(meta.error)}</p>
          )}
        </Fragment>
      )}

      {meta.submitError &&
        meta.submitError.map((error: string) => (
          <p key={error} className="help is-warning">
            {t(error)}
          </p>
        ))}
    </Fragment>
  );
};

export default MetaInput;
