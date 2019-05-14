import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { requestFilterTournaments } from '../Tournaments/actions';
import { List } from '../Tournaments/List';
import { TournamentState } from '../Tournaments/state';
import { OrganizationHomeMatchProps } from './support/routerInterfaces';

interface OrganizationHomeProps extends RouteComponentProps<OrganizationHomeMatchProps> {
    tournamentState: TournamentState,
    requestFilterTournaments: any,
}

class OrganizationHome extends React.Component<OrganizationHomeProps> {
    render() {
        return (
            <div>
                <List tournamentState={this.props.tournamentState} url={this.props.match.url} />
            </div>
        )
    }

    componentDidMount() {
        this.props.requestFilterTournaments({ organization_slug: this.props.match.params.organizationSlug })
    }
}

const mapStateToProps = (state: any) => ({
    tournamentState: state.tournaments,
});

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
        requestFilterTournaments,
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationHome);