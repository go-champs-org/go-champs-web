import React from 'react';
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { OrganizationEntity, OrganizationState } from '../Organizations/state';
import { deleteTournament, postTournament, requestFilterTournaments } from '../Tournaments/actions';
import { List } from '../Tournaments/List';
import { TournamentState } from '../Tournaments/state';
import { OrganizationHomeMatchProps } from './support/routerInterfaces';

interface OrganizationHomeProps extends RouteComponentProps<OrganizationHomeMatchProps> {
  deleteTournament: any,
  organizationState: OrganizationState,
  postTournament: any,
  tournamentState: TournamentState,
  requestFilterTournaments: any,
}

const appendOrganizationIdAndTrigger = (organization: OrganizationEntity, f: any) => (tournament: any) => {
  const completeTournament = {
    ...tournament,
    organization_id: organization.id,
  }

  f(completeTournament);
}

class OrganizationHome extends React.Component<OrganizationHomeProps> {
  render() {
    const organizationId = this.props.organizationState.organizations[this.props.match.params.organizationSlug].id;

    return (
      <div>
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
        <List tournamentState={this.props.tournamentState} url={this.props.match.url} deleteTournament={this.props.deleteTournament} />
      </div>
    )
  }

  componentDidMount() {
    this.props.requestFilterTournaments({ organization_slug: this.props.match.params.organizationSlug })
  }
}

const mapStateToProps = (state: any) => ({
  organizationState: state.organizations,
  tournamentState: state.tournaments,
});

const mapDispatchToProps = (dispatch: any) => (
  bindActionCreators({
    deleteTournament,
    postTournament,
    requestFilterTournaments,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationHome);
