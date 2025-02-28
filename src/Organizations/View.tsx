import React, { useEffect, useState } from 'react';
import { OrganizationEntity } from './state';
import { TournamentEntity } from '../Tournaments/state';
import tournamentHttpClient from '../Tournaments/tournamentHttpClient';
import { mapApiTournamentToTournamentEntity } from '../Tournaments/dataMappers';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { ListLoading } from '../Tournaments/List';

interface ViewProps {
  organization: OrganizationEntity;
}

function View({ organization }: ViewProps) {
  const [tournaments, setTournaments] = useState<TournamentEntity[]>([]);
  const [isLoadingTournaments, setIsLoadingTournaments] = useState(true);
  const organiationSlug = organization.slug;
  useEffect(() => {
    const fetchTournaments = async () => {
      const response = await tournamentHttpClient.getByFilter({
        organization_slug: organiationSlug
      });
      setTournaments(response.map(mapApiTournamentToTournamentEntity));
      setIsLoadingTournaments(false);
    };

    fetchTournaments();

    return () => {};
  }, [organiationSlug]);

  return (
    <section className="container">
      <div className="hero">
        <div className="hero-head">
          <div className="container">
            <h1 className="title">{organization.name}</h1>
          </div>
        </div>

        <div className="hero-body">
          {isLoadingTournaments && <ListLoading />}
          {!isLoadingTournaments && (
            <div className="columns is-multiline">
              {tournaments.map(tournament => (
                <div key={tournament.id} className="column is-one-third">
                  <Link to={`/${organization.slug}/${tournament.slug}`}>
                    <div className="card">
                      <div className="card-content">
                        <p className="title is-4">{tournament.name}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Helmet>
        <title>Go Champs! | {organization.name}</title>

        <meta name="description" content={`${organization.name} tournaments`} />
      </Helmet>
    </section>
  );
}

export default View;
