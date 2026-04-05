import React from 'react';
import { StoreState } from '../store';
import { RouteComponentProps } from 'react-router-dom';

import { RouteProps } from './support/routerInterfaces';
import {
  officialProfileByUsername,
  officialProfileLoading
} from '../OfficialProfiles/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { requestOfficialProfile } from '../OfficialProfiles/effects';
import { connect, ConnectedProps } from 'react-redux';
import Banner from '../OfficialProfiles/Banner';

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
  officialProfileLoading: officialProfileLoading(state.officialProfiles)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      requestOfficialProfile
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type OfficialProfileHomeProps = ConnectedProps<typeof connector> &
  RouteComponentProps<OfficialProfileHomeParams>;

function OfficialProfileHome({
  match,
  requestOfficialProfile,
  officialProfile
}: OfficialProfileHomeProps) {
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
    </div>
  );
}

export default connector(OfficialProfileHome);
