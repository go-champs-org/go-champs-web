import React, { Fragment } from 'react';
import { Field, FormRenderProps, FieldRenderProps } from 'react-final-form';
import SelectInput from '../Shared/UI/Form/Select';
import StringInput from '../Shared/UI/Form/StringInput';
import {
  PhaseTypes,
  PhaseEntity,
  DEFAULT_ELIMINATION_STAT,
  StatEntity
} from './state';
import { FieldArray } from 'react-final-form-arrays';
import { PHASE_TYPES_OPTIONS } from './constans';

interface StatFormProps {
  name: string;
  onRemove: () => {};
}

const StatForm: React.FC<StatFormProps> = ({ name, onRemove }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="field">
          <label className="label">Name</label>

          <div className="control">
            <Field name={`${name}.title`} component={StringInput} type="text" />
          </div>
        </div>
      </div>

      <footer className="card-footer">
        <div className="card-footer-item">
          <button className="button is-warning" onClick={onRemove}>
            Remove
          </button>
        </div>
      </footer>
    </div>
  );
};

interface FormProps extends FormRenderProps<PhaseEntity> {
  push: (fieldName: string, stat: StatEntity) => {};
}

const Form: React.FC<FormProps> = ({
  handleSubmit,
  submitting,
  pristine,
  values,
  push
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <Field
            name="title"
            component={StringInput}
            type="text"
            placeholder="Title"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Is in progress</label>

        <div className="control">
          <Field name="isInProgress" component="input" type="checkbox" />
        </div>
      </div>

      <div className="field">
        <label className="label">Type</label>
        <div className="control">
          <Field
            name="type"
            render={(props: FieldRenderProps<string, HTMLSelectElement>) => (
              <SelectInput {...props} options={PHASE_TYPES_OPTIONS} />
            )}
          />
        </div>
      </div>

      {values.type === PhaseTypes.elimination && (
        <Fragment>
          <FieldArray name="eliminationStats">
            {({ fields }) =>
              fields.map((name, index) => (
                <StatForm
                  key={name}
                  name={name}
                  onRemove={() => fields.remove(index)}
                />
              ))
            }
          </FieldArray>

          <button
            className="button is-fullwidth"
            type="button"
            onClick={() => push('eliminationStats', DEFAULT_ELIMINATION_STAT)}
          >
            Add stat
          </button>
        </Fragment>
      )}

      <button
        className="button is-primary"
        type="submit"
        disabled={submitting || pristine}
      >
        Save
      </button>
    </form>
  );
};

export default Form;
