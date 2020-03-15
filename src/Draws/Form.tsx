import React from 'react';
import { FormRenderProps, Field, FieldRenderProps } from 'react-final-form';
import { DrawEntity, DEFAULT_DRAW_MATCH, DrawMatchEntity } from './state';
import StringInput from '../Shared/UI/Form/StringInput';
import { FieldArray } from 'react-final-form-arrays';
import SelectInput, { SelectOptionType } from '../Shared/UI/Form/Select';
import { Link } from 'react-router-dom';
import LoadingButton from '../Shared/UI/LoadingButton';
import CollapsibleCard from '../Shared/UI/CollapsibleCard';
import DoubleClickButton from '../Shared/UI/DoubleClickButton';

const MatchTitle: React.FC<{ match: DrawMatchEntity }> = ({ match }) => {
  if (match.name) {
    return <span>{match.name}</span>;
  } else if (match.firstTeamId && match.secondTeamId) {
    return <span>Teams</span>;
  } else if (match.firstTeamPlaceholder && match.firstTeamPlaceholder) {
    return (
      <span>{`${match.firstTeamPlaceholder} x ${match.secondTeamPlaceholder}`}</span>
    );
  }
  return <span>Match</span>;
};

interface MatchFormProps {
  currentMatchValue: DrawMatchEntity;
  name: string;
  onRemove: () => {};
  selectInputTeams: SelectOptionType[];
}

const MatchForm: React.FC<MatchFormProps> = ({
  currentMatchValue,
  name,
  onRemove,
  selectInputTeams
}) => {
  const DeleteButton = (
    <DoubleClickButton className="button is-text" onClick={onRemove}>
      <i className="fas fa-trash" />
    </DoubleClickButton>
  );

  return (
    <CollapsibleCard
      titleElement={<MatchTitle match={currentMatchValue} />}
      headerButtonsElement={DeleteButton}
    >
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
    </CollapsibleCard>
  );
};

interface FormProps extends FormRenderProps<DrawEntity> {
  backUrl: string;
  isLoading: boolean;
  push: (fieldName: string, draw: DrawMatchEntity) => {};
  selectInputTeams: SelectOptionType[];
}

const Form: React.FC<FormProps> = ({
  backUrl,
  isLoading,
  selectInputTeams,
  handleSubmit,
  submitting,
  push,
  pristine,
  values
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

        <div className="field">
          <label className="label">Matches</label>

          <FieldArray name="matches">
            {({ fields }) =>
              fields.map((name, index) => {
                return (
                  <MatchForm
                    key={name}
                    name={name}
                    currentMatchValue={values.matches[index]}
                    onRemove={() => fields.remove(index)}
                    selectInputTeams={selectInputTeams}
                  />
                );
              })
            }
          </FieldArray>

          <button
            className="button is-fullwidth is-medium"
            type="button"
            style={{ marginTop: '1.5rem' }}
            onClick={() => push('matches', DEFAULT_DRAW_MATCH)}
          >
            Add match
          </button>
        </div>

        <LoadingButton
          isLoading={isLoading}
          className="button is-primary"
          type="submit"
          disabled={submitting || pristine}
        >
          Save
        </LoadingButton>
      </form>

      <Link to={backUrl}>
        <button className="button is-small is-info is-outlined">
          <span className="icon">
            <i className="fas fa-caret-left"></i>
          </span>

          <span>Back</span>
        </button>
      </Link>
    </div>
  );
};

export default Form;
