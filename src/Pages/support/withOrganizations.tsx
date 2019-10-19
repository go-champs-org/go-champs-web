import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { getOrganizations } from '../../Organizations/actions';
import { OrganizationState } from '../../Organizations/state';
import PageLoader from '../../Shared/UI/PageLoader';
import { StoreState } from '../../store';
import { OrganizationHomeMatchProps } from './routerInterfaces';

interface WithOrganizationsProps
  extends RouteComponentProps<OrganizationHomeMatchProps> {
  organizationState: OrganizationState;
  getOrganizations: any;
}

const withOrganizations = (WrappedComponent: any) => {
  class WithTournaments extends React.Component<WithOrganizationsProps> {
    render() {
      const canRender =
        this.props.organizationState.organizations[
          this.props.match.params.organizationSlug
        ] && !this.props.organizationState.isLoadingRequestOrganizations;
      return (
        <PageLoader canRender={canRender}>
          <WrappedComponent {...this.props} />
        </PageLoader>
      );
    }

    componentDidMount() {
      if (
        !this.props.organizationState.organizations[
          this.props.match.params.organizationSlug
        ]
      ) {
        this.props.getOrganizations();
      }
    }
  }

  const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
      {
        getOrganizations
      },
      dispatch
    );

  const mapStateToProps = (state: StoreState) => ({
    organizationState: state.organizations
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithTournaments);
};

export default withOrganizations;
