import React from 'react';
import { Form } from 'react-final-form';
import Top from '../Common/Top';
import { TournamentPhaseState } from '../Phases/state';
import { TournamentState } from '../state';
import { default as TournamentStatForm } from './Form';

interface TournamentStatNewProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  postTournamentStat: any;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: TournamentState;
}

export const New: React.FC<TournamentStatNewProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  postTournamentStat,
  tournamentPhaseState,
  tournamentState
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  return (
    <div className="columns is-multiline">
      <header className="column is-12">
        <Top
          organizationSlug={currentOrganizationSlug}
          tournament={tournament}
          tournamentPhases={tournamentPhaseState.tournamentPhases}
          tournamentSlug={currentTournamentSlug}
        />
      </header>
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">New Stat</h2>
          </div>
        </div>
        <Form
          onSubmit={postTournamentStat}
          initialValues={{ name: '' }}
          render={TournamentStatForm}
        />
      </div>
    </div>
  );
};

export default New;
