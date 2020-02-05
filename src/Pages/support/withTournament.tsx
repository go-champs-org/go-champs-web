import React from 'react';
import { RouteComponentProps } from 'react-router';
import { RouteProps } from './routerInterfaces';

interface WithTournamentProps extends RouteComponentProps<RouteProps> {
  getTournamentBySlug: (organizationSlug: string, tournamentSlug: string) => {};
}

const withTournament = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  class WithTournament extends React.Component<T & WithTournamentProps> {
    render() {
      return <WrappedComponent {...this.props} />;
    }

    componentDidMount() {
      const {
        organizationSlug = '',
        tournamentSlug = ''
      } = this.props.match.params;
      this.props.getTournamentBySlug(organizationSlug, tournamentSlug);
    }
  }

  return WithTournament;
};

export default withTournament;
