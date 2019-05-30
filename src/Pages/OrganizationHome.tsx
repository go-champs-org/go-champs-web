import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  deleteTournament,
  postTournament,
  requestFilterTournaments
} from '../Tournaments/actions';
import { List } from '../Tournaments/List';
import { TournamentState } from '../Tournaments/state';
import { OrganizationHomeMatchProps } from './support/routerInterfaces';
import withOrganizations from './support/withOrganizations';

interface OrganizationHomeProps
  extends RouteComponentProps<OrganizationHomeMatchProps> {
  deleteTournament: any;
  postTournament: any;
  tournamentState: TournamentState;
  requestFilterTournaments: any;
}

class OrganizationHome extends React.Component<OrganizationHomeProps> {
  render() {
    return (
      <div>
        <Link to={`${this.props.match.url}/TournamentNew`}>New</Link>
        <List
          tournamentState={this.props.tournamentState}
          url={this.props.match.url}
          deleteTournament={this.props.deleteTournament}
        />
      </div>
    );
  }

  componentDidMount() {
    this.props.requestFilterTournaments({
      organization_slug: this.props.match.params.organizationSlug
    });
  }
}

const mapStateToProps = (state: any) => ({
  tournamentState: state.tournaments
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      deleteTournament,
      postTournament,
      requestFilterTournaments
    },
    dispatch
  );

export default withOrganizations(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OrganizationHome)
);
