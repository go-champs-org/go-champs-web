import React from 'react';
import withOrganization from './support/withOrganization';
import { StoreState } from '../store';
import { RouteProps } from './support/routerInterfaces';
import { organizationBySlug } from '../Organizations/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { getOrganizationBySlug } from '../Organizations/effects';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import View from '../Organizations/View';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => ({
  organization: organizationBySlug(
    state.organizations,
    props.match.params.organizationSlug
  )
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getOrganizationBySlug
    },
    dispatch
  );
const connector = connect(mapStateToProps, mapDispatchToProps);

type OrganizationViewProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

function OrganizationView({ organization }: OrganizationViewProps) {
  return <View organization={organization} />;
}

export default connector(withOrganization(OrganizationView));
