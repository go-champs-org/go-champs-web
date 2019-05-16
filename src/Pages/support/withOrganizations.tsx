import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { bindActionCreators } from "redux";
import { requestOrganizations } from "../../Organizations/actions";
import { OrganizationState } from "../../Organizations/state";
import { OrganizationHomeMatchProps } from "./routerInterfaces";

interface WithOrganizationsProps extends RouteComponentProps<OrganizationHomeMatchProps> {
	organizationState: OrganizationState,
	requestOrganizations: any,
}

const withOrganizations = (WrappedComponent: any) => {
	class WithTournaments extends React.Component<WithOrganizationsProps> {
		render() {
			const canRender = this.props.organizationState.organizations[this.props.match.params.organizationSlug] && !this.props.organizationState.isLoadingRequestOrganizations;
			return (
				canRender ?
					<WrappedComponent {...this.props} /> :
					<div>Loading...</div>

			)
		}

		componentDidMount() {
			if (!this.props.organizationState.organizations[this.props.match.params.organizationSlug]) {
				this.props.requestOrganizations()
			}
		}
	}

	const mapDispatchToProps = (dispatch: any) => (
		bindActionCreators({
			requestOrganizations,
		}, dispatch)
	)

	const mapStateToProps = (state: any) => ({
		organizationState: state.organizations,
	});

	return connect(mapStateToProps, mapDispatchToProps)(WithTournaments);
}

export default withOrganizations;