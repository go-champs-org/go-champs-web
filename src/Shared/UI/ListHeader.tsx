import React, { ReactNode, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ListHeader.scss';

interface ListHeaderProps {
  newUrl: string;
  title: string;
  filters?: ReactNode[];
  onSaveOrder?: () => {};
  shouldDisplaySortButtons?: boolean;
  toggleShouldDisplaySortButtons?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const ListHeader: React.FC<ListHeaderProps> = ({
  filters,
  newUrl,
  title,
  onSaveOrder,
  shouldDisplaySortButtons,
  toggleShouldDisplaySortButtons
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldDisplayFilters, setShouldDisplayFilters] = useState(false);

  const toggleShouldDisplayFilters = (event: React.MouseEvent) => {
    event.preventDefault();
    setShouldDisplayFilters(!shouldDisplayFilters);
  };

  const hasFilter = filters && filters.length > 0;
  const shouldDisplaySortControls = onSaveOrder && !shouldDisplayFilters;
  const shouldDisplayFilterControls = hasFilter && !shouldDisplaySortButtons;

  return (
    <div className="filters-container">
      <div className="headers">
        <div className="columns is-multiline is-mobile is-vcentered">
          <div className="column is-4">
            <h2 className="subtitle">{title}</h2>
          </div>

          <div className="column is-8 has-text-right">
            {shouldDisplayFilterControls && !shouldDisplayFilters && (
              <button
                className="button is-text"
                onClick={toggleShouldDisplayFilters}
              >
                <span className="icon is-small">
                  <i className="fas fa-filter"></i>
                </span>

                <span>Filter</span>
              </button>
            )}

            {shouldDisplayFilterControls && shouldDisplayFilters && (
              <button
                className="button is-text"
                onClick={toggleShouldDisplayFilters}
              >
                Cancel
              </button>
            )}

            {shouldDisplaySortControls && !shouldDisplaySortButtons && (
              <button
                className="button is-text"
                onClick={toggleShouldDisplaySortButtons}
              >
                <span className="icon is-small">
                  <i className="fas fa-sort"></i>
                </span>

                <span>Sort</span>
              </button>
            )}

            {shouldDisplaySortControls && shouldDisplaySortButtons && (
              <button className="button is-text" onClick={onSaveOrder}>
                Save order
              </button>
            )}

            {shouldDisplaySortControls && shouldDisplaySortButtons && (
              <button
                className="button is-text"
                onClick={toggleShouldDisplaySortButtons}
              >
                Cancel
              </button>
            )}

            <Link className="button is-text" to={newUrl}>
              New
            </Link>
          </div>
        </div>
      </div>

      {hasFilter && (
        <div
          className="filters-wrapper"
          aria-expanded={shouldDisplayFilters}
          style={{
            height: shouldDisplayFilters
              ? ref.current
                ? ref.current.clientHeight
                : 0
              : 0
          }}
        >
          <div className="columns is-mobile is-vcentered" ref={ref}>
            {filters}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListHeader;
