import React, { Fragment } from 'react';
import TopBreadcrumbs from '../Tournaments/Common/TopBreadcrumbs';
import AdminMenu from '../Tournaments/AdminMenu';
import { connect, ConnectedProps } from 'react-redux';
import { deleteGame } from '../Games/effects';
import { phaseByIdOrDefault, sortedPhases } from '../Phases/selectors';
import { StoreState } from '../store';
import withPhase from './support/withPhase';
import { games, gamesLoading, gameDates } from '../Games/selectors';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import List, { ListLoading } from '../Games/List';
import { bindActionCreators, Dispatch } from 'redux';
import ListHeader from '../Shared/UI/ListHeader';
import useFilteredItemsByDate from '../Shared/hooks/useFilteredItemsByDate';
import { useTranslation, Trans } from 'react-i18next';

const SearchDateInput: React.FC<{
  dates: string[];
  onFilterValueChange: (value: string) => void;
  value: string | null;
}> = ({ dates, onFilterValueChange, value }) => {
  const currentPosition = value ? dates.indexOf(value) : -1;
  const onRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const nextIndex = currentPosition + 1;
    onFilterValueChange(dates[nextIndex]);
  };
  const onLeftClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const nextIndex = currentPosition - 1;
    onFilterValueChange(dates[nextIndex]);
  };

  return (
    <div className="column is-12">
      <div className="columns is-mobile is-vcentered">
        <div className="column is-2">
          <button
            className="button"
            onClick={onLeftClick}
            disabled={currentPosition === 0}
          >
            <span className="icon is-small">
              <i className="fas fa-chevron-left" />
            </span>
          </button>
        </div>

        <div className="column is-8 has-text-centered">
          {value ? (
            <Trans values={{ date: value }}>date</Trans>
          ) : (
            'Click right to go to the first day'
          )}
        </div>

        <div className="column is-2 has-text-right">
          <button
            className="button"
            onClick={onRightClick}
            disabled={currentPosition === dates.length - 1}
          >
            <span className="icon is-small">
              <i className="fas fa-chevron-right" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface OwnProps {
  organizationSlug: string;
  phaseId: string;
  tournamentSlug: string;
}

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  return {
    games: games(state.games),
    gameDates: gameDates(state.games),
    gamesLoading: gamesLoading(state.games),
    phase: phaseByIdOrDefault(state.phases, props.phaseId),
    phases: sortedPhases(state.phases)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      deleteGame
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type GameListProps = ConnectedProps<typeof connector> & OwnProps;

const GameList: React.FC<GameListProps> = ({
  deleteGame,
  gameDates,
  games,
  gamesLoading,
  phase,
  phaseId,
  phases,
  organizationSlug,
  tournamentSlug
}) => {
  const baseUrl = `/${organizationSlug}/${tournamentSlug}/Manage/${phaseId}`;
  const newUrl = `${baseUrl}/NewGame`;
  const {
    items: filteredGames,
    filterValue: dateFilterValue,
    onFilterValueChange
  } = useFilteredItemsByDate(games, 'datetime');

  const { t } = useTranslation();
  return (
    <Fragment>
      <div className="column is-12">
        <TopBreadcrumbs
          organizationSlug={organizationSlug}
          phases={phases}
          tournamentSlug={tournamentSlug}
        />
      </div>

      <div className="column is-12">
        <div className="columns is-multiline">
          <div className="column">
            <div className="columns is-vcentered is-mobile is-multiline">
              <ListHeader
                title={t('games')}
                newUrl={newUrl}
                filters={[
                  <SearchDateInput
                    key="name"
                    dates={gameDates}
                    value={dateFilterValue}
                    onFilterValueChange={onFilterValueChange}
                  />
                ]}
              />

              <div className="column is-12">
                <ComponentLoader
                  canRender={!gamesLoading}
                  loader={<ListLoading />}
                >
                  <List
                    baseUrl={baseUrl}
                    deleteGame={deleteGame}
                    games={filteredGames}
                  />
                </ComponentLoader>
              </div>
            </div>
          </div>

          <div className="is-divider-vertical is-hidden-tablet-only"></div>

          <aside className="column is-4-desktop is-12-tablet">
            <AdminMenu
              organizationSlug={organizationSlug}
              tournamentSlug={tournamentSlug}
              phase={phase}
            />
          </aside>
        </div>
      </div>
    </Fragment>
  );
};

export default connector(withPhase<GameListProps>(GameList));
