import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { requestTournaments } from '../Tournaments/actions';
import { List } from '../Tournaments/List';
import { TournamentState } from '../Tournaments/state';

interface OrganizationHomeProps extends RouteComponentProps {
    tournamentState: TournamentState,
    requestTournaments: any,
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
        this.props.requestTournaments();
    }
}

const mapStateToProps = (state: any) => ({
    tournamentState: state.tournaments,
});

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
        requestTournaments,
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationHome);