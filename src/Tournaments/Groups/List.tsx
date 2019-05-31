import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Common/NavBar';
import { TournamentState } from '../state';
import './List.scss';
import { TournamentGroupEntity, TournamentGroupState } from './state';

const TournamentGroupCard: React.FC<{
  onDeleteTournamentGroup: any;
  url: string;
  tournamentGroup: TournamentGroupEntity;
}> = ({ onDeleteTournamentGroup, url, tournamentGroup }) => (
  <div className="card item">
    <div className="card-header">
      <Link
        className="card-header-title"
        to={`${url}/TournamentGroupEdit/${tournamentGroup.id}`}
      >
        <span className="title is-6">{tournamentGroup.name}</span>
      </Link>
      <div className="card-header-icon">
        <button
          className="button is-text"
          onClick={() => onDeleteTournamentGroup(tournamentGroup)}
        >
          <i className="fas fa-trash" />
        </button>
      </div>
    </div>
  </div>
);

export const List: React.FC<{
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  deleteTournamentGroup: any;
  tournamentGroupState: TournamentGroupState;
  tournamentState: TournamentState;
  url: string;
}> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteTournamentGroup,
  url,
  tournamentGroupState,
  tournamentState
}) => {
    const tournament = tournamentState.tournaments[currentTournamentSlug];
    const baseTournamentUrl = `/${currentOrganizationSlug}/${currentTournamentSlug}`;
    return (
      <div className="columns is-multiline">
        <header className="column is-12">
          <NavBar
            organizationSlug={currentOrganizationSlug}
            tournament={tournament}
            tournamentSlug={currentTournamentSlug}
          />
        </header>
        <div className="column is-8">
          <div className="columns is-mobile is-vcentered">
            <div className="column is-8">
              <h2 className="subtitle">Groups</h2>
            </div>
            <div className="column is-4 has-text-right">
              <Link className="button" to={`./TournamentGroupNew`}>
                New group
            </Link>
            </div>
          </div>
          {Object.keys(tournamentGroupState.tournamentGroups).map(
            (key: string) => (
              <TournamentGroupCard
                key={key}
                url={baseTournamentUrl}
                tournamentGroup={tournamentGroupState.tournamentGroups[key]}
                onDeleteTournamentGroup={deleteTournamentGroup}
              />
            )
          )}
        </div>
      </div>
    );
  };

const Loading: React.FC = () => <div>Loading...</div>;

export const Wrapper: React.FC<{
  deleteTournamentGroup: any;
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  tournamentState: TournamentState;
  tournamentGroupState: TournamentGroupState;
  url: string;
}> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteTournamentGroup,
  tournamentState,
  tournamentGroupState,
  url
}) => {
    if (tournamentGroupState.isLoadingRequestTournament) {
      return <Loading />;
    }

    return (
      <List
        currentOrganizationSlug={currentOrganizationSlug}
        currentTournamentSlug={currentTournamentSlug}
        deleteTournamentGroup={deleteTournamentGroup}
        tournamentState={tournamentState}
        tournamentGroupState={tournamentGroupState}
        url={url}
      />
    );
  };

export default Wrapper;
