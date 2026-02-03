import React, { Fragment } from 'react';
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
import { tournamentLoading } from '../Tournaments/selectors';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import ListHeader from '../Shared/UI/ListHeader';
import useFilteredItemsByString from '../Shared/hooks/useFilteredItemsByString';
import { useTranslation } from 'react-i18next';

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

const mapStateToProps = (state: StoreState) => ({
  officials: officials(state.officials),
  tournamentLoading: tournamentLoading(state.tournaments)
});

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
  tournamentLoading
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const newUrl = `/${organizationSlug}/${tournamentSlug}/NewOfficial`;
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
            filters={[
              <SearchNameInput
                key="name"
                onInputChange={onOfficialNameChange}
                value={officialNameFilterValue}
              />
            ]}
          />

          <div className="column is-12">
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
