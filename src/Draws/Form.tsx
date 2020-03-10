import React from 'react';
import { FormRenderProps, Field, FieldRenderProps } from 'react-final-form';
import { DrawEntity, DEFAULT_DRAW_MATCH, DrawMatchEntity } from './state';
import StringInput from '../Shared/UI/Form/StringInput';
import { FieldArray } from 'react-final-form-arrays';
import SelectInput, { SelectOptionType } from '../Shared/UI/Form/Select';

interface MatchFormProps {
  name: string;
  onRemove: () => {};
  selectInputTeams: SelectOptionType[];
}

const MatchForm: React.FC<MatchFormProps> = ({
  name,
  onRemove,
  selectInputTeams
}) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="field">
          <label className="label">First team</label>

          <div className="control">
            <Field
              name={`${name}.firstTeamId`}
              render={(props: FieldRenderProps<string, HTMLSelectElement>) => (
                <SelectInput {...props} options={selectInputTeams} />
              )}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">First parent match id</label>

          <div className="control">
            <Field
              name={`${name}.firstTeamParentMatchId`}
              component={StringInput}
              type="text"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">First placeholder</label>

          <div className="control">
            <Field
              name={`${name}.firstTeamPlaceholder`}
              component={StringInput}
              type="text"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">First team score</label>
          <div className="control">
            <Field
              name={`${name}.firstTeamScore`}
              component={StringInput}
              type="number"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Informations</label>

          <div className="control">
            <Field name={`${name}.info`} component={StringInput} type="text" />
          </div>
        </div>

        <div className="field">
          <label className="label">Name</label>

          <div className="control">
            <Field name={`${name}.name`} component={StringInput} type="text" />
          </div>
        </div>

        <div className="field">
          <label className="label">Second team</label>

          <div className="control">
            <Field
              name={`${name}.secondTeamId`}
              render={(props: FieldRenderProps<string, HTMLSelectElement>) => (
                <SelectInput {...props} options={selectInputTeams} />
              )}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Second parent match id</label>

          <div className="control">
            <Field
              name={`${name}.secondTeamParentMatchId`}
              component={StringInput}
              type="text"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Second placeholder</label>

          <div className="control">
            <Field
              name={`${name}.secondTeamPlaceholder`}
              component={StringInput}
              type="text"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Second team score</label>
          <div className="control">
            <Field
              name={`${name}.secondTeamScore`}
              component={StringInput}
              type="number"
            />
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

interface FormProps extends FormRenderProps<DrawEntity> {
  push: (fieldName: string, draw: DrawMatchEntity) => {};
  selectInputTeams: SelectOptionType[];
}

const Form: React.FC<FormProps> = ({
  handleSubmit,
  submitting,
  push,
  pristine,
  selectInputTeams
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label className="label">Title</label>

          <div className="control">
            <Field name="title" component={StringInput} type="text" />
          </div>
        </div>

        <FieldArray name="matches">
          {({ fields }) =>
            fields.map((name, index) => (
              <MatchForm
                key={name}
                name={name}
                onRemove={() => fields.remove(index)}
                selectInputTeams={selectInputTeams}
              />
            ))
          }
        </FieldArray>

        <button
          className="button is-fullwidth"
          type="button"
          onClick={() => push('matches', DEFAULT_DRAW_MATCH)}
        >
          Add match
        </button>

        <button
          className="button is-primary"
          type="submit"
          disabled={submitting || pristine}
        >
          Save
        </button>
      </form>

      <button className="button is-small is-info is-outlined">
        <span className="icon">
          <i className="fas fa-caret-left"></i>
        </span>

        <span>Back</span>
      </button>
    </div>
  );
};

export default Form;
