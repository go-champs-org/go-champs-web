import React, { Fragment, ReactNode } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { LOCAL_STORAGE_USERNAME_KEY } from '../Accounts/constants';

export const canAccessOfficialProfile = (
  requestedUsername: string,
  currentUsername: string | null
): boolean => !!currentUsername && requestedUsername === currentUsername;

function AuthenticatedAuthorizedOfficialProfile({
  children
}: {
  children?: ReactNode;
}) {
  const { username } = useParams<{ username: string }>();
  const currentUsername = localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);

  if (!canAccessOfficialProfile(username, currentUsername)) {
    return <Redirect to="/Account" />;
  }

  return <Fragment>{children}</Fragment>;
}

export default AuthenticatedAuthorizedOfficialProfile;
