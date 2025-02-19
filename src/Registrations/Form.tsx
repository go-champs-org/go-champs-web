import React from 'react';
import { Field, FormRenderProps, FieldRenderProps } from 'react-final-form';
import StringInput from '../Shared/UI/Form/StringInput';
import { Link } from 'react-router-dom';
import LoadingButton from '../Shared/UI/LoadingButton';
import { Trans, useTranslation } from 'react-i18next';
import { RegistrationEntity } from './state';
import Shimmer from '../Shared/UI/Shimmer';
import Datetime from '../Shared/UI/Form/Datetime';
import CheckboxInput from '../Shared/UI/Form/CheckboxInput';
// import CollapsibleCard from '../Shared/UI/CollapsibleCard';

export function FormLoading(): React.ReactElement {
  return (
    <div className="columns is-multiline">
      <div className="column is-12">
        <label className="label">
          <Trans>title</Trans>
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
          <Trans>type</Trans>
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
          <Trans>startDate</Trans>
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
          <Trans>endDate</Trans>
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

interface FromProps extends FormRenderProps<RegistrationEntity> {
  backUrl: string;
  isLoading: boolean;
}

function Form({
  backUrl,
  isLoading,
  handleSubmit,
  submitting,
  pristine
}: FromProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label className="label">
            <Trans>title</Trans>
          </label>

          <div className="control">
            <Field name="title" component={StringInput} />
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>startDate</Trans>
          </label>

          <div className="control">
            <Field name="startDate" component={Datetime} type="text" />
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>endDate</Trans>
          </label>

          <div className="control">
            <Field name="endDate" component={Datetime} type="text" />
          </div>
        </div>

        <div className="field">
          <div className="control" style={{ paddingTop: '.5rem' }}>
            <Field
              name="autoApprove"
              type="checkbox"
              render={(props: FieldRenderProps<string, HTMLInputElement>) => (
                <CheckboxInput {...props} id="autoApprove" />
              )}
            />

            <label className="label" htmlFor="autoApprove">
              <Trans>autoApprove</Trans>
            </label>
          </div>
        </div>

        <div className="field">
          {/* <CollapsibleCard titleElement={t('socialNetworks')}>
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
                                {`https://www.facebook.com/${values.facebook ? values.facebook : ''
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
                                {`https://www.instagram.com/${values.instagram ? values.instagram : ''
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
                                {`https://www.twitter.com/${values.twitter ? values.twitter : ''
                                    }`}
                            </p>
                        </div>
                    </CollapsibleCard> */}
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
}

export default Form;
