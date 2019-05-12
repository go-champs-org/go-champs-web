import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { bindActionCreators } from "redux";
import { requestTournament } from "../Tournaments/actions";
import { TournamentState } from "../Tournaments/state";

interface TournamentHomeProps extends RouteComponentProps {
    tournamentState: TournamentState,
    requestTournament: any,
}

class TournamentHome extends React.Component<TournamentHomeProps> {
    render() {
        return (
            <div>
                {this.props.tournamentState.isLoadingRequestTournament ?
                    <div>Loading...</div> :
                    <div>{this.props.tournamentState.tournaments["a0f1ffed-8e1c-46f2-8179-41085d10401d"] && this.props.tournamentState.tournaments["a0f1ffed-8e1c-46f2-8179-41085d10401d"].name}</div>
                }
            </div>
        )
    }

    componentDidMount() {
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