import React, { useEffect, useState } from 'react';
import { OrganizationEntity } from './state';
import { TournamentEntity } from '../Tournaments/state';
import tournamentHttpClient from '../Tournaments/tournamentHttpClient';
import { mapApiTournamentToTournamentEntity } from '../Tournaments/dataMappers';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { ListLoading } from '../Tournaments/List';
import QRCode from '../Shared/UI/QRCode';

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
            <div className="columns">
              <div className="column is-8">
                <h1 className="title">{organization.name}</h1>
              </div>
              <div className="column is-4 has-text-right">
                <QRCode
                  url={`https://${window.location.host}/${organization.slug}`}
                  caption={organization.name}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="hero-body">
          {isLoadingTournaments && <ListLoading />}
          {!isLoadingTournaments && (
            <div className="container">
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
