import React, { Fragment } from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import Select from '../Shared/UI/Form/Select';
import StringInput from '../Shared/UI/Form/StringInput';
import {
  PhaseTypes,
  PhaseEntity,
  DEFAULT_ELIMINATION_STAT,
  StatEntity
} from './state';
import { FieldArray } from 'react-final-form-arrays';

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

const PHASE_TYPE_LABELMAP = new Map([
  [PhaseTypes.draw, 'Draw'],
  [PhaseTypes.elimination, 'Standings']
]);

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
  const phaseTypeOptions = Array.from(PHASE_TYPE_LABELMAP.keys());
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
        <label className="label">Type</label>
        <div className="control">
          <Field
            name="type"
            component={Select}
            selectOptions={phaseTypeOptions}
            getOptionLabel={(option: PhaseTypes) => {
              return PHASE_TYPE_LABELMAP.get(option);
            }}
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
