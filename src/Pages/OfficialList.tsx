import React, { Fragment, useState, useEffect } from 'react';
import AdminMenu from '../Tournaments/AdminMenu';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import List, { ListLoading } from '../Officials/List';
import { ConnectedProps, connect } from 'react-redux';
import withTournament from './support/withTournament';
import { getTournamentBySlug } from '../Tournaments/effects';
import { deleteOfficial } from '../Officials/effects';
import { bindActionCreators, Dispatch } from 'redux';
import { officials } from '../Officials/selectors';
import { StoreState } from '../store';
import { tournamentBySlug, tournamentLoading } from '../Tournaments/selectors';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import ListHeader from '../Shared/UI/ListHeader';
import useFilteredItemsByString from '../Shared/hooks/useFilteredItemsByString';
import { useTranslation, Trans } from 'react-i18next';
import useDebounce from '../Shared/hooks/useDebounce';
import officialProfileHttpClient from '../OfficialProfiles/officialProfileHttpClient';
import tournamentHttpClient from '../Tournaments/tournamentHttpClient';
import registrationInviteHttpClient from '../Registrations/registrationInviteHttpClient';
import {
  ApiOfficialProfile,
  ApiOfficialInviteWithDetails
} from '../Shared/httpClient/apiTypes';
import OfficialProfileSearchResults from '../Officials/OfficialProfileSearchResults';
import PendingInvitesList from '../Officials/PendingInvitesList';
import { displayToast } from '../Shared/bulma/toast';
import './OfficialList.scss';

const SearchNameInput: React.FC<{
  value: string | null;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ onInputChange, value }) => (
  <div className="column is-12">
    <input
      className="input is-small"
      type="text"
      onChange={onInputChange}
      value={value ? value : ''}
    />
  </div>
);

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { tournamentSlug } = props.match.params;
  return {
    officials: officials(state.officials),
    tournament: tournamentBySlug(state.tournaments, tournamentSlug),
    tournamentLoading: tournamentLoading(state.tournaments)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      deleteOfficial,
      getTournamentBySlug
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type OfficialListProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

const OfficialList: React.FC<OfficialListProps> = ({
  deleteOfficial,
  match,
  officials,
  tournament,
  tournamentLoading
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const newUrl = `/${organizationSlug}/${tournamentSlug}/NewOfficial`;

  const [showInviteSearch, setShowInviteSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ApiOfficialProfile[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const [pendingInvites, setPendingInvites] = useState<
    ApiOfficialInviteWithDetails[]
  >([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm && showInviteSearch) {
      setIsSearching(true);
      let isCancelled = false;

      officialProfileHttpClient
        .getByFilter({ term: debouncedSearchTerm })
        .then(response => {
          if (!isCancelled) {
            setSearchResults(response.data);
            setIsSearching(false);
          }
        })
        .catch(() => {
          if (!isCancelled) {
            setSearchResults([]);
            setIsSearching(false);
          }
        });

      return () => {
        isCancelled = true;
      };
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm, showInviteSearch]);

  useEffect(() => {
    if (tournament && tournament.id) {
      tournamentHttpClient
        .getOfficialInvites(tournament.id)
        .then(invites => {
          // Filter to only show invites without registration_responses
          const pending = invites.filter(
            invite =>
              !invite.registration_responses ||
              invite.registration_responses.length === 0
          );
          setPendingInvites(pending);
        })
        .catch(() => {
          setPendingInvites([]);
        });
    }
  }, [tournament]);

  const handleInviteClick = () => {
    setShowInviteSearch(!showInviteSearch);
    if (showInviteSearch) {
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  const handleInvite = async (officialProfileId: string) => {
    if (!tournament || !tournament.id) return;

    setIsInviting(true);
    try {
      await tournamentHttpClient.postOfficialInvite(
        tournament.id,
        officialProfileId
      );
      displayToast('Official invited successfully!', 'is-success');
      setSearchTerm('');
      setSearchResults([]);

      // Refresh pending invites
      const invites = await tournamentHttpClient.getOfficialInvites(
        tournament.id
      );
      const pending = invites.filter(
        invite =>
          !invite.registration_responses ||
          invite.registration_responses.length === 0
      );
      setPendingInvites(pending);
    } catch (err) {
      displayToast('Error inviting official', 'is-danger');
    } finally {
      setIsInviting(false);
    }
  };

  const handleDeleteInvite = async (inviteId: string) => {
    if (!tournament || !tournament.id) return;

    try {
      await registrationInviteHttpClient.delete(inviteId);
      displayToast('Invite deleted successfully!', 'is-success');

      // Refresh pending invites
      const invites = await tournamentHttpClient.getOfficialInvites(
        tournament.id
      );
      const pending = invites.filter(
        invite =>
          !invite.registration_responses ||
          invite.registration_responses.length === 0
      );
      setPendingInvites(pending);
    } catch (err) {
      displayToast('Error deleting invite', 'is-danger');
    }
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const {
    items: filteredOfficials,
    onPropertyNameChange: onOfficialNameChange,
    searchValue: officialNameFilterValue
  } = useFilteredItemsByString(officials, 'name');

  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="column">
        <div className="columns is-vcentered is-mobile is-multiline">
          <ListHeader
            newUrl={newUrl}
            title={t('officials')}
            onInviteClick={handleInviteClick}
            filters={
              showInviteSearch
                ? []
                : [
                    <SearchNameInput
                      key="name"
                      onInputChange={onOfficialNameChange}
                      value={officialNameFilterValue}
                    />
                  ]
            }
          />

          {showInviteSearch && (
            <div className="column is-12 invite-search-section">
              <span className="is-size-7">
                <Trans>searchOfficialProfile</Trans>
              </span>
              <div className="control">
                <div
                  className="dropdown is-active"
                  style={{ width: '100%', position: 'relative' }}
                >
                  <div className="dropdown-trigger" style={{ width: '100%' }}>
                    <input
                      type="text"
                      className="input is-small"
                      placeholder={t('searchOfficialProfilePlaceholder')}
                      value={searchTerm}
                      onChange={handleSearchInputChange}
                    />
                  </div>
                  {(isSearching || searchResults.length > 0) && (
                    <OfficialProfileSearchResults
                      results={searchResults}
                      isSearching={isSearching}
                      isInviting={isInviting}
                      onInvite={handleInvite}
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="column is-12 official-list-container">
            <ComponentLoader
              canRender={!tournamentLoading}
              loader={<ListLoading />}
            >
              <List
                deleteOfficial={deleteOfficial}
                organizationSlug={organizationSlug}
                officials={filteredOfficials}
                tournamentSlug={tournamentSlug}
              />
            </ComponentLoader>
          </div>

          <div className="column is-12">
            <PendingInvitesList
              invites={pendingInvites}
              onDelete={handleDeleteInvite}
            />
          </div>
        </div>
      </div>

      <div className="is-divider-vertical is-hidden-tablet-only"></div>

      <div className="column is-4-desktop is-12-tablet">
        <AdminMenu
          organizationSlug={organizationSlug}
          tournamentSlug={tournamentSlug}
        />
      </div>
    </Fragment>
  );
};

export default connector(withTournament<OfficialListProps>(OfficialList));
