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
import { TeamEntity } from './state';
import teamHttpClient from './teamHttpClient';

export const deleteTeam = (tournamentId: string) => (
  team: TeamEntity
) => async (dispatch: any) => {
  dispatch(deleteTeamStart());

  try {
    const response = await teamHttpClient.delete(tournamentId, team.id);

    dispatch(deleteTeamSuccess(response));
    displayToast(`${team.name} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteTeamFailure(err));
  }
};

export const patchTeam = (tournamentId: string) => (team: TeamEntity) => async (
  dispatch: any
) => {
  dispatch(patchTeamStart());

  try {
    const response = await teamHttpClient.patch(tournamentId, team);

    dispatch(patchTeamSuccess(response));
    displayToast(`${team.name} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchTeamFailure(err));
  }
};

export const postTeam = (tournamentId: string) => (team: TeamEntity) => async (
  dispatch: any
) => {
  dispatch(postTeamStart());

  try {
    const response = await teamHttpClient.post(tournamentId, team);

    dispatch(postTeamSuccess(response));
    displayToast(`${team.name} created!`, 'is-success');
  } catch (err) {
    dispatch(postTeamFailure(err));
  }
};
