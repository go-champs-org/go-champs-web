import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { ConnectedProps, connect } from 'react-redux';
import withTournament from './support/withTournament';
import { getTournamentBySlug } from '../Tournaments/effects';
import { bindActionCreators, Dispatch } from 'redux';
import { fixedPlayerStatsTables } from '../FixedPlayerStatsTables/selectors';
import { StoreState } from '../store';
import {
  tournamentLoading,
  tournamentPlayerStatsMapBySlug
} from '../Tournaments/selectors';
import { Trans } from 'react-i18next';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { tournamentSlug } = props.match.params;
  return {
    fixedPlayerStatsTables: fixedPlayerStatsTables(
      state.fixedPlayerStatsTables
    ),
    playerStatsMap: tournamentPlayerStatsMapBySlug(
      state.tournaments,
      tournamentSlug
    ),
    tournamentLoading: tournamentLoading(state.tournaments)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getTournamentBySlug
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type PlayerStatsSummaryViewProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

const PlayerStatsSummaryView: React.FC<PlayerStatsSummaryViewProps> = ({
  match,
  fixedPlayerStatsTables,
  playerStatsMap,
  tournamentLoading
}) => {
  return (
    <div className="column">
      <div className="columns is-multiline">
        <div className="column is-12">
          <span className="subtitle">
            <Trans>playerStats</Trans>
          </span>
          Summary
        </div>
      </div>
    </div>
  );
};

export default connector(
  withTournament<PlayerStatsSummaryViewProps>(PlayerStatsSummaryView)
);
