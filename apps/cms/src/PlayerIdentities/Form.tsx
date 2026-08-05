import React, { useState } from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import StringInput from '../Shared/UI/Form/StringInput';
import Datetime from '../Shared/UI/Form/Datetime';
import LoadingButton from '../Shared/UI/LoadingButton';
import { mustBeCPF } from '../Shared/UI/Form/Validators/commonValidators';
import { stripNonDigits } from '../Shared/UI/Form/parsers';
import { PlayerIdentityFormValues } from './dataMappers';

export function FormLoading(): React.ReactElement {
  return <div className="columns is-multiline" />;
}

interface MaskedFieldProps {
  label: string;
  fieldName: 'taxId' | 'governmentId';
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

interface PlayerIdentityFormProps
  extends FormRenderProps<PlayerIdentityFormValues> {
  backUrl: string;
  exists: boolean;
  isLoading: boolean;
  isDeleting: boolean;
  taxIdLast4: string;
  governmentIdLast4: string;
  onDelete: () => void;
}

function Form({
  backUrl,
  exists,
  isLoading,
  isDeleting,
  taxIdLast4,
  governmentIdLast4,
  onDelete,
  handleSubmit,
  submitting,
  pristine
}: PlayerIdentityFormProps): React.ReactElement {
  const [isEditingTaxId, setIsEditingTaxId] = useState(!exists);
  const [isEditingGovernmentId, setIsEditingGovernmentId] = useState(!exists);

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label className="label">
            <Trans>fullLegalName</Trans>
          </label>

          <div className="control">
            <Field name="fullLegalName" component={StringInput} />
          </div>
        </div>

        {taxIdLast4 ? (
          <MaskedField
            label="CPF"
            fieldName="taxId"
            last4={taxIdLast4}
            isEditing={isEditingTaxId}
            onEdit={() => setIsEditingTaxId(true)}
            parse={stripNonDigits}
            validate={mustBeCPF}
          />
        ) : (
          <div className="field">
            <label className="label">CPF</label>

            <div className="control">
              <Field
                name="taxId"
                component={StringInput}
                parse={stripNonDigits}
                validate={mustBeCPF}
              />
            </div>
          </div>
        )}

        {governmentIdLast4 ? (
          <MaskedField
            label="RG"
            fieldName="governmentId"
            last4={governmentIdLast4}
            isEditing={isEditingGovernmentId}
            onEdit={() => setIsEditingGovernmentId(true)}
          />
        ) : (
          <div className="field">
            <label className="label">RG</label>

            <div className="control">
              <Field name="governmentId" component={StringInput} />
            </div>
          </div>
        )}

        <div className="field">
          <label className="label">
            <Trans>dateOfBirth</Trans>
          </label>

          <div className="control">
            <Field name="dateOfBirth" component={Datetime} timeFormat={false} />
          </div>
        </div>

        <div className="field">
          <label className="label">Username</label>

          <div className="control">
            <Field name="username" component={StringInput} type="text" />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>

          <div className="control">
            <Field name="email" component={StringInput} type="text" />
          </div>
        </div>

        <LoadingButton
          isLoading={isLoading}
          className="button is-primary"
          type="submit"
          disabled={submitting || pristine}
        >
          <Trans>save</Trans>
        </LoadingButton>

        {exists && (
          <LoadingButton
            isLoading={isDeleting}
            className="button is-danger is-outlined"
            type="button"
            style={{ marginLeft: '0.5rem' }}
            onClick={onDelete}
          >
            <Trans>removeIdentity</Trans>
          </LoadingButton>
        )}
      </form>

      <Link to={backUrl}>
        <button className="button is-small is-info is-outlined">
          <span className="icon">
            <i className="fas fa-caret-left"></i>
          </span>

          <span>
            <Trans>back</Trans>
          </span>
        </button>
      </Link>
    </div>
  );
}

export default Form;
