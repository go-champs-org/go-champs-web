import React from 'react';
import { RegistrationEntity, RegistrationResponseEntity } from './state';

interface RegistrationResponseViewProps {
  registrationResponse: RegistrationResponseEntity;
  registration: RegistrationEntity;
}

function RegistrationResponseView({
  registrationResponse,
  registration
}: RegistrationResponseViewProps): React.ReactElement {
  return (
    <>
      {registration.customFields.map(customField => (
        <div key={customField.id} className="column is-12">
          <label className="label">{customField.label}</label>
          <div>{registrationResponse.response[customField.id] || ''}</div>
        </div>
      ))}
    </>
  );
}

export default RegistrationResponseView;
