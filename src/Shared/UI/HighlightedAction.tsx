import React from 'react';
import './HighlightedAction.scss';

export interface HighlightedActionProps {
  onClick: () => void;
  title: string;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
}

const Description = ({
  description
}: {
  description: string | React.ReactNode;
}) => {
  if (typeof description === 'string') {
    return <p className="is-size-7">{description}</p>;
  }

  return <>{description}</>;
};

export const HighlightedAction: React.FC<HighlightedActionProps> = ({
  onClick,
  title,
  description,
  icon
}) => (
  <div className="highlighted-action" onClick={onClick}>
    {icon && <div className="highlighted-action-icon">{icon}</div>}
    <div className="highlighted-action-content">
      <h3 className="is-size-6 has-text-weight-bold">{title}</h3>
      {description && <Description description={description} />}
    </div>
  </div>
);

export default HighlightedAction;
