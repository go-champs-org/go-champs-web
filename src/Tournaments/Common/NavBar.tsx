import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown, {
  DropdownDivider,
  DropdownItem
} from '../../Shared/UI/Dropdown';
import { TournamentEntity } from '../state';

const NavBar: React.FC<{
  organizationSlug: string;
  tournament: TournamentEntity;
  tournamentSlug: string;
}> = ({ organizationSlug, tournament, tournamentSlug }) => (
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

          <DropdownItem>
            <Link
              to={`/${organizationSlug}/${tournamentSlug}/TournamentGameList`}
            >
              Games
            </Link>
          </DropdownItem>

          <DropdownItem>
            <Link
              to={`/${organizationSlug}/${tournamentSlug}/TournamentGroupList`}
            >
              Groups
            </Link>
          </DropdownItem>

          <DropdownItem>
            <Link
              to={`/${organizationSlug}/${tournamentSlug}/TournamentStandingsEdit`}
            >
              Standings
            </Link>
          </DropdownItem>

          <DropdownItem>
            <Link
              to={`/${organizationSlug}/${tournamentSlug}/TournamentStatList`}
            >
              Stats
            </Link>
          </DropdownItem>
        </Dropdown>
      </span>
    </div>
  </nav>
);

export default NavBar;
