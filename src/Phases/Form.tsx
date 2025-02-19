import React from 'react';
import { Field, FormRenderProps, FieldRenderProps } from 'react-final-form';
import SelectInput, { SelectOptionType } from '../Shared/UI/Form/Select';
import StringInput from '../Shared/UI/Form/StringInput';
import {
  PhaseTypes,
  PhaseEntity,
  DEFAULT_ELIMINATION_STAT,
  StatEntity
} from './state';
import { FieldArray } from 'react-final-form-arrays';
import { PHASE_TYPES_OPTIONS } from './constans';
import CheckboxInput from '../Shared/UI/Form/CheckboxInput';
import { Link } from 'react-router-dom';
import LoadingButton from '../Shared/UI/LoadingButton';
import DoubleClickButton from '../Shared/UI/DoubleClickButton';
import { required } from '../Shared/UI/Form/Validators/commonValidators';
import { Trans } from 'react-i18next';

interface StatFormProps {
  name: string;
  onRemove: () => {};
  teamStatOptions: SelectOptionType[];
}

const StatForm: React.FC<StatFormProps> = ({
  name,
  onRemove,
  teamStatOptions
}) => {
  return (
    <tr>
      <td
        style={{
          paddingLeft: '0'
        }}
      >
        <Field
          name={`${name}.title`}
          component={StringInput}
          type="text"
          validate={required}
        />
      </td>

      <td>
        <Field
          name={`${name}.teamStatSource`}
          render={(props: FieldRenderProps<string, HTMLSelectElement>) => (
            <SelectInput {...props} options={teamStatOptions} />
          )}
        />
      </td>

      <td>
        <Field
          name={`${name}.rankingOrder`}
          component={StringInput}
          type="number"
        />
      </td>

      <td
        style={{
          textAlign: 'center',
          verticalAlign: 'middle'
        }}
      >
        <DoubleClickButton className="button" onClick={onRemove}>
          <i className="fas fa-trash" />
        </DoubleClickButton>
      </td>
    </tr>
  );
};

interface FormProps extends FormRenderProps<PhaseEntity> {
  backUrl: string;
  isLoading: boolean;
  teamStatOptions: SelectOptionType[];
  push: (fieldName: string, stat: StatEntity) => {};
}

const Form: React.FC<FormProps> = ({
  backUrl,
  isLoading,
  handleSubmit,
  submitting,
  pristine,
  values,
  valid,
  push,
  teamStatOptions
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label className="label">
            <Trans>title</Trans>
          </label>

          <div className="control">
            <Field
              name="title"
              component={StringInput}
              type="text"
              placeholder="Title"
              validate={required}
            />
          </div>
        </div>

        <div className="field">
          <div className="control" style={{ paddingTop: '.5rem' }}>
            <Field
              name="isInProgress"
              type="checkbox"
              render={(props: FieldRenderProps<string, HTMLInputElement>) => (
                <CheckboxInput {...props} id="isIsProgress" />
              )}
            />

            <label className="label" htmlFor="isIsProgress">
              <Trans>isInProgress</Trans>
            </label>
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>type</Trans>
          </label>

          <div className="control">
            <Field
              name="type"
              render={(props: FieldRenderProps<string, HTMLSelectElement>) => (
                <SelectInput {...props} options={PHASE_TYPES_OPTIONS} />
              )}
              validate={required}
            />
          </div>
        </div>

        {values.type === PhaseTypes.elimination && (
          <div className="field">
            <label className="label">
              <Trans>groupStats</Trans>
            </label>

            <table className="table is-fullwidth is-striped is-hoverable">
              <thead>
                <tr>
                  <th
                    style={{
                      paddingLeft: '0'
                    }}
                  >
                    <Trans>name</Trans>
                  </th>
                  <th>
                    <Trans>teamStatSource</Trans>
                  </th>
                  <th>
                    <Trans>rankingOrder</Trans>
                  </th>
                  <th
                    style={{
                      textAlign: 'center',
                      width: '80px'
                    }}
                  >
                    <Trans>actions</Trans>
                  </th>
                </tr>
              </thead>

              <tbody>
                <FieldArray name="eliminationStats">
                  {({ fields }) =>
                    fields.map((name, index) => (
                      <StatForm
                        key={name}
                        name={name}
                        teamStatOptions={teamStatOptions}
                        onRemove={() => fields.remove(index)}
                      />
                    ))
                  }
                </FieldArray>
              </tbody>
            </table>

            <button
              className="button is-fullwidth  is-medium"
              type="button"
              onClick={() => push('eliminationStats', DEFAULT_ELIMINATION_STAT)}
            >
              <Trans>addGroupStat</Trans>
            </button>
          </div>
        )}

        <LoadingButton
          isLoading={isLoading}
          className="button is-primary"
          type="submit"
          disabled={submitting || pristine || !valid}
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
};

export default Form;
