import React, { Fragment } from 'react';
import AdminMenu from '../Tournaments/AdminMenu';
import { RouteComponentProps, Link } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import List, { ListLoading } from '../Teams/List';
import { ConnectedProps, connect } from 'react-redux';
import withTournament from './support/withTournament';
import { getTournamentBySlug } from '../Tournaments/effects';
import { deleteTeam } from '../Teams/effects';
import { bindActionCreators, Dispatch } from 'redux';
import { teams } from '../Teams/selectors';
import { StoreState } from '../store';
import { tournamentLoading } from '../Tournaments/selectors';
import ComponentLoader from '../Shared/UI/ComponentLoader';

const mapStateToProps = (state: StoreState) => ({
  teams: teams(state.teams),
  tournamentLoading: tournamentLoading(state.tournaments)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      deleteTeam,
      getTournamentBySlug
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type TeamListProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

const TeamList: React.FC<TeamListProps> = ({
  deleteTeam,
  match,
  teams,
  tournamentLoading
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-vcentered is-mobile is-multiline">
          <div className="column is-10">
            <h2 className="subtitle">Teams</h2>
          </div>

          <div className="column is-2 has-text-right">
            <Link
              className="button is-text"
              to={`/${organizationSlug}/${tournamentSlug}/NewTeam`}
            >
              New
            </Link>
          </div>

          <div className="column is-12">
            <ComponentLoader
              canRender={!tournamentLoading}
              loader={<ListLoading />}
            >
              <List
                deleteTeam={deleteTeam}
                organizationSlug={organizationSlug}
                teams={teams}
                tournamentSlug={tournamentSlug}
              />
            </ComponentLoader>
          </div>
        </div>
      </div>

      <div className="is-divider-vertical"></div>

      <div className="column is-4">
        <AdminMenu
          organizationSlug={organizationSlug}
          tournamentSlug={tournamentSlug}
        />
      </div>
    </Fragment>
  );
};

export default connector(withTournament<TeamListProps>(TeamList));
