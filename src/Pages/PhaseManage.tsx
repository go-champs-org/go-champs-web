import React, { Fragment } from 'react';
import { StoreState } from '../store';
import { phaseByIdOrDefault, sortedPhases } from '../Phases/selectors';
import { allEliminationStats } from '../Phases/EliminationStats/selectors';
import { draws } from '../Draws/selectors';
import { allElimination } from '../Eliminations/selectors';
import { connect, ConnectedProps } from 'react-redux';
import withPhase from './support/withPhase';
import { PhaseTypes } from '../Phases/state';
import TopBreadcrumbs from '../Tournaments/Common/TopBreadcrumbs';
import AdminMenu from '../Tournaments/AdminMenu';
import { default as DrawView } from '../Draws/View';
import { default as EliminationView } from '../Eliminations/View';

interface OwnProps {
  organizationSlug: string;
  phaseId: string;
  tournamentSlug: string;
}

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  return {
    phase: phaseByIdOrDefault(state.phases, props.phaseId),
    phases: sortedPhases(state.phases),
    eliminationStats: allEliminationStats(state.eliminationStats),
    draws: draws(state.draws),
    eliminations: allElimination(state.eliminations),
    teams: state.teams.teams
  };
};

const connector = connect(mapStateToProps);

type PhaseManageProps = ConnectedProps<typeof connector> & OwnProps;

const PhaseManage: React.FC<PhaseManageProps> = ({
  organizationSlug,
  phase,
  phases,
  eliminationStats,
  draws,
  eliminations,
  teams,
  tournamentSlug
}) => {
  const MainContent =
    phase!.type === PhaseTypes.elimination ? (
      <EliminationView
        {...{
          eliminationStats,
          eliminations,
          teams
        }}
      />
    ) : (
      <DrawView {...{ draws }} />
    );

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
          <div className="column">{MainContent}</div>

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

export default connector(withPhase<PhaseManageProps>(PhaseManage));
