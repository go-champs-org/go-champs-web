import React from 'react';
import { Trans } from 'react-i18next';
import useOneTimeNotice from '../hooks/useOneTimeNotice';
import './BeamNotice.scss';

export interface BeamNoticeProps {
  noticeKey: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

export const BeamNotice: React.FC<BeamNoticeProps> = ({
  noticeKey,
  title,
  description,
  icon
}) => {
  const { isVisible, dismiss } = useOneTimeNotice(noticeKey);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="beam-notice">
      <span className="icon beam-notice-icon">
        {icon || <i className="fas fa-bullhorn" />}
      </span>

      <div className="beam-notice-content">
        <p className="is-size-6 has-text-weight-bold">{title}</p>
        {description && <p className="is-size-7">{description}</p>}
      </div>

      <button
        className="button is-small is-text beam-notice-close"
        type="button"
        onClick={dismiss}
      >
        <Trans>gotIt</Trans>
      </button>
    </div>
  );
};

export default BeamNotice;
