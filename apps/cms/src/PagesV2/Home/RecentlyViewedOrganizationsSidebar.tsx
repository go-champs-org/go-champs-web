import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import CardV2 from '../Shared/CardV2';
import Avatar from '../../Organizations/Avatar';
import ComponentLoader from '../../Shared/UI/ComponentLoader';
import organizationHttpClient from '../../Organizations/organizationHttpClient';
import { ApiOrganization } from '../../Shared/httpClient/apiTypes';
import './RecentlyViewedOrganizationsSidebar.scss';

const OrganizationShimmer: React.FC = () => (
  <div className="org-sidebar-item-shimmer">
    <div className="org-sidebar-avatar-shimmer"></div>
    <div className="org-sidebar-name-shimmer"></div>
  </div>
);

const ListShimmer = (
  <>
    <OrganizationShimmer />
    <OrganizationShimmer />
    <OrganizationShimmer />
  </>
);

function RecentlyViewedOrganizationsSidebar() {
  const [organizations, setOrganizations] = useState<ApiOrganization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const results = await organizationHttpClient.getRecentlyViewed();
        setOrganizations(results);
        setIsLoading(false);
      } catch (error) {
        // Silent fail - don't render sidebar on error
        setHasError(true);
        setIsLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Silent fail - don't render if there was an error
  if (hasError) {
    return null;
  }

  return (
    <div className="org-sidebar">
      <CardV2 className="org-sidebar-card">
        <div className="org-sidebar-header">
          <div className="org-sidebar-title">
            <Trans>organizations</Trans>
          </div>
          <button
            className={`org-sidebar-toggle ${isExpanded ? 'is-active' : ''}`}
            onClick={toggleExpanded}
            aria-label="Toggle organizations"
          >
            <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
          </button>
        </div>

        <div
          className={`org-sidebar-content ${isExpanded ? 'is-expanded' : ''}`}
        >
          <ComponentLoader canRender={!isLoading} loader={ListShimmer}>
            {organizations.length > 0 ? (
              <div className="org-sidebar-list">
                {organizations.slice(0, 15).map(organization => (
                  <a
                    key={organization.id}
                    href={`/${organization.slug}`}
                    className="org-sidebar-item"
                  >
                    <div className="org-sidebar-avatar">
                      <Avatar organization={organization} />
                    </div>
                    <span className="org-sidebar-name">
                      {organization.name}
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="org-sidebar-empty">
                <p>No organizations viewed yet</p>
              </div>
            )}
          </ComponentLoader>
        </div>
      </CardV2>
    </div>
  );
}

export default RecentlyViewedOrganizationsSidebar;
