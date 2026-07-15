import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { LOCAL_STORAGE_USERNAME_KEY } from '../../Accounts/constants';
import { StoreState } from '../../store';
import { athleteProfileByUsername } from '../../AthleteProfiles/selectors';

interface WithAccountProps {
  getAccount: (
    username: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  requestAthleteProfile: (
    username: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  requestOfficialProfile: (
    username: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
}

const withAccount = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithAccount: React.FC<T & WithAccountProps> = props => {
    const { getAccount, requestAthleteProfile, requestOfficialProfile } = props;
    const username = localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);
    const athleteProfile = useSelector((state: StoreState) =>
      athleteProfileByUsername(state.athleteProfiles, username || '')
    );

    useEffect(() => {
      if (username) {
        getAccount(username);
        if (athleteProfile.username !== username) {
          requestAthleteProfile(username);
        }
        requestOfficialProfile(username);
      }

      return () => undefined;
    }, [
      getAccount,
      requestAthleteProfile,
      requestOfficialProfile,
      username,
      athleteProfile.username
    ]);

    return <WrappedComponent {...props} />;
  };

  return WithAccount;
};

export default withAccount;
