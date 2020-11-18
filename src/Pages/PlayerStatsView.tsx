import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { StoreState } from '../store';
import { Dispatch, bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { getAggregatedPlayerStatsLogsByFilter } from '../AggregatedPlayerStats/effects';
import { tournamentBySlug } from '../Tournaments/selectors';
import withAggregatedPlayerStatsLogs from './support/withAggregatedPlayerStatsLog';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  return {
    tournament: tournamentBySlug(
      state.tournaments,
      props.match.params.tournamentSlug
    )
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getAggregatedPlayerStatsLogsByFilter
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PlayerStatsViewProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

function PlayerStatsView() {
  return (
    <div className="column">
      <div className="columns is-multiline">
        <div className="column is-12">Player stats view</div>
      </div>
    </div>
  );
}

export default connector(
  withAggregatedPlayerStatsLogs<PlayerStatsViewProps>(PlayerStatsView)
);
