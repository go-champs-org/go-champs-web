import React from 'react';
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { OrganizationState } from '../Organizations/state';
import { postTournament } from '../Tournaments/actions';
import { OrganizationHomeMatchProps } from './support/routerInterfaces';
import withOrganizations from './support/withOrganizations';

interface TournamentNewProps extends RouteComponentProps<OrganizationHomeMatchProps> {
	organizationState: OrganizationState,
	postTournament: any,
}

class TournamentNew extends React.Component<TournamentNewProps> {
	render() {
		const organizationId = this.props.organizationState.organizations[this.props.match.params.organizationSlug].id;
		return (
			<Form
				onSubmit={this.props.postTournament}
				initialValues={{ name: '', slug: '', organization_id: organizationId, }}
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
	organizationState: state.organizations,
})

const mapDispatchToProps = (dispatch: any) => (
	bindActionCreators({
		postTournament,
	}, dispatch)
)

export default withOrganizations(connect(mapStateToProps, mapDispatchToProps)(TournamentNew));