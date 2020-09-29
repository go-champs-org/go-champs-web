import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { getTournamentBySlug } from '../Tournaments/effects';
import { patchPlayer } from '../Players/effects';
import { StoreState } from '../store';
import { RouteProps } from './support/routerInterfaces';
import {
  playersLoading,
  playerById,
  patchingPlayer
} from '../Players/selectors';
import { Form, FormRenderProps } from 'react-final-form';
import { default as PlayerForm, FormLoading } from '../Players/Form';
import withTournament from './support/withTournament';
import { organizationBySlug } from '../Organizations/selectors';
import AdminMenu from '../Tournaments/AdminMenu';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import { PlayerEntity } from '../Players/state';
import { Trans } from 'react-i18next';
import { teamsForSelectInput } from '../Teams/selectors';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { organizationSlug } = props.match.params;
  return {
    ...props,
    isPatchingPlayer: patchingPlayer(state.players),
    organization: organizationBySlug(state.organizations, organizationSlug),
    playersLoading: playersLoading(state.players),
    player: playerById(state.players, state.teams, props.match.params.playerId),
    selectInputTeams: teamsForSelectInput(state.teams)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getTournamentBySlug,
      patchPlayer
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PlayerEditProps = ConnectedProps<typeof connector>;

function PlayerEdit({
  isPatchingPlayer,
  match,
  player,
  playersLoading,
  patchPlayer,
  selectInputTeams
}: PlayerEditProps): React.ReactElement {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const backUrl = `/${organizationSlug}/${tournamentSlug}/Players`;
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-vcentered is-mobile is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">
              <Trans>editPlayer</Trans>
            </h2>
          </div>

          <div className="column is-12">
            <ComponentLoader
              canRender={!playersLoading}
              loader={<FormLoading />}
            >
              <Form
                onSubmit={patchPlayer}
                initialValues={player}
                render={(props: FormRenderProps<PlayerEntity>) => (
                  <PlayerForm
                    {...props}
                    backUrl={backUrl}
                    isLoading={isPatchingPlayer}
                    selectInputTeams={selectInputTeams}
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
    </Fragment>
  );
}

export default connector(withTournament<PlayerEditProps>(PlayerEdit));
