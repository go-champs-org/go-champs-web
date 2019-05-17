import React from 'react';
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { postOrganization } from '../Organizations/actions';

interface OrganizationEditProps extends RouteComponentProps {
	postOrganization: any,
}

class OrganizationEdit extends React.Component<OrganizationEditProps> {
	render() {
		return (
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
		)
	}
}
const mapDispatchToProps = (dispatch: any) => (
	bindActionCreators({
		postOrganization,
	}, dispatch)
)

export default connect(state => state, mapDispatchToProps)(OrganizationEdit);