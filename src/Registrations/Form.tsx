import React from 'react';
import { Field, FormRenderProps, FieldRenderProps } from 'react-final-form';
import StringInput from '../Shared/UI/Form/StringInput';
import { Link } from 'react-router-dom';
import LoadingButton from '../Shared/UI/LoadingButton';
import { Trans, useTranslation } from 'react-i18next';
import {
  CUSTOM_FIELDS_TYPE_OPTIONS,
  CustomFieldEntity,
  DEFAULT_CUSTOM_FIELD,
  RegistrationEntity
} from './state';
import Shimmer from '../Shared/UI/Shimmer';
import Datetime from '../Shared/UI/Form/Datetime';
import CheckboxInput from '../Shared/UI/Form/CheckboxInput';
import CollapsibleCard from '../Shared/UI/CollapsibleCard';
import { FieldArray } from 'react-final-form-arrays';
import SelectInput from '../Shared/UI/Form/Select';
import DoubleClickButton from '../Shared/UI/DoubleClickButton';

export function FormLoading(): React.ReactElement {
  return (
    <div className="columns is-multiline">
      <div className="column is-12">
        <label className="label">
          <Trans>title</Trans>
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
          <Trans>type</Trans>
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
          <Trans>startDate</Trans>
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
          <Trans>endDate</Trans>
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
  );
}

interface CustomFieldFormProps {
  name: string;
  onRemove: () => {};
}

function CustomFieldForm({
  name,
  onRemove
}: CustomFieldFormProps): React.ReactElement {
  return (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div className="card-content">
        <div className="field">
          <label className="label">
            <Trans>type</Trans>
          </label>
          <div className="control">
            <Field
              name={`${name}.type`}
              render={(props: FieldRenderProps<string, HTMLSelectElement>) => (
                <SelectInput
                  {...props}
                  isClearable
                  options={CUSTOM_FIELDS_TYPE_OPTIONS}
                />
              )}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>name</Trans>
          </label>
          <div className="control">
            <Field
              name={`${name}.label`}
              component={StringInput}
              type="text"
              placeholder="Data de nascimento"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>description</Trans>
          </label>
          <div className="control">
            <Field
              name={`${name}.description`}
              component={StringInput}
              type="text"
              placeholder="Data de nascimento da pessoa atleta"
            />
          </div>
        </div>

        <div className="field has-text-right">
          <DoubleClickButton className="button is-danger" onClick={onRemove}>
            <Trans>remove</Trans>
          </DoubleClickButton>
        </div>
      </div>
    </div>
  );
}

interface FromProps extends FormRenderProps<RegistrationEntity> {
  backUrl: string;
  isLoading: boolean;
  push: (fieldName: string, customField: CustomFieldEntity) => {};
}

function Form({
  backUrl,
  isLoading,
  handleSubmit,
  submitting,
  pristine,
  push
}: FromProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label className="label">
            <Trans>title</Trans>
          </label>

          <div className="control">
            <Field name="title" component={StringInput} />
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>startDate</Trans>
          </label>

          <div className="control">
            <Field name="startDate" component={Datetime} type="text" />
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>endDate</Trans>
          </label>

          <div className="control">
            <Field name="endDate" component={Datetime} type="text" />
          </div>
        </div>

        <div className="field">
          <div className="control" style={{ paddingTop: '.5rem' }}>
            <Field
              name="autoApprove"
              type="checkbox"
              render={(props: FieldRenderProps<string, HTMLInputElement>) => (
                <CheckboxInput {...props} id="autoApprove" />
              )}
            />

            <label className="label" htmlFor="autoApprove">
              <Trans>autoApprove</Trans>
            </label>
          </div>
        </div>

        <div className="field">
          <CollapsibleCard titleElement={t('customFields')}>
            <FieldArray name="customFields">
              {({ fields }) =>
                fields.map((name, index) => (
                  <CustomFieldForm
                    key={name}
                    name={name}
                    onRemove={() => fields.remove(index)}
                  />
                ))
              }
            </FieldArray>

            <button
              className="button is-fullwidth  is-medium"
              type="button"
              onClick={() => push('customFields', DEFAULT_CUSTOM_FIELD)}
              style={{ marginBottom: '1rem' }}
            >
              <Trans>addCustomField</Trans>
            </button>
          </CollapsibleCard>
        </div>

        <LoadingButton
          isLoading={isLoading}
          className="button is-primary"
          type="submit"
          disabled={submitting || pristine}
        >
          <Trans>save</Trans>
        </LoadingButton>
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
