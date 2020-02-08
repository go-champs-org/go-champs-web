import React, { Fragment } from 'react';
import AdminMenu from '../Tournaments/AdminMenu';
import { RouteComponentProps, Link } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import List from '../Phases/List';
import { ConnectedProps, connect } from 'react-redux';
import withTournament from './support/withTournament';
import { getTournamentBySlug } from '../Tournaments/effects';
import { patchPhase, deletePhase } from '../Phases/effects';
import { bindActionCreators, Dispatch } from 'redux';
import { sortedPhases } from '../Phases/selectors';
import { StoreState } from '../store';

const mapStateToProps = (state: StoreState) => ({
  phases: sortedPhases(state.phases)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      deletePhase,
      getTournamentBySlug,
      patchPhase
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type PhaseListProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

const PhaseList: React.FC<PhaseListProps> = ({
  deletePhase,
  match,
  patchPhase,
  phases
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-vcentered is-mobile is-multiline">
          <div className="column is-10">
            <h2 className="subtitle">Phases</h2>
          </div>

          <div className="column is-2 has-text-right">
            <Link
              className="button is-text"
              to={`/${organizationSlug}/${tournamentSlug}/NewPhase`}
            >
              New
            </Link>
          </div>

          <div className="column is-12">
            <List
              deletePhase={deletePhase}
              organizationSlug={organizationSlug}
              patchPhase={patchPhase}
              phases={phases}
              tournamentSlug={tournamentSlug}
            />
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

export default connector(withTournament<PhaseListProps>(PhaseList));
