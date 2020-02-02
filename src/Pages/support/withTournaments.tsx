import React from 'react';
import { Dispatch, AnyAction } from 'redux';
import { RequestFilter } from '../../Shared/httpClient/requestFilter';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './routerInterfaces';

interface WithTournamentsProps extends RouteComponentProps<RouteProps> {
  getTournamentsByFilter: (
    where: RequestFilter
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
}

const withTournaments = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  class WithTournaments extends React.Component<T & WithTournamentsProps> {
    render() {
      return <WrappedComponent {...this.props} />;
    }

    componentDidMount() {
      const { organizationSlug } = this.props.match.params;
      if (organizationSlug) {
        this.props.getTournamentsByFilter({
          organization_slug: organizationSlug
        });
      }
    }
  }

  return WithTournaments;
};

export default withTournaments;
