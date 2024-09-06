import React, { Fragment, ReactNode } from 'react';
import { OrganizationEntity } from '../../Organizations/state';
import {
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_ORGANIZATIONS_KEY
} from '../../Accounts/constants';

export const NotAuthenticatedWrapper: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  if (!localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) {
    return <Fragment>{children}</Fragment>;
  }

  return <div></div>;
};

export const NotMemberWrapper: React.FC<{
  children: ReactNode;
  organization: OrganizationEntity;
}> = ({ children, organization }) => {
  const organizationIdsString =
    localStorage.getItem(LOCAL_STORAGE_ORGANIZATIONS_KEY) || '';
  const organizationIds = organizationIdsString.split(',');

  if (!organizationIds.includes(organization.id)) {
    return <Fragment>{children}</Fragment>;
  }

  return <div></div>;
};

export const AuthenticatedAndMemberWrapper: React.FC<{
  children: ReactNode;
  organization: OrganizationEntity;
}> = ({ children, organization }) => {
  const organizationIdsString =
    localStorage.getItem(LOCAL_STORAGE_ORGANIZATIONS_KEY) || '';
  const organizationIds = organizationIdsString.split(',');

  if (
    localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) &&
    organizationIds.includes(organization.id)
  ) {
    return <Fragment>{children}</Fragment>;
  }

  return <div></div>;
};

const AuthenticatedWrapper: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  if (localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) {
    return <Fragment>{children}</Fragment>;
  }

  return <div></div>;
};

export default AuthenticatedWrapper;
