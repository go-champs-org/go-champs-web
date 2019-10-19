import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  deleteOrganization,
  getOrganizations,
  postOrganization
} from '../Organizations/effects';
import { List } from '../Organizations/List';
import { OrganizationState } from '../Organizations/state';
import { StoreState } from '../store';

interface HomeProps extends RouteComponentProps {
  deleteOrganization: any;
  organizationState: OrganizationState;
  postOrganization: any;
  getOrganizations: any;
}

class Home extends React.Component<HomeProps> {
  render() {
    return (
      <div>
        <Link to="/New">New</Link>
        <List
          organizationState={this.props.organizationState}
          url={this.props.match.url}
          deleteOrganization={this.props.deleteOrganization}
        />
      </div>
    );
  }

  componentDidMount() {
    this.props.getOrganizations();
  }
}

const mapStateToProps = (state: StoreState) => ({
  organizationState: state.organizations
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      deleteOrganization,
      postOrganization,
      getOrganizations
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
