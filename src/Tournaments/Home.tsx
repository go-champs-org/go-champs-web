import React from 'react';
import NavBar from './Common/NavBar';
import ListByDate from './Games/ListByDate';
import { TournamentGameState } from './Games/state';
import { TournamentGroupState } from './Groups/state';
import { default as StandingsView } from './Standings/View';
import { TournamentState } from './state';
import { TournamentStatState } from './Stats/state';
import { TournamentTeamState } from './Teams/state';

interface HomeProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  tournamentState: TournamentState;
  tournamentGameState: TournamentGameState;
  tournamentGroupState: TournamentGroupState;
  tournamentTeamState: TournamentTeamState;
  tournamentStatState: TournamentStatState;
}

const Home: React.FC<HomeProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  tournamentState,
  tournamentGameState,
  tournamentGroupState,
  tournamentTeamState,
  tournamentStatState
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  return (
    <div className="columns is-multiline">
      <header className="column is-12">
        <NavBar
          organizationSlug={currentOrganizationSlug}
          tournament={tournament}
          tournamentSlug={currentTournamentSlug}
        />
      </header>
      <div className="column">
        <StandingsView
          tournamentGroupState={tournamentGroupState}
          tournamentStatState={tournamentStatState}
          tournamentTeamState={tournamentTeamState}
        />
      </div>
      <div className="is-divider-vertical"></div>
      <aside className="column is-4">
        <ListByDate tournamentGameState={tournamentGameState} />
      </aside>
    </div>
  );
};

export default Home;
