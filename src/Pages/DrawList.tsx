import React, { Fragment } from 'react';
import TopBreadcrumbs from '../Tournaments/Common/TopBreadcrumbs';
import AdminMenu from '../Tournaments/AdminMenu';
import { connect, ConnectedProps } from 'react-redux';
import { deleteDraw, patchBatchDraw } from '../Draws/effects';
import { phaseByIdOrDefault, sortedPhases } from '../Phases/selectors';
import { StoreState } from '../store';
import withPhase from './support/withPhase';
import { draws, drawsLoading, patchingDraw } from '../Draws/selectors';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import List, { ListLoading } from '../Draws/List';
import { bindActionCreators, Dispatch } from 'redux';
import ListHeader from '../Shared/UI/ListHeader';
import { DrawEntity } from '../Draws/state';
import useSortedItems from '../Shared/hooks/useSortedItems';
import { mapDrawsOrderByIndex } from '../Draws/dataMappers';
import { useTranslation } from 'react-i18next';

interface OwnProps {
  organizationSlug: string;
  phaseId: string;
  tournamentSlug: string;
}

const mapStateToProps = (state: StoreState, props: OwnProps) => ({
  draws: draws(state.draws),
  drawsLoading: drawsLoading(state.draws),
  isPatchingDraw: patchingDraw(state.draws),
  phase: phaseByIdOrDefault(state.phases, props.phaseId),
  phases: sortedPhases(state.phases)
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      deleteDraw,
      patchBatchDraw
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type DrawListProps = ConnectedProps<typeof connector> & OwnProps;

const DrawList: React.FC<DrawListProps> = ({
  deleteDraw,
  draws,
  drawsLoading,
  isPatchingDraw,
  patchBatchDraw,
  phase,
  phaseId,
  phases,
  organizationSlug,
  tournamentSlug
}) => {
  const baseUrl = `/${organizationSlug}/${tournamentSlug}/Manage/${phaseId}`;
  const newUrl = `${baseUrl}/NewDraw`;

  const {
    items: sortedDraws,
    onCancelSort,
    onMoveDown,
    onMoveUp,
    shouldDisplaySortButtons,
    toggleShouldDisplaySortButtons
  } = useSortedItems<DrawEntity>(draws);

  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="column is-12">
        <TopBreadcrumbs
          organizationSlug={organizationSlug}
          phases={phases}
          tournamentSlug={tournamentSlug}
        />
      </div>

      <div className="column is-12">
        <div className="columns is-multiline">
          <div className="column">
            <div className="columns is-vcentered is-mobile is-multiline">
              <ListHeader
                newUrl={newUrl}
                title={t('draws')}
                onSaveOrder={() =>
                  patchBatchDraw(mapDrawsOrderByIndex(sortedDraws))
                }
                onCancelOrder={onCancelSort}
                isSavingOrder={isPatchingDraw}
                shouldDisplaySortButtons={shouldDisplaySortButtons}
                toggleShouldDisplaySortButtons={toggleShouldDisplaySortButtons}
              />

              <div className="column is-12">
                <ComponentLoader
                  canRender={!drawsLoading}
                  loader={<ListLoading />}
                >
                  <List
                    baseUrl={baseUrl}
                    deleteDraw={deleteDraw}
                    draws={sortedDraws}
                    onMoveDown={onMoveDown}
                    onMoveUp={onMoveUp}
                    shouldDisplaySortButtons={shouldDisplaySortButtons}
                  />
                </ComponentLoader>
              </div>
            </div>
          </div>

          <div className="is-divider-vertical is-hidden-tablet-only"></div>

          <aside className="column is-4-desktop is-12-tablet">
            <AdminMenu
              organizationSlug={organizationSlug}
              tournamentSlug={tournamentSlug}
              phase={phase}
            />
          </aside>
        </div>
      </div>
    </Fragment>
  );
};

export default connector(withPhase<DrawListProps>(DrawList));
