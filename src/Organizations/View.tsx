import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { ThemeV2Provider } from '../ThemeV2';
import NavBar from '../PagesV2/Shared/NavBar';
import Footer from '../PagesV2/Shared/Footer';
import CardV2 from '../PagesV2/Shared/CardV2';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import Avatar from './Avatar';
import TournamentAvatar from '../Tournaments/Avatar';
import { OrganizationEntity } from './state';
import {
  TournamentEntity,
  TournamentVisibilityEnum
} from '../Tournaments/state';
import tournamentHttpClient from '../Tournaments/tournamentHttpClient';
import { mapApiTournamentToTournamentEntity } from '../Tournaments/dataMappers';
import '../Tournaments/MiniCard.scss';
import './View.scss';

interface ViewProps {
  organization: OrganizationEntity;
}

const ListShimmer = (
  <div className="org-view-grid">
    {[1, 2, 3].map(i => (
      <div key={i} className="tournament-mini-card org-view-shimmer" />
    ))}
  </div>
);

function View({ organization }: ViewProps) {
  const [tournaments, setTournaments] = useState<TournamentEntity[]>([]);
  const [isLoadingTournaments, setIsLoadingTournaments] = useState(true);
  const organizationSlug = organization.slug;

  useEffect(() => {
    const fetchTournaments = async () => {
      const response = await tournamentHttpClient.getByFilter({
        organization_slug: organizationSlug,
        visibility: TournamentVisibilityEnum.PUBLIC
      });
      setTournaments(response.map(mapApiTournamentToTournamentEntity));
      setIsLoadingTournaments(false);
    };

    fetchTournaments();
  }, [organizationSlug]);

  return (
    <ThemeV2Provider>
      <div className="page-v2-wrapper">
        <NavBar />
        <main className="page-v2-main">
          <div className="org-view-layout">
            {/* Organization Header */}
            <CardV2 className="org-view-header-card">
              <div className="org-view-header">
                <div className="org-view-logo">
                  <Avatar
                    organization={{
                      id: organization.id,
                      name: organization.name,
                      slug: organization.slug,
                      logo_url: organization.logoUrl
                    }}
                  />
                </div>
                <h1 className="org-view-name">{organization.name}</h1>
              </div>
            </CardV2>

            {/* Tournaments Section */}
            <div className="org-view-tournaments-section">
              <h2 className="org-view-section-title">
                <Trans>tournaments</Trans>
              </h2>

              <ComponentLoader
                canRender={!isLoadingTournaments}
                loader={ListShimmer}
              >
                {tournaments.length > 0 ? (
                  <div className="org-view-grid">
                    {tournaments.map(tournament => (
                      <Link
                        key={tournament.id}
                        to={`/${organization.slug}/${tournament.slug}`}
                      >
                        <div className="tournament-mini-card">
                          <header>
                            <TournamentAvatar tournament={tournament} />
                            <span>{tournament.name}</span>
                          </header>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="org-view-empty-state">
                    <p>
                      <Trans>tournamentNotFound</Trans>
                    </p>
                  </div>
                )}
              </ComponentLoader>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      <Helmet>
        <title>Go Champs | {organization.name}</title>
        <meta name="description" content={`${organization.name} tournaments`} />
      </Helmet>
    </ThemeV2Provider>
  );
}

export default View;
