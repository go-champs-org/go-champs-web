import React from 'react';
import { Field, FormRenderProps, FieldRenderProps } from 'react-final-form';
import Datetime from '../Shared/UI/Form/Datetime';
import SelectInput, { SelectOptionType } from '../Shared/UI/Form/Select';
import StringInput from '../Shared/UI/Form/StringInput';
import { GameEntity } from './state';

interface FromProps extends FormRenderProps<GameEntity> {
  selectInputTeams: SelectOptionType[];
}

const Form: React.FC<FromProps> = ({
  handleSubmit,
  submitting,
  pristine,
  selectInputTeams
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Away team</label>
        <div className="control">
          <Field
            name="awayTeam.id"
            render={(props: FieldRenderProps<string, HTMLSelectElement>) => (
              <SelectInput {...props} options={selectInputTeams} />
            )}
          ></Field>
        </div>
      </div>

      <div className="field">
        <label className="label">Away score</label>
        <div className="control">
          <Field name="awayScore" component={StringInput} type="number" />
        </div>
      </div>

      <div className="field">
        <label className="label">Home team</label>
        <div className="control">
          <Field
            name="homeTeam.id"
            render={(props: FieldRenderProps<string, HTMLSelectElement>) => (
              <SelectInput {...props} options={selectInputTeams} />
            )}
          ></Field>
        </div>
      </div>

      <div className="field">
        <label className="label">Home score</label>
        <div className="control">
          <Field name="homeScore" component={StringInput} type="number" />
        </div>
      </div>

      <div className="field">
        <label className="label">Date / Time</label>
        <Field
          name="datetime"
          component={Datetime}
          type="text"
          placeholder="Date / time"
        />
      </div>

      <div className="field">
        <label className="label">Location</label>
        <div className="control">
          <Field
            name="location"
            component={StringInput}
            type="text"
            placeholder="Location"
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
