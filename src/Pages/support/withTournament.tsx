import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { getTournamentBySlug } from '../../Tournaments/effects';
import { TournamentHomeMatchProps } from './routerInterfaces';

interface WithTournamentProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  getTournamentBySlug: (organizationSlug: string, tournamentSlug: string) => {};
}

const withTournament = (WrappedComponent: any) => {
  class WithTournament extends React.Component<WithTournamentProps> {
    render() {
      return <WrappedComponent {...this.props} />;
    }

    componentDidMount() {
      const { organizationSlug, tournamentSlug } = this.props.match.params;
      this.props.getTournamentBySlug(organizationSlug, tournamentSlug);
    }
  }

  const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
      {
        getTournamentBySlug
      },
      dispatch
    );
  };

  return connect(state => state, mapDispatchToProps)(WithTournament);
};

export default withTournament;
