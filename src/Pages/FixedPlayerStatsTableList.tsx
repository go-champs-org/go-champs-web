import React, { Fragment } from 'react';
import AdminMenu from '../Tournaments/AdminMenu';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import List, { ListLoading } from '../FixedPlayerStatsTables/List';
import { ConnectedProps, connect } from 'react-redux';
import withTournament from './support/withTournament';
import { getTournamentBySlug } from '../Tournaments/effects';
import { deleteFixedPlayerStatsTable } from '../FixedPlayerStatsTables/effects';
import { bindActionCreators, Dispatch } from 'redux';
import { fixedPlayerStatsTables } from '../FixedPlayerStatsTables/selectors';
import { StoreState } from '../store';
import {
  tournamentLoading,
  tournamentPlayerStatsBySlug
} from '../Tournaments/selectors';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import ListHeader from '../Shared/UI/ListHeader';
import { useTranslation } from 'react-i18next';

const mapStateToProps = (state: StoreState) => ({
  fixedPlayerStatsTables: fixedPlayerStatsTables(state.fixedPlayerStatsTables),
  playerStatsMap: tournamentPlayerStatsBySlug(state.tournaments),
  tournamentLoading: tournamentLoading(state.tournaments)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      deleteFixedPlayerStatsTable,
      getTournamentBySlug
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type FixedPlayerStatsTableListProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

const FixedPlayerStatsTableList: React.FC<FixedPlayerStatsTableListProps> = ({
  deleteFixedPlayerStatsTable,
  match,
  fixedPlayerStatsTables,
  playerStatsMap,
  tournamentLoading
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const newUrl = `/${organizationSlug}/${tournamentSlug}/NewFixedPlayerStatsTable`;

  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="column">
        <div className="columns is-vcentered is-mobile is-multiline">
          <ListHeader newUrl={newUrl} title={t('fixedPlayerStatsTables')} />

          <div className="column is-12">
            <ComponentLoader
              canRender={!tournamentLoading}
              loader={<ListLoading />}
            >
              <List
                deleteFixedPlayerStatsTable={deleteFixedPlayerStatsTable}
                organizationSlug={organizationSlug}
                fixedPlayerStatsTables={fixedPlayerStatsTables}
                playerStatsMap={playerStatsMap}
                tournamentSlug={tournamentSlug}
              />
            </ComponentLoader>
          </div>
        </div>
      </div>

      <div className="is-divider-vertical is-hidden-tablet-only"></div>

      <div className="column is-4-desktop is-12-tablet">
        <AdminMenu
          organizationSlug={organizationSlug}
          tournamentSlug={tournamentSlug}
        />
      </div>
    </Fragment>
  );
};

export default connector(
  withTournament<FixedPlayerStatsTableListProps>(FixedPlayerStatsTableList)
);
