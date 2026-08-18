import React from 'react';
import { StoreState } from '../store';
import { RouteComponentProps } from 'react-router-dom';

import { RouteProps } from './support/routerInterfaces';
import { officialProfileByUsername } from '../OfficialProfiles/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { requestOfficialProfile } from '../OfficialProfiles/effects';
import { connect, ConnectedProps } from 'react-redux';
import Banner from '../OfficialProfiles/Banner';
import MiniCard from '../Tournaments/MiniCard';
import { Trans } from 'react-i18next';

interface OfficialProfileTournamentsParams extends RouteProps {
  username: string;
}

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<OfficialProfileTournamentsParams>
) => ({
  officialProfile: officialProfileByUsername(
    state.officialProfiles,
    props.match.params.username
  )
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      requestOfficialProfile
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type OfficialProfileTournamentsProps = ConnectedProps<typeof connector> &
  RouteComponentProps<OfficialProfileTournamentsParams>;

function OfficialProfileTournaments({
  match,
  officialProfile,
  requestOfficialProfile
}: OfficialProfileTournamentsProps) {
  React.useEffect(() => {
    if (match.params.username) {
      requestOfficialProfile(match.params.username);
    }
  }, [match.params.username, requestOfficialProfile]);

  return (
    <div className="columns is-multiline">
      <div className="column is-12 slide-fade-content">
        <Banner officialProfile={officialProfile} />
      </div>

      <div className="column is-12 slide-fade-content delay-1">
        <h2 className="title is-5">
          <Trans>tournaments</Trans>
        </h2>
      </div>

      {officialProfile.tournaments && officialProfile.tournaments.length > 0 ? (
        officialProfile.tournaments.map(tournament => (
          <div key={tournament.id} className="column is-12">
            <MiniCard tournament={tournament} />
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

export default connector(OfficialProfileTournaments);
