import React from 'react';
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { patchTournament } from '../Tournaments/actions';
import { TournamentState } from '../Tournaments/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentNewProps extends RouteComponentProps<TournamentHomeMatchProps> {
	tournamentState: TournamentState,
	patchTournament: any,
}

class TournamentNew extends React.Component<TournamentNewProps> {
	render() {
		const tournament = this.props.tournamentState.tournaments[this.props.match.params.tournamentSlug];
		return (
			<Form
				onSubmit={this.props.patchTournament}
				initialValues={tournament}
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
						<div>
							<label>Slug</label>
							<Field
								name="slug"
								component="input"
								type="text"
								placeholder="slug"
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

const mapStateToProps = (state: any) => ({
	tournamentState: state.tournaments,
})

const mapDispatchToProps = (dispatch: any) => (
	bindActionCreators({
		patchTournament,
	}, dispatch)
)

export default withTournaments(connect(mapStateToProps, mapDispatchToProps)(TournamentNew));