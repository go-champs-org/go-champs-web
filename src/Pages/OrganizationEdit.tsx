import React from 'react';
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { patchOrganization } from '../Organizations/actions';
import { OrganizationState } from '../Organizations/state';
import { OrganizationHomeMatchProps } from './support/routerInterfaces';
import withOrganizations from './support/withOrganizations';

interface OrganizationEditProps extends RouteComponentProps<OrganizationHomeMatchProps> {
	patchOrganization: any,
	organizationState: OrganizationState,
};

class OrganizationEdit extends React.Component<OrganizationEditProps> {
	render() {
		const organization = this.props.organizationState.organizations[this.props.match.params.organizationSlug];
		return (
			<Form
				onSubmit={this.props.patchOrganization}
				initialValues={organization}
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
});

const mapDispatchToProps = (dispatch: any) => (
	bindActionCreators({
		patchOrganization
	}, dispatch)
);

export default withOrganizations(connect(mapStateToProps, mapDispatchToProps)(OrganizationEdit));
