import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { getOrganizations } from '../../Organizations/effects';
import { OrganizationHomeMatchProps } from './routerInterfaces';

interface WithOrganizationsProps
  extends RouteComponentProps<OrganizationHomeMatchProps> {
  getOrganizations: any;
}

const withOrganizations = (WrappedComponent: any) => {
  class WithTournaments extends React.Component<WithOrganizationsProps> {
    render() {
      return <WrappedComponent {...this.props} />;
    }

    componentDidMount() {
      this.props.getOrganizations();
    }
  }

  const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
      {
        getOrganizations
      },
      dispatch
    );

  return connect(state => state, mapDispatchToProps)(WithTournaments);
};

export default withOrganizations;
