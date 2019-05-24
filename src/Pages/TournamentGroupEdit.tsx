import React from 'react';
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { requestTournament } from '../Tournaments/actions';
import { patchTournamentGroup } from '../Tournaments/Groups/actions';
import { TournamentGroupState } from '../Tournaments/Groups/state';
import { TournamentState } from '../Tournaments/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentGroupEditMatch extends TournamentHomeMatchProps {
	tournamentGroupId: string;
};

interface TournamentGroupEditProps extends RouteComponentProps<TournamentGroupEditMatch> {
	patchTournamentGroup: any,
	requestTournament: any,
	tournamentState: TournamentState,
	tournamentGroupState: TournamentGroupState,
}

class TournamentGroupEdit extends React.Component<TournamentGroupEditProps> {
	render() {
		const tournamentGroup = this.props.tournamentGroupState.tournamentGroups[this.props.match.params.tournamentGroupId];
		return (
			<Form
				onSubmit={this.props.patchTournamentGroup}
				initialValues={tournamentGroup}
				render={({ handleSubmit, form, submitting, pristine, values }) => (
					<form onSubmit={handleSubmit}>
						<div>
							<label>Name</label>
							<Field
								name="name"
								component="input"
								type="text"
								placeholder="Name"
							/>
						</div>
						<button type="submit" disabled={submitting || pristine}>
							Submit
						</button>
					</form>
				)} />
		)
	}

	componentDidMount() {
		const tournamentId = this.props.tournamentState.tournaments[this.props.match.params.tournamentSlug].id;
		this.props.requestTournament(tournamentId);
	}
}

const mapStateToProps = (state: any) => ({
	tournamentState: state.tournaments,
	tournamentGroupState: state.tournamentGroups,
})

const mapDispatchToProps = (dispatch: any, state: any) => {
	const tournamentId = state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
	return (
		bindActionCreators({
			patchTournamentGroup: patchTournamentGroup(tournamentId),
			requestTournament,
		}, dispatch)
	)
}

export default withTournaments(connect(mapStateToProps, mapDispatchToProps)(TournamentGroupEdit));