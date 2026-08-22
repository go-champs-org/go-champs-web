import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { StoreState } from '../store';
import {
  deleteTournament,
  getAdminTournaments,
  patchTournamentArchive
} from '../Tournaments/effects';
import {
  archivingTournament,
  tournaments,
  tournamentsLoading
} from '../Tournaments/selectors';
import { organizationBySlug } from '../Organizations/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import List, { ListLoading } from '../Tournaments/List';
import { TournamentEntity } from '../Tournaments/state';
import { RouteComponentProps, Link } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import { Trans } from 'react-i18next';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => ({
  archivingTournament: archivingTournament(state.tournaments),
  organization: organizationBySlug(
    state.organizations,
    props.match.params.organizationSlug
  ),
  tournaments: tournaments(state.tournaments),
  tournamentsLoading: tournamentsLoading(state.tournaments)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      deleteTournament,
      getAdminTournaments,
      patchTournamentArchive
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type TournamentListProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

const TournamentList: React.FC<TournamentListProps> = ({
  archivingTournament,
  deleteTournament,
  getAdminTournaments,
  match,
  organization,
  patchTournamentArchive,
  tournaments,
  tournamentsLoading
}) => {
  const { organizationSlug = '' } = match.params;
  const [showArchived, setShowArchived] = useState(false);
  const organizationId = organization.id;

  useEffect(() => {
    if (organizationId) {
      getAdminTournaments(organizationId, showArchived);
    }
  }, [getAdminTournaments, organizationId, showArchived]);

  const toggleTournamentArchive = useCallback(
    (tournament: TournamentEntity) => {
      patchTournamentArchive(tournament, organizationId, !showArchived);
    },
    [organizationId, patchTournamentArchive, showArchived]
  );

  return (
    <Fragment>
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-6">
          <h2 className="subtitle">
            <Trans>tournaments</Trans>
          </h2>
        </div>

        <div className="column is-6 has-text-right">
          <button
            aria-pressed={showArchived}
            className={`button ${showArchived ? 'is-primary' : 'is-text'}`}
            onClick={() => setShowArchived(!showArchived)}
            type="button"
          >
            <span className="icon is-small">
              <i aria-hidden="true" className="fas fa-archive"></i>
            </span>

            <span>
              <Trans>archived</Trans>
            </span>
          </button>

          <Link
            className="button is-text"
            to={`/Organization/${organizationSlug}/NewTournament`}
          >
            <Trans>new</Trans>
          </Link>
        </div>

        <div className="column is-12">
          <ComponentLoader
            canRender={!tournamentsLoading}
            loader={<ListLoading />}
          >
            <List
              archivingTournament={archivingTournament}
              deleteTournament={deleteTournament}
              organizationSlug={organizationSlug}
              toggleTournamentArchive={toggleTournamentArchive}
              tournaments={tournaments}
            />
          </ComponentLoader>
        </div>
      </div>
    </Fragment>
  );
};

export default connector(TournamentList);
