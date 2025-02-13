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
import { MOCK_REGISTRATIONS } from '../Registrations/state';
import { useTranslation } from 'react-i18next';
import ListHeader from '../Shared/UI/ListHeader';

const mapStateToProps = (state: StoreState) => ({
  tournamentLoading: tournamentLoading(state.tournaments)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type RegistrationDashboardProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

function RegistrationDashboard({
  tournamentLoading,
  match
}: RegistrationDashboardProps) {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const registrations = MOCK_REGISTRATIONS;
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
                // deleteTeam={deleteTeam}
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

export default connector(RegistrationDashboard);
