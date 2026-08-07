import React from 'react';
import { TournamentSettingEntity } from './state';
import { FormRenderProps } from 'react-final-form';
import { Trans } from 'react-i18next';
import LoadingButton from '../Shared/UI/LoadingButton';
import { Link } from 'react-router-dom';
import NameFormatSettingsFields from '../Shared/UI/Form/NameFormatSettingsFields';
import { OrganizationSettingEntity } from '../OrganizationSettings/state';

interface FromProps extends FormRenderProps<TournamentSettingEntity> {
  backUrl: string;
  isLoading: boolean;
  organizationSetting?: OrganizationSettingEntity;
}

function Form({
  backUrl,
  isLoading,
  handleSubmit,
  submitting,
  pristine,
  values,
  organizationSetting
}: FromProps) {
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <NameFormatSettingsFields
          nameFormatSource={
            values.nameFormat === null ? 'inherited' : 'overridden'
          }
          nameCaseSource={values.nameCase === null ? 'inherited' : 'overridden'}
          organizationNameFormat={
            organizationSetting ? organizationSetting.nameFormat : null
          }
          organizationNameCase={
            organizationSetting ? organizationSetting.nameCase : null
          }
        />

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
