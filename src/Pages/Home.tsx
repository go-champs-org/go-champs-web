import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
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
				<Link to="/New">New</Link>
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
