import React, { Fragment, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { Form, FormRenderProps } from 'react-final-form';
import { FormApi } from 'final-form';
import Helmet from 'react-helmet';
import { Trans } from 'react-i18next';
import { StoreState } from '../store';
import { RouteProps } from './support/routerInterfaces';
import {
  deletePlayerIdentity,
  requestPlayerIdentity,
  savePlayerIdentity
} from '../PlayerIdentities/effects';
import {
  deletingPlayerIdentity,
  playerIdentityByPlayerId,
  playerIdentityLoading,
  savingPlayerIdentity
} from '../PlayerIdentities/selectors';
import {
  PlayerIdentityFormValues,
  PlayerIdentityModifiedFields
} from '../PlayerIdentities/dataMappers';
import { default as PlayerIdentityForm, FormLoading } from '../PlayerIdentities/Form';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import AdminMenu from '../Tournaments/AdminMenu';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => ({
  ...props,
  isDeleting: deletingPlayerIdentity(state.players),
  isLoading: playerIdentityLoading(state.players),
  isSaving: savingPlayerIdentity(state.players),
  playerIdentity: playerIdentityByPlayerId(
    state.players,
    props.match.params.playerId || ''
  )
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      deletePlayerIdentity,
      requestPlayerIdentity,
      savePlayerIdentity
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type PlayerIdentityEditProps = ConnectedProps<typeof connector>;

function PlayerIdentityEdit({
  deletePlayerIdentity,
  history,
  isDeleting,
  isLoading,
  isSaving,
  match,
  playerIdentity,
  requestPlayerIdentity,
  savePlayerIdentity
}: PlayerIdentityEditProps): React.ReactElement {
  const { organizationSlug = '', tournamentSlug = '', playerId = '' } =
    match.params;
  const backUrl = `/${organizationSlug}/${tournamentSlug}/EditPlayer/${playerId}`;

  useEffect(() => {
    if (playerId) {
      requestPlayerIdentity(playerId);
    }
  }, [playerId, requestPlayerIdentity]);

  const exists = Boolean(playerIdentity.id);

  const initialValues: PlayerIdentityFormValues = {
    fullLegalName: playerIdentity.fullLegalName,
    taxId: '',
    governmentId: '',
    dateOfBirth: playerIdentity.dateOfBirth,
    username: playerIdentity.username,
    email: playerIdentity.email
  };

  const handleSubmit = (
    formValues: PlayerIdentityFormValues,
    form: FormApi<PlayerIdentityFormValues, PlayerIdentityFormValues>
  ) =>
    savePlayerIdentity(
      playerId,
      playerIdentity.id,
      formValues,
      (form.getState().modified || {}) as PlayerIdentityModifiedFields,
      history,
      backUrl
    );

  const handleDelete = () => deletePlayerIdentity(playerId, history, backUrl);

  return (
    <Fragment>
      <div className="column">
        <div className="columns is-vcentered is-mobile is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">
              <Trans>playerIdentity</Trans>
            </h2>
          </div>

          <div className="column is-12">
            <ComponentLoader canRender={!isLoading} loader={<FormLoading />}>
              <Form
                onSubmit={handleSubmit}
                initialValues={initialValues}
                render={(props: FormRenderProps<PlayerIdentityFormValues>) => (
                  <PlayerIdentityForm
                    {...props}
                    backUrl={backUrl}
                    exists={exists}
                    isLoading={isSaving}
                    isDeleting={isDeleting}
                    taxIdLast4={playerIdentity.taxIdLast4}
                    governmentIdLast4={playerIdentity.governmentIdLast4}
                    onDelete={handleDelete}
                  />
                )}
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

      <Helmet>
        <title>Go Champs | Player Identity</title>
      </Helmet>
    </Fragment>
  );
}

export default connector(PlayerIdentityEdit);
