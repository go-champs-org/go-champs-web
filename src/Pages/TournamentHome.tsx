import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { bindActionCreators } from "redux";
import { requestFilterTournaments, requestTournament } from "../Tournaments/actions";
import { TournamentState } from "../Tournaments/state";

interface MatchProps {
    tournamentSlug: string,
    organizationSlug: string,
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
                    <div>{this.props.tournamentState.tournaments[this.props.match.params.tournamentSlug] && this.props.tournamentState.tournaments[this.props.match.params.tournamentSlug].name}</div>
                }
            </div>
        )
    }

    componentDidMount() {
        const tournamentId = this.props.tournamentState.tournaments[this.props.match.params.tournamentSlug].id;
        this.props.requestTournament(tournamentId);
    }
}

const mapStateToProps = (state: any) => ({
    tournamentState: state.tournaments,
});

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
        requestTournament,
        requestFilterTournaments,
    }, dispatch)
)

interface WithTournamentsProps extends RouteComponentProps<MatchProps> {
    tournamentState: TournamentState,
    requestFilterTournaments: any,
}

const withTournaments = (WrappedComponent: any) => {
    return class extends React.Component<WithTournamentsProps> {
        render() {
            const canRender = this.props.tournamentState.tournaments[this.props.match.params.tournamentSlug] && !this.props.tournamentState.isLoadingRequestTournaments;
            return (
                canRender ?
                    <WrappedComponent {...this.props} /> :
                    <div>Loading...</div>

            )
        }

        componentDidMount() {
            this.props.requestFilterTournaments({ organization_slug: this.props.match.params.organizationSlug })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTournaments(TournamentHome));