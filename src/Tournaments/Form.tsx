import React from 'react';
import { Field, FieldRenderProps, FormRenderProps } from 'react-final-form';
import {
  TournamentEntity,
  PlayerStatEntity,
  DEFAULT_PLAYER_STAT
} from './state';
import StringInput from '../Shared/UI/Form/StringInput';
import Shimmer from '../Shared/UI/Shimmer';
import { Link } from 'react-router-dom';
import LoadingButton from '../Shared/UI/LoadingButton';
import {
  required,
  composeValidators,
  mustBeSlug
} from '../Shared/UI/Form/Validators/commonValidators';
import { Trans, useTranslation } from 'react-i18next';
import CollapsibleCard from '../Shared/UI/CollapsibleCard';
import { FieldArray } from 'react-final-form-arrays';
import DoubleClickButton from '../Shared/UI/DoubleClickButton';
import SelectInput, { SelectOptionType } from '../Shared/UI/Form/Select';
import BehindFeatureFlag from '../Shared/UI/BehindFeatureFlag';
import Autocomplete from '../Shared/UI/Form/Autocomplete';

interface TeamStatFormProps {
  name: string;
  onRemove: () => {};
  selectInputPlayerStats: SelectOptionType[];
}

const TeamStatForm: React.FC<TeamStatFormProps> = ({
  name,
  onRemove,
  selectInputPlayerStats
}) => {
  return (
    <tr>
      <td
        style={{
          paddingLeft: '0'
        }}
      >
        <Field
          name={`${name}.title`}
          component={StringInput}
          type="text"
          validate={required}
        />
      </td>

      <td>
        <Field
          name={`${name}.source`}
          render={(props: FieldRenderProps<string, HTMLSelectElement>) => (
            <SelectInput
              {...props}
              options={selectInputPlayerStats}
              isClearable
            />
          )}
        ></Field>
      </td>

      <td
        style={{
          textAlign: 'center',
          verticalAlign: 'middle'
        }}
      >
        <DoubleClickButton className="button" onClick={onRemove}>
          <i className="fas fa-trash" />
        </DoubleClickButton>
      </td>
    </tr>
  );
};

interface PlayerStatFormProps {
  name: string;
  onRemove: () => {};
}

const PlayerStatForm: React.FC<PlayerStatFormProps> = ({ name, onRemove }) => {
  return (
    <tr>
      <td
        style={{
          paddingLeft: '0'
        }}
      >
        <Field
          name={`${name}.title`}
          component={StringInput}
          type="text"
          validate={required}
        />
      </td>

      <td
        style={{
          textAlign: 'center',
          verticalAlign: 'middle'
        }}
      >
        <DoubleClickButton className="button" onClick={onRemove}>
          <i className="fas fa-trash" />
        </DoubleClickButton>
      </td>
    </tr>
  );
};

export const FormLoading: React.FC = () => (
  <div className="columns is-multiline">
    <div className="column is-12">
      <label className="label">
        <Trans>name</Trans>
      </label>
      <Shimmer>
        <div
          style={{
            height: '13px',
            marginTop: '13px',
            width: '250px'
          }}
        ></div>
      </Shimmer>
    </div>

    <div className="column is-12">
      <label className="label">Slug</label>

      <Shimmer>
        <div
          style={{
            height: '13px',
            marginTop: '13px',
            width: '250px'
          }}
        ></div>
      </Shimmer>
    </div>
  </div>
);

interface FormProps extends FormRenderProps<TournamentEntity> {
  backUrl: string;
  isLoading: boolean;
  organizationSlug: string;
  push: (fieldName: string, stat: PlayerStatEntity) => {};
  selectInputPlayerStats: SelectOptionType[];
}

const Form: React.FC<FormProps> = ({
  backUrl,
  isLoading,
  handleSubmit,
  submitting,
  pristine,
  values,
  organizationSlug,
  selectInputPlayerStats,
  valid,
  push
}) => {
  const { t } = useTranslation();
  const sports = [
    { text: 'Basketball 5x5', value: 'b5-slug' },
    { text: 'Basketball 3x3', value: 'b3-slug' }
  ];
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label className="label">
            <Trans>name</Trans>
          </label>

          <div className="control">
            <Field
              name="name"
              component={StringInput}
              type="text"
              placeholder="Name"
              validate={required}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Slug</label>

          <div className="control">
            <Field
              name="slug"
              component={StringInput}
              type="text"
              placeholder="slug"
              validate={composeValidators([required, mustBeSlug])}
            />
          </div>

          <p className="help is-info">
            {`${document.location.origin}/${organizationSlug}/${
              values.slug ? values.slug : ''
            }`}
          </p>
        </div>

        <div className="field">
          <label className="label">
            <Trans>sport</Trans>
          </label>

          <div className="control">
            <Field
              name="sport"
              id="sport"
              render={(props: FieldRenderProps<string, HTMLInputElement>) => (
                <Autocomplete {...props} id="sport" options={sports} />
              )}
              placeholder="Sport"
              validate={required}
            />
          </div>
        </div>

        <div className="field">
          <CollapsibleCard titleElement={t('socialNetworks')}>
            <div className="field">
              <label className="label">Facebook</label>
              <div className="control">
                <Field
                  name="facebook"
                  component={StringInput}
                  type="text"
                  placeholder="www.facebook.com/your-tournament"
                />
              </div>

              <p className="help is-info">
                {`https://www.facebook.com/${
                  values.facebook ? values.facebook : ''
                }`}
              </p>
            </div>

            <div className="field">
              <label className="label">Instagram</label>
              <div className="control">
                <Field
                  name="instagram"
                  component={StringInput}
                  type="text"
                  placeholder="www.instagram.com/your-tournament"
                />
              </div>

              <p className="help is-info">
                {`https://www.instagram.com/${
                  values.instagram ? values.instagram : ''
                }`}
              </p>
            </div>

            <div className="field">
              <label className="label">Twitter</label>
              <div className="control">
                <Field
                  name="twitter"
                  component={StringInput}
                  type="text"
                  placeholder="www.twitter.com/your-tournament"
                />
              </div>

              <p className="help is-info">
                {`https://www.twitter.com/${
                  values.twitter ? values.twitter : ''
                }`}
              </p>
            </div>

            <div className="field">
              <label className="label">Site</label>
              <div className="control">
                <Field
                  name="siteUrl"
                  component={StringInput}
                  type="text"
                  placeholder="www.your-site.com"
                />
              </div>
            </div>
          </CollapsibleCard>

          <CollapsibleCard titleElement={t('playerStats')}>
            <div className="field">
              <table className="table is-fullwidth is-striped is-hoverable">
                <thead>
                  <tr>
                    <th
                      style={{
                        paddingLeft: '0'
                      }}
                    >
                      <Trans>name</Trans>
                    </th>

                    <th
                      style={{
                        textAlign: 'center',
                        width: '80px'
                      }}
                    >
                      <Trans>actions</Trans>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <FieldArray name="playerStats">
                    {({ fields }) =>
                      fields.map((name, index) => (
                        <PlayerStatForm
                          key={name}
                          name={name}
                          onRemove={() => fields.remove(index)}
                        />
                      ))
                    }
                  </FieldArray>
                </tbody>
              </table>

              <button
                className="button is-fullwidth  is-medium"
                type="button"
                onClick={() => push('playerStats', DEFAULT_PLAYER_STAT)}
              >
                <Trans>addPlayerStat</Trans>
              </button>
            </div>
          </CollapsibleCard>

          <BehindFeatureFlag>
            <CollapsibleCard titleElement={t('teamStats')}>
              <div className="field">
                <table className="table is-fullwidth is-striped is-hoverable">
                  <thead>
                    <tr>
                      <th
                        style={{
                          paddingLeft: '0'
                        }}
                      >
                        <Trans>name</Trans>
                      </th>

                      <th
                        style={{
                          paddingLeft: '0'
                        }}
                      >
                        <Trans>source</Trans>
                      </th>

                      <th
                        style={{
                          textAlign: 'center',
                          width: '80px'
                        }}
                      >
                        <Trans>actions</Trans>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <FieldArray name="teamStats">
                      {({ fields }) =>
                        fields.map((name, index) => (
                          <TeamStatForm
                            key={name}
                            name={name}
                            onRemove={() => fields.remove(index)}
                            selectInputPlayerStats={selectInputPlayerStats}
                          />
                        ))
                      }
                    </FieldArray>
                  </tbody>
                </table>

                <button
                  className="button is-fullwidth  is-medium"
                  type="button"
                  onClick={() => push('teamStats', DEFAULT_PLAYER_STAT)}
                >
                  <Trans>addTeamStat</Trans>
                </button>
              </div>
            </CollapsibleCard>
          </BehindFeatureFlag>
        </div>

        <LoadingButton
          isLoading={isLoading}
          className="button is-primary"
          type="submit"
          disabled={submitting || pristine || !valid}
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
