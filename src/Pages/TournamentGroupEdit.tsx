import React from 'react';
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { postTournamentGroup } from '../Tournaments/Groups/actions';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentGroupEditProps extends RouteComponentProps<TournamentHomeMatchProps> {
	postTournamentGroup: any,
}

class TournamentGroupEdit extends React.Component<TournamentGroupEditProps> {
	render() {
		return (
			<Form
				onSubmit={this.props.postTournamentGroup}
				initialValues={{ name: '' }}
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
}

const mapDispatchToProps = (dispatch: any, state: any) => {
	const tournamentId = state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
	return (
		bindActionCreators({
			postTournamentGroup: postTournamentGroup(tournamentId),
		}, dispatch)
	)
}

export default withTournaments(connect(state => state, mapDispatchToProps)(TournamentGroupEdit));