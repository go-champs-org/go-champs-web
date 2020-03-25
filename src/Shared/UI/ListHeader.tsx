import React, { ReactNode, useState, useRef, Fragment } from 'react';
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
      <div className="columns is-multiline is-mobile is-vcentered">
        <div className="column is-6">
          {hasFilter ? (
            <a href="#" onClick={toogleShouldDisplayFilters}>
              <h2 className="subtitle">{title}</h2>
            </a>
          ) : (
            <h2 className="subtitle">{title}</h2>
          )}
        </div>

        <div className="column is-6 has-text-right">
          {onUpdateOrder && (
            <button className="button is-text">Save order</button>
          )}

          <Link className="button is-text" to={newUrl}>
            New
          </Link>
        </div>
      </div>

      {hasFilter && (
        <div
          className="columns filters-wrapper"
          aria-expanded={shouldDisplayFilters}
          style={{
            height: shouldDisplayFilters
              ? ref.current
                ? ref.current.clientHeight
                : 0
              : 0
          }}
        >
          <div className="column is-12" ref={ref}>
            <div className="columns">{filters}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListHeader;
