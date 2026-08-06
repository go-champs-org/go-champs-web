import React, { useEffect, useState } from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import StringInput from '../Shared/UI/Form/StringInput';
import Datetime from '../Shared/UI/Form/Datetime';
import LoadingButton from '../Shared/UI/LoadingButton';
import MaskedField from '../Shared/UI/Form/MaskedField';
import {
  mustBeCPF,
  mustHaveAtLeastTwoWords
} from '../Shared/UI/Form/Validators/commonValidators';
import { stripNonDigits } from '../Shared/UI/Form/parsers';
import { AccountIdentityFormValues } from './dataMappers';

export function FormLoading(): React.ReactElement {
  return <div className="columns is-multiline" />;
}

interface AccountIdentityFormProps
  extends FormRenderProps<AccountIdentityFormValues> {
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
  pristine,
  validating,
  valid
}: AccountIdentityFormProps): React.ReactElement {
  const [isEditingTaxId, setIsEditingTaxId] = useState(!exists);
  const [isEditingGovernmentId, setIsEditingGovernmentId] = useState(!exists);

  useEffect(() => {
    if (taxIdLast4) setIsEditingTaxId(false);
  }, [taxIdLast4]);

  useEffect(() => {
    if (governmentIdLast4) setIsEditingGovernmentId(false);
  }, [governmentIdLast4]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label className="label">
            <Trans>fullLegalName</Trans>
          </label>

          <div className="control">
            <Field
              name="fullLegalName"
              component={StringInput}
              validate={mustHaveAtLeastTwoWords}
            />
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

        <LoadingButton
          isLoading={isLoading}
          className="button is-primary"
          type="submit"
          disabled={submitting || pristine || validating || !valid}
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
