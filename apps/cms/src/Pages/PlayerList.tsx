import React, { Fragment } from 'react';
import AdminMenu from '../Tournaments/AdminMenu';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import List, { ListLoading } from '../Players/List';
import { ConnectedProps, connect } from 'react-redux';
import withTournament from './support/withTournament';
import { getTournamentBySlug } from '../Tournaments/effects';
import { deletePlayer } from '../Players/effects';
import { bindActionCreators, Dispatch } from 'redux';
import { players, patchingPlayer } from '../Players/selectors';
import { StoreState } from '../store';
import { tournamentLoading } from '../Tournaments/selectors';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import ListHeader from '../Shared/UI/ListHeader';
import useFilteredItemsByString from '../Shared/hooks/useFilteredItemsByString';
import { SelectOptionType } from '../Shared/UI/Form/Select';
import { teamsForSelectInput } from '../Teams/selectors';
import { default as ReactSelect } from 'react-select';
import { ValueType } from 'react-select/lib/types';
import './PlayerList.scss';
import { useTranslation } from 'react-i18next';

const SearchTeamInput: React.FC<{
  value: string | null;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectInputTeams: SelectOptionType[];
}> = ({ onInputChange, selectInputTeams, value }) => {
  const onChange = (selected: ValueType<SelectOptionType>) => {
    const event = ({
      preventDefault: () => {},
      target: selected || {
        value: undefined
      }
    } as unknown) as React.ChangeEvent<HTMLInputElement>;
    onInputChange(event);
  };
  const selectValue = selectInputTeams.find(team => team.value === value);

  return (
    <div className="column is-12">
      <ReactSelect
        className="select-filter-override"
        isClearable
        value={selectValue}
        options={selectInputTeams}
        onChange={onChange}
        name="teamId"
      />
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  isPatchingPlayer: patchingPlayer(state.players),
  players: players(state.players, state.teams),
  selectInputTeams: teamsForSelectInput(state.teams),
  tournamentLoading: tournamentLoading(state.tournaments)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      deletePlayer,
      getTournamentBySlug
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type PlayerListProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

function PlayerList({
  deletePlayer,
  isPatchingPlayer,
  match,
  players,
  selectInputTeams,
  tournamentLoading
}: PlayerListProps) {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const newUrl = `/${organizationSlug}/${tournamentSlug}/NewPlayer`;

  const {
    items: filteredPlayers,
    onPropertyNameChange: onPlayerNameChange,
    searchValue: teamNameFilterValue
  } = useFilteredItemsByString(players, 'teamId');

  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="column">
        <div className="columns is-vcentered is-mobile is-multiline">
          <ListHeader
            newUrl={newUrl}
            title={t('players')}
            isSavingOrder={isPatchingPlayer}
            filters={[
              <SearchTeamInput
                key="teamId"
                onInputChange={onPlayerNameChange}
                selectInputTeams={selectInputTeams}
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
                deletePlayer={deletePlayer}
                organizationSlug={organizationSlug}
                players={filteredPlayers}
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

export default connector(withTournament<PlayerListProps>(PlayerList));
