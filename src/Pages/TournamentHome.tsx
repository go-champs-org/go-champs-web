import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { bindActionCreators } from "redux";
import { requestTournament } from "../Tournaments/actions";
import { TournamentState } from "../Tournaments/state";

interface MatchProps {
    tournamentId: string,
    organizationId: string,
}

interface TournamentHomeProps extends RouteComponentProps<MatchProps> {
    tournamentState: TournamentState,
    requestTournament: any,
}

class TournamentHome extends React.Component<TournamentHomeProps> {
    render() {
        return (
            <div>
                {this.props.tournamentState.isLoadingRequestTournament ?
                    <div>Loading...</div> :
                    <div>{this.props.tournamentState.tournaments[this.props.match.params.tournamentId] && this.props.tournamentState.tournaments[this.props.match.params.tournamentId].name}</div>
                }
            </div>
        )
    }

    componentDidMount() {
        // TODO: Allow request with slug
        this.props.requestTournament("a0f1ffed-8e1c-46f2-8179-41085d10401d");
    }
}

const mapStateToProps = (state: any) => ({
    tournamentState: state.tournaments,
});

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
        requestTournament,
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(TournamentHome);