import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { AnyAction, Dispatch } from 'redux';

interface WithRegistrationInviteProps {
  getRegistrationInvite: (
    registrationId: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
}

const withRegistrationInvite = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithRegistrationInvite: React.FC<T &
    WithRegistrationInviteProps> = props => {
    const { getRegistrationInvite } = props;
    const {
      params: { inviteId }
    } = useRouteMatch();
    useEffect(() => {
      if (inviteId) {
        getRegistrationInvite(inviteId);
      }

      return () => undefined;
    }, [getRegistrationInvite, inviteId]);

    return <WrappedComponent {...props} />;
  };

  return WithRegistrationInvite;
};

export default withRegistrationInvite;
