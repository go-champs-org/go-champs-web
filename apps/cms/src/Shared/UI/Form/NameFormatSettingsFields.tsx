import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { TFunction, Trans, useTranslation } from 'react-i18next';
import {
  NAME_CASE_OPTIONS,
  NAME_FORMAT_OPTIONS,
  NameCase,
  NameFormat
} from '../../dataMappers/nameFormatSettings';
import { useTranslatedSelectOptions } from '../../hooks/useTranslatedSelectOptions';
import SelectInput, { SelectOptionType } from './Select';

export type NameFormatSettingSource = 'inherited' | 'overridden';

interface NameFormatSettingsFieldsProps {
  nameFormatSource?: NameFormatSettingSource;
  nameCaseSource?: NameFormatSettingSource;
  organizationNameFormat?: NameFormat | null;
  organizationNameCase?: NameCase | null;
}

function SourceTag({ source }: { source: NameFormatSettingSource }) {
  const { t } = useTranslation();

  return (
    <span className={`tag ${source === 'inherited' ? 'is-light' : 'is-info'}`}>
      {t(`nameFormatSettingsForm.${source}`)}
    </span>
  );
}

export const inheritPlaceholder = (
  t: TFunction,
  options: SelectOptionType[],
  organizationValue: string | null | undefined,
  defaultValue: string
) => {
  const resolvedOrganizationValue =
    organizationValue !== null && organizationValue !== undefined
      ? organizationValue
      : defaultValue;

  const matchedOption = options.find(
    option => option.value === resolvedOrganizationValue
  );

  return t('nameFormatSettingsForm.inheritPlaceholder', {
    value: matchedOption ? matchedOption.label : ''
  });
};

function NameFormatSettingsFields({
  nameFormatSource,
  nameCaseSource,
  organizationNameFormat,
  organizationNameCase
}: NameFormatSettingsFieldsProps) {
  const { t } = useTranslation();
  const translatedNameFormatOptions = useTranslatedSelectOptions(
    NAME_FORMAT_OPTIONS
  );
  const translatedNameCaseOptions = useTranslatedSelectOptions(
    NAME_CASE_OPTIONS
  );

  return (
    <React.Fragment>
      <div className="field">
        <label className="label">
          <Trans>nameFormat</Trans>{' '}
          {nameFormatSource && <SourceTag source={nameFormatSource} />}
        </label>

        <div className="control">
          <Field
            name="nameFormat"
            render={(
              props: FieldRenderProps<string | null, HTMLSelectElement>
            ) => (
              <SelectInput
                {...props}
                options={translatedNameFormatOptions}
                isClearable={!!nameFormatSource}
                placeholder={
                  nameFormatSource &&
                  inheritPlaceholder(
                    t,
                    translatedNameFormatOptions,
                    organizationNameFormat,
                    NameFormat.FULL
                  )
                }
              />
            )}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">
          <Trans>nameCase</Trans>{' '}
          {nameCaseSource && <SourceTag source={nameCaseSource} />}
        </label>

        <div className="control">
          <Field
            name="nameCase"
            render={(
              props: FieldRenderProps<string | null, HTMLSelectElement>
            ) => (
              <SelectInput
                {...props}
                options={translatedNameCaseOptions}
                isClearable={!!nameCaseSource}
                placeholder={
                  nameCaseSource &&
                  inheritPlaceholder(
                    t,
                    translatedNameCaseOptions,
                    organizationNameCase,
                    NameCase.ORIGINAL
                  )
                }
              />
            )}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default NameFormatSettingsFields;
