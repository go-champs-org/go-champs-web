import React from 'react';
import { OrganizationSettingEntity } from './state';
import { FormRenderProps } from 'react-final-form';
import { Trans } from 'react-i18next';
import LoadingButton from '../Shared/UI/LoadingButton';
import { Link } from 'react-router-dom';
import NameFormatSettingsFields from '../Shared/UI/Form/NameFormatSettingsFields';

interface FromProps extends FormRenderProps<OrganizationSettingEntity> {
  backUrl: string;
  isLoading: boolean;
}

function Form({
  backUrl,
  isLoading,
  handleSubmit,
  submitting,
  pristine
}: FromProps) {
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <NameFormatSettingsFields />

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
