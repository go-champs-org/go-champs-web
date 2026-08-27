import React, { Fragment, useEffect } from 'react';
import Helmet from 'react-helmet';
import { Trans, useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { getOrganizationBySlug } from '../Organizations/effects';
import {
  organizationBySlug,
  organizationsLoading
} from '../Organizations/selectors';
import OrganizationMembersTable from '../OrganizationMembers/OrganizationMembersTable';
import {
  deleteOrganizationMember,
  getOrganizationMembers,
  patchOrganizationMember,
  postOrganizationMember
} from '../OrganizationMembers/effects';
import {
  isAddingOrganizationMember,
  organizationMembers,
  organizationMembersLoading
} from '../OrganizationMembers/selectors';
import { OrganizationMemberEntity } from '../OrganizationMembers/state';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import { StoreState } from '../store';
import { RouteProps } from './support/routerInterfaces';
import withOrganization from './support/withOrganization';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => ({
  organization: organizationBySlug(
    state.organizations,
    props.match.params.organizationSlug
  ),
  organizationMembers: organizationMembers(
    state.organizations.organizationMembers
  ),
  organizationMembersLoading: organizationMembersLoading(
    state.organizations.organizationMembers
  ),
  isAddingOrganizationMember: isAddingOrganizationMember(
    state.organizations.organizationMembers
  ),
  organizationsLoading: organizationsLoading(state.organizations)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getOrganizationBySlug,
      getOrganizationMembers,
      postOrganizationMember,
      patchOrganizationMember,
      deleteOrganizationMember
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type OrganizationMembersProps = ConnectedProps<typeof connector>;

const OrganizationMembers: React.FC<OrganizationMembersProps> = ({
  organization,
  organizationMembers,
  organizationMembersLoading,
  isAddingOrganizationMember,
  getOrganizationMembers,
  postOrganizationMember,
  patchOrganizationMember,
  deleteOrganizationMember
}) => {
  const { t } = useTranslation();
  const organizationId = organization.id;

  useEffect(() => {
    if (organizationId) {
      getOrganizationMembers(organizationId);
    }
  }, [organizationId, getOrganizationMembers]);

  const addOrganizationMember = async (
    organizationMember: OrganizationMemberEntity
  ) => {
    const errors = ((await postOrganizationMember(
      organizationMember,
      organizationId
    )) as unknown) as { username?: string[] } | undefined;

    if (errors && errors.username) {
      return t('usernameNotFound');
    }

    return undefined;
  };

  return (
    <Fragment>
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-12">
          <h2 className="subtitle">
            <Trans>members</Trans>
          </h2>
        </div>

        <div className="column is-12">
          <ComponentLoader
            canRender={!organizationMembersLoading}
            loader={<div />}
          >
            <OrganizationMembersTable
              isAddingOrganizationMember={isAddingOrganizationMember}
              organizationMembers={organizationMembers}
              addOrganizationMember={addOrganizationMember}
              removeOrganizationMember={organizationMember =>
                deleteOrganizationMember(organizationMember, organizationId)
              }
              updateOrganizationMember={organizationMember =>
                patchOrganizationMember(organizationMember, organizationId)
              }
            />
          </ComponentLoader>
        </div>
      </div>

      <Helmet>
        <title>Go Champs | Organization Members</title>
      </Helmet>
    </Fragment>
  );
};

export default connector(withOrganization(OrganizationMembers));
