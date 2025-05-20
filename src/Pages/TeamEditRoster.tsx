import React from 'react';
import withTournament from './support/withTournament';
import { StoreState } from '../store';
import { patchingTeam, teamById, teamsLoading } from '../Teams/selectors';
import { Link, RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { bindActionCreators, Dispatch } from 'redux';
import { getTournamentBySlug } from '../Tournaments/effects';
import {
  deleteCoachInTeam,
  patchCoachInTeam,
  postCoachInTeam
} from '../Teams/effects';
import { connect, ConnectedProps } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import Tabs from '../Shared/UI/Tabs';
import { playersByTeamId } from '../Players/selectors';
import RosterTable from '../Players/RosterTable';
import CoachingStaffTable from '../Teams/CoachingStaffTable';
import { coachTypesForSelectInput } from '../Sports/selectors';
import { tournamentBySlug } from '../Tournaments/selectors';
import { CoachEntity } from '../Teams/state';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { teamId = '', tournamentSlug = '' } = props.match.params;
  const tournament = tournamentBySlug(state.tournaments, tournamentSlug);
  return {
    ...props,
    isPatchingTeam: patchingTeam(state.teams),
    teamsLoading: teamsLoading(state.teams),
    team: teamById(state.teams, props.match.params.teamId),
    players: playersByTeamId(state.players, state.teams, teamId),
    coachTypesForSelectInput: coachTypesForSelectInput(
      state.sports,
      tournament.sportSlug
    )
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getTournamentBySlug,
      patchCoachInTeam,
      postCoachInTeam,
      deleteCoachInTeam
    },
    dispatch
  );
};

const mergeProps = (
  stateProps: ReturnType<typeof mapStateToProps>,
  dispatchProps: ReturnType<typeof mapDispatchToProps>,
  ownProps: RouteComponentProps<RouteProps>
) => {
  const team = stateProps.team;

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    addCoachInTeam: (coach: CoachEntity) =>
      dispatchProps.postCoachInTeam(team, coach),
    removeCoachInTeam: (coach: CoachEntity) =>
      dispatchProps.deleteCoachInTeam(team, coach),
    updateCoachInTeam: (coach: CoachEntity) =>
      dispatchProps.patchCoachInTeam(team, coach)
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type TeamEditRosterProps = ConnectedProps<typeof connector>;

function TeamEditRoster({
  match,
  team,
  players,
  teamsLoading,
  isPatchingTeam,
  coachTypesForSelectInput,
  addCoachInTeam,
  removeCoachInTeam,
  updateCoachInTeam
}: TeamEditRosterProps) {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const playerBaseUrl = `/${organizationSlug}/${tournamentSlug}/EditPlayer`;

  const { t } = useTranslation();
  const translatedCoachTypes = coachTypesForSelectInput.map(coachType => ({
    ...coachType,
    label: t(`coachTypes.${coachType.label}`, { keySeparator: '.' })
  }));

  const tabs = [
    {
      id: 'players',
      label: t('players'),
      content: <RosterTable players={players} playerBaseUrl={playerBaseUrl} />
    },
    {
      id: 'coaches',
      label: t('coachingStaff'),
      content: (
        <CoachingStaffTable
          addCoach={addCoachInTeam}
          removeCoach={removeCoachInTeam}
          updateCoach={updateCoachInTeam}
          isAddingCoach={isPatchingTeam}
          coaches={team.coaches}
          coachTypesForSelectInput={translatedCoachTypes}
        />
      )
    }
  ];

  return (
    <div className="column">
      <div className="container">
        <div className="columns is-multiline">
          <div className="column is-12">
            <nav
              className="breadcrumb has-succeeds-separator"
              aria-label="breadcrumbs"
            >
              <ul>
                <li>
                  <Link
                    to={`/${organizationSlug}/${tournamentSlug}/EditTeam/${team.id}`}
                  >
                    {team.name}
                  </Link>
                </li>

                <li>
                  <Trans>roster</Trans>
                </li>
              </ul>
            </nav>
          </div>

          <div className="column is-12">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default connector(withTournament<TeamEditRosterProps>(TeamEditRoster));
