import React from 'react';
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { deleteOrganization, postOrganization, requestOrganizations } from '../Organizations/actions';
import { List } from '../Organizations/List';
import { OrganizationState } from '../Organizations/state';

interface HomeProps extends RouteComponentProps {
	deleteOrganization: any,
	organizationState: OrganizationState,
	postOrganization: any,
	requestOrganizations: any,
}

class Home extends React.Component<HomeProps> {
	render() {
		return (
			<div>
				<h1>Index</h1>
				<Form
					onSubmit={this.props.postOrganization}
					initialValues={{ name: '', slug: '' }}
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
				<List organizationState={this.props.organizationState} url={this.props.match.url} deleteOrganization={this.props.deleteOrganization} />
			</div>
		);
	}

	componentDidMount() {
		this.props.requestOrganizations();
	}
}

const mapStateToProps = (state: any) => ({
	organizationState: state.organizations,
});

const mapDispatchToProps = (dispatch: any) => (
	bindActionCreators({
		deleteOrganization,
		postOrganization,
		requestOrganizations,
	}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Home);