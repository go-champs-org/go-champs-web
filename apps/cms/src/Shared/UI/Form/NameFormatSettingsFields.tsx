import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { Trans } from 'react-i18next';
import {
  NAME_CASE_OPTIONS,
  NAME_FORMAT_OPTIONS
} from '../../dataMappers/nameFormatSettings';
import { useTranslatedSelectOptions } from '../../hooks/useTranslatedSelectOptions';
import SelectInput from './Select';

const NameFormatSettingsFields: React.FC = () => {
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
          <Trans>nameFormat</Trans>
        </label>

        <div className="control">
          <Field
            name="nameFormat"
            render={(props: FieldRenderProps<string, HTMLSelectElement>) => (
              <SelectInput {...props} options={translatedNameFormatOptions} />
            )}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">
          <Trans>nameCase</Trans>
        </label>

        <div className="control">
          <Field
            name="nameCase"
            render={(props: FieldRenderProps<string, HTMLSelectElement>) => (
              <SelectInput {...props} options={translatedNameCaseOptions} />
            )}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default NameFormatSettingsFields;
