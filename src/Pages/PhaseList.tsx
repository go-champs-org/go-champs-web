import React, { Fragment } from 'react';
import AdminMenu from '../Tournaments/AdminMenu';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import List, { ListLoading } from '../Phases/List';
import { ConnectedProps, connect } from 'react-redux';
import withTournament from './support/withTournament';
import { getTournamentBySlug } from '../Tournaments/effects';
import { patchPhase, deletePhase, patchBatchPhase } from '../Phases/effects';
import { bindActionCreators, Dispatch } from 'redux';
import { sortedPhases, patchingPhase } from '../Phases/selectors';
import { StoreState } from '../store';
import { tournamentLoading } from '../Tournaments/selectors';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import ListHeader from '../Shared/UI/ListHeader';
import { PhaseEntity } from '../Phases/state';
import useSortedItems from '../Shared/hooks/useSortedItems';
import { mapPhasesOrderByIndex } from '../Phases/dataMappers';

const mapStateToProps = (state: StoreState) => ({
  isPatchingPhase: patchingPhase(state.phases),
  phases: sortedPhases(state.phases),
  tournamentLoading: tournamentLoading(state.tournaments)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      deletePhase,
      getTournamentBySlug,
      patchPhase,
      patchBatchPhase
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type PhaseListProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

const PhaseList: React.FC<PhaseListProps> = ({
  deletePhase,
  isPatchingPhase,
  match,
  patchBatchPhase,
  phases,
  tournamentLoading
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const newUrl = `/${organizationSlug}/${tournamentSlug}/NewPhase`;

  const {
    items: sortedPhases,
    onCancelSort,
    onMoveDown,
    onMoveUp,
    shouldDisplaySortButtons,
    toggleShouldDisplaySortButtons
  } = useSortedItems<PhaseEntity>(phases);

  return (
    <Fragment>
      <div className="column">
        <div className="columns is-vcentered is-mobile is-multiline">
          <ListHeader
            newUrl={newUrl}
            title="Phases"
            onSaveOrder={() =>
              patchBatchPhase(mapPhasesOrderByIndex(sortedPhases))
            }
            isSavingOrder={isPatchingPhase}
            onCancelOrder={onCancelSort}
            shouldDisplaySortButtons={shouldDisplaySortButtons}
            toggleShouldDisplaySortButtons={toggleShouldDisplaySortButtons}
          />

          <div className="column is-12">
            <ComponentLoader
              canRender={!tournamentLoading}
              loader={<ListLoading />}
            >
              <List
                deletePhase={deletePhase}
                organizationSlug={organizationSlug}
                phases={sortedPhases}
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
