import React from 'react';
import './HighlightedAction.scss';

export interface HighlightedActionProps {
  onClick: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

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
      {description && <p className="is-size-7">{description}</p>}
    </div>
  </div>
);

export default HighlightedAction;
