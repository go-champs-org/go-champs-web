import React from 'react';
import { ApiRegistrationResponseStatus } from '../Shared/httpClient/apiTypes';
import { useTranslation } from 'react-i18next';

function RegistrationResponseStatusChip({
  status
}: {
  status: ApiRegistrationResponseStatus;
}) {
  const { t } = useTranslation();

  const statusContent = t(`registrationResponse.statuses.${status}`, {
    keySeparator: '.'
  });
  return (
    <span className={`tag ${status === 'approved' ? 'is-success' : 'is-link'}`}>
      {statusContent}
    </span>
  );
}

export default RegistrationResponseStatusChip;
