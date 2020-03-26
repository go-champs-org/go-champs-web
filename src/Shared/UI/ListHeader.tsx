import React, { ReactNode, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ListHeader.scss';

interface ListHeaderProps {
  newUrl: string;
  title: string;
  filters?: ReactNode[];
  onUpdateOrder?: () => {};
}

const ListHeader: React.FC<ListHeaderProps> = ({
  filters,
  newUrl,
  onUpdateOrder,
  title
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldDisplayFilters, setShouldDisplayFilters] = useState(false);

  const toogleShouldDisplayFilters = (event: React.MouseEvent) => {
    event.preventDefault();
    setShouldDisplayFilters(!shouldDisplayFilters);
  };

  const hasFilter = filters && filters.length > 0;

  return (
    <div className="filters-container">
      <div className="headers">
        <div className="columns is-multiline is-mobile is-vcentered">
          <div className="column is-4">
            <h2 className="subtitle">{title}</h2>
          </div>

          <div className="column is-8 has-text-right">
            {hasFilter && (
              <button
                className="button is-text"
                onClick={toogleShouldDisplayFilters}
              >
                <span className="icon is-small">
                  <i className="fas fa-filter"></i>
                </span>

                <span>Filter</span>
              </button>
            )}

            {onUpdateOrder && (
              <button className="button is-text">Save order</button>
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
