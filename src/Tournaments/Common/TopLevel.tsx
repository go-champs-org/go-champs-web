import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown, {
  DropdownDivider,
  DropdownItem
} from '../../Shared/UI/Dropdown';
import { PhaseTypes, TournamentPhaseEntity } from '../Phases/state';
import { TournamentEntity } from '../state';

const StandingMenu: React.FC<{
  organizationSlug: string;
  tournamentSlug: string;
  phaseId: string;
}> = ({ organizationSlug, tournamentSlug, phaseId }) => (
  <div>
    <DropdownItem>
      <Link
        to={`/${organizationSlug}/${tournamentSlug}/phase/${phaseId}/TournamentGameList`}
      >
        Games
      </Link>
    </DropdownItem>

    <DropdownItem>
      <Link
        to={`/${organizationSlug}/${tournamentSlug}/phase/${phaseId}/TournamentGroupList`}
      >
        Groups
      </Link>
    </DropdownItem>

    <DropdownItem>
      <Link
        to={`/${organizationSlug}/${tournamentSlug}/phase/${phaseId}/TournamentStandingsEdit`}
      >
        Standings
      </Link>
    </DropdownItem>

    <DropdownItem>
      <Link
        to={`/${organizationSlug}/${tournamentSlug}/phase/${phaseId}/TournamentStatList`}
      >
        Stats
      </Link>
    </DropdownItem>
  </div>
);

const BracketMenu: React.FC<{
  organizationSlug: string;
  tournamentSlug: string;
  phaseId: string;
}> = ({ organizationSlug, tournamentSlug, phaseId }) => (
  <div>
    <DropdownItem>
      <Link
        to={`/${organizationSlug}/${tournamentSlug}/phase/${phaseId}/TournamentGameList`}
      >
        Games
      </Link>
    </DropdownItem>

    <DropdownItem>
      <Link
        to={`/${organizationSlug}/${tournamentSlug}/phase/${phaseId}/TournamentGroupList`}
      >
        Rounds
      </Link>
    </DropdownItem>
  </div>
);

const TopLevel: React.FC<{
  organizationSlug: string;
  tournament: TournamentEntity;
  phase: TournamentPhaseEntity;
  tournamentSlug: string;
}> = ({ phase, organizationSlug, tournament, tournamentSlug }) => (
  <nav className="level">
    <div className="level-left">
      <div className="level-item">
        <Link to={`/${organizationSlug}/${tournamentSlug}`}>
          <h1 className="title">{tournament.name}</h1>
        </Link>
      </div>
    </div>

    <div className="level-right">
      <span className="level-item">
        <Dropdown label="Manage" className="is-right">
          <DropdownItem>
            <Link to={`/${organizationSlug}/${tournamentSlug}/TournamentEdit`}>
              Settings
            </Link>
          </DropdownItem>

          <DropdownItem>
            <Link
              to={`/${organizationSlug}/${tournamentSlug}/TournamentPhaseList`}
            >
              Phases
            </Link>
          </DropdownItem>

          <DropdownItem>
            <Link
              to={`/${organizationSlug}/${tournamentSlug}/TournamentTeamList`}
            >
              Teams
            </Link>
          </DropdownItem>

          <DropdownDivider />

          {phase.type === PhaseTypes.bracket ? (
            <BracketMenu
              organizationSlug={organizationSlug}
              tournamentSlug={tournamentSlug}
              phaseId={phase.id}
            />
          ) : (
            <StandingMenu
              organizationSlug={organizationSlug}
              tournamentSlug={tournamentSlug}
              phaseId={phase.id}
            />
          )}
        </Dropdown>
      </span>
    </div>
  </nav>
);

export default TopLevel;
