import React from 'react';
import { ScoreboardSettingEntity } from './state';
import { Field, FormRenderProps } from 'react-final-form';
import { Trans } from 'react-i18next';
import LoadingButton from '../Shared/UI/LoadingButton';
import { Link } from 'react-router-dom';
import StringInput from '../Shared/UI/Form/StringInput';

interface FromProps extends FormRenderProps<ScoreboardSettingEntity> {
  backUrl: string;
  isLoading: boolean;
}

function Form({
  backUrl,
  isLoading,
  handleSubmit,
  submitting,
  pristine,
  values
}: FromProps) {
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label className="label">
            <Trans>view</Trans>
          </label>

          <div className="control">
            <Field name="view" component={StringInput} />
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>initialPeriodTime</Trans>
          </label>

          <div className="control">
            <Field
              name="initialPeriodTime"
              component={StringInput}
              type="number"
            />
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
}

export default Form;
