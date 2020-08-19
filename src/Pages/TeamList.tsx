import React, { Fragment } from 'react';
import AdminMenu from '../Tournaments/AdminMenu';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import List, { ListLoading } from '../Teams/List';
import { ConnectedProps, connect } from 'react-redux';
import withTournament from './support/withTournament';
import { getTournamentBySlug } from '../Tournaments/effects';
import { deleteTeam } from '../Teams/effects';
import { bindActionCreators, Dispatch } from 'redux';
import { teams } from '../Teams/selectors';
import { StoreState } from '../store';
import { tournamentLoading } from '../Tournaments/selectors';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import ListHeader from '../Shared/UI/ListHeader';
import useFilteredItemsByString from '../Shared/hooks/useFilteredItemsByString';
import { useTranslation } from 'react-i18next';

const SearchNameInput: React.FC<{
  value: string | null;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ onInputChange, value }) => (
  <div className="column is-12">
    <input
      className="input is-small"
      type="text"
      onChange={onInputChange}
      placeholder="Search name"
      value={value ? value : ''}
    />
  </div>
);

const mapStateToProps = (state: StoreState) => ({
  teams: teams(state.teams),
  tournamentLoading: tournamentLoading(state.tournaments)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      deleteTeam,
      getTournamentBySlug
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type TeamListProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

const TeamList: React.FC<TeamListProps> = ({
  deleteTeam,
  match,
  teams,
  tournamentLoading
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const newUrl = `/${organizationSlug}/${tournamentSlug}/NewTeam`;
  const {
    items: filteredTeams,
    onPropertyNameChange: onTeamNameChange,
    searchValue: teamNameFilterValue
  } = useFilteredItemsByString(teams, 'name');

  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="column">
        <div className="columns is-vcentered is-mobile is-multiline">
          <ListHeader
            newUrl={newUrl}
            title={t('teams')}
            filters={[
              <SearchNameInput
                key="name"
                onInputChange={onTeamNameChange}
                value={teamNameFilterValue}
              />
            ]}
          />

          <div className="column is-12">
            <ComponentLoader
              canRender={!tournamentLoading}
              loader={<ListLoading />}
            >
              <List
                deleteTeam={deleteTeam}
                organizationSlug={organizationSlug}
                teams={filteredTeams}
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
};

export default connector(withTournament<TeamListProps>(TeamList));
