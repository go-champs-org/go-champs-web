import React from 'react';
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { postTournamentGame } from '../Tournaments/Games/actions';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentGameEditProps extends RouteComponentProps<TournamentHomeMatchProps> {
	postTournamentGame: any,
}

const GameForm: React.FC<{ name: string }> = ({ name }) => (
	<div>
		<div>
			<label>Away team name</label>
			<Field
				name={`${name}.awayTeamName`}
				component="input"
				type="text"
				placeholder="Away team name"
			/>
		</div>
		<div>
			<label>Away team score</label>
			<Field
				name={`${name}.awayScore`}
				component="input"
				type="number"
				placeholder="Away team score"
			/>
		</div>
		<div>
			<label>Home team name</label>
			<Field
				name={`${name}.homeTeamName`}
				component="input"
				type="text"
				placeholder="Home team name"
			/>
		</div>
		<div>
			<label>Home team score</label>
			<Field
				name={`${name}.homeScore`}
				component="input"
				type="number"
				placeholder="Home team score"
			/>
		</div>
		<div>
			<label>Location</label>
			<Field
				name={`${name}.location`}
				component="input"
				type="text"
				placeholder="Location"
			/>
		</div>
		<div>
			<label>Datetime</label>
			<Field
				name={`${name}.datetime`}
				component="input"
				type="text"
				placeholder="Datetime"
			/>
		</div>
	</div>
);

class TournamentGameEdit extends React.Component<TournamentGameEditProps> {
	render() {
		return (
			<Form
				onSubmit={this.props.postTournamentGame}
				initialValues={{ awayTeamName: '', awayScore: 0, homeTeamName: '', homeScore: 0, location: '', datetime: '' }}
				render={({ handleSubmit, form, submitting, pristine, values }) => (
					<form onSubmit={handleSubmit}>
						<GameForm name="game" />
						<button type="submit" disabled={submitting || pristine}>
							Submit
						</button>
					</form>
				)} />
		)
	}
}

const mapDispatchToProps = (dispatch: any, state: any) => {
	const tournamentId = state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
	return (
		bindActionCreators({
			postTournamentGame: postTournamentGame(tournamentId),
		}, dispatch)
	)
}

export default withTournaments(connect(state => state, mapDispatchToProps)(TournamentGameEdit));