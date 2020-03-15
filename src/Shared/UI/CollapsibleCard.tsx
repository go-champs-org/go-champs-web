import React, { ReactNode, useState, useRef } from 'react';
import './CollapsibleCard.scss';

interface CollapsibleCardProps {
  children: ReactNode;
  isInitiallyCollapsed?: boolean;
  headerButtonsElement?: ReactNode;
  titleElement: ReactNode;
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  children,
  isInitiallyCollapsed,
  headerButtonsElement,
  titleElement
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [state, setState] = useState({
    isExpanded: !!isInitiallyCollapsed
  });

  const toogleIsExpanded = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setState({
      ...state,
      isExpanded: !state.isExpanded
    });
  };

  return (
    <div className="card" aria-expanded={state.isExpanded}>
      <div className="card-header">
        <div className="card-header-title">{titleElement}</div>

        <div className="card-header-icon">
          {headerButtonsElement}

          <button
            className="button is-text expand-toogle"
            onClick={toogleIsExpanded}
            style={{
              transform: state.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
            }}
          >
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <div
        className="card-content-wrapper"
        style={{
          height: state.isExpanded
            ? ref.current
              ? ref.current.clientHeight
              : 0
            : 0
        }}
      >
        <div className="card-content" ref={ref}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleCard;
