import React, { Fragment } from 'react';
import TopBreadcrumbs from '../Tournaments/Common/TopBreadcrumbs';
import AdminMenu from '../Tournaments/AdminMenu';
import { connect, ConnectedProps } from 'react-redux';
import { deleteDraw } from '../Draws/effects';
import { phaseByIdOrDefault, sortedPhases } from '../Phases/selectors';
import { StoreState } from '../store';
import withPhase from './support/withPhase';
import { draws, drawsLoading } from '../Draws/selectors';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import List, { ListLoading } from '../Draws/List';
import { bindActionCreators, Dispatch } from 'redux';
import { Link } from 'react-router-dom';

interface OwnProps {
  organizationSlug: string;
  phaseId: string;
  tournamentSlug: string;
}

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  return {
    draws: draws(state.draws),
    drawsLoading: drawsLoading(state.draws),
    phase: phaseByIdOrDefault(state.phases, props.phaseId),
    phases: sortedPhases(state.phases)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      deleteDraw
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
  phase,
  phaseId,
  phases,
  organizationSlug,
  tournamentSlug
}) => {
  const baseUrl = `/${organizationSlug}/${tournamentSlug}/Manage/${phaseId}`;
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
              <div className="column is-10">
                <h2 className="subtitle">Draws</h2>
              </div>

              <div className="column is-2 has-text-right">
                <Link
                  className="button is-text"
                  to={`/${organizationSlug}/${tournamentSlug}/Manage/${phaseId}/NewDraw`}
                >
                  New
                </Link>
              </div>

              <div className="column is-12">
                <ComponentLoader
                  canRender={!drawsLoading}
                  loader={<ListLoading />}
                >
                  <List
                    baseUrl={baseUrl}
                    deleteDraw={deleteDraw}
                    draws={draws}
                  />
                </ComponentLoader>
              </div>
            </div>
          </div>

          <div className="is-divider-vertical"></div>

          <aside className="column is-4">
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
