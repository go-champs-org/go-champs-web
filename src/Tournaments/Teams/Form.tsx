import React from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import Select from '../../Shared/UI/Form/Select';
import StringInput from '../../Shared/UI/Form/StringInput';
import { TournamentGroupEntity } from '../Groups/state';

interface FromProps extends FormRenderProps {
  tournamentGroups: { [key: string]: TournamentGroupEntity };
}

const Form: React.FC<FromProps> = ({
  handleSubmit,
  submitting,
  pristine,
  tournamentGroups
}) => {
  const selectGroups = Object.keys(tournamentGroups).map(
    (key: string) => tournamentGroups[key]
  );
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <Field
            name="name"
            component={StringInput}
            type="text"
            placeholder="Name"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Group</label>
        <div className="control">
          <Field
            name="group"
            component={Select}
            selectOptions={selectGroups}
            getOptionLabel={(group: TournamentGroupEntity) => group.name}
          />
        </div>
      </div>

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
