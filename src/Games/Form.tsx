import React, { useState } from 'react';
import { Field, FormRenderProps, FieldRenderProps } from 'react-final-form';
import Datetime from '../Shared/UI/Form/Datetime';
import SelectInput, { SelectOptionType } from '../Shared/UI/Form/Select';
import StringInput from '../Shared/UI/Form/StringInput';
import {
  DEFAULT_GAME_ASSET,
  GAME_LIVE_STATE,
  GameAsset,
  GameEntity
} from './state';
import { Link } from 'react-router-dom';
import LoadingButton from '../Shared/UI/LoadingButton';
import { Trans, useTranslation } from 'react-i18next';
import CheckboxInput from '../Shared/UI/Form/CheckboxInput';
import YouTubeInput, {
  validateYouTubeInput
} from '../Shared/UI/Form/YouTubeInput';
import {
  TranslateSelectOptionType,
  useTranslatedSelectOptions
} from '../Shared/hooks/useTranslatedSelectOptions';
import CollapsibleCard from '../Shared/UI/CollapsibleCard';
import { FieldArray } from 'react-final-form-arrays';
import DoubleClickButton from '../Shared/UI/DoubleClickButton';
import './Form.scss';

function GameAssetForm({
  name,
  currentValue,
  gameAssetTypeOptions,
  onRemove
}: {
  name: string;
  currentValue: GameAsset;
  gameAssetTypeOptions: SelectOptionType[];
  onRemove: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="game-asset-form field is-horizontal">
      <label className="label">{t('asset')}</label>
      <div className="field-body">
        <div className="field">
          <div className="control">
            <Field
              name={`${name}.type`}
              render={(props: FieldRenderProps<string, HTMLSelectElement>) => (
                <SelectInput
                  {...props}
                  options={gameAssetTypeOptions}
                  isClearable={false}
                />
              )}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <Field
              name={`${name}.url`}
              component={StringInput}
              type="text"
              placeholder="https://example.com/asset"
            />
          </div>
        </div>

        {currentValue.url && (
          <a
            className="button"
            href={currentValue.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="icon">
              <i className="fas fa-external-link-alt"></i>
            </span>
            <span>
              <Trans>open</Trans>
            </span>
          </a>
        )}

        <DoubleClickButton className="button is-danger" onClick={onRemove}>
          <i className="fas fa-trash" />
        </DoubleClickButton>
      </div>
    </div>
  );
}

interface FromProps extends FormRenderProps<GameEntity> {
  backUrl: string;
  isLoading: boolean;
  selectInputTeams: SelectOptionType[];
  resultTypeOptions: TranslateSelectOptionType[];
  liveStateOptions: TranslateSelectOptionType[];
  gameAssetTypeOptions: TranslateSelectOptionType[];
  push: (fieldName: string, gameAsset: GameAsset) => {};
}

const Form: React.FC<FromProps> = ({
  backUrl,
  isLoading,
  handleSubmit,
  submitting,
  pristine,
  selectInputTeams,
  resultTypeOptions,
  liveStateOptions,
  gameAssetTypeOptions,
  values,
  push
}) => {
  const { t } = useTranslation();
  const [state, setState] = useState({
    useAwayPlaceholder: false,
    useHomePlaceholder: false
  });
  const translatedResultTypeOptions = useTranslatedSelectOptions(
    resultTypeOptions
  );
  const translatedLiveStateOptions = useTranslatedSelectOptions(
    liveStateOptions
  );
  const translatedGameAssetTypeOptions = useTranslatedSelectOptions(
    gameAssetTypeOptions
  );

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
                        isDisabled={
                          values.liveState === GAME_LIVE_STATE.IN_PROGRESS
                        }
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
                        isDisabled={
                          values.liveState === GAME_LIVE_STATE.IN_PROGRESS
                        }
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
            <Trans>liveState</Trans>
          </label>

          <div className="control">
            <Field
              name="liveState"
              render={(props: FieldRenderProps<string, HTMLSelectElement>) => (
                <SelectInput
                  {...props}
                  options={translatedLiveStateOptions}
                  isClearable={false}
                />
              )}
            />
          </div>
        </div>

        {values.liveState !== GAME_LIVE_STATE.NOT_STARTED && (
          <>
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
                <Trans>homeScore</Trans>
              </label>

              <div className="control">
                <Field name="homeScore" component={StringInput} type="number" />
              </div>
            </div>
          </>
        )}

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
          <label className="label">
            <Trans>resultType</Trans>
          </label>

          <div className="control">
            <Field
              name="resultType"
              render={(props: FieldRenderProps<string, HTMLSelectElement>) => (
                <SelectInput
                  {...props}
                  options={translatedResultTypeOptions}
                  isClearable={false}
                />
              )}
            />
          </div>
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
            <Trans>youTubeCode</Trans>
          </label>

          <div className="control">
            <Field
              name="youTubeCode"
              component={YouTubeInput}
              type="text"
              placeholder="B28HavKyGIE"
              validate={validateYouTubeInput}
            />
          </div>
        </div>

        <CollapsibleCard titleElement={t('assets')}>
          <FieldArray name="assets">
            {({ fields }) =>
              fields.map((name, index) => (
                <GameAssetForm
                  key={name}
                  name={name}
                  gameAssetTypeOptions={translatedGameAssetTypeOptions}
                  currentValue={fields.value[index]}
                  onRemove={() => fields.remove(index)}
                />
              ))
            }
          </FieldArray>

          <button
            className="button is-fullwidth is-medium"
            type="button"
            onClick={() => push('assets', DEFAULT_GAME_ASSET)}
            style={{ marginBottom: '1rem' }}
          >
            <Trans>addAsset</Trans>
          </button>
        </CollapsibleCard>

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
