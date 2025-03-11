import React from 'react';
import { Field, FieldRenderProps, FormRenderProps } from 'react-final-form';
import { Trans } from 'react-i18next';
import StringInput from '../Shared/UI/Form/StringInput';
import LoadingButton from '../Shared/UI/LoadingButton';
import Shimmer from '../Shared/UI/Shimmer';
import {
  CustomFieldEntity,
  RegistrationEntity,
  RegistrationResponseEntity
} from './state';
import {
  composeValidators,
  mustBeEmail,
  required
} from '../Shared/UI/Form/Validators/commonValidators';
import './TeamRosterInviteResponseForm.scss';
import Datetime from '../Shared/UI/Form/Datetime';
import DateInput from '../Shared/UI/Form/DateInput';
import { ApiCustomFieldType } from '../Shared/httpClient/apiTypes';
import ConsentInput from '../Shared/UI/Form/ConsentInput';

const FIELD_COMPONENTS: {
  [key in ApiCustomFieldType]: React.ComponentType<any>;
} = {
  consent: ConsentInput,
  date: DateInput,
  datetime: Datetime,
  text: StringInput
};

interface CustomFieldProps {
  field: CustomFieldEntity;
}

const fieldProps = (field: CustomFieldEntity) => {
  const commonProps = {
    required: field.required,
    id: field.id
  };

  if (field.type === 'consent') {
    return {
      ...commonProps,
      fileUrl: field.properties.public_url || ''
    };
  }

  return commonProps;
};

export function CustomField({ field }: CustomFieldProps) {
  const fieldType = field.type.toLowerCase() as ApiCustomFieldType;
  const FieldComponent = FIELD_COMPONENTS[fieldType];

  if (!FieldComponent) {
    return <></>;
  }

  return (
    <div className="field">
      <label className="label">{field.label}</label>

      <div className="control">
        <Field
          name={`response.${field.id}`}
          className="has-text-centered"
          render={(props: FieldRenderProps<any, any>) => {
            const customProps = {
              ...fieldProps(field),
              ...props
            };
            return (
              <FieldComponent {...customProps} className="has-text-centered" />
            );
          }}
          validate={field.required ? composeValidators([required]) : undefined}
        />
      </div>

      {field.description && <p className="help is-info">{field.description}</p>}
    </div>
  );
}

export function Success() {
  return (
    <div
      className="card"
      style={{
        maxWidth: '380px',
        margin: 'auto',
        paddingTop: '80px',
        paddingBottom: '80px'
      }}
    >
      <div className="card-content">
        <div className="columns is-multiline">
          <div className="column is-12 has-text-centered">
            <span className="title is-4">
              <Trans>registrationFormSuccessMsg</Trans>
            </span>
          </div>
          <div className="column is-12 has-text-centered">
            <i className="fas fa-check-circle fa-4x success-icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingForm() {
  return (
    <div className="container has-text-centered">
      <div className="card" style={{ maxWidth: '380px', margin: 'auto' }}>
        <div className="card-content">
          <div className="columns is-multiline">
            <div className="column is-12">
              <label className="label">
                <Trans>name</Trans>
              </label>
              <Shimmer>
                <div
                  style={{
                    height: '13px',
                    marginTop: '13px',
                    width: '250px'
                  }}
                ></div>
              </Shimmer>
            </div>

            <div className="column is-12">
              <label className="label">
                <Trans>email</Trans>
              </label>

              <Shimmer>
                <div
                  style={{
                    height: '13px',
                    marginTop: '13px',
                    width: '250px'
                  }}
                ></div>
              </Shimmer>
            </div>

            <div className="column is-12">
              <label className="label">
                <Trans>shirtName</Trans>
              </label>

              <Shimmer>
                <div
                  style={{
                    height: '13px',
                    marginTop: '13px',
                    width: '250px'
                  }}
                ></div>
              </Shimmer>
            </div>

            <div className="column is-12">
              <label className="label">
                <Trans>shirtNumber</Trans>
              </label>

              <Shimmer>
                <div
                  style={{
                    height: '13px',
                    marginTop: '13px',
                    width: '250px'
                  }}
                ></div>
              </Shimmer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface TeamRosterInviteResponseFormProps
  extends FormRenderProps<RegistrationResponseEntity> {
  registration: RegistrationEntity;
}

function TeamRosterInviteResponseForm({
  handleSubmit,
  submitting,
  pristine,
  form: { reset },
  valid,
  registration
}: TeamRosterInviteResponseFormProps) {
  return (
    <div className="container has-text-centered">
      <div className="card" style={{ maxWidth: '380px', margin: 'auto' }}>
        <div className="card-content">
          <form className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">
                <Trans>name</Trans>
              </label>

              <div className="control">
                <Field
                  name="response.name"
                  className="has-text-centered"
                  component={StringInput}
                  validate={composeValidators([required])}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">
                <Trans>email</Trans>
              </label>

              <div className="control">
                <Field
                  name="response.email"
                  className="has-text-centered"
                  component={StringInput}
                  validate={composeValidators([required, mustBeEmail])}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">
                <Trans>shirtName</Trans>
              </label>

              <div className="control">
                <Field
                  name="response.shirt_name"
                  className="has-text-centered"
                  component={StringInput}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">
                <Trans>shirtNumber</Trans>
              </label>

              <div className="control">
                <Field
                  name="response.shirt_number"
                  className="has-text-centered"
                  component={StringInput}
                />
              </div>
            </div>

            {registration.customFields.map((field, index) => (
              <CustomField key={index} field={field} />
            ))}

            <LoadingButton
              isLoading={submitting}
              className="button is-primary is-fullwidth"
              type="submit"
              style={{ marginBottom: '1rem', marginTop: '2rem' }}
              disabled={submitting || pristine || !valid}
            >
              <Trans>send</Trans>
            </LoadingButton>

            <button
              className="button is-outlined is-fullwidth"
              style={{ marginTop: '1rem' }}
              onClick={() => reset()}
            >
              <Trans>clean</Trans>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TeamRosterInviteResponseForm;
