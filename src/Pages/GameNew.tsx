import React, { Fragment } from 'react';
import arrayMutators from 'final-form-arrays';
import { Mutator } from 'final-form';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { postGame } from '../Games/effects';
import { default as GameForm } from '../Games/Form';
import { Form, FormRenderProps } from 'react-final-form';
import { GameEntity } from '../Games/state';
import { StoreState } from '../store';
import AdminMenu from '../Tournaments/AdminMenu';
import withPhase from './support/withPhase';
import { PhaseEntity } from '../Phases/state';
import { phaseByIdOrDefault } from '../Phases/selectors';
import { teamsForSelectInput } from '../Teams/selectors';
import { officialsForSelectInput } from '../Officials/selectors';
import { officialTypesForSelectInput } from '../Sports/selectors';
import { TournamentEntity } from '../Tournaments/state';
import { SelectOptionType } from '../Shared/UI/Form/Select';
import {
  liveStateOptions,
  postingGame,
  resultTypeOptions
} from '../Games/selectors';
import { gameAssetTypeOptions } from '../Sports/selectors';
import { Trans } from 'react-i18next';
import { TranslateSelectOptionType } from '../Shared/hooks/useTranslatedSelectOptions';
import { tournamentBySlug } from '../Tournaments/selectors';
import { selectDefaultGame } from '../Sports/selectors';

interface OwnProps {
  basePhaseManageUrl: string;
  organizationSlug: string;
  phaseId: string;
  tournamentSlug: string;
}

type StateProps = {
  isPostingGame: boolean;
  phase: PhaseEntity;
  selectInputTeams: SelectOptionType[];
  selectInputOfficials: SelectOptionType[];
  officialTypesSelectOptions: TranslateSelectOptionType[];
  resultTypeOptions: TranslateSelectOptionType[];
  gameAssetTypeOptions: TranslateSelectOptionType[];
  liveStateOptions: TranslateSelectOptionType[];
  tournament: TournamentEntity;
  defaultGame: GameEntity;
};

type DispatchProps = {
  postGame: (
    game: GameEntity,
    phaseId: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
};

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  const tournament = tournamentBySlug(state.tournaments, props.tournamentSlug);

  return {
    isPostingGame: postingGame(state.games),
    phase: phaseByIdOrDefault(state.phases, props.phaseId),
    selectInputTeams: teamsForSelectInput(state.teams),
    selectInputOfficials: officialsForSelectInput(state.officials),
    officialTypesSelectOptions: officialTypesForSelectInput(
      state.sports,
      tournament.sportSlug || ''
    ),
    resultTypeOptions: resultTypeOptions(),
    liveStateOptions: liveStateOptions(),
    gameAssetTypeOptions: gameAssetTypeOptions(),
    tournament,
    defaultGame: selectDefaultGame(tournament.sportSlug || '')
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      postGame
    },
    dispatch
  );
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps
) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    postGame: (game: GameEntity) =>
      dispatchProps.postGame(game, stateProps.phase.id)
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type GameNewProps = ConnectedProps<typeof connector>;

const GameNew: React.FC<GameNewProps> = ({
  basePhaseManageUrl,
  isPostingGame,
  organizationSlug,
  phase,
  postGame,
  resultTypeOptions,
  liveStateOptions,
  gameAssetTypeOptions,
  selectInputTeams,
  selectInputOfficials,
  officialTypesSelectOptions,
  tournamentSlug,
  defaultGame
}) => {
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">
              <Trans>newGame</Trans>
            </h2>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={postGame}
              initialValues={defaultGame}
              mutators={
                (arrayMutators as unknown) as {
                  [key: string]: Mutator<GameEntity>;
                }
              }
              render={(props: FormRenderProps<GameEntity>) => (
                <GameForm
                  {...props}
                  push={props.form.mutators.push}
                  backUrl={`${basePhaseManageUrl}/Games`}
                  isLoading={isPostingGame}
                  selectInputTeams={selectInputTeams}
                  selectInputOfficials={selectInputOfficials}
                  officialTypesSelectOptions={officialTypesSelectOptions}
                  resultTypeOptions={resultTypeOptions}
                  liveStateOptions={liveStateOptions}
                  gameAssetTypeOptions={gameAssetTypeOptions}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className="is-divider-vertical is-hidden-tablet-only"></div>

      <div className="column is-4-desktop is-12-tablet">
        <AdminMenu
          organizationSlug={organizationSlug}
          phase={phase}
          tournamentSlug={tournamentSlug}
        />
      </div>
    </Fragment>
  );
};

export default connector(withPhase<GameNewProps>(GameNew));
