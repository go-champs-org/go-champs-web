import React, { Fragment } from 'react';
import withPhase from './support/withPhase';
import { phaseByIdOrDefault, sortedPhases } from '../Phases/selectors';
import { StoreState } from '../store';
import { connect, ConnectedProps } from 'react-redux';
import {
  gameDates,
  gamesByDate,
  gamesCloserGameDatePosition,
  gamesLoading
} from '../Games/selectors';
import { draws } from '../Draws/selectors';
import { sortedEliminations } from '../Eliminations/selectors';
import { default as DrawView } from '../Draws/View';
import { default as GameListByCalendar } from '../Games/ListByCalendar';
import { default as EliminationView } from '../Eliminations/View';
import { PhaseTypes } from '../Phases/state';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import TopBreadcrumbs from '../Tournaments/Common/TopBreadcrumbs';
import { useRouteMatch } from 'react-router-dom';
import { organizationBySlug } from '../Organizations/selectors';
import './PhaseHome.scss';

interface OwnProps {
  organizationSlug: string;
  phaseId: string;
  tournamentSlug: string;
}

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  return {
    gamesByDate: gamesByDate(state.games),
    gamesInitialDatePosition: gamesCloserGameDatePosition(state.games),
    gamesLoading: gamesLoading(state.games),
    gameDates: gameDates(state.games),
    organization: organizationBySlug(
      state.organizations,
      props.organizationSlug
    ),
    phase: phaseByIdOrDefault(state.phases, props.phaseId),
    phases: sortedPhases(state.phases),
    draws: draws(state.draws),
    eliminations: sortedEliminations(state.eliminations),
    teams: state.teams.teams
  };
};

const connector = connect(mapStateToProps);

type PhaseHomeProps = ConnectedProps<typeof connector> & OwnProps;

const PhaseHome: React.FC<PhaseHomeProps> = ({
  draws,
  eliminations,
  gameDates,
  gamesByDate,
  gamesInitialDatePosition,
  gamesLoading,
  organization,
  organizationSlug,
  phase,
  phases,
  teams,
  tournamentSlug
}) => {
  const route = useRouteMatch();
  const baseUrl = route.url;
  const tournamentBaseUrl = `/${organizationSlug}/${tournamentSlug}`;

  const MainContent =
    phase!.type === PhaseTypes.elimination ? (
      <EliminationView
        {...{
          baseUrl: tournamentBaseUrl,
          eliminationStats: phase.eliminationStats,
          eliminations,
          teams
        }}
      />
    ) : (
      <DrawView
        {...{
          draws,
          teams,
          baseUrl: tournamentBaseUrl
        }}
      />
    );

  return (
    <Fragment>
      <div className="column is-12">
        <TopBreadcrumbs
          organization={organization}
          organizationSlug={organizationSlug}
          phases={phases}
          tournamentSlug={tournamentSlug}
        />
      </div>

      <div className="phase-home column is-12">
        <div className="columns is-multiline">
          <main className="column">
            <>
              {phase.isProcessing && (
                <div className="is-processing">
                  <span className="icon is-small">
                    <i className="fas fa-spinner fa-pulse"></i>
                  </span>
                  <span className="has-text-small">
                    Atualizando resultados...
                  </span>
                </div>
              )}
              {MainContent}
            </>
          </main>

          <div className="is-divider-vertical is-hidden-tablet-only"></div>

          <aside className="column is-4-desktop is-12-tablet">
            <ComponentLoader canRender={!gamesLoading} loader={'Loading'}>
              <GameListByCalendar
                baseUrl={baseUrl}
                dates={gameDates}
                gamesByDate={gamesByDate}
                initialDatePosition={gamesInitialDatePosition}
              />
            </ComponentLoader>
          </aside>
        </div>
      </div>
    </Fragment>
  );
};

export default connector(withPhase<PhaseHomeProps>(PhaseHome));
