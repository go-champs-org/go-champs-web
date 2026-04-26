import React from 'react';
import { ApiOfficialProfile } from '../Shared/httpClient/apiTypes';
import LoadingButton from '../Shared/UI/LoadingButton';
import { Trans } from 'react-i18next';
import './OfficialProfileSearchResults.scss';

interface OfficialProfileSearchResultsProps {
  results: ApiOfficialProfile[];
  isSearching: boolean;
  isInviting: boolean;
  onInvite: (profileId: string) => void;
}

function OfficialProfileSearchResults({
  results,
  isSearching,
  isInviting,
  onInvite
}: OfficialProfileSearchResultsProps) {
  if (isSearching) {
    return (
      <div className="dropdown-menu official-profile-search-results">
        <div className="dropdown-content">
          <div className="dropdown-item">
            <Trans>searching</Trans>...
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="dropdown-menu official-profile-search-results">
      <div className="dropdown-content">
        {results.map(profile => (
          <div key={profile.username} className="dropdown-item profile-result">
            <div className="profile-info">
              <div className="profile-photo">
                {profile.photo_url ? (
                  <img
                    src={profile.photo_url}
                    alt={profile.name || profile.username}
                  />
                ) : (
                  <div className="photo-placeholder">
                    <i className="fas fa-user"></i>
                  </div>
                )}
              </div>
              <div className="profile-details">
                <div className="profile-name">
                  {profile.name || profile.username}
                </div>
                {profile.category && (
                  <div className="profile-category">{profile.category}</div>
                )}
                {profile.license_number && (
                  <div className="profile-license">
                    <Trans>licenseNumber</Trans>: {profile.license_number}
                  </div>
                )}
              </div>
            </div>
            <LoadingButton
              isLoading={isInviting}
              className="button is-small is-primary"
              onClick={() => onInvite(profile.id)}
              disabled={isInviting}
            >
              <Trans>invite</Trans>
            </LoadingButton>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfficialProfileSearchResults;
