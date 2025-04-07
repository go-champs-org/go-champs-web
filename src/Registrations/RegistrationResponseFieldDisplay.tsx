import React from 'react';
import { CustomFieldEntity, RegistrationResponseEntity } from './state';
import { ApiCustomFieldType } from '../Shared/httpClient/apiTypes';
import { Trans } from 'react-i18next';

interface FieldProps {
  value: string;
}

function Date({ value }: FieldProps) {
  if (value === '') {
    <></>;
  }

  return <Trans values={{ date: value }}>date</Trans>;
}

function Text({ value }: FieldProps) {
  return <>{value}</>;
}

function DateTime({ value }: FieldProps) {
  if (value === '') {
    <></>;
  }

  return <Trans values={{ date: value }}>date</Trans>;
}

function Consent({ value }: FieldProps) {
  if (!Boolean(value)) {
    return (
      <span className="icon">
        <i className="fas fa-times-circle"></i>
      </span>
    );
  }
  return (
    <span className="icon">
      <i className="fas fa-check-circle"></i>
    </span>
  );
}

const FIELD: {
  [key in ApiCustomFieldType]: React.ComponentType<FieldProps>;
} = {
  consent: Consent,
  date: Date,
  datetime: DateTime,
  text: Text
};

function RegistrationResponseFieldDisplay({
  customField,
  registrationResponse
}: {
  customField: CustomFieldEntity;
  registrationResponse: RegistrationResponseEntity;
}) {
  if (customField.type in FIELD) {
    if (!registrationResponse.response[customField.id]) {
      return <></>;
    }

    const Field = FIELD[customField.type];
    const value = registrationResponse.response[customField.id];
    return <Field value={value} />;
  }

  return <></>;
}

export default RegistrationResponseFieldDisplay;
