import React from 'react';
import { Field, FormRenderProps, FieldRenderProps } from 'react-final-form';
import SelectInput, { SelectOptionType } from '../Shared/UI/Form/Select';
import StringInput from '../Shared/UI/Form/StringInput';
import { Link } from 'react-router-dom';
import LoadingButton from '../Shared/UI/LoadingButton';
import { Trans, useTranslation } from 'react-i18next';
import { PlayerEntity } from './state';
import Shimmer from '../Shared/UI/Shimmer';
import CollapsibleCard from '../Shared/UI/CollapsibleCard';
import BehindFeatureFlag from '../Shared/UI/BehindFeatureFlag';

export function FormLoading(): React.ReactElement {
  return (
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
        <label className="label">
          <Trans>shirtName</Trans>
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
        <label className="label">
          <Trans>shirtNumber</Trans>
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
        <label className="label">
          <Trans>team</Trans>
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
        <label className="label">
          <Trans>facebook</Trans>
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
    </div>
  );
}

interface FromProps extends FormRenderProps<PlayerEntity> {
  backUrl: string;
  isLoading: boolean;
  selectInputTeams: SelectOptionType[];
}

function Form({
  backUrl,
  isLoading,
  handleSubmit,
  submitting,
  pristine,
  selectInputTeams,
  values
}: FromProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label className="label">
            <Trans>fullName</Trans>
          </label>

          <div className="control">
            <Field name="name" component={StringInput} />
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>shirtName</Trans>
          </label>

          <div className="control">
            <Field name="shirtName" component={StringInput} />
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>shirtNumber</Trans>
          </label>

          <div className="control">
            <Field name="shirtNumber" component={StringInput} />
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>team</Trans>
          </label>

          <div className="control">
            <Field
              name="team.id"
              render={(props: FieldRenderProps<string, HTMLSelectElement>) => (
                <SelectInput
                  {...props}
                  isClearable
                  options={selectInputTeams}
                />
              )}
            ></Field>
          </div>
        </div>

        <div className="field">
          <label className="label">Username</label>

          <div className="control">
            <Field name="username" component={StringInput} type="text" />
          </div>

          <p className="help is-info">Go Champs Username</p>
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
          </CollapsibleCard>
        </div>

        <BehindFeatureFlag>
          {values.registrationResponse && (
            <div className="field">
              <CollapsibleCard titleElement={t('registratioResponse')}>
                Registration response
              </CollapsibleCard>
            </div>
          )}
        </BehindFeatureFlag>

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
}

export default Form;
