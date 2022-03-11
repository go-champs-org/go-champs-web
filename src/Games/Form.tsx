import React, { useState } from 'react';
import { Field, FormRenderProps, FieldRenderProps } from 'react-final-form';
import Datetime from '../Shared/UI/Form/Datetime';
import SelectInput, { SelectOptionType } from '../Shared/UI/Form/Select';
import StringInput from '../Shared/UI/Form/StringInput';
import { GameEntity } from './state';
import { Link } from 'react-router-dom';
import LoadingButton from '../Shared/UI/LoadingButton';
import { Trans } from 'react-i18next';
import CheckboxInput from '../Shared/UI/Form/CheckboxInput';

interface FromProps extends FormRenderProps<GameEntity> {
  backUrl: string;
  isLoading: boolean;
  selectInputTeams: SelectOptionType[];
}

const Form: React.FC<FromProps> = ({
  backUrl,
  isLoading,
  handleSubmit,
  submitting,
  pristine,
  selectInputTeams
}) => {
  const [state, setState] = useState({
    useAwayPlaceholder: false,
    useHomePlaceholder: false
  });

  const toggleAwayPlaceholder = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setState({
      ...state,
      useAwayPlaceholder: !state.useAwayPlaceholder
    });
  };

  const toggleHomePlaceholder = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setState({
      ...state,
      useHomePlaceholder: !state.useHomePlaceholder
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label className="label">
            <Trans>awayTeam</Trans> / <Trans>placeholder</Trans>
          </label>

          <div className="control">
            <div className="columns is-mobile is-vcentered">
              <div className="column">
                {state.useAwayPlaceholder ? (
                  <Field
                    name="awayPlaceholder"
                    component={StringInput}
                    type="text"
                    placeholder="Some information"
                  />
                ) : (
                  <Field
                    name="awayTeam.id"
                    render={(
                      props: FieldRenderProps<string, HTMLSelectElement>
                    ) => (
                      <SelectInput
                        {...props}
                        options={selectInputTeams}
                        isClearable
                      />
                    )}
                  ></Field>
                )}
              </div>

              <div className="column is-2 has-text-right">
                <button
                  className="button is-text has-tooltip-left"
                  data-tooltip="Use team / placeholder"
                  onClick={toggleAwayPlaceholder}
                >
                  <i className="fas fa-history" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>awayScore</Trans>
          </label>

          <div className="control">
            <Field name="awayScore" component={StringInput} type="number" />
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>homeTeam</Trans> / <Trans>placeholder</Trans>
          </label>

          <div className="control">
            <div className="columns is-mobile is-vcentered">
              <div className="column">
                {state.useHomePlaceholder ? (
                  <Field
                    name="homePlaceholder"
                    component={StringInput}
                    type="text"
                    placeholder="Some information"
                  />
                ) : (
                  <Field
                    name="homeTeam.id"
                    render={(
                      props: FieldRenderProps<string, HTMLSelectElement>
                    ) => (
                      <SelectInput
                        {...props}
                        options={selectInputTeams}
                        isClearable
                      />
                    )}
                  ></Field>
                )}
              </div>

              <div className="column is-2 has-text-right">
                <button
                  className="button is-text has-tooltip-left"
                  data-tooltip="Use team / placeholder"
                  onClick={toggleHomePlaceholder}
                >
                  <i className="fas fa-history" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>homeScore</Trans>
          </label>

          <div className="control">
            <Field name="homeScore" component={StringInput} type="number" />
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>dateTimeText</Trans>
          </label>

          <Field
            name="datetime"
            component={Datetime}
            type="text"
            placeholder="Date / time"
          />
        </div>

        <div className="field">
          <label className="label">
            <Trans>informations</Trans>
          </label>

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
          <label className="label">
            <Trans>location</Trans>
          </label>

          <div className="control">
            <Field
              name="location"
              component={StringInput}
              type="text"
              placeholder="Location"
            />
          </div>
        </div>

        <div className="field">
          <div className="control" style={{ paddingTop: '.5rem' }}>
            <Field
              name="isFinished"
              type="checkbox"
              render={(props: FieldRenderProps<string, HTMLInputElement>) => (
                <CheckboxInput {...props} id="isFinished" />
              )}
            />

            <label className="label" htmlFor="isFinished">
              <Trans>isGameFinished</Trans>
            </label>
          </div>
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
};

export default Form;
