import React from 'react';
import { Field, FormRenderProps, FieldRenderProps } from 'react-final-form';
import Datetime from '../Shared/UI/Form/Datetime';
import SelectInput, { SelectOptionType } from '../Shared/UI/Form/Select';
import StringInput from '../Shared/UI/Form/StringInput';
import { GameEntity } from './state';
import { Link } from 'react-router-dom';

interface FromProps extends FormRenderProps<GameEntity> {
  backUrl: string;
  selectInputTeams: SelectOptionType[];
}

const Form: React.FC<FromProps> = ({
  backUrl,
  handleSubmit,
  submitting,
  pristine,
  selectInputTeams
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
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
          <label className="label">Information</label>
          <div className="control">
            <Field
              name="info"
              component={StringInput}
              type="text"
              placeholder="Some information"
            />
          </div>
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
