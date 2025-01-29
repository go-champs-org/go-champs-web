import React from 'react';
import { PlayersMap } from '../Players/state';
import { PlayerStatEntity, TournamentEntity } from '../Tournaments/state';
import { FormRenderProps } from 'react-final-form';
import { GameEntity } from '../Games/state';
import { TeamEntity } from '../Teams/state';
import { FieldArray } from 'react-final-form-arrays';
import { PlayerStatsLogsForm } from './state';
import LoadingButton from '../Shared/UI/LoadingButton';
import { Trans } from 'react-i18next';
import GeneralPlayerStatsLogTableForm from './GeneralPlayerStatsLogTableForm';

interface FormProps extends FormRenderProps<PlayerStatsLogsForm> {
  game: GameEntity;
  players: PlayersMap;
  playersStats: PlayerStatEntity[];
  team: TeamEntity;
  tournament: TournamentEntity;
}

function Form({
  handleSubmit,
  players,
  playersStats,
  pristine,
  submitting,
  team,
  tournament
}: FormProps): React.ReactElement {
  return (
    <form onSubmit={handleSubmit} className="form column is-12">
      <div className="columns is-gapless is-mobile">
        <div className="column is-8">
          <h2 className="subtitle">{team.name}</h2>
        </div>

        <div className="column is-4 has-text-right">
          <LoadingButton
            isLoading={false}
            className="button is-primary"
            type="submit"
            disabled={submitting || pristine}
          >
            <Trans>save</Trans>
          </LoadingButton>
        </div>
      </div>

      <FieldArray name="playerStatsLogs">
        {({ fields }) => (
          <GeneralPlayerStatsLogTableForm
            players={players}
            fields={fields}
            playersStats={playersStats}
            meta={{}}
          />
        )}
      </FieldArray>
    </form>
  );
}

export default Form;
