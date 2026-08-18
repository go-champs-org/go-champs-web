import React from 'react';
import { StoreState } from '../store';
import { RouteComponentProps } from 'react-router-dom';

import { RouteProps } from './support/routerInterfaces';
import {
  officialProfileByUsername,
  officialProfileLoading,
  pendingInvitesByUsername,
  approvingOfficialProfileInvite
} from '../OfficialProfiles/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { requestOfficialProfile } from '../OfficialProfiles/effects';
import { approveOfficialProfileInvite } from '../OfficialProfiles/effects';
import { connect, ConnectedProps } from 'react-redux';
import Banner from '../OfficialProfiles/Banner';
import PendingInvitesList from '../OfficialProfiles/PendingInvitesList';
import Schedule from '../OfficialProfiles/Schedules/Schedule';
import { LOCAL_STORAGE_USERNAME_KEY } from '../Accounts/constants';

interface OfficialProfileHomeParams extends RouteProps {
  username: string;
}

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<OfficialProfileHomeParams>
) => ({
  officialProfile: officialProfileByUsername(
    state.officialProfiles,
    props.match.params.username
  ),
  officialProfileLoading: officialProfileLoading(state.officialProfiles),
  pendingInvites: pendingInvitesByUsername(
    state.officialProfiles,
    props.match.params.username
  ),
  isApprovingInvite: approvingOfficialProfileInvite(state.officialProfiles)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      requestOfficialProfile,
      approveOfficialProfileInvite
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type OfficialProfileHomeProps = ConnectedProps<typeof connector> &
  RouteComponentProps<OfficialProfileHomeParams>;

function OfficialProfileHome({
  match,
  requestOfficialProfile,
  officialProfile,
  pendingInvites,
  approveOfficialProfileInvite,
  isApprovingInvite
}: OfficialProfileHomeProps) {
  React.useEffect(() => {
    if (match.params.username) {
      requestOfficialProfile(match.params.username);
    }
  }, [match.params.username, requestOfficialProfile]);

  const handleApproveInvite = (inviteId: string) => {
    approveOfficialProfileInvite(inviteId, match.params.username);
  };

  // The schedule endpoint is scoped to the authenticated user, so it is only
  // rendered when the profile being viewed is the viewer's own.
  const isOwnProfile =
    match.params.username === localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);

  const hasLinkedTournaments = !!(
    officialProfile &&
    officialProfile.tournaments &&
    officialProfile.tournaments.length > 0
  );

  return (
    <div className="columns is-multiline">
      <div className="column is-12 slide-fade-content">
        <Banner officialProfile={officialProfile} />
      </div>
      {pendingInvites.length > 0 && (
        <div className="column is-12 slide-fade-content">
          <PendingInvitesList
            invites={pendingInvites}
            onApprove={handleApproveInvite}
            isApproving={isApprovingInvite}
          />
        </div>
      )}

      {isOwnProfile && (
        <div className="column is-12 slide-fade-content delay-1">
          <Schedule hasLinkedTournaments={hasLinkedTournaments} />
        </div>
      )}
    </div>
  );
}

export default connector(OfficialProfileHome);
