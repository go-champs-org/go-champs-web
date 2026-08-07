import React from 'react';
import { TournamentSettingEntity } from './state';
import { FormRenderProps } from 'react-final-form';
import { Trans, useTranslation } from 'react-i18next';
import LoadingButton from '../Shared/UI/LoadingButton';
import DoubleClickButton from '../Shared/UI/DoubleClickButton';
import { Link } from 'react-router-dom';
import NameFormatSettingsFields from '../Shared/UI/Form/NameFormatSettingsFields';
import { OrganizationSettingEntity } from '../OrganizationSettings/state';
import classNames from 'classnames';

interface FromProps extends FormRenderProps<TournamentSettingEntity> {
  backUrl: string;
  isLoading: boolean;
  organizationSetting?: OrganizationSettingEntity;
  isApplyingNameFormat: boolean;
  applyNameFormat: () => void;
}

function Form({
  backUrl,
  isLoading,
  handleSubmit,
  submitting,
  pristine,
  values,
  organizationSetting,
  isApplyingNameFormat,
  applyNameFormat
}: FromProps) {
  const { t } = useTranslation();

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="box">
          <NameFormatSettingsFields
            nameFormatSource={
              values.nameFormat === null ? 'inherited' : 'overridden'
            }
            nameCaseSource={
              values.nameCase === null ? 'inherited' : 'overridden'
            }
            organizationNameFormat={
              organizationSetting ? organizationSetting.nameFormat : null
            }
            organizationNameCase={
              organizationSetting ? organizationSetting.nameCase : null
            }
          />

          <hr />

          <p className="has-text-weight-semibold">
            {t('nameFormatSettingsForm.applyNameFormatTitle')}
          </p>
          <p className="help">
            {t('nameFormatSettingsForm.applyNameFormatDescription')}
          </p>

          <DoubleClickButton
            key={String(isApplyingNameFormat)}
            type="button"
            className={classNames('button is-warning', {
              'is-loading': isApplyingNameFormat
            })}
            disabled={isApplyingNameFormat || !pristine}
            onClick={() => applyNameFormat()}
          >
            {t('nameFormatSettingsForm.applyNameFormatButton')}
          </DoubleClickButton>
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
