import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestOrganizations } from '../Organizations/actions';
import { List } from '../Organizations/List';
import { OrganizationState } from '../Organizations/state';

interface HomeProps {
    organizationState: OrganizationState,
    requestOrganizations: any,
}

class Home extends React.Component<HomeProps> {
    render() {
        return (
            <div>
                <h1>Index</h1>
                <List organizationState={this.props.organizationState} />
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
        requestOrganizations,
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Home);