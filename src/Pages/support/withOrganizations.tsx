import React from 'react';
import { Dispatch, AnyAction } from 'redux';

interface WithOrganizationsProps {
  getOrganizations: () => (dispatch: Dispatch<AnyAction>) => Promise<void>;
}

const withOrganizations = <T extends object>(
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

  return WithTournaments;
};

export default withOrganizations;
