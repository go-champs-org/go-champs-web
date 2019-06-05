import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import PageLoader from '../../Shared/UI/PageLoader';
import { requestFilterTournaments } from '../../Tournaments/actions';
import { TournamentState } from '../../Tournaments/state';
import { TournamentHomeMatchProps } from './routerInterfaces';

interface WithTournamentsProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  tournamentState: TournamentState;
  requestFilterTournaments: any;
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
        this.props.requestFilterTournaments({
          organization_slug: this.props.match.params.organizationSlug
        });
      }
    }
  }

  const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
      {
        requestFilterTournaments
      },
      dispatch
    );

  const mapStateToProps = (state: any) => ({
    tournamentState: state.tournaments,
    organizationState: state.organizations,
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithTournaments);
};

export default withTournaments;
