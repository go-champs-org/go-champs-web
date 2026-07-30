import { displayToast } from '../Shared/bulma/toast';
import {
  deleteTeamFailure,
  deleteTeamStart,
  deleteTeamSuccess,
  patchTeamFailure,
  patchTeamStart,
  patchTeamSuccess,
  postTeamFailure,
  postTeamStart,
  postTeamSuccess
} from './actions';
import { CoachEntity, TeamEntity } from './state';
import teamHttpClient from './teamHttpClient';
import { Dispatch } from 'redux';

export const deleteTeam = (team: TeamEntity) => async (dispatch: Dispatch) => {
  dispatch(deleteTeamStart());

  try {
    const response = await teamHttpClient.delete(team.id);

    dispatch(deleteTeamSuccess(response));
    displayToast(`${team.name} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteTeamFailure(err));
  }
};

export const patchTeam = (team: TeamEntity) => async (dispatch: Dispatch) => {
  dispatch(patchTeamStart());

  try {
    const response = await teamHttpClient.patch(team);

    dispatch(patchTeamSuccess(response));
    displayToast(`${team.name} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchTeamFailure(err));
  }
};

export const postTeam = (team: TeamEntity, tournamentId: string) => async (
  dispatch: Dispatch
) => {
  dispatch(postTeamStart());

  try {
    const response = await teamHttpClient.post(team, tournamentId);

    dispatch(postTeamSuccess(response));
    displayToast(`${team.name} created!`, 'is-success');
  } catch (err) {
    dispatch(postTeamFailure(err));
  }
};

export const postCoachInTeam = (team: TeamEntity, coach: CoachEntity) => async (
  dispatch: Dispatch
) => {
  dispatch(patchTeamStart());

  try {
    const teamWithCoach = {
      ...team,
      coaches: [...team.coaches, coach]
    };
    const response = await teamHttpClient.patch(teamWithCoach);

    dispatch(patchTeamSuccess(response));
    displayToast(`${team.name} created!`, 'is-success');
  } catch (err) {
    dispatch(patchTeamFailure(err));
  }
};

export const patchCoachInTeam = (
  team: TeamEntity,
  coach: CoachEntity
) => async (dispatch: Dispatch) => {
  dispatch(patchTeamStart());

  try {
    const teamWithCoach = {
      ...team,
      coaches: team.coaches.map(c => (c.id === coach.id ? coach : c))
    };
    const response = await teamHttpClient.patch(teamWithCoach);

    dispatch(patchTeamSuccess(response));
    displayToast(`${team.name} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchTeamFailure(err));
  }
};

export const deleteCoachInTeam = (
  team: TeamEntity,
  coach: CoachEntity
) => async (dispatch: Dispatch) => {
  dispatch(patchTeamStart());

  try {
    const teamWithCoach = {
      ...team,
      coaches: team.coaches.filter(c => c.id !== coach.id)
    };
    await teamHttpClient.patch(teamWithCoach);

    dispatch(patchTeamSuccess(teamWithCoach));
    displayToast(`${team.name} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchTeamFailure(err));
  }
};
