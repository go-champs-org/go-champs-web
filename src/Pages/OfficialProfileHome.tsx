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
import MiniCard from '../Tournaments/MiniCard';
import { Trans } from 'react-i18next';

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

      <div className="column is-12 slide-fade-content delay-1">
        <h2 className="title is-5">
          <Trans>tournaments</Trans>
        </h2>
      </div>

      {officialProfile &&
      officialProfile.tournaments &&
      officialProfile.tournaments.length > 0 ? (
        officialProfile.tournaments.map(tournament => (
          <div className="column is-12">
            <MiniCard key={tournament.id} tournament={tournament} />
          </div>
        ))
      ) : (
        <div className="column is-12 slide-fade-content delay-2">
          <div className="hero is-dark is-small">
            <div className="hero-body">
              <div className="container">
                <p className="subtitle has-text-centered">
                  <Trans>noTournamentsYet</Trans>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default connector(OfficialProfileHome);
