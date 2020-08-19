import React, { ReactNode, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ListHeader.scss';
import LoadingButton from './LoadingButton';
import { Trans } from 'react-i18next';

interface ListHeaderProps {
  newUrl: string;
  title: string;
  filters?: ReactNode[];
  onCancelOrder?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onSaveOrder?: (event: React.MouseEvent) => void;
  isSavingOrder?: boolean;
  shouldDisplaySortButtons?: boolean;
  toggleShouldDisplaySortButtons?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const ListHeader: React.FC<ListHeaderProps> = ({
  filters,
  newUrl,
  title,
  onCancelOrder,
  onSaveOrder,
  isSavingOrder,
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

                <span>
                  <Trans>filter</Trans>
                </span>
              </button>
            )}

            {shouldDisplayFilterControls && shouldDisplayFilters && (
              <button
                className="button is-text"
                onClick={toggleShouldDisplayFilters}
              >
                <Trans>cancel</Trans>
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

                <span>
                  <Trans>sort</Trans>
                </span>
              </button>
            )}

            {shouldDisplaySortControls && shouldDisplaySortButtons && (
              <LoadingButton
                className="button is-text"
                onClick={onSaveOrder}
                isLoading={isSavingOrder ? isSavingOrder : false}
              >
                <Trans>saveOrder</Trans>
              </LoadingButton>
            )}

            {shouldDisplaySortControls && shouldDisplaySortButtons && (
              <button className="button is-text" onClick={onCancelOrder}>
                <Trans>cancel</Trans>
              </button>
            )}

            <Link className="button is-text" to={newUrl}>
              <Trans>new</Trans>
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
