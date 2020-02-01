import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { getOrganizations } from '../../Organizations/effects';
import { OrganizationHomeMatchProps } from './routerInterfaces';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getOrganizations
    },
    dispatch
  );

const connector = connect(null, mapDispatchToProps);

type WithOrganizationsProps = ConnectedProps<typeof connector>;

// TODO: Remove any from extends
const withOrganizations = <T extends any>(
  WrappedComponent: React.ComponentType<T>
) => {
  class WithTournaments extends React.Component<T & WithOrganizationsProps> {
    render() {
      return <WrappedComponent {...this.props} />;
    }

    componentDidMount() {
      this.props.getOrganizations();
    }
  }

  return connector(WithTournaments);
};

export default withOrganizations;
