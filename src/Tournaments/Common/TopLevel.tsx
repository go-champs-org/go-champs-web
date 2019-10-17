import React from 'react';
import { Link } from 'react-router-dom';
import { PhaseTypes, TournamentPhaseEntity } from '../../Phases/state';
import Dropdown, {
  DropdownDivider,
  DropdownItem
} from '../../Shared/UI/Dropdown';
import { TournamentEntity } from '../state';

const StandingMenu: React.FC<{
  organizationSlug: string;
  tournamentSlug: string;
  phaseId: string;
}> = ({ organizationSlug, tournamentSlug, phaseId }) => (
  <div>
    <DropdownItem>
      <Link
        to={`/${organizationSlug}/${tournamentSlug}/phase/${phaseId}/PhaseGameList`}
      >
        Games
      </Link>
    </DropdownItem>

    <DropdownItem>
      <Link
        to={`/${organizationSlug}/${tournamentSlug}/phase/${phaseId}/PhaseGroupList`}
      >
        Groups
      </Link>
    </DropdownItem>

    <DropdownItem>
      <Link
        to={`/${organizationSlug}/${tournamentSlug}/phase/${phaseId}/EliminationEdit`}
      >
        Standings
      </Link>
    </DropdownItem>

    <DropdownItem>
      <Link
        to={`/${organizationSlug}/${tournamentSlug}/phase/${phaseId}/PhaseStatList`}
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
        to={`/${organizationSlug}/${tournamentSlug}/phase/${phaseId}/PhaseGameList`}
      >
        Games
      </Link>
    </DropdownItem>

    <DropdownItem>
      <Link
        to={`/${organizationSlug}/${tournamentSlug}/phase/${phaseId}/PhaseGroupList`}
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
            <Link to={`/${organizationSlug}/${tournamentSlug}/TeamList`}>
              Teams
            </Link>
          </DropdownItem>

          <DropdownDivider />

          {phase.type === PhaseTypes.draw ? (
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
