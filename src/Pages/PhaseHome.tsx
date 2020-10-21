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
import { default as GameListByDate } from '../Games/ListByDate';
import { default as EliminationView } from '../Eliminations/View';
import { PhaseTypes } from '../Phases/state';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import TopBreadcrumbs from '../Tournaments/Common/TopBreadcrumbs';
import { useRouteMatch } from 'react-router-dom';

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
  gameDates,
  gamesByDate,
  gamesInitialDatePosition,
  gamesLoading,
  organizationSlug,
  phase,
  phases,
  draws,
  eliminations,
  teams,
  tournamentSlug
}) => {
  const route = useRouteMatch();
  const baseUrl = route.url;

  const MainContent =
    phase!.type === PhaseTypes.elimination ? (
      <EliminationView
        {...{
          eliminationStats: phase.eliminationStats,
          eliminations,
          teams
        }}
      />
    ) : (
      <DrawView {...{ draws, teams }} />
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

          <div className="is-divider-vertical is-hidden-tablet-only"></div>

          <aside className="column is-4-desktop is-12-tablet">
            <ComponentLoader canRender={!gamesLoading} loader={'Loading'}>
              <GameListByDate
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
