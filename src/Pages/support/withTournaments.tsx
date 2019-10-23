import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import PageLoader from '../../Shared/UI/PageLoader';
import { StoreState } from '../../store';
import { getTournamentsByFilter } from '../../Tournaments/effects';
import { TournamentState } from '../../Tournaments/state';
import { TournamentHomeMatchProps } from './routerInterfaces';

interface WithTournamentsProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  tournamentState: TournamentState;
  getTournamentsByFilter: any;
}

const withTournaments = (WrappedComponent: any) => {
  class WithTournaments extends React.Component<WithTournamentsProps> {
    render() {
      const canRender =
        this.props.tournamentState.tournaments[
          this.props.match.params.tournamentSlug
        ] && !this.props.tournamentState.isLoadingRequestTournaments;
      return (
        <PageLoader canRender={canRender}>
          <WrappedComponent {...this.props} />
        </PageLoader>
      );
    }

    componentDidMount() {
      if (
        !this.props.tournamentState.tournaments[
          this.props.match.params.tournamentSlug
        ]
      ) {
        this.props.getTournamentsByFilter({
          organization_slug: this.props.match.params.organizationSlug
        });
      }
    }
  }

  const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
      {
        getTournamentsByFilter
      },
      dispatch
    );

  const mapStateToProps = (state: StoreState) => ({
    tournamentState: state.tournaments,
    organizationState: state.organizations
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithTournaments);
};

export default withTournaments;
