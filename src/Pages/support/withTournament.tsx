import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import {
  loadDefaultPhasePayload,
  LoadDefaultPhasePayload
} from '../../Shared/store/routerActions';
import { TournamentHomeMatchProps } from './routerInterfaces';

interface WithTournamentProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  loadDefaultPhasePayload: (payload: LoadDefaultPhasePayload) => {};
}

const withTournament = (WrappedComponent: any) => {
  class WithTournament extends React.Component<WithTournamentProps> {
    render() {
      return <WrappedComponent {...this.props} />;
    }

    componentDidMount() {
      const { organizationSlug, tournamentSlug } = this.props.match.params;
      this.props.loadDefaultPhasePayload({ organizationSlug, tournamentSlug });
    }
  }

  const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
      {
        loadDefaultPhasePayload
      },
      dispatch
    );
  };

  return connect(
    state => state,
    mapDispatchToProps
  )(WithTournament);
};

export default withTournament;
