import React, { useEffect } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { LOCAL_STORAGE_USERNAME_KEY } from '../../Accounts/constants';

interface WithAccountProps {
  getAccount: (
    username: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
}

const withAccount = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithAccount: React.FC<T & WithAccountProps> = props => {
    const { getAccount } = props;
    const username = localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);

    useEffect(() => {
      if (username) {
        getAccount(username);
      }

      return () => undefined;
    }, [getAccount, username]);

    return <WrappedComponent {...props} />;
  };

  return WithAccount;
};

export default withAccount;
