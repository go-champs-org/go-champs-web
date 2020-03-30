import React, { Fragment, useState } from 'react';
import AdminMenu from '../Tournaments/AdminMenu';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import List, { ListLoading } from '../Phases/List';
import { ConnectedProps, connect } from 'react-redux';
import withTournament from './support/withTournament';
import { getTournamentBySlug } from '../Tournaments/effects';
import { patchPhase, deletePhase } from '../Phases/effects';
import { bindActionCreators, Dispatch } from 'redux';
import { sortedPhases } from '../Phases/selectors';
import { StoreState } from '../store';
import { tournamentLoading } from '../Tournaments/selectors';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import ListHeader from '../Shared/UI/ListHeader';
import { PhaseEntity } from '../Phases/state';
import useSortedItems from '../Shared/hooks/useSortedItems';

interface SearchByTitle {
  onSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchByTitle: React.FC<SearchByTitle> = ({ onSearchInputChange }) => (
  <Fragment>
    <div className="column is-12">
      <input
        className="input is-small"
        type="text"
        onChange={onSearchInputChange}
        placeholder="Search title"
      />
    </div>
  </Fragment>
);

const mapStateToProps = (state: StoreState) => ({
  phases: sortedPhases(state.phases),
  tournamentLoading: tournamentLoading(state.tournaments)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      deletePhase,
      getTournamentBySlug,
      patchPhase
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type PhaseListProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

const PhaseList: React.FC<PhaseListProps> = ({
  deletePhase,
  match,
  phases,
  tournamentLoading
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const newUrl = `/${organizationSlug}/${tournamentSlug}/NewPhase`;

  const {
    items: sortedPhases,
    onMoveDown,
    onMoveUp,
    shouldDisplaySortButtons,
    toogleShouldDisplaySortButtons
  } = useSortedItems<PhaseEntity>(phases);

  const [searchTitleTerm, setSearchTitleTerm] = useState('');

  const onSearchTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitleTerm(event.target.value);
    event.preventDefault();
  };
  const filteredPhases = searchTitleTerm
    ? sortedPhases.filter(
        (phase: PhaseEntity) =>
          phase.title
            .toLocaleLowerCase()
            .indexOf(searchTitleTerm.toLocaleLowerCase()) >= 0
      )
    : sortedPhases;

  return (
    <Fragment>
      <div className="column">
        <div className="columns is-vcentered is-mobile is-multiline">
          <ListHeader
            newUrl={newUrl}
            title="Phases"
            filters={[
              <SearchByTitle
                key="search"
                onSearchInputChange={onSearchTitleChange}
              />
            ]}
            onSaveOrder={() => ''}
            shouldDisplaySortButtons={shouldDisplaySortButtons}
            toogleShouldDisplaySortButtons={toogleShouldDisplaySortButtons}
          />

          <div className="column is-12">
            <ComponentLoader
              canRender={!tournamentLoading}
              loader={<ListLoading />}
            >
              <List
                deletePhase={deletePhase}
                organizationSlug={organizationSlug}
                phases={filteredPhases}
                tournamentSlug={tournamentSlug}
                onMoveDown={onMoveDown}
                onMoveUp={onMoveUp}
                shouldDisplaySortButtons={shouldDisplaySortButtons}
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

export default connector(withTournament<PhaseListProps>(PhaseList));
