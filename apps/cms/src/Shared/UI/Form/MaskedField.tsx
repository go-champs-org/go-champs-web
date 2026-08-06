import React from 'react';
import { Field } from 'react-final-form';
import { Trans } from 'react-i18next';
import StringInput from './StringInput';

export interface MaskedFieldProps {
  label: string;
  fieldName: string;
  last4: string;
  isEditing: boolean;
  onEdit: () => void;
  parse?: (value: string) => string;
  validate?: (value: string) => string | undefined;
}

function MaskedField({
  label,
  fieldName,
  last4,
  isEditing,
  onEdit,
  parse,
  validate
}: MaskedFieldProps): React.ReactElement {
  return (
    <div className="field">
      <label className="label">{label}</label>

      {isEditing ? (
        <div className="control">
          <Field
            name={fieldName}
            component={StringInput}
            parse={parse}
            validate={validate}
          />
        </div>
      ) : (
        <div className="control is-flex is-align-items-center">
          <span>
            <Trans>endingIn</Trans> {last4}
          </span>

          <button
            type="button"
            className="button is-small is-white"
            style={{ marginLeft: '0.5rem' }}
            onClick={onEdit}
          >
            <span className="icon is-small">
              <i className="fas fa-pencil-alt"></i>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default MaskedField;
