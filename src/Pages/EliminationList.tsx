import React, { Fragment } from 'react';
import TopBreadcrumbs from '../Tournaments/Common/TopBreadcrumbs';
import AdminMenu from '../Tournaments/AdminMenu';
import { connect, ConnectedProps } from 'react-redux';
import { deleteElimination } from '../Eliminations/effects';
import { phaseByIdOrDefault, sortedPhases } from '../Phases/selectors';
import { StoreState } from '../store';
import withPhase from './support/withPhase';
import { eliminations, eliminationsLoading } from '../Eliminations/selectors';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import List, { ListLoading } from '../Eliminations/List';
import { bindActionCreators, Dispatch } from 'redux';
import { Link } from 'react-router-dom';

interface OwnProps {
  organizationSlug: string;
  phaseId: string;
  tournamentSlug: string;
}

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  return {
    eliminations: eliminations(state.eliminations),
    eliminationsLoading: eliminationsLoading(state.eliminations),
    phase: phaseByIdOrDefault(state.phases, props.phaseId),
    phases: sortedPhases(state.phases)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      deleteElimination
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type EliminationListProps = ConnectedProps<typeof connector> & OwnProps;

const EliminationList: React.FC<EliminationListProps> = ({
  deleteElimination,
  eliminations,
  eliminationsLoading,
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
                <h2 className="subtitle">Eliminations</h2>
              </div>

              <div className="column is-2 has-text-right">
                <Link
                  className="button is-text"
                  to={`/${organizationSlug}/${tournamentSlug}/Manage/${phaseId}/NewElimination`}
                >
                  New
                </Link>
              </div>

              <div className="column is-12">
                <ComponentLoader
                  canRender={!eliminationsLoading}
                  loader={<ListLoading />}
                >
                  <List
                    baseUrl={baseUrl}
                    deleteElimination={deleteElimination}
                    eliminations={eliminations}
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

export default connector(withPhase<EliminationListProps>(EliminationList));