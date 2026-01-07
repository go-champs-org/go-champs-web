import React from 'react';
import { ApiTournamentWithDependecies } from '../Shared/httpClient/apiTypes';
import Avatar from '../Organizations/Avatar';
import './MiniCard.scss';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';

interface MiniCardProps {
  tournament: ApiTournamentWithDependecies;
  togglePin?: () => void;
  isPinned?: boolean;
}

function MiniCard({ tournament, togglePin, isPinned = false }: MiniCardProps) {
  const handlePinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (togglePin) {
      togglePin();
    }
  };

  return (
    <Link to={`/${tournament.organization.slug}/${tournament.slug}`}>
      <div className="tournament-mini-card">
        <header>
          <Avatar organization={tournament.organization} />
          <span>{tournament.name}</span>
          {togglePin && (
            <button
              className={`pin-button button is-rounded is-small${
                isPinned ? ' is-pinned' : ''
              }`}
              onClick={handlePinClick}
            >
              <span className="icon">
                <i className="fas fa-thumbtack"></i>
              </span>
              <span>
                {isPinned ? <Trans>unpin</Trans> : <Trans>pin</Trans>}
              </span>
            </button>
          )}
        </header>
        <span className="name">{tournament.organization.name}</span>
      </div>
    </Link>
  );
}

export default MiniCard;
