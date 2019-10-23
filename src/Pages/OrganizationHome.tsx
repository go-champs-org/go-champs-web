import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { StoreState } from '../store';
import {
  deleteTournament,
  getTournamentsByFilter,
  postTournament
} from '../Tournaments/effects';
import { TournamentState } from '../Tournaments/state';
import { OrganizationHomeMatchProps } from './support/routerInterfaces';
import withOrganizations from './support/withOrganizations';

interface OrganizationHomeProps
  extends RouteComponentProps<OrganizationHomeMatchProps> {
  deleteTournament: any;
  postTournament: any;
  tournamentState: TournamentState;
  getTournamentsByFilter: any;
}

class OrganizationHome extends React.Component<OrganizationHomeProps> {
  render() {
    return (
      <div>
        <Link to={`${this.props.match.url}/TournamentNew`}>New</Link>
      </div>
    );
  }

  componentDidMount() {
    this.props.getTournamentsByFilter({
      organization_slug: this.props.match.params.organizationSlug
    });
  }
}

const mapStateToProps = (state: StoreState) => ({
  tournamentState: state.tournaments
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      deleteTournament,
      postTournament,
      getTournamentsByFilter
    },
    dispatch
  );

export default withOrganizations(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OrganizationHome)
);
