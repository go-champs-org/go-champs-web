import React, { Fragment } from 'react';
import { StoreState } from '../store';
import { tournamentLoading } from '../Tournaments/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProps } from './support/routerInterfaces';
import { RouteComponentProps } from 'react-router-dom';
import AdminMenu from '../Tournaments/AdminMenu';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import List, { ListLoading } from '../Registrations/List';
import { useTranslation } from 'react-i18next';
import ListHeader from '../Shared/UI/ListHeader';
import { registrations } from '../Registrations/selectors';
import { deleteRegistration } from '../Registrations/effects';
import withTournament from './support/withTournament';
import { getTournamentBySlug } from '../Tournaments/effects';

const mapStateToProps = (state: StoreState) => ({
  registrations: registrations(state.registrations),
  tournamentLoading: tournamentLoading(state.tournaments)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      deleteRegistration,
      getTournamentBySlug
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type RegistrationDashboardProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

function RegistrationDashboard({
  deleteRegistration,
  registrations,
  tournamentLoading,
  match
}: RegistrationDashboardProps) {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const { t } = useTranslation();
  const newUrl = `/${organizationSlug}/${tournamentSlug}/NewRegistration`;
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-vcentered is-mobile is-multiline">
          <ListHeader newUrl={newUrl} title={t('registrations')} />

          <div className="column is-12">
            <ComponentLoader
              canRender={!tournamentLoading}
              loader={<ListLoading />}
            >
              <List
                deleteRegistration={deleteRegistration}
                organizationSlug={organizationSlug}
                registrations={registrations}
                tournamentSlug={tournamentSlug}
              />
            </ComponentLoader>
          </div>
        </div>
      </div>
      <div className="is-divider-vertical is-hidden-tablet-only"></div>

      <div className="column is-4-desktop is-12-tablet">
        <AdminMenu
          organizationSlug={organizationSlug}
          tournamentSlug={tournamentSlug}
        />
      </div>
    </Fragment>
  );
}

export default connector(
  withTournament<RegistrationDashboardProps>(RegistrationDashboard)
);
