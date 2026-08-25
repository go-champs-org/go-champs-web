import React from 'react';
import { Link } from 'react-router-dom';
import Shimmer from '../Shared/UI/Shimmer';
import { TournamentEntity } from './state';
import { AnyAction, Dispatch } from 'redux';
import DoubleClickButton from '../Shared/UI/DoubleClickButton';
import { useTranslation } from 'react-i18next';

const LoadingCard: React.FC = () => (
  <div className="card item">
    <div className="card-header">
      <div className="card-header-title">
        <Shimmer>
          <div
            style={{
              height: '13px',
              marginTop: '13px',
              width: '250px'
            }}
          ></div>
        </Shimmer>
      </div>
    </div>
  </div>
);

export const ListLoading: React.FC = () => (
  <div className="columns is-multiline">
    <div className="column is-4">
      <LoadingCard />
    </div>
    <div className="column is-4">
      <LoadingCard />
    </div>
    <div className="column is-4">
      <LoadingCard />
    </div>
    <div className="column is-4">
      <LoadingCard />
    </div>
    <div className="column is-4">
      <LoadingCard />
    </div>
    <div className="column is-4">
      <LoadingCard />
    </div>
  </div>
);

const TournamentCard: React.FC<{
  archivingTournament: boolean;
  deleteTournament: (
    tournament: TournamentEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  organizationSlug: string;
  toggleTournamentArchive: (tournament: TournamentEntity) => void;
  tournament: TournamentEntity;
}> = ({
  archivingTournament,
  deleteTournament,
  organizationSlug,
  toggleTournamentArchive,
  tournament
}) => {
  const { t } = useTranslation();
  const isArchived = !!tournament.archivedAt;
  const archiveLabel = isArchived ? t('unarchive') : t('archive');

  return (
    <div className="card item">
      <div className="card-header">
        <Link
          className="card-header-title"
          to={`/${organizationSlug}/${tournament.slug}`}
        >
          <span className="title is-6">{tournament.name}</span>
        </Link>

        <div className="card-header-icon">
          <button
            aria-label={`${archiveLabel}: ${tournament.name}`}
            className="button is-text"
            disabled={archivingTournament}
            onClick={() => toggleTournamentArchive(tournament)}
            title={archiveLabel}
            type="button"
          >
            <i
              aria-hidden="true"
              className={isArchived ? 'fas fa-box-open' : 'fas fa-archive'}
            />
          </button>

          <DoubleClickButton
            aria-label={`${t('remove')}: ${tournament.name}`}
            className="button is-text"
            onClick={() => deleteTournament(tournament)}
            title={t('remove')}
          >
            <i aria-hidden="true" className="fas fa-trash" />
          </DoubleClickButton>
        </div>
      </div>
    </div>
  );
};

export const List: React.FC<{
  archivingTournament?: boolean;
  deleteTournament: (
    tournament: TournamentEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  organizationSlug: string;
  toggleTournamentArchive: (tournament: TournamentEntity) => void;
  tournaments: TournamentEntity[];
}> = ({
  archivingTournament = false,
  deleteTournament,
  organizationSlug,
  toggleTournamentArchive,
  tournaments
}) => (
  <div>
    {tournaments.map((tournament: TournamentEntity) => (
      <TournamentCard
        key={tournament.id}
        archivingTournament={archivingTournament}
        deleteTournament={deleteTournament}
        organizationSlug={organizationSlug}
        toggleTournamentArchive={toggleTournamentArchive}
        tournament={tournament}
      />
    ))}
  </div>
);

export default List;
