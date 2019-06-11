import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { postOrganization } from '../Organizations/actions';
import New from '../Organizations/New';

interface OrganizationNewProps extends RouteComponentProps {
  postOrganization: any;
}

class OrganizationNew extends React.Component<OrganizationNewProps> {
  render() {
    return <New postOrganization={this.props.postOrganization} />;
  }
}
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      postOrganization
    },
    dispatch
  );

export default connect(
  state => state,
  mapDispatchToProps
)(OrganizationNew);
