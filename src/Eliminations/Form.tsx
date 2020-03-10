import React, { useState } from 'react';
import { FormRenderProps, Field, FieldRenderProps } from 'react-final-form';
import {
  EliminationEntity,
  DEFAULT_ELIMINATION_TEAM_STAT,
  EliminationTeamStatEntity
} from './state';
import StringInput from '../Shared/UI/Form/StringInput';
import { FieldArray } from 'react-final-form-arrays';
import SelectInput, { SelectOptionType } from '../Shared/UI/Form/Select';
import { StatEntity } from '../Phases/state';
import { Link } from 'react-router-dom';

interface TeamStatFormProps {
  currentTeamStatValue: EliminationTeamStatEntity;
  name: string;
  onMoveDown: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMoveUp: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onRemove: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  selectInputTeams: SelectOptionType[];
  stats: StatEntity[];
}

const TeamStatForm: React.FC<TeamStatFormProps> = ({
  currentTeamStatValue,
  name,
  onMoveDown,
  onMoveUp,
  onRemove,
  selectInputTeams,
  stats
}) => {
  const [state, setState] = useState({
    usePlaceholder: !!currentTeamStatValue.placeholder
  });

  const toggleUsePlaceholder = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setState({
      usePlaceholder: !state.usePlaceholder
    });
  };

  return (
    <tr>
      <td style={{ paddingLeft: '0', width: '225px' }}>
        {state.usePlaceholder ? (
          <Field
            name={`${name}.placeholder`}
            component={StringInput}
            type="text"
          />
        ) : (
          <Field
            name={`${name}.teamId`}
            render={(props: FieldRenderProps<string, HTMLSelectElement>) => (
              <SelectInput {...props} options={selectInputTeams} />
            )}
          />
        )}
      </td>

      {stats.map((stat: StatEntity) => (
        <td key={stat.id} className="has-text-centered">
          <Field
            name={`${name}.stats.${stat.id}`}
            component={StringInput}
            type="text"
          />
        </td>
      ))}

      <td className="has-text-right">
        <button className="button is-text" onClick={onMoveUp}>
          <i className="fas fa-sort-up" />
        </button>
        <button className="button is-text" onClick={toggleUsePlaceholder}>
          <i className="fas fa-history" />
        </button>
        <button className="button is-text" onClick={onRemove}>
          <i className="fas fa-trash" />
        </button>
        <button className="button is-text" onClick={onMoveDown}>
          <i className="fas fa-sort-down" />
        </button>
      </td>
    </tr>
  );
};

interface FormProps extends FormRenderProps<EliminationEntity> {
  backUrl: string;
  push: (fieldName: string, draw: EliminationTeamStatEntity) => {};
  stats: StatEntity[];
  selectInputTeams: SelectOptionType[];
}

const StatHeader: React.FC<{
  stat: StatEntity;
}> = ({ stat }) => <th className="has-text-centered">{stat.title}</th>;

interface FieldArrayActions {
  value: any[];
  remove: (index: number) => void;
  swap: (indexA: number, indexB: number) => void;
}

const onRemoveTeamStat = (items: FieldArrayActions, index: number) => (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  event.preventDefault();
  return items.remove(index);
};

const onMoveUpTeamStat = (items: FieldArrayActions, index: number) => (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  event.preventDefault();
  if (index === 0) {
    return;
  }
  return items.swap(index, index - 1);
};

const onMoveDownTeamStat = (items: FieldArrayActions, index: number) => (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  event.preventDefault();
  if (index === items.value.length - 1) {
    return;
  }
  return items.swap(index, index + 1);
};

const Form: React.FC<FormProps> = ({
  backUrl,
  handleSubmit,
  submitting,
  push,
  pristine,
  selectInputTeams,
  stats
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
          <label className="label">Info</label>

          <div className="control">
            <Field name="info" component={StringInput} type="text" />
          </div>
        </div>

        <div className="field">
          <label className="label">Order</label>

          <div className="control">
            <Field name="order" component={StringInput} type="number" />
          </div>
        </div>

        <FieldArray name="teamStats">
          {({ fields }) => (
            <div className="table-container">
              <table className="table is-fullwidth is-striped is-hoverable">
                <thead>
                  <tr>
                    <th style={{ paddingLeft: '0', width: '225px' }}>Team</th>
                    {stats.map((stat: StatEntity) => (
                      <StatHeader key={stat.id} stat={stat} />
                    ))}
                    <th className="has-text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {fields.map((name, index) => (
                    <TeamStatForm
                      key={name}
                      name={name}
                      currentTeamStatValue={fields.value[index]}
                      onMoveDown={onMoveDownTeamStat(fields, index)}
                      onMoveUp={onMoveUpTeamStat(fields, index)}
                      onRemove={onRemoveTeamStat(fields, index)}
                      selectInputTeams={selectInputTeams}
                      stats={stats}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </FieldArray>

        <button
          className="button is-fullwidth"
          type="button"
          onClick={() => push('teamStats', DEFAULT_ELIMINATION_TEAM_STAT)}
        >
          Add team stats
        </button>

        <button
          className="button is-primary"
          type="submit"
          disabled={submitting || pristine}
        >
          Save
        </button>
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
