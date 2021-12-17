import React, { Fragment, ReactNode } from 'react';
import { OrganizationEntity } from '../../Organizations/state';

export const NotAuthenticatedWrapper: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  if (!localStorage.getItem('token')) {
    return <Fragment>{children}</Fragment>;
  }

  return <div></div>;
};

export const NotMemberWrapper: React.FC<{
  children: ReactNode;
  organization: OrganizationEntity;
}> = ({ children, organization }) => {
  const organizationIdsString = localStorage.getItem('organizations') || '';
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
  const organizationIdsString = localStorage.getItem('organizations') || '';
  const organizationIds = organizationIdsString.split(',');

  if (
    localStorage.getItem('token') &&
    organizationIds.includes(organization.id)
  ) {
    return <Fragment>{children}</Fragment>;
  }

  return <div></div>;
};

const AuthenticatedWrapper: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  if (localStorage.getItem('token')) {
    return <Fragment>{children}</Fragment>;
  }

  return <div></div>;
};

export default AuthenticatedWrapper;
