import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import {
  patchOrganization,
  requestOrganization
} from '../Organizations/actions';
import { Edit } from '../Organizations/Edit';
import { OrganizationState } from '../Organizations/state';
import { StoreState } from '../store';
import { OrganizationHomeMatchProps } from './support/routerInterfaces';
import withOrganizations from './support/withOrganizations';

interface OrganizationEditProps
  extends RouteComponentProps<OrganizationHomeMatchProps> {
  patchOrganization: any;
  organizationState: OrganizationState;
  requestOrganization: any;
}

class OrganizationEdit extends React.Component<OrganizationEditProps> {
  render() {
    const organization = this.props.organizationState.organizations[
      this.props.match.params.organizationSlug
    ];
    return (
      <Edit
        organization={organization}
        patchOrganization={this.props.patchOrganization}
      />
    );
  }

  componentDidMount() {
    const organizationId = this.props.organizationState.organizations[
      this.props.match.params.organizationSlug
    ].id;
    this.props.requestOrganization(organizationId);
  }
}

const mapStateToProps = (state: StoreState) => ({
  organizationState: state.organizations
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      patchOrganization,
      requestOrganization
    },
    dispatch
  );

export default withOrganizations(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OrganizationEdit)
);
