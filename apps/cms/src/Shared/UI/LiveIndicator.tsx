import React from 'react';
import { useTranslation } from 'react-i18next';
import './LiveIndicator.scss';

function LiveIndicator() {
  const { t } = useTranslation();

  return (
    <span className="live-indicator">
      <div className="live-dot"></div>
      <span className="live-text">
        {t('uppercase', { uppercase: t('live') })}
      </span>
    </span>
  );
}

export default LiveIndicator;
